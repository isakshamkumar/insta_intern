import { configureStore } from "@reduxjs/toolkit";

import usersSlice from "./usersSlice";

const store=configureStore({
    reducer:{
        usersslice:usersSlice
    }
})
export default store;