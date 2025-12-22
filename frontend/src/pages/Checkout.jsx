import React, { useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext.jsx";
import { createOrder } from "../utils/ordersStore.js";
import { formatVND } from "../utils/format.js";
import "./Checkout.css";

export default function Checkout() {
  const { items, subtotal, clear } = useCart();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [payment, setPayment] = useState("COD");
  const [error, setError] = useState("");

  const shippingFee = useMemo(() => (subtotal > 0 ? 25000 : 0), [subtotal]);
  const total = useMemo(() => subtotal + shippingFee, [subtotal, shippingFee]);

  if (items.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  function validate() {
    if (!fullName.trim()) return "Vui lòng nhập họ tên";
    if (!phone.trim()) return "Vui lòng nhập số điện thoại";
    if (!address.trim()) return "Vui lòng nhập địa chỉ";
    return "";
  }

  function onSubmit(e) {
    e.preventDefault();
    setError("");

    const msg = validate();
    if (msg) {
      setError(msg);
      return;
    }

    const order = createOrder({
      items,
      shipping: { fullName, phone, address, note },
      payment,
      totals: { subtotal, shippingFee, total },
    });

    clear();
    navigate(`/orders/${order.id}`, { replace: true });
  }

  return (
    <div className="page">
      <div className="container">
        <div className="pageHead">
          <div>
            <h1 className="pageTitle">Đặt hàng</h1>
            <div className="muted">Điền thông tin giao hàng và xác nhận.</div>
          </div>
        </div>

        <div className="checkoutLayout">
          <form className="card formCard" onSubmit={onSubmit}>
            <h2 className="cardTitle">Thông tin giao hàng</h2>

            {error ? <div className="alert">{error}</div> : null}

            <label className="label">
              Họ tên
              <input className="input" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </label>

            <label className="label">
              Số điện thoại
              <input className="input" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </label>

            <label className="label">
              Địa chỉ
              <input className="input" value={address} onChange={(e) => setAddress(e.target.value)} />
            </label>

            <label className="label">
              Ghi chú (tuỳ chọn)
              <textarea
                className="textarea"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
              />
            </label>

            <div className="label">
              Thanh toán
              <div className="radioRow">
                <label className={payment === "COD" ? "radio active" : "radio"}>
                  <input
                    type="radio"
                    name="payment"
                    value="COD"
                    checked={payment === "COD"}
                    onChange={() => setPayment("COD")}
                  />
                  COD
                </label>

                <label className={payment === "BANK" ? "radio active" : "radio"}>
                  <input
                    type="radio"
                    name="payment"
                    value="BANK"
                    checked={payment === "BANK"}
                    onChange={() => setPayment("BANK")}
                  />
                  Chuyển khoản
                </label>
              </div>
            </div>

            <button className="btn btnPrimary" type="submit">
              Xác nhận đặt hàng
            </button>
          </form>

          <div className="card summaryCard">
            <h2 className="cardTitle">Tóm tắt đơn</h2>

            <div className="summaryList">
              {items.map((it) => (
                <div className="summaryItem" key={it.id}>
                  <div className="summaryLeft">
                    <div className="summaryName">{it.name}</div>
                    <div className="muted">x{it.qty}</div>
                  </div>
                  <div className="summaryRight">{formatVND(it.price * it.qty)}</div>
                </div>
              ))}
            </div>

            <div className="hr" />

            <div className="summaryRow">
              <span className="muted">Tạm tính</span>
              <span>{formatVND(subtotal)}</span>
            </div>
            <div className="summaryRow">
              <span className="muted">Phí ship</span>
              <span>{formatVND(shippingFee)}</span>
            </div>
            <div className="summaryRow total">
              <span>Tổng</span>
              <span>{formatVND(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
