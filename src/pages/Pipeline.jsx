import { useEffect, useState } from "react";
import {
  DollarSign,
  MoreHorizontal,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";

import { deals as initialDeals } from "../data/deals";

const stages = [
  {
    id: "Lead",
    title: "Lead",
  },
  {
    id: "Contacted",
    title: "Contacted",
  },
  {
    id: "Proposal",
    title: "Proposal",
  },
  {
    id: "Negotiation",
    title: "Negotiation",
  },
  {
    id: "Won",
    title: "Won",
  },
];

function Pipeline() {
  const [deals, setDeals] = useState(() => {
    const savedDeals = localStorage.getItem(
      "clientflow_deals"
    );

    if (savedDeals) {
      return JSON.parse(savedDeals);
    }

    return initialDeals;
  });

  const [draggedDeal, setDraggedDeal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDeal, setEditingDeal] = useState(null);

  const [formData, setFormData] = useState({
    company: "",
    contact: "",
    value: "",
    stage: "Lead",
  });

  useEffect(() => {
    localStorage.setItem(
      "clientflow_deals",
      JSON.stringify(deals)
    );
  }, [deals]);

  const handleDragStart = (deal) => {
    setDraggedDeal(deal);
  };

  const handleDragEnd = () => {
    setDraggedDeal(null);
  };

  const handleDrop = (stage) => {
    if (!draggedDeal) {
      return;
    }

    setDeals((previous) =>
      previous.map((deal) =>
        deal.id === draggedDeal.id
          ? {
              ...deal,
              stage,
            }
          : deal
      )
    );

    setDraggedDeal(null);
  };

  const getDealsByStage = (stage) => {
    return deals.filter((deal) => deal.stage === stage);
  };

  const getStageTotal = (stage) => {
    return getDealsByStage(stage).reduce(
      (total, deal) => total + deal.value,
      0
    );
  };

  const totalPipelineValue = deals.reduce(
    (total, deal) => total + deal.value,
    0
  );

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const openAddModal = () => {
    setEditingDeal(null);

    setFormData({
      company: "",
      contact: "",
      value: "",
      stage: "Lead",
    });

    setIsModalOpen(true);
  };

  const openEditModal = (deal) => {
    setEditingDeal(deal);

    setFormData({
      company: deal.company,
      contact: deal.contact,
      value: deal.value,
      stage: deal.stage,
    });

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingDeal(null);

    setFormData({
      company: "",
      contact: "",
      value: "",
      stage: "Lead",
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (editingDeal) {
      setDeals((previous) =>
        previous.map((deal) =>
          deal.id === editingDeal.id
            ? {
                ...deal,
                company: formData.company,
                contact: formData.contact,
                value: Number(formData.value),
                stage: formData.stage,
              }
            : deal
        )
      );
    } else {
      setDeals((previous) => {
        const newId =
          previous.length > 0
            ? Math.max(...previous.map((deal) => deal.id)) + 1
            : 1;

        const newDeal = {
          id: newId,
          company: formData.company,
          contact: formData.contact,
          value: Number(formData.value),
          stage: formData.stage,
        };

        return [...previous, newDeal];
      });
    }

    closeModal();
  };

  const handleDelete = (dealId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this deal?"
    );

    if (!confirmed) {
      return;
    }

    setDeals((previous) =>
      previous.filter((deal) => deal.id !== dealId)
    );
  };

  return (
    <div className="page">
      {/* Header */}
      <div className="page-header pipeline-header">
        <div>
          <h1>Pipeline</h1>

          <p>
            Track deals and manage your sales process.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={openAddModal}
        >
          <Plus size={18} />
          Add Deal
        </button>
      </div>

      {/* Pipeline Summary */}
      <div className="pipeline-summary">
        <div className="pipeline-summary-card">
          <div className="pipeline-summary-icon">
            <DollarSign size={19} />
          </div>

          <div>
            <span>Total Pipeline</span>

            <strong>
              ${totalPipelineValue.toLocaleString()}
            </strong>
          </div>
        </div>

        <div className="pipeline-summary-card">
          <div className="pipeline-summary-number">
            {deals.length}
          </div>

          <div>
            <span>Active Deals</span>

            <strong>{deals.length} deals</strong>
          </div>
        </div>
      </div>

      {/* Kanban */}
      <div className="pipeline-board">
        {stages.map((stage) => {
          const stageDeals = getDealsByStage(stage.id);
          const stageTotal = getStageTotal(stage.id);

          return (
            <div
              key={stage.id}
              className={`pipeline-column ${
                draggedDeal ? "drop-active" : ""
              }`}
              onDragOver={(event) => {
                event.preventDefault();
              }}
              onDrop={() => handleDrop(stage.id)}
            >
              {/* Column Header */}
              <div className="pipeline-column-header">
                <div>
                  <div className="pipeline-column-title">
                    <span
                      className={`stage-dot stage-${stage.id.toLowerCase()}`}
                    />

                    <h3>{stage.title}</h3>

                    <span className="deal-count">
                      {stageDeals.length}
                    </span>
                  </div>

                  <span className="stage-total">
                    ${stageTotal.toLocaleString()}
                  </span>
                </div>

                <button className="column-menu">
                  <MoreHorizontal size={18} />
                </button>
              </div>

              {/* Deals */}
              <div className="pipeline-deals">
                {stageDeals.map((deal) => (
                  <div
                    key={deal.id}
                    className="deal-card"
                    draggable
                    onDragStart={() =>
                      handleDragStart(deal)
                    }
                    onDragEnd={handleDragEnd}
                  >
                    <div className="deal-card-top">
                      <div className="deal-company-avatar">
                        {deal.company.charAt(0)}
                      </div>

                      <div className="deal-card-actions">
                        <button
                          className="deal-menu"
                          onClick={(event) => {
                            event.stopPropagation();
                            openEditModal(deal);
                          }}
                          title="Edit deal"
                        >
                          <Pencil size={15} />
                        </button>

                        <button
                          className="deal-menu deal-delete"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleDelete(deal.id);
                          }}
                          title="Delete deal"
                        >
                          <Trash2 size={15} />
                        </button>

                        <button
                          className="deal-menu"
                          onClick={(event) =>
                            event.stopPropagation()
                          }
                          title="More options"
                        >
                          <MoreHorizontal size={17} />
                        </button>
                      </div>
                    </div>

                    <h4>{deal.company}</h4>

                    <p className="deal-contact">
                      {deal.contact}
                    </p>

                    <div className="deal-card-footer">
                      <span className="deal-value">
                        ${deal.value.toLocaleString()}
                      </span>

                      <span className="deal-label">
                        Deal
                      </span>
                    </div>
                  </div>
                ))}

                {stageDeals.length === 0 && (
                  <div className="empty-pipeline">
                    <p>Drop deals here</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Deal Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="client-modal">
            <div className="modal-header">
              <div>
                <h2>
                  {editingDeal
                    ? "Edit Deal"
                    : "Add New Deal"}
                </h2>

                <p>
                  {editingDeal
                    ? "Update the deal information."
                    : "Create a new sales opportunity."}
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
                  name="company"
                  placeholder="Enter company name"
                  value={formData.company}
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

              <div className="form-row">
                <div className="form-group">
                  <label>Deal Value</label>

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

                <div className="form-group">
                  <label>Stage</label>

                  <select
                    name="stage"
                    value={formData.stage}
                    onChange={handleInputChange}
                  >
                    {stages.map((stage) => (
                      <option
                        key={stage.id}
                        value={stage.id}
                      >
                        {stage.title}
                      </option>
                    ))}
                  </select>
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
                  {editingDeal
                    ? "Save Changes"
                    : "Add Deal"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pipeline;