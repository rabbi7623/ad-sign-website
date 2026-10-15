import Link from "next/link";

export default function Header({ content }) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="logo">
          <div className="regmark">
            <div className="regmark-circle"></div>
          </div>
          <div className="logo-text">
            <span className="name en">{content.brand.name}</span>
            <span className="tag en">{content.brand.tagline}</span>
          </div>
        </Link>
        <nav className="nav-links">
          <Link href="/products">প্রোডাক্ট</Link>
          <Link href="/portfolio">পোর্টফোলিও</Link>
          <Link href="/about">আমাদের সম্পর্কে</Link>
          <Link href="/contact">যোগাযোগ</Link>
        </nav>
        <a href={`tel:${content.contact.phone1}`} className="call-btn en">
          ☎ {content.contact.phone1}
        </a>
      </div>
    </header>
  );
}
