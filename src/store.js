import { configureStore } from "@reduxjs/toolkit";
import { EventSlice } from "./pages/events/eventSlice";
import { VolunteerSlice } from "./pages/volunteers/volunteerSlice";

export default configureStore({
  reducer: {
    events: EventSlice.reducer,
    volunteers: VolunteerSlice.reducer
  }
});
