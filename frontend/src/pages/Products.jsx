import React, { useMemo, useState } from "react";
import { PRODUCTS } from "../data/products.js";
import { useCart } from "../contexts/CartContext.jsx";
import { formatVND } from "../utils/format.js";
import "./Products.css";

export default function Products() {
  const { addItem } = useCart();
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return PRODUCTS;
    return PRODUCTS.filter((p) => p.name.toLowerCase().includes(needle) || p.tag.toLowerCase().includes(needle));
  }, [q]);

  return (
    <div className="page">
      <div className="container">
        <div className="pageHead">
          <div>
            <h1 className="pageTitle">Sản phẩm</h1>
            <div className="muted">Dữ liệu demo (local). Bạn có thể gắn API thật sau.</div>
          </div>

          <div className="searchWrap">
            <input
              className="input"
              placeholder="Tìm sản phẩm..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
        </div>

        <div className="productGrid">
          {list.map((p) => (
            <div className="pCard" key={p.id}>
              <div className="pTag">{p.tag}</div>
              <div className="pName">{p.name}</div>
              <div className="pMeta">
                ★ {p.rating.toFixed(1)} <span className="dot">·</span> Đã bán {p.sold}
              </div>

              <div className="pPriceRow">
                <div className="pPriceNow">{formatVND(p.price)}</div>
                <div className="pPriceOld">{formatVND(p.oldPrice)}</div>
              </div>

              <button className="btn btnPrimary" type="button" onClick={() => addItem(p)}>
                Thêm vào giỏ
              </button>
            </div>
          ))}
        </div>

        {list.length === 0 ? (
          <div className="empty">
            Không tìm thấy sản phẩm phù hợp với “{q}”.
          </div>
        ) : null}
      </div>
    </div>
  );
}
