import { getDb } from "./mongodb";
import { defaultContent } from "./defaultContent";

const defaultProducts = [
  { name: "পিভিসি ব্যানার", spec: "সাইজ ৩৬×২১ ইঞ্চি · ন্যূনতম অর্ডার ১০০ পিস · বর্গফুট অনুযায়ী কাটা হয়", price: "85", order: 0 },
  { name: "টিস্যু ব্যানার", spec: "সাইজ ৩৬×২১ ইঞ্চি · ন্যূনতম অর্ডার ১২ পিস", price: "40", order: 1 },
  { name: "নেমপ্লেট / গেট বোর্ড", spec: "সাইজ ৮×১২ ইঞ্চি · ন্যূনতম অর্ডার ১০০ পিস", price: "50", order: 2 },
  { name: "রিফ্লেক্টিভ স্টিকার", spec: "সাইজ ১২×৬ ইঞ্চি · ন্যূনতম অর্ডার ১০০ পিস", price: "25", order: 3 },
];

/* ---------- CONTENT (হেডলাইন, About, Contact info ইত্যাদি সব টেক্সট) ---------- */

export async function getContent() {
  const db = await getDb();
  const doc = await db.collection("content").findOne({ _id: "site" });
  if (!doc) return defaultContent;
  return { ...defaultContent, ...doc };
}

export async function updateContent(newContent) {
  const db = await getDb();
  await db
    .collection("content")
    .updateOne({ _id: "site" }, { $set: newContent }, { upsert: true });
  return getContent();
}

/* ---------- PRODUCTS ---------- */

export async function getProducts() {
  const db = await getDb();
  const count = await db.collection("products").countDocuments();
  if (count === 0) {
    await db.collection("products").insertMany(defaultProducts);
  }
  const products = await db
    .collection("products")
    .find({})
    .sort({ order: 1 })
    .toArray();
  return JSON.parse(JSON.stringify(products));
}

export async function addProduct(product) {
  const db = await getDb();
  const count = await db.collection("products").countDocuments();
  const result = await db.collection("products").insertOne({
    name: product.name,
    spec: product.spec,
    price: product.price,
    order: count,
  });
  return result.insertedId;
}

export async function updateProduct(id, product) {
  const { ObjectId } = await import("mongodb");
  const db = await getDb();
  await db.collection("products").updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        name: product.name,
        spec: product.spec,
        price: product.price,
      },
    }
  );
}

export async function deleteProduct(id) {
  const { ObjectId } = await import("mongodb");
  const db = await getDb();
  await db.collection("products").deleteOne({ _id: new ObjectId(id) });
}

/* ---------- PORTFOLIO (আগের কাজের ছবি) ---------- */

export async function getPortfolio() {
  const db = await getDb();
  const items = await db
    .collection("portfolio")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();
  return JSON.parse(JSON.stringify(items));
}

export async function addPortfolioImage(url, caption) {
  const db = await getDb();
  await db.collection("portfolio").insertOne({
    url,
    caption: caption || "",
    createdAt: new Date(),
  });
}

export async function deletePortfolioImage(id) {
  const { ObjectId } = await import("mongodb");
  const db = await getDb();
  await db.collection("portfolio").deleteOne({ _id: new ObjectId(id) });
      }
