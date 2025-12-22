import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import "./Auth.css";

export default function Register() {
  const { isAuthenticated, register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [okMsg, setOkMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) navigate("/", { replace: true });
  }, [isAuthenticated, navigate]);

  function validate() {
    if (!form.username.trim()) return "Vui lòng nhập username.";
    if (!form.email.trim()) return "Vui lòng nhập email.";
    if (form.password.length < 8) return "Mật khẩu tối thiểu 8 ký tự.";
    if (form.password !== form.confirm) return "Mật khẩu xác nhận không khớp.";
    return "";
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setOkMsg("");

    const msg = validate();
    if (msg) {
      setError(msg);
      return;
    }

    setLoading(true);
    const res = await register({
      firstName: form.firstName || undefined,
      lastName: form.lastName || undefined,
      username: form.username.trim(),
      email: form.email.trim(),
      password: form.password,
    });
    setLoading(false);

    if (!res.ok) {
      setError(res.message || "Đăng ký thất bại.");
      return;
    }

    setOkMsg("Đăng ký thành công. Đang chuyển sang đăng nhập...");
    setTimeout(() => navigate("/login", { replace: true }), 900);
  }

  return (
    <div className="authScreen">
      <div className="authCard">
        <div className="authBrand">
          <div className="brandMarkLg" />
          <div>
            <div className="authTitle">Đăng ký</div>
            <div className="authSub">Tạo tài khoản mới.</div>
          </div>
        </div>

        {error && <div className="authAlert">{error}</div>}
        {okMsg && <div className="authOk">{okMsg}</div>}

        <form className="authForm" onSubmit={onSubmit}>
          <label className="label">
            Username
            <input
              className="input"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
          </label>

          <label className="label">
            Email
            <input
              className="input"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </label>

          <label className="label">
            Mật khẩu
            <div className="pwRow">
              <input
                className="input"
                type={showPw ? "text" : "password"}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
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

          <label className="label">
            Xác nhận mật khẩu
            <input
              className="input"
              type={showPw ? "text" : "password"}
              value={form.confirm}
              onChange={(e) => setForm({ ...form, confirm: e.target.value })}
            />
          </label>

          <button className="btnPrimary" type="submit" disabled={loading}>
            {loading ? "Đang tạo..." : "Tạo tài khoản"}
          </button>

          <div className="authFoot">
            Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
