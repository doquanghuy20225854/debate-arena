import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import { formatDateTime } from "../utils/format.js";
import "./Profile.css";

export default function Profile() {
  const { user, refreshMe, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  async function onRefresh() {
    setMsg("");
    setLoading(true);
    const res = await refreshMe();
    setLoading(false);
    setMsg(res.ok ? "Đã đồng bộ thông tin." : "Không thể đồng bộ (token có thể hết hạn).");
  }

  async function onLogout() {
    await logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="page">
      <div className="container">
        <div className="pageHead">
          <div>
            <h1 className="pageTitle">Profile</h1>
            <div className="muted">Thông tin tài khoản đang đăng nhập.</div>
          </div>

          <div className="rowActions">
            <button className="btn btnGhost" type="button" onClick={onRefresh} disabled={loading}>
              {loading ? "Đang tải..." : "Refresh"}
            </button>
            <button className="btn btnDanger" type="button" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>

        <div className="profileGrid">
          <div className="card">
            <h2 className="cardTitle">Thông tin</h2>

            {msg ? <div className="note">{msg}</div> : null}

            <div className="kv">
              <div className="k">Username</div>
              <div className="v">{user?.username}</div>
            </div>
            <div className="kv">
              <div className="k">Email</div>
              <div className="v">{user?.email}</div>
            </div>
            <div className="kv">
              <div className="k">Tên hiển thị</div>
              <div className="v">{user?.name || "—"}</div>
            </div>
            <div className="kv">
              <div className="k">Tạo lúc</div>
              <div className="v">{user?.createdAt ? formatDateTime(user.createdAt) : "—"}</div>
            </div>
          </div>

          <div className="card">
            <h2 className="cardTitle">Gợi ý</h2>
            <div className="muted" style={{ lineHeight: 1.6 }}>
              Backend hiện tại có các endpoint auth cơ bản. Nếu bạn muốn profile có thể cập nhật,
              bạn cần thêm API <code>/api/users/me</code> (PUT/PATCH) ở backend.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
