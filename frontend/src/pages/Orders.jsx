import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { listOrders, clearOrders } from "../utils/ordersStore.js";
import { formatDateTime, formatVND } from "../utils/format.js";
import "./Orders.css";

function statusLabel(s) {
  if (s === "NEW") return { text: "Mới", cls: "status new" };
  if (s === "PAID") return { text: "Đã thanh toán", cls: "status paid" };
  if (s === "SHIPPED") return { text: "Đang giao", cls: "status shipped" };
  if (s === "DONE") return { text: "Hoàn tất", cls: "status done" };
  return { text: s, cls: "status" };
}

export default function Orders() {
  const [seed, setSeed] = useState(0);

  const orders = useMemo(() => listOrders(), [seed]);

  function onClear() {
    if (!confirm("Xoá toàn bộ hoá đơn demo (localStorage)?")) return;
    clearOrders();
    setSeed((n) => n + 1);
  }

  return (
    <div className="page">
      <div className="container">
        <div className="pageHead">
          <div>
            <h1 className="pageTitle">Hóa đơn</h1>
            <div className="muted">Danh sách đơn hàng (lưu localStorage).</div>
          </div>

          {orders.length > 0 ? (
            <button className="btn btnGhost" type="button" onClick={onClear}>
              Xoá toàn bộ
            </button>
          ) : null}
        </div>

        {orders.length === 0 ? (
          <div className="empty">
            <div className="emptyTitle">Chưa có hóa đơn</div>
            <div className="muted">Hãy đặt hàng từ giỏ để tạo hoá đơn.</div>
            <Link className="btn btnPrimary" to="/products" style={{ marginTop: 12 }}>
              Mua sắm ngay
            </Link>
          </div>
        ) : (
          <div className="ordersTable">
            <div className="row head">
              <div>Mã</div>
              <div>Thời gian</div>
              <div>Trạng thái</div>
              <div style={{ textAlign: "right" }}>Tổng</div>
              <div />
            </div>

            {orders.map((o) => {
              const st = statusLabel(o.status);
              return (
                <div className="row" key={o.id}>
                  <div className="mono">{o.id}</div>
                  <div className="muted">{formatDateTime(o.createdAt)}</div>
                  <div>
                    <span className={st.cls}>{st.text}</span>
                  </div>
                  <div className="price">{formatVND(o.totals?.total)}</div>
                  <div style={{ textAlign: "right" }}>
                    <Link className="btn btnSmall" to={`/orders/${o.id}`}>
                      Xem
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
