import Link from "next/link";
import { getContent, getProducts, getPortfolio } from "@/lib/data";

export default async function Home() {
  const content = await getContent();
  const products = await getProducts();
  const portfolio = await getPortfolio();
  const { hero, stats, why, about, targetTags, contact } = content;

  return (
    <>
      <section className="hero">
        <div className="hero-corner tl regmark" style={{ width: 16, height: 16 }}>
          <div className="regmark-circle" style={{ width: 8, height: 8 }}></div>
        </div>
        <div className="hero-corner br regmark" style={{ width: 16, height: 16 }}>
          <div className="regmark-circle" style={{ width: 8, height: 8 }}></div>
        </div>
        <div className="wrap">
          <div className="hero-eyebrow">
            <span className="dot"></span>
            {hero.eyebrow}
          </div>
          <h1 className="hero-title">
            {hero.title} <span className="accent">{hero.titleAccent}</span> {hero.titleEnd}
          </h1>
          <p className="hero-sub">{hero.sub}</p>
          <div className="hero-ctas">
            <a href={`https://wa.me/${contact.whatsapp}`} className="btn-primary">
              {hero.ctaPrimary}
            </a>
            <a href="#products" className="btn-secondary">
              {hero.ctaSecondary}
            </a>
          </div>
          <div className="stat-strip">
            {stats.map((s, i) => (
              <div className="stat" key={i}>
                <div className="num en">{s.num}</div>
                <div className="label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="products">
        <div className="wrap">
          <div className="section-head">
            <div className="section-label en">PRODUCTS &amp; PRICING</div>
            <h2 className="section-title">প্রোডাক্ট ও দাম</h2>
          </div>
          <div className="services-list">
            {products.map((p) => (
              <div className="service-row" key={p._id}>
                <div className="sname">{p.name}</div>
                <div className="sspec">{p.spec}</div>
                <div className="sprice en">৳{p.price} / পিস</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section why-band">
        <div className="wrap">
          <div className="section-head">
            <div className="section-label en">WHY AD SIGN</div>
            <h2 className="section-title">কেন আমাদের বেছে নেবেন</h2>
          </div>
          <div className="why-grid">
            {why.map((w, i) => (
              <div className="why-item" key={i}>
                <div className="regmark">
                  <div className="regmark-circle"></div>
                </div>
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div className="section-label en">ABOUT US</div>
            <h2 className="section-title">{content.brand.name} সম্পর্কে</h2>
          </div>
          <div className="about-text">
            <p>{about.text}</p>
          </div>
          <div className="tag-row">
            {targetTags.map((t, i) => (
              <span className="tag-pill" key={i}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {portfolio.length > 0 && (
        <section className="section">
          <div className="wrap">
            <div className="section-head">
              <div className="section-label en">PORTFOLIO</div>
              <h2 className="section-title">আগের কিছু কাজ</h2>
            </div>
            <div className="portfolio-grid">
              {portfolio.slice(0, 6).map((item) => (
                <div className="portfolio-item" key={item._id}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.url} alt={item.caption || "Portfolio"} />
                  {item.caption && <div className="cap">{item.caption}</div>}
                </div>
              ))}
            </div>
            <div style={{ marginTop: 20 }}>
              <Link href="/portfolio" className="btn-secondary">
                সব কাজ দেখুন
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="contact-band">
        <div className="wrap section">
          <h2 className="display">এখনই অর্ডার করুন</h2>
          <p className="sub">
            কোটেশন লাগবে বা সরাসরি অর্ডার করতে চান — হোয়াটসঅ্যাপে মেসেজ দিন, দ্রুত রিপ্লাই পাবেন।
          </p>
          <a href={`https://wa.me/${contact.whatsapp}`} className="btn-primary">
            হোয়াটসঅ্যাপে মেসেজ করুন
          </a>
          <div className="contact-info en">
            <div>
              <div className="clabel">ADDRESS</div>
              {contact.address}
            </div>
            <div>
              <div className="clabel">PHONE</div>
              {contact.phone1}, {contact.phone2}
            </div>
            <div>
              <div className="clabel">EMAIL</div>
              {contact.email}
            </div>
            <div>
              <div className="clabel">HOURS</div>
              {contact.hours}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
