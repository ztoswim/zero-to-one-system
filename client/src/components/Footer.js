import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>© 2024 ZERO TO ONE SWIM ACADEMY. All Rights Reserved.</p>
    </footer>
  );
};

// 内联样式
const styles = {
  footer: {
    backgroundColor: "#333",
    color: "#fff",
    textAlign: "center",
    padding: "10px 0",
    position: "fixed",
    bottom: 0,
    width: "100%",
  },
};

export default Footer;
