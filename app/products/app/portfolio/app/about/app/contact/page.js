import { getContent } from "@/lib/data";

export const metadata = { title: "যোগাযোগ — AD Sign" };

export default async function ContactPage() {
  const content = await getContent();
  const { contact } = content;

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <h1 className="display">যোগাযোগ করুন</h1>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="about-text" style={{ marginBottom: 28 }}>
            <p>
              অর্ডার বা কোটেশনের জন্য সরাসরি হোয়াটসঅ্যাপে মেসেজ দিন — দ্রুত রিপ্লাই পাবেন।
            </p>
          </div>
          <a href={`https://wa.me/${contact.whatsapp}`} className="btn-primary" style={{ marginBottom: 32 }}>
            হোয়াটসঅ্যাপে মেসেজ করুন
          </a>
          <div className="contact-info en" style={{ borderTop: "1px solid var(--line)", color: "var(--ink)" }}>
            <div>
              <div className="clabel" style={{ color: "var(--muted)" }}>ADDRESS</div>
              {contact.address}
            </div>
            <div>
              <div className="clabel" style={{ color: "var(--muted)" }}>PHONE</div>
              {contact.phone1}, {contact.phone2}
            </div>
            <div>
              <div className="clabel" style={{ color: "var(--muted)" }}>EMAIL</div>
              {contact.email}
            </div>
            <div>
              <div className="clabel" style={{ color: "var(--muted)" }}>HOURS</div>
              {contact.hours}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
