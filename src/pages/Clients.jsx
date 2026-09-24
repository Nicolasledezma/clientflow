import {
  Search,
  Plus,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
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
  const [editingClient, setEditingClient] = useState(null);

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

    if (editingClient) {
      setClients((previous) =>
        previous.map((client) =>
          client.id === editingClient.id
            ? {
                ...client,
                name: formData.name,
                contact: formData.contact,
                email: formData.email,
                status: formData.status,
                value: Number(formData.value),
              }
            : client
        )
      );
    } else {
      setClients((previous) => {
        const newId =
          previous.length > 0
            ? Math.max(...previous.map((client) => client.id)) + 1
            : 1;

        const newClient = {
          id: newId,
          name: formData.name,
          contact: formData.contact,
          email: formData.email,
          status: formData.status,
          value: Number(formData.value),
        };

        return [...previous, newClient];
      });
    }

    closeModal();
  };

  const openAddModal = () => {
    setEditingClient(null);

    setFormData({
      name: "",
      contact: "",
      email: "",
      status: "Active",
      value: "",
    });

    setIsModalOpen(true);
  };

  const openEditModal = (client) => {
    setEditingClient(client);

    setFormData({
      name: client.name,
      contact: client.contact,
      email: client.email,
      status: client.status,
      value: client.value,
    });

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingClient(null);

    setFormData({
      name: "",
      contact: "",
      email: "",
      status: "Active",
      value: "",
    });
  };

  const handleDelete = (clientId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this client?"
    );

    if (!confirmed) {
      return;
    }

    setClients((previous) =>
      previous.filter((client) => client.id !== clientId)
    );
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Clients</h1>
          <p>
            Manage your clients and business relationships.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={openAddModal}
        >
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
              onChange={(event) =>
                setSearch(event.target.value)
              }
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

                  <td>
                    ${client.value.toLocaleString()}
                  </td>

                  <td>
                    <div className="table-actions">
                      <button
                        className="table-action"
                        onClick={() =>
                          openEditModal(client)
                        }
                        title="Edit client"
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        className="table-action delete-action"
                        onClick={() =>
                          handleDelete(client.id)
                        }
                        title="Delete client"
                      >
                        <Trash2 size={17} />
                      </button>

                      <button
                        className="table-action"
                        title="More options"
                      >
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
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

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="client-modal">
            <div className="modal-header">
              <div>
                <h2>
                  {editingClient
                    ? "Edit Client"
                    : "Add New Client"}
                </h2>

                <p>
                  {editingClient
                    ? "Update the client information."
                    : "Create a new client record."}
                </p>
              </div>

              <button
                className="modal-close"
                onClick={closeModal}
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
                    <option value="Inactive">
                      Inactive
                    </option>
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
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-button"
                >
                  {editingClient
                    ? "Save Changes"
                    : "Add Client"}
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