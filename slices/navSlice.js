import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    origin: null,
    destination: null,
    timeTravelInformation: null
}

export const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setOrigin: (state, actions) => {
      state.origin = actions.payload
    },
    setDestintion: (state, actions) => {
        state.destination = actions.payload
      },
      settimeTravelInformation: (state, actions) => {
        state.timeTravelInformation = actions.payload
      },
  },
})


export const { setOrigin, setDestintion, settimeTravelInformation } = navSlice.actions

export default navSlice.reducer