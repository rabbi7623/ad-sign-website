"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [tab, setTab] = useState("content");
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="admin-shell">
      <div className="admin-header">
        <span className="display" style={{ fontSize: 18 }}>AD Sign Admin</span>
        <button className="btn-small" onClick={handleLogout} style={{ color: "white", borderColor: "white" }}>
          লগআউট
        </button>
      </div>
      <div className="admin-body">
        <div className="admin-tabs">
          <button className={`admin-tab ${tab === "content" ? "active" : ""}`} onClick={() => setTab("content")}>
            টেক্সট / কন্টেন্ট
          </button>
          <button className={`admin-tab ${tab === "products" ? "active" : ""}`} onClick={() => setTab("products")}>
            প্রোডাক্ট
          </button>
          <button className={`admin-tab ${tab === "portfolio" ? "active" : ""}`} onClick={() => setTab("portfolio")}>
            পোর্টফোলিও
          </button>
        </div>

        {tab === "content" && <ContentEditor />}
        {tab === "products" && <ProductsEditor />}
        {tab === "portfolio" && <PortfolioEditor />}
      </div>
    </div>
  );
}

function ContentEditor() {
  const [content, setContent] = useState(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/content")
      .then((r) => r.json())
      .then(setContent);
  }, []);

  function update(path, value) {
    setContent((prev) => {
      const next = structuredClone(prev);
      let obj = next;
      for (let i = 0; i < path.length - 1; i++) obj = obj[path[i]];
      obj[path[path.length - 1]] = value;
      return next;
    });
  }

  function updateArrayItem(arrKey, index, field, value) {
    setContent((prev) => {
      const next = structuredClone(prev);
      next[arrKey][index][field] = value;
      return next;
    });
  }

  function updateTagItem(index, value) {
    setContent((prev) => {
      const next = structuredClone(prev);
      next.targetTags[index] = value;
      return next;
    });
  }

  async function handleSave() {
    setSaving(true);
    setMsg("");
    const res = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    setSaving(false);
    setMsg(res.ok ? "সেভ হয়েছে ✓" : "সেভ করা যায়নি, আবার চেষ্টা করুন");
  }

  if (!content) return <p>লোড হচ্ছে...</p>;

  return (
    <div>
      <div className="admin-card">
        <h3>ব্র্যান্ড</h3>
        <div className="field-group">
          <label>বিজনেসের নাম</label>
          <input value={content.brand.name} onChange={(e) => update(["brand", "name"], e.target.value)} />
        </div>
        <div className="field-group">
          <label>ট্যাগলাইন</label>
          <input value={content.brand.tagline} onChange={(e) => update(["brand", "tagline"], e.target.value)} />
        </div>
      </div>

      <div className="admin-card">
        <h3>হোমপেজ হিরো সেকশন</h3>
        <div className="field-group">
          <label>ছোট লাইন (Eyebrow)</label>
          <input value={content.hero.eyebrow} onChange={(e) => update(["hero", "eyebrow"], e.target.value)} />
        </div>
        <div className="field-group">
          <label>হেডলাইন — প্রথম অংশ</label>
          <input value={content.hero.title} onChange={(e) => update(["hero", "title"], e.target.value)} />
        </div>
        <div className="field-group">
          <label>হেডলাইন — হাইলাইট করা অংশ (কমলা রঙে দেখাবে)</label>
          <input value={content.hero.titleAccent} onChange={(e) => update(["hero", "titleAccent"], e.target.value)} />
        </div>
        <div className="field-group">
          <label>হেডলাইন — শেষ অংশ</label>
          <input value={content.hero.titleEnd} onChange={(e) => update(["hero", "titleEnd"], e.target.value)} />
        </div>
        <div className="field-group">
          <label>সাব-টেক্সট</label>
          <textarea value={content.hero.sub} onChange={(e) => update(["hero", "sub"], e.target.value)} />
        </div>
        <div className="field-group">
          <label>মূল বাটনের লেখা</label>
          <input value={content.hero.ctaPrimary} onChange={(e) => update(["hero", "ctaPrimary"], e.target.value)} />
        </div>
        <div className="field-group">
          <label>দ্বিতীয় বাটনের লেখা</label>
          <input value={content.hero.ctaSecondary} onChange={(e) => update(["hero", "ctaSecondary"], e.target.value)} />
        </div>
      </div>

      <div className="admin-card">
        <h3>স্ট্যাট (৩টা সংখ্যা — Hero-এর নিচে)</h3>
        {content.stats.map((s, i) => (
          <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
            <input
              placeholder="সংখ্যা"
              value={s.num}
              onChange={(e) => updateArrayItem("stats", i, "num", e.target.value)}
              style={{ maxWidth: 100 }}
            />
            <input
              placeholder="লেবেল"
              value={s.label}
              onChange={(e) => updateArrayItem("stats", i, "label", e.target.value)}
            />
          </div>
        ))}
      </div>

      <div className="admin-card">
        <h3>Why Us (৩টা পয়েন্ট)</h3>
        {content.why.map((w, i) => (
          <div key={i} style={{ marginBottom: 16, paddingBottom: 12, borderBottom: "1px solid var(--line)" }}>
            <div className="field-group">
              <label>শিরোনাম</label>
              <input value={w.title} onChange={(e) => updateArrayItem("why", i, "title", e.target.value)} />
            </div>
            <div className="field-group">
              <label>বিবরণ</label>
              <textarea value={w.desc} onChange={(e) => updateArrayItem("why", i, "desc", e.target.value)} />
            </div>
          </div>
        ))}
      </div>

      <div className="admin-card">
        <h3>About টেক্সট</h3>
        <div className="field-group">
          <textarea
            style={{ minHeight: 140 }}
            value={content.about.text}
            onChange={(e) => update(["about", "text"], e.target.value)}
          />
        </div>
      </div>

      <div className="admin-card">
        <h3>Target Customer ট্যাগ</h3>
        {content.targetTags.map((t, i) => (
          <div className="field-group" key={i}>
            <input value={t} onChange={(e) => updateTagItem(i, e.target.value)} />
          </div>
        ))}
      </div>

      <div className="admin-card">
        <h3>যোগাযোগের তথ্য</h3>
        <div className="field-group">
          <label>ঠিকানা</label>
          <input value={content.contact.address} onChange={(e) => update(["contact", "address"], e.target.value)} />
        </div>
        <div className="field-group">
          <label>ফোন নম্বর ১</label>
          <input value={content.contact.phone1} onChange={(e) => update(["contact", "phone1"], e.target.value)} />
        </div>
        <div className="field-group">
          <label>ফোন নম্বর ২</label>
          <input value={content.contact.phone2} onChange={(e) => update(["contact", "phone2"], e.target.value)} />
        </div>
        <div className="field-group">
          <label>WhatsApp নম্বর (দেশের কোড সহ, যেমন 8801XXXXXXXXX)</label>
          <input value={content.contact.whatsapp} onChange={(e) => update(["contact", "whatsapp"], e.target.value)} />
        </div>
        <div className="field-group">
          <label>ইমেইল</label>
          <input value={content.contact.email} onChange={(e) => update(["contact", "email"], e.target.value)} />
        </div>
        <div className="field-group">
          <label>খোলার সময়</label>
          <input value={content.contact.hours} onChange={(e) => update(["contact", "hours"], e.target.value)} />
        </div>
      </div>

      <div className="admin-card">
        <h3>ফুটার টেক্সট</h3>
        <div className="field-group">
          <input value={content.footer.text} onChange={(e) => update(["footer", "text"], e.target.value)} />
        </div>
      </div>

      <button className="btn-primary" onClick={handleSave} disabled={saving}>
        {saving ? "সেভ হচ্ছে..." : "সব পরিবর্তন সেভ করুন"}
      </button>
      {msg && <div className="save-msg">{msg}</div>}
    </div>
  );
}

