import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const CART_KEY = "shop_cart_v1";

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider />");
  return ctx;
}

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => loadCart());

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);

  const count = useMemo(
    () => items.reduce((sum, it) => sum + Number(it.qty || 0), 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((sum, it) => sum + Number(it.price || 0) * Number(it.qty || 0), 0),
    [items]
  );

  function addItem(product, qty = 1) {
    setItems((prev) => {
      const idx = prev.findIndex((p) => p.id === product.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + qty };
        return next;
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          oldPrice: product.oldPrice,
          tag: product.tag,
          qty,
        },
      ];
    });
  }

  function removeItem(id) {
    setItems((prev) => prev.filter((it) => it.id !== id));
  }

  function setQty(id, qty) {
    const n = Math.max(1, Number(qty || 1));
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, qty: n } : it)));
  }

  function clear() {
    setItems([]);
  }

  const value = useMemo(
    () => ({ items, count, subtotal, addItem, removeItem, setQty, clear }),
    [items, count, subtotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
