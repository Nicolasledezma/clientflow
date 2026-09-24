import { Search, Bell } from "lucide-react";

function Navbar() {
  return (
    <header className="navbar">
      <div className="search-box">
        <Search size={18} />

        <input
          type="text"
          placeholder="Search anything..."
        />
      </div>

      <div className="navbar-actions">
        <button className="icon-button">
          <Bell size={19} />
        </button>

        <div className="user-profile">
          <div className="avatar">
            N
          </div>

          <div className="user-info">
            <span className="user-name">
              Nico
            </span>

            <span className="user-role">
              Administrator
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;