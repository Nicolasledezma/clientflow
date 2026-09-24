import { useMemo } from "react";
import {
  Users,
  DollarSign,
  BriefcaseBusiness,
  CheckCircle2,
  TrendingUp,
  Target,
} from "lucide-react";

import { clients } from "../data/clients";
import { deals } from "../data/deals";
import { tasks } from "../data/tasks";

function Analytics() {
  const analytics = useMemo(() => {
    const totalClients = clients.length;

    const totalRevenue = clients.reduce(
      (total, client) => total + client.value,
      0
    );

    const totalPipeline = deals.reduce(
      (total, deal) => total + deal.value,
      0
    );

    const wonDeals = deals.filter(
      (deal) => deal.stage === "Won"
    );

    const wonRevenue = wonDeals.reduce(
      (total, deal) => total + deal.value,
      0
    );

    const completedTasks = tasks.filter(
      (task) => task.status === "Completed"
    ).length;

    const taskCompletionRate =
      tasks.length > 0
        ? Math.round(
            (completedTasks / tasks.length) * 100
          )
        : 0;

    const averageClientValue =
      totalClients > 0
        ? Math.round(totalRevenue / totalClients)
        : 0;

    const conversionRate =
      deals.length > 0
        ? Math.round(
            (wonDeals.length / deals.length) * 100
          )
        : 0;

    const stages = [
      "Lead",
      "Contacted",
      "Proposal",
      "Negotiation",
      "Won",
    ];

    const dealsByStage = stages.map((stage) => {
      const stageDeals = deals.filter(
        (deal) => deal.stage === stage
      );

      const value = stageDeals.reduce(
        (total, deal) => total + deal.value,
        0
      );

      return {
        stage,
        count: stageDeals.length,
        value,
      };
    });

    const maxStageValue = Math.max(
      ...dealsByStage.map((stage) => stage.value),
      1
    );

    return {
      totalClients,
      totalRevenue,
      totalPipeline,
      wonRevenue,
      completedTasks,
      taskCompletionRate,
      averageClientValue,
      conversionRate,
      dealsByStage,
      maxStageValue,
    };
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Analytics</h1>

          <p>
            Track your CRM performance and business
            metrics.
          </p>
        </div>
      </div>

      <div className="analytics-summary">
        <div className="analytics-card">
          <div className="analytics-card-icon">
            <Users size={20} />
          </div>

          <div>
            <span>Total Clients</span>
            <strong>
              {analytics.totalClients}
            </strong>

            <small>
              Active customers
            </small>
          </div>
        </div>

        <div className="analytics-card">
          <div className="analytics-card-icon">
            <DollarSign size={20} />
          </div>

          <div>
            <span>Client Value</span>
            <strong>
              {formatCurrency(
                analytics.totalRevenue
              )}
            </strong>

            <small>
              Total customer value
            </small>
          </div>
        </div>

        <div className="analytics-card">
          <div className="analytics-card-icon">
            <BriefcaseBusiness size={20} />
          </div>

          <div>
            <span>Pipeline Value</span>
            <strong>
              {formatCurrency(
                analytics.totalPipeline
              )}
            </strong>

            <small>
              Current opportunities
            </small>
          </div>
        </div>

        <div className="analytics-card">
          <div className="analytics-card-icon">
            <CheckCircle2 size={20} />
          </div>

          <div>
            <span>Task Completion</span>
            <strong>
              {analytics.taskCompletionRate}%
            </strong>

            <small>
              Tasks completed
            </small>
          </div>
        </div>
      </div>

      <div className="analytics-grid">
        <div className="analytics-panel pipeline-analytics">
          <div className="analytics-panel-header">
            <div>
              <h2>Pipeline Performance</h2>

              <p>
                Value distributed across deal stages.
              </p>
            </div>

            <TrendingUp size={20} />
          </div>

          <div className="analytics-chart">
            {analytics.dealsByStage.map(
              (stage) => {
                const percentage =
                  (stage.value /
                    analytics.maxStageValue) *
                  100;

                return (
                  <div
                    className="analytics-bar-row"
                    key={stage.stage}
                  >
                    <div className="analytics-bar-label">
                      <span>
                        {stage.stage}
                      </span>

                      <strong>
                        {formatCurrency(
                          stage.value
                        )}
                      </strong>
                    </div>

                    <div className="analytics-bar-track">
                      <div
                        className="analytics-bar"
                        style={{
                          width: `${percentage}%`,
                        }}
                      />
                    </div>

                    <span className="analytics-bar-count">
                      {stage.count}{" "}
                      {stage.count === 1
                        ? "deal"
                        : "deals"}
                    </span>
                  </div>
                );
              }
            )}
          </div>
        </div>

        <div className="analytics-panel">
          <div className="analytics-panel-header">
            <div>
              <h2>Performance Overview</h2>

              <p>
                Key business indicators.
              </p>
            </div>

            <Target size={20} />
          </div>

          <div className="performance-list">
            <div className="performance-item">
              <div className="performance-item-left">
                <div className="performance-icon">
                  <DollarSign size={17} />
                </div>

                <div>
                  <span>Won Revenue</span>
                  <small>
                    Closed deals
                  </small>
                </div>
              </div>

              <strong>
                {formatCurrency(
                  analytics.wonRevenue
                )}
              </strong>
            </div>

            <div className="performance-item">
              <div className="performance-item-left">
                <div className="performance-icon">
                  <TrendingUp size={17} />
                </div>

                <div>
                  <span>Conversion Rate</span>
                  <small>
                    Deals won
                  </small>
                </div>
              </div>

              <strong>
                {analytics.conversionRate}%
              </strong>
            </div>

            <div className="performance-item">
              <div className="performance-item-left">
                <div className="performance-icon">
                  <Users size={17} />
                </div>

                <div>
                  <span>Average Client Value</span>
                  <small>
                    Per client
                  </small>
                </div>
              </div>

              <strong>
                {formatCurrency(
                  analytics.averageClientValue
                )}
              </strong>
            </div>

            <div className="performance-item">
              <div className="performance-item-left">
                <div className="performance-icon">
                  <CheckCircle2 size={17} />
                </div>

                <div>
                  <span>Completed Tasks</span>
                  <small>
                    Current workload
                  </small>
                </div>
              </div>

              <strong>
                {analytics.completedTasks}
              </strong>
            </div>
          </div>
        </div>
      </div>

      <div className="analytics-panel stage-overview">
        <div className="analytics-panel-header">
          <div>
            <h2>Deal Stage Overview</h2>

            <p>
              Number of opportunities in each
              pipeline stage.
            </p>
          </div>
        </div>

        <div className="stage-overview-grid">
          {analytics.dealsByStage.map(
            (stage) => (
              <div
                className="stage-overview-card"
                key={stage.stage}
              >
                <div className="stage-overview-top">
                  <span>{stage.stage}</span>

                  <div className="stage-overview-dot" />
                </div>

                <strong>
                  {stage.count}
                </strong>

                <small>
                  {stage.count === 1
                    ? "Opportunity"
                    : "Opportunities"}
                </small>

                <div className="stage-overview-value">
                  {formatCurrency(
                    stage.value
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Analytics;