import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addEventAsync, updateEventAsync } from "./eventSlice";

export const EventsForm = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const event = state ? state : null;

  const [newEvent, setNewEvent] = useState({
    name: event ? event.name : "",
    date: event ? event.date.slice(0, 10) : "",
    location: event ? event.location : "",
    description: event ? event.description : "",
    requiredVolunteerRoles: event
      ? event.requiredVolunteerRoles.split(" ").join("").split(",")
      : []
  });

  const submitButtonHandler = () => {
    if (event) {
      const arrayOfRoles = newEvent.requiredVolunteerRoles
        .split(" ")
        .join("")
        .split(",");

      const eventToBeAdded = {
        ...newEvent,
        requiredVolunteerRoles: arrayOfRoles
      };

      dispatch(
        updateEventAsync({ id: event._id, updatedEvent: eventToBeAdded })
      );
      navigate("/");
    } else {
      const arrayOfRoles = newEvent.requiredVolunteerRoles
        .split(" ")
        .join("")
        .split(",");

      const eventToBeAdded = {
        ...newEvent,
        requiredVolunteerRoles: arrayOfRoles
      };

      // console.log({ eventToBeAdded });

      dispatch(addEventAsync(eventToBeAdded));

      setNewEvent({
        name: event ? event.name : "",
        date: event ? event.subject : "",
        location: event ? event.contact : "",
        description: event ? event.description : "",
        requiredVolunteerRoles: event
          ? event.requiredVolunteerRoles.split(" ").join("").split(",")
          : []
      });

      navigate("/");
    }
  };

  return (
    <div>
      <h2>{event ? "Edit event" : "Add event"}</h2>

      <div className="flex-row gap-10px">
        <h4>Name:</h4>
        <input
          type="text"
          placeholder="Name"
          value={newEvent.name}
          onChange={(e) =>
            setNewEvent({
              ...newEvent,
              name: e.target.value
            })
          }
        />
      </div>

      <div className="flex-row gap-10px">
        <h4>Date:</h4>
        <input
          type="date"
          placeholder="date"
          value={newEvent.date}
          onChange={(e) =>
            setNewEvent({
              ...newEvent,
              date: e.target.value
            })
          }
        />
      </div>

      <div className="flex-row gap-10px">
        <h4>Location:</h4>
        <input
          type="text"
          placeholder="Location"
          value={newEvent.location}
          onChange={(e) =>
            setNewEvent({
              ...newEvent,
              location: e.target.value
            })
          }
        />
      </div>

      <div className="flex-row gap-10px">
        <h4>Description:</h4>
        <input
          type="text"
          placeholder="Description"
          value={newEvent.description}
          onChange={(e) =>
            setNewEvent({
              ...newEvent,
              description: e.target.value
            })
          }
        />
      </div>

      <div className="flex-row gap-10px">
        <h4>Required volunteer roles:</h4>
        <input
          type="text"
          placeholder="Required volunteer roles"
          value={newEvent.requiredVolunteerRoles}
          onChange={(e) =>
            setNewEvent({
              ...newEvent,
              requiredVolunteerRoles: e.target.value
            })
          }
        />
      </div>

      <button onClick={submitButtonHandler}>
        {event ? "Update details" : "Add Event"}
      </button>

      {/* End */}
    </div>
  );
};
