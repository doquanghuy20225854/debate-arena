import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import "./Auth.css";

export default function Login() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) navigate("/", { replace: true });
  }, [isAuthenticated, navigate]);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");

    if (!identifier.trim() || !password) {
      setError("Vui lòng nhập username/email và mật khẩu.");
      return;
    }

    setLoading(true);
    const res = await login(identifier.trim(), password);
    setLoading(false);

    if (!res.ok) {
      setError(res.message || "Đăng nhập thất bại.");
      return;
    }

    navigate(location.state?.from || "/", { replace: true });
  }

  return (
    <div className="authScreen">
      <div className="authCard">
        <div className="authBrand">
          <div className="brandMarkLg" />
          <div>
            <div className="authTitle">Đăng nhập</div>
            <div className="authSub">Chào mừng bạn quay lại.</div>
          </div>
        </div>

        {error && <div className="authAlert">{error}</div>}

        <form className="authForm" onSubmit={onSubmit}>
          <label className="label">
            Username hoặc Email
            <input
              className="input"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              autoComplete="username"
              placeholder="vd: dohieu123 hoặc a@gmail.com"
            />
          </label>

          <label className="label">
            Mật khẩu
            <div className="pwRow">
              <input
                className="input"
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                placeholder="••••••••"
              />
              <button
                type="button"
                className="pwBtn"
                onClick={() => setShowPw(v => !v)}
              >
                {showPw ? "Ẩn" : "Hiện"}
              </button>
            </div>
          </label>

          <button className="btnPrimary" type="submit" disabled={loading}>
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>

          <div className="authFoot">
            Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
