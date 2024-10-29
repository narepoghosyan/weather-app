import { createSlice } from "@reduxjs/toolkit";

const weatherSlice = createSlice({
  name: "todos",
  initialState: {
    unit: "metric",
    currentCity: "Yerevan",
    weather: [],
  },
  reducers: {
    setUnit(state, action) {
      state.unit = action.payload;
    },
    setCurrentCity(state, action) {
      state.currentCity = action.payload;
    },
    setWeather(state, action) {
      state.weather = action.payload;
    },
  },
});

export default weatherSlice.reducer;
export const { setUnit, setCurrentCity, setWeather } = weatherSlice.actions;
