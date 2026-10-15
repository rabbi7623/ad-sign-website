export default function WhatsAppButton({ whatsapp }) {
  return (
    <a href={`https://wa.me/${whatsapp}`} className="wa-float" aria-label="WhatsApp">
      💬
    </a>
  );
}
