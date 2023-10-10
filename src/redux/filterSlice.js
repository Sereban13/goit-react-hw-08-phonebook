import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    value: '',
  },
  reducers: {
    setFilter: {
      reducer(state, action) {
        state.value = action.payload.toLowerCase();
      },
    },
  },
});

export const { setFilter } = filterSlice.actions;

export const filterReducer = filterSlice.reducer;

//selector
export const getFilter = state => state.filter.value;
