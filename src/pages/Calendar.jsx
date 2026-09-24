import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
} from "lucide-react";

import { events as initialEvents } from "../data/events";

function Calendar() {
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem("clientflow_events");

    if (savedEvents) {
      return JSON.parse(savedEvents);
    }

    return initialEvents;
  });

  const [currentDate, setCurrentDate] = useState(
    new Date(2026, 8, 1)
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    type: "Meeting",
    client: "",
  });

  const eventTypes = [
    "Meeting",
    "Call",
    "Presentation",
    "Other",
  ];

  useEffect(() => {
    localStorage.setItem(
      "clientflow_events",
      JSON.stringify(events)
    );
  }, [events]);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const weekDays = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const daysInMonth = new Date(
    year,
    month + 1,
    0
  ).getDate();

  const previousMonth = () => {
    setCurrentDate(
      new Date(year, month - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(year, month + 1, 1)
    );
  };

  const goToToday = () => {
    const today = new Date();

    setCurrentDate(
      new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      )
    );
  };

  const openAddModal = (selectedDate = "") => {
    setEditingEvent(null);

    setFormData({
      title: "",
      date: selectedDate,
      time: "10:00",
      type: "Meeting",
      client: "",
    });

    setIsModalOpen(true);
  };

  const openEditModal = (event) => {
    setEditingEvent(event);

    setFormData({
      title: event.title,
      date: event.date,
      time: event.time,
      type: event.type,
      client: event.client,
    });

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingEvent(null);

    setFormData({
      title: "",
      date: "",
      time: "",
      type: "Meeting",
      client: "",
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (editingEvent) {
      setEvents((previous) =>
        previous.map((item) =>
          item.id === editingEvent.id
            ? {
                ...item,
                ...formData,
              }
            : item
        )
      );
    } else {
      setEvents((previous) => {
        const newId =
          previous.length > 0
            ? Math.max(
                ...previous.map((item) => item.id)
              ) + 1
            : 1;

        const newEvent = {
          id: newId,
          ...formData,
        };

        return [...previous, newEvent];
      });
    }

    closeModal();
  };

  const handleDelete = (eventId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmed) {
      return;
    }

    setEvents((previous) =>
      previous.filter(
        (event) => event.id !== eventId
      )
    );
  };

  const formatDate = (day) => {
    const monthNumber = String(month + 1).padStart(
      2,
      "0"
    );

    const dayNumber = String(day).padStart(2, "0");

    return `${year}-${monthNumber}-${dayNumber}`;
  };

  const getEventsForDay = (day) => {
    const date = formatDate(day);

    return events.filter(
      (event) => event.date === date
    );
  };

  const isToday = (day) => {
    const today = new Date();

    return (
      today.getFullYear() === year &&
      today.getMonth() === month &&
      today.getDate() === day
    );
  };

  const calendarDays = [];

  for (let index = 0; index < firstDayOfMonth; index++) {
    calendarDays.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  return (
    <div className="page">
      <div className="page-header calendar-header">
        <div>
          <h1>Calendar</h1>

          <p>
            Manage your meetings, calls and important
            events.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => openAddModal()}
        >
          <Plus size={18} />
          Add Event
        </button>
      </div>

      <div className="calendar-card">
        <div className="calendar-toolbar">
          <div className="calendar-navigation">
            <button
              className="calendar-nav-button"
              onClick={previousMonth}
              title="Previous month"
            >
              <ChevronLeft size={19} />
            </button>

            <button
              className="calendar-nav-button"
              onClick={nextMonth}
              title="Next month"
            >
              <ChevronRight size={19} />
            </button>

            <button
              className="today-button"
              onClick={goToToday}
            >
              Today
            </button>
          </div>

          <h2>
            {monthNames[month]} {year}
          </h2>

          <div className="calendar-toolbar-spacer" />
        </div>

        <div className="calendar-weekdays">
          {weekDays.map((day) => (
            <div
              key={day}
              className="calendar-weekday"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="calendar-grid">
          {calendarDays.map((day, index) => {
            const dayEvents = day
              ? getEventsForDay(day)
              : [];

            return (
              <div
                key={`${day}-${index}`}
                className={`calendar-day ${
                  !day ? "calendar-day-empty" : ""
                }`}
                onDoubleClick={() => {
                  if (day) {
                    openAddModal(formatDate(day));
                  }
                }}
              >
                {day && (
                  <>
                    <div
                      className={`calendar-day-number ${
                        isToday(day)
                          ? "today"
                          : ""
                      }`}
                    >
                      {day}
                    </div>

                    <div className="calendar-events">
                      {dayEvents.map((event) => (
                        <div
                          key={event.id}
                          className={`calendar-event event-${event.type
                            .toLowerCase()
                            .replace(" ", "-")}`}
                          onClick={(clickEvent) => {
                            clickEvent.stopPropagation();
                            openEditModal(event);
                          }}
                        >
                          <div className="calendar-event-content">
                            <span className="calendar-event-time">
                              {event.time}
                            </span>

                            <span className="calendar-event-title">
                              {event.title}
                            </span>
                          </div>

                          <button
                            className="calendar-event-delete"
                            onClick={(clickEvent) => {
                              clickEvent.stopPropagation();
                              handleDelete(event.id);
                            }}
                            title="Delete event"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      ))}
                    </div>

                    <button
                      className="calendar-add-day"
                      onClick={(clickEvent) => {
                        clickEvent.stopPropagation();
                        openAddModal(formatDate(day));
                      }}
                      title="Add event"
                    >
                      <Plus size={14} />
                    </button>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="client-modal calendar-modal">
            <div className="modal-header">
              <div>
                <h2>
                  {editingEvent
                    ? "Edit Event"
                    : "Add New Event"}
                </h2>

                <p>
                  {editingEvent
                    ? "Update the event information."
                    : "Create a new calendar event."}
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
                <label>Event Title</label>

                <input
                  type="text"
                  name="title"
                  placeholder="Enter event title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Date</label>

                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Time</label>

                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Event Type</label>

                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                >
                  {eventTypes.map((type) => (
                    <option
                      key={type}
                      value={type}
                    >
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Client</label>

                <input
                  type="text"
                  name="client"
                  placeholder="Enter client name"
                  value={formData.client}
                  onChange={handleInputChange}
                />
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
                  {editingEvent
                    ? "Save Changes"
                    : "Add Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Calendar;