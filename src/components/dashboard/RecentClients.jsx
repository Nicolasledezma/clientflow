const clients = [
  {
    id: 1,
    name: "Sarah Johnson",
    company: "TechCorp",
    status: "Active",
    value: "$18,500",
    initials: "SJ",
  },
  {
    id: 2,
    name: "Michael Chen",
    company: "Acme Inc.",
    status: "Active",
    value: "$12,500",
    initials: "MC",
  },
  {
    id: 3,
    name: "Emma Wilson",
    company: "Globex",
    status: "Pending",
    value: "$8,400",
    initials: "EW",
  },
  {
    id: 4,
    name: "David Brown",
    company: "Northstar",
    status: "Active",
    value: "$6,750",
    initials: "DB",
  },
];

function RecentClients() {
  return (
    <div className="clients-table-wrapper">
      <table className="clients-table">
        <thead>
          <tr>
            <th>Client</th>
            <th>Company</th>
            <th>Status</th>
            <th>Value</th>
          </tr>
        </thead>

        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td>
                <div className="client-cell">
                  <div className="client-avatar">
                    {client.initials}
                  </div>

                  <span>{client.name}</span>
                </div>
              </td>

              <td className="company-cell">
                {client.company}
              </td>

              <td>
                <span
                  className={`status-badge ${
                    client.status.toLowerCase()
                  }`}
                >
                  {client.status}
                </span>
              </td>

              <td className="value-cell">
                {client.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecentClients;