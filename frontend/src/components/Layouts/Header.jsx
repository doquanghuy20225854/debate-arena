import React, { useMemo, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext.jsx";
import UserMenu from "./UserMenu.jsx";
import "./Header.css";

function Icon({ children }) {
  return (
    <span className="navIcon" aria-hidden>
      {children}
    </span>
  );
}

export default function Header() {
  const { count } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const cartBadge = useMemo(() => (count > 99 ? "99+" : String(count)), [count]);

  return (
    <header className="header">
      <div className="container headerInner">
        <div className="headerLeft">
          <button
            className="burger"
            type="button"
            aria-label="Menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            ☰
          </button>

          <Link className="brand" to="/">
            <span className="brandMark">◼</span>
            <span className="brandText">Shop Dark</span>
          </Link>

          <nav className={mobileOpen ? "nav navOpen" : "nav"}>
            <NavLink to="/" className={({ isActive }) => (isActive ? "navLink active" : "navLink")} end>
              <Icon>🏠</Icon> Home
            </NavLink>

            <NavLink
              to="/products"
              className={({ isActive }) => (isActive ? "navLink active" : "navLink")}
            >
              <Icon>🛍</Icon> Sản phẩm
            </NavLink>

            <NavLink to="/cart" className={({ isActive }) => (isActive ? "navLink active" : "navLink")}>
              <Icon>🛒</Icon> Giỏ hàng
              {count > 0 ? <span className="badge">{cartBadge}</span> : null}
            </NavLink>

            <NavLink
              to="/orders"
              className={({ isActive }) => (isActive ? "navLink active" : "navLink")}
            >
              <Icon>🧾</Icon> Hóa đơn
            </NavLink>
          </nav>
        </div>

        <div className="headerRight">
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
