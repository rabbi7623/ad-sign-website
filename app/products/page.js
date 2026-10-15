import { getProducts, getContent } from "@/lib/data";

export const metadata = { title: "প্রোডাক্ট ও দাম — AD Sign" };

export default async function ProductsPage() {
  const products = await getProducts();
  const content = await getContent();

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <h1 className="display">প্রোডাক্ট ও দাম</h1>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="services-list">
            {products.map((p) => (
              <div className="service-row" key={p._id}>
                <div className="sname">{p.name}</div>
                <div className="sspec">{p.spec}</div>
                <div className="sprice en">৳{p.price} / পিস</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 28 }}>
            <a href={`https://wa.me/${content.contact.whatsapp}`} className="btn-primary">
              কোটেশনের জন্য হোয়াটসঅ্যাপে মেসেজ করুন
            </a>
          </div>
        </div>
      </section>
    </>
  );
    }
