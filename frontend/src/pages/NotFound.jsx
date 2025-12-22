import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="page">
      <div className="container">
        <div className="empty">
          <div className="emptyTitle">404</div>
          <div className="muted">Trang không tồn tại.</div>
          <Link className="btn btnPrimary" to="/" style={{ marginTop: 12 }}>
            Về Home
          </Link>
        </div>
      </div>
    </div>
  );
}
