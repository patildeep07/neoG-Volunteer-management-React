import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchVolunteers } from "./volunteerSlice";

export const VolunteerPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const volunteersData = useSelector((state) => state.volunteers);

  console.log({ volunteersData });

  const { volunteers, status, error } = volunteersData;

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchVolunteers());
    }
  }, [status, dispatch]);

  return (
    <div>
      <h2>Volunteer</h2>
      {error && <h3>{error}</h3>}

      {/* Volunteers list */}
      {status === "success" && (
        <div>
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact</th>
                <th>Availability</th>
              </tr>
            </thead>
            <tbody>
              {volunteers.map(({ _id, name, contact, availability }) => {
                return (
                  <tr
                    key={_id}
                    className="cursor"
                    onClick={() => navigate(`/volunteers/${_id}`)}
                  >
                    <th>{name}</th>
                    <th>{contact}</th>
                    <th>{availability ? "Yes" : "No"}</th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Add a new volunteer */}
      <button onClick={() => navigate(`/volunteers/add`)}>Add volunteer</button>

      {/* End */}
    </div>
  );
};
