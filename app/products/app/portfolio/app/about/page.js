import { getContent } from "@/lib/data";

export const metadata = { title: "আমাদের সম্পর্কে — AD Sign" };

export default async function AboutPage() {
  const content = await getContent();
  const { about, targetTags, why } = content;

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <h1 className="display">{content.brand.name} সম্পর্কে</h1>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
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
      <section className="section why-band">
        <div className="wrap">
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
    </>
  );
  }
