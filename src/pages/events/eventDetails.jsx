import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteEventAsync } from "./eventSlice";

export const EventDetails = () => {
  const { eventId } = useParams();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const event = useSelector((state) =>
    state.events.events.find((event) => event._id === eventId)
  );

  console.log({ event });

  if (!event) {
    return (
      <div>
        <h2>Event not found.</h2>
      </div>
    );
  }

  const handleDelete = (id) => {
    dispatch(deleteEventAsync(id));
    navigate("/");
  };

  return (
    <div>
      <h2>Event</h2>
      <h4>Name: {event.name}</h4>
      <p>Description: {event.desrciption}</p>
      <p>Date: {event.date.slice(0, 10)}</p>
      <p>Location: {event.location}</p>
      <p>Required Volunteers:</p>
      <ul>
        {event.requiredVolunteerRoles.map((item, idx) => {
          return <li key={idx}>{item}</li>;
        })}
      </ul>

      <div>
        <Link to={`/events/edit/${event._id}`} state={event}>
          Edit Details
        </Link>
      </div>

      <button onClick={() => handleDelete(event._id)}>Delete</button>

      {/* End */}
    </div>
  );
};
