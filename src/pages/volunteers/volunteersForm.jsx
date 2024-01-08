import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addVolunteerAsync, updateVolunteerAsync } from "./volunteerSlice";
import { fetchEvents } from "../events/eventSlice";

export const VolunteersForm = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const volunteer = state ? state : null;

  // Retrieving all events

  const { events, status: eventStatus } = useSelector((state) => state.events);

  // console.log({ events });

  useEffect(() => {
    if (eventStatus === "idle") {
      dispatch(fetchEvents());
    }
  }, [dispatch, eventStatus]);

  // set New entry

  const [newVolunteer, setNewVolunteer] = useState({
    name: volunteer ? volunteer.name : "",
    contact: volunteer ? volunteer.contact : "",
    skills: volunteer ? volunteer.skills.join(" , ") : [],
    availability: volunteer ? volunteer.availability : true,
    areasOfInterest: volunteer ? volunteer.areasOfInterest.join(" , ") : [],
    assignedEvent: volunteer ? volunteer.assignedEvent : []
  });

  // Process data

  const arrayOfSkills =
    newVolunteer.skills.length > 0
      ? newVolunteer.skills.split(" ").join("").split(",")
      : [];

  const arrayOfAreasOfInterest =
    newVolunteer.areasOfInterest.length > 0
      ? newVolunteer.areasOfInterest.split(" ").join("").split(",")
      : [];

  const volunteerToBeAdded = {
    ...newVolunteer,
    skills: arrayOfSkills,
    areasOfInterest: arrayOfAreasOfInterest
  };

  // Handle assigned event change

  const [allEventsChecked, setAllEventsChecked] = useState([]);

  const handleAssignEvent = (e) => {
    if (e.target.checked) {
      setAllEventsChecked([...allEventsChecked, { event: e.target.value }]);
    } else {
      setAllEventsChecked(
        allEventsChecked.filter((item) => item !== e.target.value)
      );
    }
  };

  console.log({ allEventsChecked });

  // Submmit button handler

  const submitButtonHandler = () => {
    if (volunteer) {
      dispatch(
        updateVolunteerAsync({
          id: volunteer._id,
          updatedVolunteer: {
            ...volunteerToBeAdded,
            assignedEvent: allEventsChecked
          }
        })
      );
      navigate("/volunteers");
    } else {
      const { name, contact, skills, areasOfInterest } = newVolunteer;
      if (name && contact && skills && areasOfInterest) {
        console.log({ volunteerToBeAdded });
        dispatch(
          addVolunteerAsync({
            ...volunteerToBeAdded,
            assignedEvent: allEventsChecked
          })
        );
        navigate("/volunteers");
        setNewVolunteer({
          name: volunteer ? volunteer.name : "",
          contact: volunteer ? volunteer.contact : "",
          skills: volunteer
            ? volunteer.skills.split(" ").join("").split(",")
            : [],
          availability: volunteer ? volunteer.availability : true,
          areasOfInterest: volunteer
            ? volunteer.areasOfInterest.split(" ").join("").split(",")
            : []
        });
      } else {
        alert("Fill all the details");
      }
    }
  };

  return (
    <div>
      <h2>{volunteer ? "Edit volunteer" : "Add volunteer"}</h2>

      <div className="flex-row gap-10px">
        <h4>Name:</h4>
        <input
          type="text"
          placeholder="Name"
          value={newVolunteer.name}
          onChange={(e) =>
            setNewVolunteer({
              ...newVolunteer,
              name: e.target.value
            })
          }
        />
      </div>

      <div className="flex-row gap-10px">
        <h4>Contact:</h4>
        <input
          type="number"
          placeholder="Contact"
          value={newVolunteer.contact}
          onChange={(e) =>
            setNewVolunteer({
              ...newVolunteer,
              contact: Number(e.target.value)
            })
          }
        />
      </div>

      <div className="flex-row gap-10px">
        <h4>Skills:</h4>
        <input
          type="text"
          placeholder="Skills"
          value={newVolunteer.skills}
          onChange={(e) =>
            setNewVolunteer({
              ...newVolunteer,
              skills: e.target.value
            })
          }
        />
      </div>

      <div className="flex-row gap-10px">
        <h4>Availability:</h4>
        <select
          value={newVolunteer.availability}
          onChange={(e) =>
            setNewVolunteer({
              ...newVolunteer,
              availability: e.target.value
            })
          }
        >
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
      </div>

      <div className="flex-row gap-10px">
        <h4>Areas of Interest:</h4>
        <input
          type="text"
          placeholder="Areas of Interest"
          value={newVolunteer.areasOfInterest}
          onChange={(e) =>
            setNewVolunteer({
              ...newVolunteer,
              areasOfInterest: e.target.value
            })
          }
        />
      </div>

      <div className="flex-row gap-10px">
        <h4>Assign events:</h4>
        <div>
          {events.map(({ _id, name }) => {
            return (
              <div key={_id}>
                <input
                  type="checkbox"
                  value={_id}
                  onChange={handleAssignEvent}
                  defaultChecked={false}
                />
                <span>{name}</span>
              </div>
            );
          })}
        </div>
      </div>

      <button onClick={submitButtonHandler}>
        {volunteer ? "Update details" : "Add volunteer"}
      </button>

      {/* End */}
    </div>
  );
};
