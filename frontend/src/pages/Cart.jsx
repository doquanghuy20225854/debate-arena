import React, { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext.jsx";
import { formatVND } from "../utils/format.js";
import "./Cart.css";

export default function Cart() {
  const { items, subtotal, setQty, removeItem } = useCart();
  const navigate = useNavigate();

  const shipping = useMemo(() => (subtotal > 0 ? 25000 : 0), [subtotal]);
  const total = useMemo(() => subtotal + shipping, [subtotal, shipping]);

  return (
    <div className="page">
      <div className="container">
        <div className="pageHead">
          <div>
            <h1 className="pageTitle">Giỏ hàng</h1>
            <div className="muted">Bạn có thể chỉnh số lượng và tiến hành đặt hàng.</div>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="emptyCart">
            <div className="emptyTitle">Giỏ hàng đang trống</div>
            <div className="muted">Hãy chọn vài sản phẩm để tiếp tục.</div>
            <Link className="btn btnPrimary" to="/products" style={{ marginTop: 12 }}>
              Đi tới trang sản phẩm
            </Link>
          </div>
        ) : (
          <div className="cartLayout">
            <div className="cartList">
              {items.map((it) => (
                <div className="cartItem" key={it.id}>
                  <div className="cartInfo">
                    <div className="cartName">{it.name}</div>
                    <div className="cartMeta">
                      <span className="chip">{it.tag}</span>
                      <span className="muted">· {formatVND(it.price)} / sản phẩm</span>
                    </div>
                  </div>

                  <div className="cartActions">
                    <input
                      className="qty"
                      type="number"
                      min="1"
                      value={it.qty}
                      onChange={(e) => setQty(it.id, e.target.value)}
                    />
                    <div className="cartLineTotal">{formatVND(it.price * it.qty)}</div>
                    <button className="btn btnDanger" type="button" onClick={() => removeItem(it.id)}>
                      Xoá
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cartSummary">
              <div className="summaryTitle">Tóm tắt</div>

              <div className="summaryRow">
                <span className="muted">Tạm tính</span>
                <span>{formatVND(subtotal)}</span>
              </div>

              <div className="summaryRow">
                <span className="muted">Phí ship</span>
                <span>{formatVND(shipping)}</span>
              </div>

              <div className="summaryRow total">
                <span>Tổng</span>
                <span>{formatVND(total)}</span>
              </div>

              <button className="btn btnPrimary" type="button" onClick={() => navigate("/checkout")}>
                Đặt hàng
              </button>

              <Link className="btn btnGhost" to="/products">
                Tiếp tục mua sắm
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
