import "./styles.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Home } from "./pages/home";
import { EventsPage } from "./pages/events/eventsPage";
import { EventsForm } from "./pages/events/eventsForm";
import { EventDetails } from "./pages/events/eventDetails";
import { VolunteerPage } from "./pages/volunteers/volunteerPage";
import { VolunteersForm } from "./pages/volunteers/volunteersForm";
import { VolunteerDetails } from "./pages/volunteers/volunteerDetails";

export default function App() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <header>
        <h1 onClick={() => navigate("/volunteers")}>Volunteers</h1>
        <h1 onClick={() => navigate("/")}>Events</h1>
      </header>

      <div className="main-body">
        <Routes>
          {/* Events */}
          <Route path="/" element={<EventsPage />} />
          <Route path="/events/add" element={<EventsForm />} />
          <Route path="/events/edit/:eventId" element={<EventsForm />} />
          <Route path="/events/:eventId" element={<EventDetails />} />

          {/* Volunteers */}
          <Route path="/volunteers" element={<VolunteerPage />} />
          <Route path="/volunteers/add" element={<VolunteersForm />} />
          <Route
            path="/volunteers/edit/:volunteerId"
            element={<VolunteersForm />}
          />
          <Route
            path="/volunteers/:volunteerId"
            element={<VolunteerDetails />}
          />

          {/* End */}
        </Routes>
      </div>

      <br />
    </div>
  );
}
