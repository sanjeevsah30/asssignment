import { createReducer } from "@reduxjs/toolkit";

export const TeamReducer = createReducer(
  {
    teamList: [],
  },
  {
    // Add a team
    createTeam: (state, action) => {
      state.teamList.push(action.payload);
    },
    //delete a team
    deleteTeam: (state, action) => {
      const { id } = action.payload;
      state.teamList = state.teamList.filter((team) => team.id !== id);
    },
    // Update a team
    updateTeam: (state, action) => {
      const { id, updatedData } = action.payload;
      const teamIndex = state.teamList.findIndex((team) => team.id === id);
      if (teamIndex !== -1) {
        state.teamList[teamIndex] = {
          ...state.teamList[teamIndex],
          ...updatedData,
        };
      }
    },
  }
);