function ProductsEditor() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", spec: "", price: "" });
  const [editingId, setEditingId] = useState(null);
  const [msg, setMsg] = useState("");

  function load() {
    fetch("/api/products")
      .then((r) => r.json())
      .then(setProducts);
  }

  useEffect(load, []);

  async function handleAddOrUpdate(e) {
    e.preventDefault();
    if (!form.name || !form.price) return;

    if (editingId) {
      await fetch("/api/admin/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingId, ...form }),
      });
      setEditingId(null);
    } else {
      await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }
    setForm({ name: "", spec: "", price: "" });
    setMsg("সেভ হয়েছে ✓");
    load();
  }

  function startEdit(p) {
    setEditingId(p._id);
    setForm({ name: p.name, spec: p.spec, price: p.price });
  }

  async function handleDelete(id) {
    if (!confirm("এই প্রোডাক্টটি ডিলিট করতে চান?")) return;
    await fetch("/api/admin/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    load();
  }

  return (
    <div>
      <div className="admin-card">
        <h3>{editingId ? "প্রোডাক্ট এডিট করুন" : "নতুন প্রোডাক্ট যোগ করুন"}</h3>
        <form onSubmit={handleAddOrUpdate}>
          <div className="field-group">
            <label>প্রোডাক্টের নাম</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="field-group">
            <label>বিবরণ (সাইজ, ন্যূনতম অর্ডার ইত্যাদি)</label>
            <input value={form.spec} onChange={(e) => setForm({ ...form, spec: e.target.value })} />
          </div>
          <div className="field-group">
            <label>দাম (৳ প্রতি পিস)</label>
            <input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
          </div>
          <button className="btn-primary" type="submit">
            {editingId ? "আপডেট করুন" : "যোগ করুন"}
          </button>
          {editingId && (
            <button
              type="button"
              className="btn-small"
              style={{ marginLeft: 10 }}
              onClick={() => {
                setEditingId(null);
                setForm({ name: "", spec: "", price: "" });
              }}
            >
              বাতিল
            </button>
          )}
        </form>
        {msg && <div className="save-msg">{msg}</div>}
      </div>

      <div className="admin-card">
        <h3>বর্তমান প্রোডাক্ট তালিকা</h3>
        {products.map((p) => (
          <div className="product-row-admin" key={p._id}>
            <div style={{ flex: 1, minWidth: 150 }}>
              <strong>{p.name}</strong>
              <div style={{ fontSize: 13, color: "var(--muted)" }}>{p.spec}</div>
            </div>
            <div className="en" style={{ fontWeight: 700 }}>৳{p.price}</div>
            <button className="btn-small" onClick={() => startEdit(p)}>এডিট</button>
            <button className="btn-small danger" onClick={() => handleDelete(p._id)}>ডিলিট</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function PortfolioEditor() {
  const [items, setItems] = useState([]);
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);

  function load() {
    fetch("/api/portfolio")
      .then((r) => r.json())
      .then(setItems);
  }

  useEffect(load, []);

  async function handleUpload(e) {
    e.preventDefault();
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("caption", caption);
    await fetch("/api/admin/upload", { method: "POST", body: formData });
    setUploading(false);
    setFile(null);
    setCaption("");
    load();
  }

  async function handleDelete(id) {
    if (!confirm("এই ছবিটি ডিলিট করতে চান?")) return;
    await fetch("/api/admin/portfolio", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    load();
  }

  return (
    <div>
      <div className="admin-card">
        <h3>নতুন ছবি আপলোড করুন</h3>
        <form onSubmit={handleUpload}>
          <div className="field-group">
            <label>ছবি বাছাই করুন</label>
            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
          </div>
          <div className="field-group">
            <label>ক্যাপশন (ঐচ্ছিক)</label>
            <input value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="যেমন: BASECAMP School Banner" />
          </div>
          <button className="btn-primary" type="submit" disabled={uploading || !file}>
            {uploading ? "আপলোড হচ্ছে..." : "আপলোড করুন"}
          </button>
        </form>
      </div>

      <div className="admin-card">
        <h3>বর্তমান ছবি ({items.length})</h3>
        <div className="portfolio-grid">
          {items.map((item) => (
            <div className="portfolio-item" key={item._id}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.url} alt={item.caption || "Portfolio"} />
              <div className="cap" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>{item.caption || "—"}</span>
                <button className="btn-small danger" onClick={() => handleDelete(item._id)}>
                  ডিলিট
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
