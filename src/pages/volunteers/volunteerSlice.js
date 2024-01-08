import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  volunteers: [],
  status: "idle",
  error: null,
};

// Functions

// 1. Fetch volunteers data

export const fetchVolunteers = createAsyncThunk(
  "volunteers/fetchVolunteers",
  async () => {
    const response = await axios.get(
      "https://neog-volunteer-management.onrender.com/volunteers"
    );

    return response.data.volunteers;
  }
);

// 2. Add volunteer

export const addVolunteerAsync = createAsyncThunk(
  "volunteers/addVolunteerAsync",
  async (newVolunteers) => {
    const response = await axios.post(
      "https://neog-volunteer-management.onrender.com/volunteers",
      newVolunteers
    );

    return response.data.volunteer;
  }
);

// 3. Delete a volunteer

export const deleteVolunteerAsync = createAsyncThunk(
  "volunteers/deleteVolunteerAsync",
  async (id) => {
    const response = await axios.delete(
      `https://neog-volunteer-management.onrender.com/volunteers/${id}`
    );

    // console.log(response);
    return id;
  }
);

// 4. Update volunteer

export const updateVolunteerAsync = createAsyncThunk(
  "volunteers/updateVolunteerAsync",
  async ({ id, updatedVolunteer }) => {
    const response = await axios.post(
      `https://neog-volunteer-management.onrender.com/volunteers/${id}`,
      updatedVolunteer
    );

    return response.data.volunteer;
  }
);

// Slice

export const VolunteerSlice = createSlice({
  name: "volunteers",
  initialState,
  reducers: {},
  extraReducers: {
    // Get all volunteers
    [fetchVolunteers.pending]: (state) => {
      state.status = "loading";
    },
    [fetchVolunteers.fulfilled]: (state, action) => {
      state.status = "success";

      state.volunteers = action.payload;
    },
    [fetchVolunteers.rejected]: (state, action) => {
      state.status = "error";
      console.log(action.error.message);
      state.error = action.error.message;
    },

    // Add  new volunteer
    [addVolunteerAsync.pending]: (state) => {
      state.status = "loading";
    },
    [addVolunteerAsync.fulfilled]: (state, action) => {
      state.status = "success";
      state.volunteers = [...state.volunteers, action.payload];
    },
    [addVolunteerAsync.rejected]: (state) => {
      state.error = action.error.message;
      state.status = "error";
    },

    // Delete
    [deleteVolunteerAsync.pending]: (state) => {
      state.status = "loading";
    },
    [deleteVolunteerAsync.fulfilled]: (state, action) => {
      state.status = "success";
      state.volunteers = state.volunteers.filter(
        (volunteer) => volunteer._id !== action.payload
      );
    },
    [deleteVolunteerAsync.rejected]: (state) => {
      state.error = action.error.message;
      state.status = "error";
    },

    // Update volunteers
    [updateVolunteerAsync.pending]: (state) => {
      state.status = "loading";
    },
    [updateVolunteerAsync.fulfilled]: (state, action) => {
      state.status = "success";
      const updatedVolunteer = action.payload;

      state.volunteers = state.volunteers.map((volunteer) => {
        if (volunteer._id === updatedVolunteer._id) {
          return { ...updatedVolunteer };
        } else {
          return volunteer;
        }
      });
    },
    [updateVolunteerAsync.rejected]: (state) => {
      state.error = action.error.message;
      state.status = "error";
    },

    // End extra reducers
  },
});

export default VolunteerSlice.reducer;
