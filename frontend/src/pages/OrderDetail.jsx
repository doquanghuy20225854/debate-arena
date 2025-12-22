import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { getOrderById } from "../utils/ordersStore.js";
import { formatDateTime, formatVND } from "../utils/format.js";
import "./OrderDetail.css";

export default function OrderDetail() {
  const { id } = useParams();

  const order = useMemo(() => getOrderById(id), [id]);

  if (!order) {
    return (
      <div className="page">
        <div className="container">
          <div className="empty">
            <div className="emptyTitle">Không tìm thấy hoá đơn</div>
            <div className="muted">Mã: {id}</div>
            <Link className="btn btnPrimary" to="/orders" style={{ marginTop: 12 }}>
              Quay lại danh sách
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        <div className="detailHead">
          <div>
            <h1 className="pageTitle">Hóa đơn {order.id}</h1>
            <div className="muted">Tạo lúc {formatDateTime(order.createdAt)}</div>
          </div>

          <Link className="btn btnGhost" to="/orders">
            ← Danh sách hóa đơn
          </Link>
        </div>

        <div className="detailGrid">
          <div className="card">
            <h2 className="cardTitle">Sản phẩm</h2>

            <div className="items">
              {order.items.map((it) => (
                <div className="it" key={it.id}>
                  <div className="itLeft">
                    <div className="itName">{it.name}</div>
                    <div className="muted">x{it.qty}</div>
                  </div>
                  <div className="itRight">{formatVND(it.price * it.qty)}</div>
                </div>
              ))}
            </div>

            <div className="hr" />

            <div className="sumRow">
              <span className="muted">Tạm tính</span>
              <span>{formatVND(order.totals?.subtotal)}</span>
            </div>
            <div className="sumRow">
              <span className="muted">Phí ship</span>
              <span>{formatVND(order.totals?.shippingFee)}</span>
            </div>
            <div className="sumRow total">
              <span>Tổng</span>
              <span>{formatVND(order.totals?.total)}</span>
            </div>
          </div>

          <div className="card">
            <h2 className="cardTitle">Giao hàng</h2>

            <div className="kv">
              <div className="k">Họ tên</div>
              <div className="v">{order.shipping?.fullName}</div>
            </div>
            <div className="kv">
              <div className="k">SĐT</div>
              <div className="v">{order.shipping?.phone}</div>
            </div>
            <div className="kv">
              <div className="k">Địa chỉ</div>
              <div className="v">{order.shipping?.address}</div>
            </div>
            {order.shipping?.note ? (
              <div className="kv">
                <div className="k">Ghi chú</div>
                <div className="v">{order.shipping?.note}</div>
              </div>
            ) : null}

            <div className="hr" />

            <div className="kv">
              <div className="k">Thanh toán</div>
              <div className="v">{order.payment === "COD" ? "COD" : "Chuyển khoản"}</div>
            </div>
            <div className="kv">
              <div className="k">Trạng thái</div>
              <div className="v">{order.status}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
