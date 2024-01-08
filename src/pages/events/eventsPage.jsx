import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchEvents } from "./eventSlice";

export const EventsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const eventsData = useSelector((state) => state.events);

  // console.log({ eventsData });

  const { events, status, error } = eventsData;

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchEvents());
    }
  }, [status, dispatch]);

  return (
    <div>
      <h2>Events</h2>
      {error && <h3>{error}</h3>}

      {/* Events list */}
      {!error && status === "success" && (
        <div>
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Location</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {events.map(({ _id, name, date, location }) => {
                return (
                  <tr
                    className="cursor"
                    key={_id}
                    onClick={() => navigate(`/events/${_id}`)}
                  >
                    <th>{name}</th>
                    <th>{location}</th>
                    <th>{date.slice(0, 10)}</th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Add a new event */}
      <button onClick={() => navigate(`/events/add`)}>Add event</button>

      {/* End */}
    </div>
  );
};
