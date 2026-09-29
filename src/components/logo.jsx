function Logo({ variant = "full", size = "medium" }) {
  if (variant === "icon") {
    return (
      <div className={`clientflow-logo-icon clientflow-logo-${size}`}>
        <span>C</span>
      </div>
    );
  }

  return (
    <div className={`clientflow-logo clientflow-logo-${size}`}>
      <div className="clientflow-logo-icon">
        <span>C</span>
      </div>

      <span className="clientflow-logo-text">
        ClientFlow
      </span>
    </div>
  );
}

export default Logo;