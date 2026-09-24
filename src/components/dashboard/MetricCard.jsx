import {
  TrendingUp,
  TrendingDown,
} from "lucide-react";

function MetricCard({
  title,
  value,
  change,
  description,
  positive = true,
}) {
  return (
    <div className="metric-card">
      <div className="metric-card-header">
        <span className="metric-title">
          {title}
        </span>

        <span className="metric-period">
          This month
        </span>
      </div>

      <div className="metric-value">
        {value}
      </div>

      <div className="metric-footer">
        <span
          className={
            positive
              ? "metric-change positive"
              : "metric-change negative"
          }
        >
          {positive ? (
            <TrendingUp size={14} />
          ) : (
            <TrendingDown size={14} />
          )}

          {change}
        </span>

        <span className="metric-description">
          {description}
        </span>
      </div>
    </div>
  );
}

export default MetricCard;