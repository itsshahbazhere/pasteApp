import React from "react";
import { Copy } from "lucide-react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPaste, updateToPaste } from "../redux/pasteSlice";
import toast from "react-hot-toast";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");

  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [pasteId]);

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      //update
      dispatch(updateToPaste(paste));
    } else {
      //create
      dispatch(addToPaste(paste));
    }

    //after creation or updation clean up task
    setTitle("");
    setValue("");
    setSearchParams({ pasteId: "" });
  }

  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5">
      <div className="w-full flex gap-x-4 justify-between items-center">
        <input
          className="border border-blue-500 rounded-md text-black p-2 w-[80%] focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
          placeholder="Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          onClick={createPaste}
          className="rounded-lg text-md text-white bg-blue-700 p-2 w-[20%] hover:bg-blue-800 focus:ring-2 focus:ring-blue-300 font-medium transition"
        >
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button>
      </div>

      {/* Circle and copy button */}
      <div className="w-full mt-5 flex border-[rgba(128,121,121,0.3)] bg-gray-800 rounded-t-md px-4 py-2">
        <div className="flex gap-x-[6px] select-none items-center">
          <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] bg-[rgb(255,95,87)]"></div>
          <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] bg-[rgb(254,188,46)]"></div>
          <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] bg-[rgb(45,200,66)]"></div>
        </div>

        <Copy
          className="text-blue-500 w-[20px] cursor-pointer hover:text-blue-600 transition ml-auto mr-7"
          onClick={() => {
            navigator.clipboard.writeText(value);
            toast.success("Copies to Clipboard", {
              position: "top-right",
            });
          }}
        />
      </div>

      <textarea
        className="border border-t-0 border-gray-800 rounded-md rounded-t-none text-black p-2 w-full focus:outline-none focus:ring-1  focus:ring-gray-700 transition"
        value={value}
        placeholder="Write Your Content Here...."
        onChange={(e) => setValue(e.target.value)}
        rows={20}
      />
    </div>
  );
};

export default Home;
