import "./globals.css";
import { getContent } from "@/lib/data";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata = {
  title: "AD Sign — All kinds of digital prints",
  description:
    "ঢাকার দুদু মার্কেটে ব্যানার, নেমপ্লেট, রিফ্লেক্টিভ স্টিকার সহ সব ধরনের প্রমোশনাল প্রিন্টিং সার্ভিস।",
};

export default async function RootLayout({ children }) {
  const content = await getContent();

  return (
    <html lang="bn">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@400;500;600;700&family=Hind+Siliguri:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Header content={content} />
        {children}
        <Footer content={content} />
        <WhatsAppButton whatsapp={content.contact.whatsapp} />
      </body>
    </html>
  );
    }
