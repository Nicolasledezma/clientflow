import { Search, Plus, MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { clients as initialClients } from "../data/clients";

function Clients() {
  const [clients, setClients] = useState(() => {
    const savedClients = localStorage.getItem("clientflow_clients");

    if (savedClients) {
      return JSON.parse(savedClients);
    }

    return initialClients;
  });

  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    status: "Active",
    value: "",
  });

  useEffect(() => {
    localStorage.setItem(
      "clientflow_clients",
      JSON.stringify(clients)
    );
  }, [clients]);

  const filteredClients = clients.filter((client) => {
    const searchValue = search.toLowerCase();

    return (
      client.name.toLowerCase().includes(searchValue) ||
      client.contact.toLowerCase().includes(searchValue) ||
      client.email.toLowerCase().includes(searchValue)
    );
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newClient = {
      id: Date.now(),
      name: formData.name,
      contact: formData.contact,
      email: formData.email,
      status: formData.status,
      value: Number(formData.value),
    };

    setClients((previous) => [...previous, newClient]);

    setFormData({
      name: "",
      contact: "",
      email: "",
      status: "Active",
      value: "",
    });

    setIsModalOpen(false);
  };

  return (
    <div className="page">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1>Clients</h1>
          <p>Manage your clients and business relationships.</p>
        </div>

        <button
          className="primary-button"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={18} />
          Add Client
        </button>
      </div>

      {/* Clients Table */}
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

                  <td>${client.value.toLocaleString()}</td>

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

      {/* Add Client Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="client-modal">
            <div className="modal-header">
              <div>
                <h2>Add New Client</h2>
                <p>Create a new client record.</p>
              </div>

              <button
                className="modal-close"
                onClick={() => setIsModalOpen(false)}
              >
                ×
              </button>
            </div>

            <form
              className="client-form"
              onSubmit={handleSubmit}
            >
              <div className="form-group">
                <label>Company Name</label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter company name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Contact Person</label>

                <input
                  type="text"
                  name="contact"
                  placeholder="Enter contact name"
                  value={formData.contact}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Status</label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Client Value</label>

                  <input
                    type="number"
                    name="value"
                    placeholder="0"
                    min="0"
                    value={formData.value}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-button"
                >
                  Add Client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Clients;