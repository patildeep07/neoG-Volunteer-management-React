import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteVolunteerAsync, fetchVolunteers } from "./volunteerSlice";
import { useEffect } from "react";

export const VolunteerDetails = () => {
  const { volunteerId } = useParams();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const volunteer = useSelector((state) =>
    state.volunteers.volunteers.find(
      (volunteer) => volunteer._id === volunteerId
    )
  );

  // console.log({ volunteer });

  if (!volunteer) {
    return (
      <div>
        <h2>Volunteer not found.</h2>
      </div>
    );
  }

  const handleDelete = (id) => {
    dispatch(deleteVolunteerAsync(id));
    navigate("/volunteers");
  };

  return (
    <div>
      <h2>Volunteer</h2>
      <h4>Name: {volunteer.name}</h4>
      <p>Contact: {volunteer.contact}</p>
      <p>Availability: {volunteer.availability}</p>
      <p>Skills:</p>
      <ol>
        {volunteer.skills.map((item, idx) => {
          return <li key={idx}>{item}</li>;
        })}
      </ol>
      <p>Areas of Interest:</p>
      <ol>
        {volunteer.areasOfInterest.map((item, idx) => {
          return <li key={idx}>{item}</li>;
        })}
      </ol>
      <p>Assigned events:</p>
      {volunteer.assignedEvent.length < 1 && (
        <p>Not yet assigned to any event</p>
      )}

      {volunteer.assignedEvent.length > 0 && (
        <ol>
          {volunteer.assignedEvent.map(({ event, _id }) => {
            if (event) {
              return <li key={_id}>{event?.name}</li>;
            }
          })}
        </ol>
      )}

      <div>
        <Link to={`/volunteers/edit/${volunteer._id}`} state={volunteer}>
          Edit Details
        </Link>
      </div>

      <button onClick={() => handleDelete(volunteer._id)}>Delete</button>

      {/* End */}
    </div>
  );
};
