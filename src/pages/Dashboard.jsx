import {
  ArrowUpRight,
  MoreHorizontal,
} from "lucide-react";

import MetricCard from "../components/dashboard/MetricCard";
import ActivityList from "../components/dashboard/ActivityList";
import RecentClients from "../components/dashboard/RecentClients";

function Dashboard() {
  return (
    <div className="dashboard">

      {/* Header */}

      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>

          <p>
            Welcome back, Nico. Here's what's
            happening with your business.
          </p>
        </div>

        <button className="date-button">
          Last 30 days
          <ArrowUpRight size={15} />
        </button>
      </div>


      {/* Metrics */}

      <div className="metrics-grid">

        <MetricCard
          title="Total Clients"
          value="1,248"
          change="+12.5%"
          description="vs. last month"
        />

        <MetricCard
          title="Revenue"
          value="$84,250"
          change="+8.2%"
          description="vs. last month"
        />

        <MetricCard
          title="Active Deals"
          value="48"
          change="+14.3%"
          description="vs. last month"
        />

        <MetricCard
          title="Tasks Completed"
          value="86%"
          change="+6.4%"
          description="vs. last month"
        />

      </div>


      {/* Main dashboard grid */}

      <div className="dashboard-grid">

        {/* Revenue */}

        <section className="dashboard-card revenue-card">

          <div className="card-header">

            <div>
              <h2>Revenue Overview</h2>

              <p>
                Monthly revenue performance
              </p>
            </div>

            <button className="more-button">
              <MoreHorizontal size={19} />
            </button>

          </div>

          <div className="chart">

            <div className="chart-value">
              $84,250
            </div>

            <div className="chart-bars">

              <div
                className="bar"
                style={{ height: "35%" }}
              />

              <div
                className="bar"
                style={{ height: "48%" }}
              />

              <div
                className="bar"
                style={{ height: "42%" }}
              />

              <div
                className="bar"
                style={{ height: "62%" }}
              />

              <div
                className="bar"
                style={{ height: "56%" }}
              />

              <div
                className="bar"
                style={{ height: "74%" }}
              />

              <div
                className="bar active"
                style={{ height: "88%" }}
              />

            </div>

            <div className="chart-labels">
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
              <span>Sep</span>
              <span>Oct</span>
              <span>Nov</span>
            </div>

          </div>

        </section>


        {/* Activity */}

        <section className="dashboard-card activity-card">

          <div className="card-header">

            <div>
              <h2>Recent Activity</h2>

              <p>
                Latest updates
              </p>
            </div>

            <button className="more-button">
              <MoreHorizontal size={19} />
            </button>

          </div>

          <ActivityList />

        </section>

      </div>


      {/* Clients */}

      <section className="dashboard-card clients-card">

        <div className="card-header">

          <div>
            <h2>Recent Clients</h2>

            <p>
              Your latest customers
            </p>
          </div>

          <button className="view-all-button">
            View all
          </button>

        </div>

        <RecentClients />

      </section>

    </div>
  );
}

export default Dashboard;