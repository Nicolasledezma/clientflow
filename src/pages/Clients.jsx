import { Search, Plus, MoreHorizontal } from "lucide-react";
import { useState } from "react";

const clients = [
  {
    id: 1,
    name: "Acme Corporation",
    contact: "John Smith",
    email: "john@acme.com",
    status: "Active",
    value: "$24,500",
  },
  {
    id: 2,
    name: "Globex Inc.",
    contact: "Sarah Johnson",
    email: "sarah@globex.com",
    status: "Active",
    value: "$18,200",
  },
  {
    id: 3,
    name: "Stark Industries",
    contact: "Tony Stark",
    email: "tony@stark.com",
    status: "Pending",
    value: "$32,800",
  },
  {
    id: 4,
    name: "Wayne Enterprises",
    contact: "Bruce Wayne",
    email: "bruce@wayne.com",
    status: "Active",
    value: "$41,500",
  },
  {
    id: 5,
    name: "Umbrella Corp",
    contact: "Alice Smith",
    email: "alice@umbrella.com",
    status: "Inactive",
    value: "$12,600",
  },
];

function Clients() {
  const [search, setSearch] = useState("");

  const filteredClients = clients.filter((client) => {
    const searchValue = search.toLowerCase();

    return (
      client.name.toLowerCase().includes(searchValue) ||
      client.contact.toLowerCase().includes(searchValue) ||
      client.email.toLowerCase().includes(searchValue)
    );
  });

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Clients</h1>
          <p>Manage your clients and business relationships.</p>
        </div>

        <button className="primary-button">
          <Plus size={18} />
          Add Client
        </button>
      </div>

      <div className="clients-card">
        <div className="clients-toolbar">
          <div className="clients-search">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search clients..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
        </div>

        <div className="table-container">
          <table className="clients-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Contact</th>
                <th>Email</th>
                <th>Status</th>
                <th>Value</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filteredClients.map((client) => (
                <tr key={client.id}>
                  <td>
                    <div className="company-cell">
                      <div className="company-avatar">
                        {client.name.charAt(0)}
                      </div>

                      <span>{client.name}</span>
                    </div>
                  </td>

                  <td>{client.contact}</td>
                  <td>{client.email}</td>

                  <td>
                    <span
                      className={`status-badge ${client.status.toLowerCase()}`}
                    >
                      {client.status}
                    </span>
                  </td>

                  <td>{client.value}</td>

                  <td>
                    <button className="table-action">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredClients.length === 0 && (
            <div className="empty-state">
              <p>No clients found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Clients;