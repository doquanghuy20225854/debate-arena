import { useEffect, useMemo, useState } from "react";
import Skeleton from "../../components/ui/Skeleton";
import { sellerApi } from "../../api/seller";
import { formatDateTime, formatVnd } from "../../utils/format";

import "./SellerReturns.css";

function Badge({ status }) {
  const map = {
    REQUESTED: "badge badge--warning",
    APPROVED: "badge badge--success",
    REJECTED: "badge badge--danger",
    RECEIVED: "badge",
    CLOSED: "badge",
  };
  return <span className={map[status] || "badge"}>{status}</span>;
}

function ReturnsModal({ open, title, onClose, children, footer }) {
  if (!open) return null;
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={title || "Modal"}>
      <div className="modal seller-returns__modal">
        <div className="modal__header">
          <div className="modal__title">{title}</div>
          <button className="btn btn-ghost" onClick={onClose} aria-label="Đóng" type="button">
            Đóng
          </button>
        </div>
        <div className="modal__body">{children}</div>
        {footer ? <div className="modal__footer">{footer}</div> : null}
      </div>
    </div>
  );
}

export default function SellerReturns() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);

  const [filter, setFilter] = useState("ALL");

  // Approve modal
  const [approveOpen, setApproveOpen] = useState(false);
  const [approveTarget, setApproveTarget] = useState(null);
  const [approveSubmitting, setApproveSubmitting] = useState(false);

  const [resolution, setResolution] = useState("BUYER_FAULT");
  const [shippingPayer, setShippingPayer] = useState("BUYER");
  const [restockingFee, setRestockingFee] = useState(0);
  const [refundAmount, setRefundAmount] = useState(0);
  const [decisionNote, setDecisionNote] = useState("");

  // Reject modal
  const [rejectOpen, setRejectOpen] = useState(false);
  const [rejectTarget, setRejectTarget] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const [rejectSubmitting, setRejectSubmitting] = useState(false);

  const filtered = useMemo(() => {
    if (filter === "ALL") return items;
    return items.filter((x) => x.status === filter);
  }, [items, filter]);

  async function load() {
    try {
      setLoading(true);
      setError(null);
      const res = await sellerApi.listReturnRequests();
      if (!res?.success) throw new Error(res?.message || "Không tải được yêu cầu hoàn/đổi");
      setItems(res.data || []);
    } catch (e) {
      setError(e?.message || "Không tải được yêu cầu hoàn/đổi");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function openApprove(rr) {
    setApproveTarget(rr);

    const guessType = String(rr.requestType || "").toUpperCase();
    const isSellerFault = ["DEFECTIVE", "WRONG_ITEM", "NOT_AS_DESCRIBED"].includes(guessType);

    const defaultResolution = isSellerFault ? "SELLER_FAULT" : "BUYER_FAULT";
    setResolution(defaultResolution);
    setShippingPayer(isSellerFault ? "SELLER" : "BUYER");

    const orderTotal = Number(rr.order?.total || 0);
    const suggestedFee = isSellerFault ? 0 : Math.min(Math.round(orderTotal * 0.05), 50000);
    setRestockingFee(suggestedFee);
    setRefundAmount(Math.max(0, orderTotal - suggestedFee));

    setDecisionNote(rr.decisionNote || "");
    setApproveOpen(true);
  }

  function openReject(rr) {
    setRejectTarget(rr);
    setRejectReason(rr.decisionNote || "");
    setRejectOpen(true);
  }

  async function submitApprove() {
    if (!approveTarget) return;
    setApproveSubmitting(true);
    try {
      const orderCode = approveTarget.order?.code;
      const total = Number(approveTarget.order?.total || 0);
      const fee = Math.max(0, Number(restockingFee || 0));
      const amt = Math.max(0, Math.min(total, Number(refundAmount || 0)));

      const res = await sellerApi.approveReturn(orderCode, {
        resolution,
        shippingPayer,
        restockingFee: fee,
        refundAmount: amt,
        decisionNote: decisionNote.trim() || undefined,
      });
      if (!res?.success) throw new Error(res?.message || "Không duyệt được yêu cầu");
      setApproveOpen(false);
      await load();
    } catch (e) {
      alert(e?.message || "Không duyệt được yêu cầu");
    } finally {
      setApproveSubmitting(false);
    }
  }

  async function submitReject() {
    if (!rejectTarget) return;
    const reason = rejectReason.trim();
    if (reason.length < 3) {
      alert("Vui lòng nhập lý do (tối thiểu 3 ký tự)");
      return;
    }
    setRejectSubmitting(true);
    try {
      const orderCode = rejectTarget.order?.code;
      const res = await sellerApi.rejectReturn(orderCode, reason);
      if (!res?.success) throw new Error(res?.message || "Không từ chối được yêu cầu");
      setRejectOpen(false);
      await load();
    } catch (e) {
      alert(e?.message || "Không từ chối được yêu cầu");
    } finally {
      setRejectSubmitting(false);
    }
  }

  async function markReceived(rr) {
    if (!window.confirm("Xác nhận shop đã nhận được hàng hoàn và xử lý hoàn tiền?")) return;
    try {
      const res = await sellerApi.markReturnReceived(rr.order?.code);
      if (!res?.success) throw new Error(res?.message || "Không cập nhật được");
      await load();
    } catch (e) {
      alert(e?.message || "Không cập nhật được");
    }
  }

  return (
    <section className="seller-returns">
      <header className="seller-returns__header">
        <div>
          <h1 className="seller-returns__title">Trả hàng / Hoàn tiền</h1>
          <p className="seller-returns__subtitle muted">Duyệt yêu cầu, áp dụng chính sách hoàn tiền và xác nhận nhận hàng.</p>
        </div>
        <button className="btn-secondary" onClick={load} disabled={loading} type="button">
          Làm mới
        </button>
      </header>

      <div className="seller-returns__filters" role="tablist" aria-label="Return request filters">
        {[
          ["ALL", "Tất cả"],
          ["REQUESTED", "Chờ xử lý"],
          ["APPROVED", "Đã duyệt"],
          ["REJECTED", "Đã từ chối"],
          ["RECEIVED", "Đã nhận"],
        ].map(([k, label]) => (
          <button
            key={k}
            type="button"
            className={"seller-returns__pill " + (filter === k ? "seller-returns__pill--active" : "")}
            onClick={() => setFilter(k)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="card seller-returns__card">
        {loading ? (
          <div className="seller-returns__loading">
            <Skeleton style={{ height: 16, width: 220 }} />
            <Skeleton style={{ height: 48, width: "100%", marginTop: 10 }} />
            <Skeleton style={{ height: 48, width: "100%", marginTop: 10 }} />
            <Skeleton style={{ height: 48, width: "100%", marginTop: 10 }} />
          </div>
        ) : error ? (
          <div className="alert alert--danger">{error}</div>
        ) : !filtered.length ? (
          <div className="seller-returns__empty">Chưa có yêu cầu nào.</div>
        ) : (
          <div className="seller-returns__tableWrap">
            <table className="table table--tiki seller-returns__table">
              <thead>
                <tr>
                  <th>Mã đơn</th>
                  <th>Khách</th>
                  <th>Loại</th>
                  <th>Lý do</th>
                  <th>Tổng</th>
                  <th>Trạng thái</th>
                  <th className="seller-returns__thRight">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((rr) => (
                  <tr key={rr.id}>
                    <td>
                      <div className="seller-returns__code">{rr.order?.code}</div>
                      <div className="seller-returns__date muted">{formatDateTime(rr.createdAt)}</div>
                    </td>
                    <td>{rr.user?.username || rr.userId}</td>
                    <td className="muted">{rr.requestType || "—"}</td>
                    <td className="muted">
                      <div className="seller-returns__clamp">{rr.reason}</div>
                      {rr.decisionNote ? <div className="seller-returns__note">📝 {rr.decisionNote}</div> : null}
                    </td>
                    <td className="seller-returns__total">{formatVnd(rr.order?.total || 0)}</td>
                    <td>
                      <Badge status={rr.status} />
                    </td>
                    <td className="seller-returns__tdRight">
                      <div className="seller-returns__rowActions">
                        {rr.status === "REQUESTED" ? (
                          <>
                            <button className="btn btn-sm" onClick={() => openApprove(rr)} type="button">
                              Duyệt
                            </button>
                            <button className="btn-secondary btn-sm" onClick={() => openReject(rr)} type="button">
                              Từ chối
                            </button>
                          </>
                        ) : null}
                        {rr.status === "APPROVED" ? (
                          <button className="btn btn-sm" onClick={() => markReceived(rr)} type="button">
                            Đã nhận hàng
                          </button>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ReturnsModal
        open={approveOpen}
        title={approveTarget ? `Duyệt hoàn/đổi: ${approveTarget.order?.code}` : "Duyệt hoàn/đổi"}
        onClose={() => (approveSubmitting ? null : setApproveOpen(false))}
        footer={
          <div className="seller-returns__modalActions">
            <button className="btn-secondary" disabled={approveSubmitting} onClick={() => setApproveOpen(false)} type="button">
              Hủy
            </button>
            <button className="btn" disabled={approveSubmitting} onClick={submitApprove} type="button">
              {approveSubmitting ? "Đang lưu..." : "Xác nhận duyệt"}
            </button>
          </div>
        }
      >
        <div className="seller-returns__form">
          <div className="seller-returns__field">
            <div className="seller-returns__subLabel muted">Trách nhiệm</div>
            <select className="select" value={resolution} onChange={(e) => setResolution(e.target.value)}>
              <option value="BUYER_FAULT">Khách đổi ý / Không lỗi shop</option>
              <option value="SELLER_FAULT">Shop giao sai / Hàng lỗi / Không đúng mô tả</option>
            </select>
            <div className="seller-returns__hint muted">Gợi ý: nếu khách đổi ý, có thể áp dụng phí hoàn hàng để tránh shop chịu thiệt.</div>
          </div>

          <div className="seller-returns__field">
            <div className="seller-returns__subLabel muted">Ai trả phí vận chuyển hoàn</div>
            <select className="select" value={shippingPayer} onChange={(e) => setShippingPayer(e.target.value)}>
              <option value="BUYER">Khách hàng</option>
              <option value="SELLER">Shop</option>
            </select>
          </div>

          <div className="seller-returns__grid2">
            <div className="seller-returns__field">
              <div className="seller-returns__subLabel muted">Phí xử lý/khấu trừ (VND)</div>
              <input className="input" type="number" min={0} value={restockingFee} onChange={(e) => setRestockingFee(Number(e.target.value))} />
            </div>
            <div className="seller-returns__field">
              <div className="seller-returns__subLabel muted">Số tiền hoàn (VND)</div>
              <input className="input" type="number" min={0} value={refundAmount} onChange={(e) => setRefundAmount(Number(e.target.value))} />
            </div>
          </div>

          <div className="seller-returns__field">
            <div className="seller-returns__subLabel muted">Ghi chú</div>
            <textarea className="textarea seller-returns__textarea" rows={3} value={decisionNote} onChange={(e) => setDecisionNote(e.target.value)} placeholder="Ví dụ: chấp nhận hoàn theo chính sách đổi ý, khấu trừ phí xử lý..." />
          </div>
        </div>
      </ReturnsModal>

      <ReturnsModal
        open={rejectOpen}
        title={rejectTarget ? `Từ chối yêu cầu: ${rejectTarget.order?.code}` : "Từ chối yêu cầu"}
        onClose={() => (rejectSubmitting ? null : setRejectOpen(false))}
        footer={
          <div className="seller-returns__modalActions">
            <button className="btn-secondary" disabled={rejectSubmitting} onClick={() => setRejectOpen(false)} type="button">
              Hủy
            </button>
            <button className="btn" disabled={rejectSubmitting} onClick={submitReject} type="button">
              {rejectSubmitting ? "Đang gửi..." : "Xác nhận từ chối"}
            </button>
          </div>
        }
      >
        <div className="seller-returns__form">
          <div className="seller-returns__subLabel muted">Lý do từ chối</div>
          <textarea className="textarea seller-returns__textarea" rows={4} value={rejectReason} onChange={(e) => setRejectReason(e.target.value)} placeholder="Ví dụ: quá thời hạn trả hàng, thiếu bằng chứng, sản phẩm đã qua sử dụng..." />
        </div>
      </ReturnsModal>
    </section>
  );
}
