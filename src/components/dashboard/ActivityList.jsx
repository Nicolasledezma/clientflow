import {
  UserPlus,
  CircleDollarSign,
  CheckCircle2,
  CalendarPlus,
} from "lucide-react";

const activities = [
  {
    id: 1,
    title: "New client added",
    description: "Sarah Johnson joined your clients",
    time: "10 min ago",
    icon: UserPlus,
  },
  {
    id: 2,
    title: "Deal closed",
    description: "Acme Inc. — $12,500",
    time: "1 hour ago",
    icon: CircleDollarSign,
  },
  {
    id: 3,
    title: "Task completed",
    description: "Prepare proposal for TechCorp",
    time: "3 hours ago",
    icon: CheckCircle2,
  },
  {
    id: 4,
    title: "Meeting scheduled",
    description: "Product demo with Globex",
    time: "5 hours ago",
    icon: CalendarPlus,
  },
];

function ActivityList() {
  return (
    <div className="activity-list">
      {activities.map((activity) => {
        const Icon = activity.icon;

        return (
          <div
            className="activity-item"
            key={activity.id}
          >
            <div className="activity-icon">
              <Icon size={17} />
            </div>

            <div className="activity-content">
              <span className="activity-title">
                {activity.title}
              </span>

              <span className="activity-description">
                {activity.description}
              </span>
            </div>

            <span className="activity-time">
              {activity.time}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default ActivityList;