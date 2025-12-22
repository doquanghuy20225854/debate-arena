import React from "react";
import { Link } from "react-router-dom";
import { PRODUCTS } from "../data/products.js";
import { useCart } from "../contexts/CartContext.jsx";
import { formatVND } from "../utils/format.js";
import "./Home.css";

export default function Home() {
  const { addItem } = useCart();

  const featured = PRODUCTS.slice(0, 3);
  const perks = [
    { title: "Giao nhanh", desc: "Nội thành 2h (tuỳ khu vực)", icon: "⚡" },
    { title: "Đổi trả 7 ngày", desc: "Nếu lỗi do NSX", icon: "🔁" },
    { title: "Thanh toán linh hoạt", desc: "COD, chuyển khoản, ví", icon: "💳" },
  ];

  return (
    <div className="page">
      <div className="container">
        <section className="hero">
          <div className="heroLeft">
            <div className="pill">Ưu đãi cuối tuần</div>

            <h1 className="heroTitle">Mua sắm tối giản, trải nghiệm hiện đại</h1>
            <p className="heroSub">
              Demo shop UI (dark mode). Đăng nhập, đăng ký, giỏ hàng, hoá đơn, đặt hàng, profile.
            </p>

            <div className="heroActions">
              <Link className="btn btnPrimary" to="/products">
                Xem sản phẩm
              </Link>
              <Link className="btn btnGhost" to="/cart">
                Giỏ hàng
              </Link>
            </div>

            <div className="heroStats">
              <div className="stat">
                <div className="statValue">1K+</div>
                <div className="statLabel">Sản phẩm</div>
              </div>
              <div className="stat">
                <div className="statValue">10K+</div>
                <div className="statLabel">Khách hàng</div>
              </div>
              <div className="stat">
                <div className="statValue">4.8/5</div>
                <div className="statLabel">Đánh giá</div>
              </div>
            </div>
          </div>

          <div className="heroRight">
            <div className="glassCard">
              <div className="cardKicker">Flash sale</div>
              <div className="cardTitle">Combo sạc GaN + cáp Type‑C</div>
              <div className="cardDesc">Giảm thêm khi mua kèm. Số lượng có hạn.</div>
              <div className="cardRow">
                <div className="priceBig">{formatVND(490000)}</div>
                <div className="priceOld">{formatVND(590000)}</div>
              </div>
              <button
                className="btn btnPrimary"
                type="button"
                onClick={() =>
                  addItem({
                    id: "deal-gan",
                    name: "Combo sạc GaN + cáp Type‑C",
                    price: 490000,
                    oldPrice: 590000,
                    tag: "Deal",
                  })
                }
              >
                Thêm vào giỏ
              </button>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="sectionHead">
            <h2 className="sectionTitle">Sản phẩm nổi bật</h2>
            <Link className="link" to="/products">
              Xem tất cả →
            </Link>
          </div>

          <div className="grid3">
            {featured.map((p) => (
              <div className="productCard" key={p.id}>
                <div className="productTop">
                  <div className="tag">{p.tag}</div>
                  <div className="rating">★ {p.rating.toFixed(1)}</div>
                </div>

                <div className="productName">{p.name}</div>
                <div className="productMeta">Đã bán {p.sold}</div>

                <div className="productPrice">
                  <div className="priceNow">{formatVND(p.price)}</div>
                  <div className="priceOld">{formatVND(p.oldPrice)}</div>
                </div>

                <button className="btn btnPrimary" type="button" onClick={() => addItem(p)}>
                  Thêm giỏ
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="perks">
          {perks.map((x) => (
            <div className="perk" key={x.title}>
              <div className="perkIcon">{x.icon}</div>
              <div className="perkTitle">{x.title}</div>
              <div className="perkDesc">{x.desc}</div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
