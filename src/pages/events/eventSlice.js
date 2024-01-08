import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  events: [],
  status: "idle",
  error: null,
};

// Functions

// 1. Fetch events data

export const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
  const response = await axios.get(
    "https://neog-volunteer-management.onrender.com/events"
  );

  return response.data.events;
});

// 2. Add event

export const addEventAsync = createAsyncThunk(
  "events/addEventAsync",
  async (newEvent) => {
    const response = await axios.post(
      "https://neog-volunteer-management.onrender.com/events",
      newEvent
    );

    return response.data.event;
  }
);

// 3. Delete event

export const deleteEventAsync = createAsyncThunk(
  "events/deleteEventAsync",
  async (id) => {
    const response = await axios.delete(
      `https://neog-volunteer-management.onrender.com/events/${id}`
    );

    // console.log(response);
    return id;
  }
);

// 4. Update event

export const updateEventAsync = createAsyncThunk(
  "events/updateEventAsync",
  async ({ id, updatedEvent }) => {
    const response = await axios.post(
      `https://neog-volunteer-management.onrender.com/events/${id}`,
      updatedEvent
    );

    return response.data.event;
  }
);

// Slice

export const EventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: {
    // Get events
    [fetchEvents.pending]: (state) => {
      state.status = "loading";
    },
    [fetchEvents.fulfilled]: (state, action) => {
      state.status = "success";

      state.events = action.payload;
    },
    [fetchEvents.rejected]: (state, action) => {
      state.status = "error";
      console.log(action.error.message);
      state.error = action.error.message;
    },

    // Add events
    [addEventAsync.pending]: (state) => {
      state.status = "loading";
    },
    [addEventAsync.fulfilled]: (state, action) => {
      state.status = "success";
      state.events = [...state.events, action.payload];
    },
    [addEventAsync.rejected]: (state) => {
      state.error = action.error.message;
      state.status = "error";
    },

    // Delete event
    [deleteEventAsync.pending]: (state) => {
      state.status = "loading";
    },
    [deleteEventAsync.fulfilled]: (state, action) => {
      state.status = "success";
      state.events = state.events.filter(
        (event) => event._id !== action.payload
      );
    },
    [deleteEventAsync.rejected]: (state) => {
      state.error = action.error.message;
      state.status = "error";
    },

    // Update event
    [updateEventAsync.pending]: (state) => {
      state.status = "loading";
    },
    [updateEventAsync.fulfilled]: (state, action) => {
      state.status = "success";
      const updatedEvent = action.payload;

      state.events = state.events.map((event) => {
        if (event._id === updatedEvent._id) {
          return { ...updatedEvent };
        } else {
          return event;
        }
      });
    },
    [updateEventAsync.rejected]: (state) => {
      state.error = action.error.message;
      state.status = "error";
    },
  },
});

export default EventSlice.reducer;
