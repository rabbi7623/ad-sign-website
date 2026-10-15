export default function Footer({ content }) {
  return (
    <footer className="site-footer">
      <span className="en">
        © {new Date().getFullYear()} {content.footer.text}
      </span>
      <span className="en">{content.contact.address}</span>
    </footer>
  );
}
