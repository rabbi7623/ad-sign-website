import { getPortfolio } from "@/lib/data";

export const metadata = { title: "পোর্টফোলিও — AD Sign" };

export default async function PortfolioPage() {
  const portfolio = await getPortfolio();

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <h1 className="display">আমাদের করা কাজ</h1>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          {portfolio.length === 0 ? (
            <p style={{ color: "var(--muted)" }}>
              এখনো কোনো ছবি যোগ করা হয়নি। Admin Panel থেকে ছবি আপলোড করুন।
            </p>
          ) : (
            <div className="portfolio-grid">
              {portfolio.map((item) => (
                <div className="portfolio-item" key={item._id}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.url} alt={item.caption || "Portfolio"} />
                  {item.caption && <div className="cap">{item.caption}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
    }
