import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],
};

export const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addToPaste: (state, action) => {
      //add a check -> paste already existed
      const paste = action.payload;
      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste Created Sucessfully",{
        position:"top-right"
      });
    },

    updateToPaste: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item.id === paste.id);
      if (index >= 0) {
        state.pastes[index] = paste;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste updated",{
          position:"top-right"
        });
      }
    },

    resetAllPaste: (state, action) => {
      state.pastes = [];
      localStorage.removeItem("pastes",{
        position:"top-right"
      });
    },

    removeFromPaste: (state, action) => {
      
      const pasteId = action.payload;

      console.log(pasteId);
      const index = state.pastes.findIndex((item) => item._id === pasteId);
      
      if (index >= 0) {
        state.pastes.splice(index, 1);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));

        toast.success("Paste Deleted")
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToPaste, updateToPaste, resetAllPaste, removeFromPaste } =
  pasteSlice.actions;

export default pasteSlice.reducer;
