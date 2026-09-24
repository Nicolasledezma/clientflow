import { useEffect, useState } from "react";
import {
  User,
  Bell,
  Palette,
  Save,
  Check,
} from "lucide-react";

const defaultSettings = {
  name: "Nico",
  email: "nico@example.com",
  role: "Administrator",
  company: "ClientFlow",
  emailNotifications: true,
  taskNotifications: true,
  dealNotifications: true,
  theme: "light",
};

function Settings() {
  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem(
      "clientflow_settings"
    );

    if (savedSettings) {
      return JSON.parse(savedSettings);
    }

    return defaultSettings;
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (settings.theme === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [settings.theme]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setSettings((previous) => ({
      ...previous,
      [name]: value,
    }));

    setSaved(false);
  };

  const handleToggle = (name) => {
    setSettings((previous) => ({
      ...previous,
      [name]: !previous[name],
    }));

    setSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem(
      "clientflow_settings",
      JSON.stringify(settings)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <div className="page">
      <div className="page-header settings-header">
        <div>
          <h1>Settings</h1>

          <p>
            Manage your profile and application
            preferences.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={handleSave}
        >
          {saved ? (
            <Check size={18} />
          ) : (
            <Save size={18} />
          )}

          {saved ? "Saved" : "Save Changes"}
        </button>
      </div>

      <div className="settings-layout">
        <div className="settings-main">
          <section className="settings-card">
            <div className="settings-card-header">
              <div className="settings-section-icon">
                <User size={19} />
              </div>

              <div>
                <h2>Profile</h2>

                <p>
                  Manage your personal information.
                </p>
              </div>
            </div>

            <div className="settings-form">
              <div className="settings-form-row">
                <div className="form-group">
                  <label>Full Name</label>

                  <input
                    type="text"
                    name="name"
                    value={settings.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>

                  <input
                    type="email"
                    name="email"
                    value={settings.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="settings-form-row">
                <div className="form-group">
                  <label>Role</label>

                  <input
                    type="text"
                    name="role"
                    value={settings.role}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Company</label>

                  <input
                    type="text"
                    name="company"
                    value={settings.company}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="settings-card">
            <div className="settings-card-header">
              <div className="settings-section-icon">
                <Bell size={19} />
              </div>

              <div>
                <h2>Notifications</h2>

                <p>
                  Choose which notifications you want
                  to receive.
                </p>
              </div>
            </div>

            <div className="settings-options">
              <div className="settings-option">
                <div>
                  <strong>Email notifications</strong>

                  <span>
                    Receive important updates by email.
                  </span>
                </div>

                <button
                  className={`toggle ${
                    settings.emailNotifications
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    handleToggle(
                      "emailNotifications"
                    )
                  }
                  type="button"
                  aria-label="Toggle email notifications"
                >
                  <span />
                </button>
              </div>

              <div className="settings-option">
                <div>
                  <strong>Task notifications</strong>

                  <span>
                    Get notified about upcoming tasks.
                  </span>
                </div>

                <button
                  className={`toggle ${
                    settings.taskNotifications
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    handleToggle(
                      "taskNotifications"
                    )
                  }
                  type="button"
                  aria-label="Toggle task notifications"
                >
                  <span />
                </button>
              </div>

              <div className="settings-option">
                <div>
                  <strong>Deal notifications</strong>

                  <span>
                    Receive updates about pipeline
                    activity.
                  </span>
                </div>

                <button
                  className={`toggle ${
                    settings.dealNotifications
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    handleToggle(
                      "dealNotifications"
                    )
                  }
                  type="button"
                  aria-label="Toggle deal notifications"
                >
                  <span />
                </button>
              </div>
            </div>
          </section>

          <section className="settings-card">
            <div className="settings-card-header">
              <div className="settings-section-icon">
                <Palette size={19} />
              </div>

              <div>
                <h2>Appearance</h2>

                <p>
                  Customize how ClientFlow looks.
                </p>
              </div>
            </div>

            <div className="appearance-options">
              <label
                className={`appearance-option ${
                  settings.theme === "light"
                    ? "selected"
                    : ""
                }`}
              >
                <input
                  type="radio"
                  name="theme"
                  value="light"
                  checked={
                    settings.theme === "light"
                  }
                  onChange={handleInputChange}
                />

                <div className="theme-preview light-preview">
                  <div className="theme-preview-sidebar" />
                  <div className="theme-preview-content">
                    <div />
                    <div />
                    <div />
                  </div>
                </div>

                <div>
                  <strong>Light</strong>

                  <span>
                    Clean and bright interface
                  </span>
                </div>
              </label>

              <label
                className={`appearance-option ${
                  settings.theme === "dark"
                    ? "selected"
                    : ""
                }`}
              >
                <input
                  type="radio"
                  name="theme"
                  value="dark"
                  checked={
                    settings.theme === "dark"
                  }
                  onChange={handleInputChange}
                />

                <div className="theme-preview dark-preview">
                  <div className="theme-preview-sidebar" />
                  <div className="theme-preview-content">
                    <div />
                    <div />
                    <div />
                  </div>
                </div>

                <div>
                  <strong>Dark</strong>

                  <span>
                    Dark interface for low light
                  </span>
                </div>
              </label>
            </div>
          </section>
        </div>

        <aside className="settings-sidebar">
          <div className="profile-preview">
            <div className="profile-avatar">
              {settings.name
                ? settings.name
                    .charAt(0)
                    .toUpperCase()
                : "N"}
            </div>

            <h3>
              {settings.name || "User"}
            </h3>

            <p>
              {settings.role || "Administrator"}
            </p>

            <span>
              {settings.email}
            </span>
          </div>

          <div className="settings-info">
            <h3>ClientFlow</h3>

            <p>
              Your workspace is saved locally in your
              browser.
            </p>

            <span>Version 1.0.0</span>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Settings;