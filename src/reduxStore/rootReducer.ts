import { combineReducers } from "redux"
import isAuthSlice from "./Slice/isAuthSlice"
const rootReducer = combineReducers({
  // Add your other reducers here
  auth: isAuthSlice,
})

export default rootReducer
