import React from "react";
import { Copy } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

const viewPaste = () => {

  const {id} = useParams();
  const allPastes = useSelector((state)=>state.paste.pastes);

  const paste = allPastes.filter((p)=>p._id === id)[0]

  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5">
      <div className="">
        <input
          className="border border-blue-500 rounded-md text-black p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
          placeholder="Enter title here..."
          type="text"
          value={paste.title}
          onChange={(e) => setTitle(e.target.value)}
          disabled
        />

        {/* <button onClick={createPaste} className="p-2 rounded-2xl mt-2">
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button> */}
      </div>

      {/* Circle and copy button */}
      <div className="w-full mt-5 flex border-[rgba(128,121,121,0.3)] bg-gray-800 rounded-t-md px-4 py-2">
        <div className="flex gap-x-[6px] select-none items-center">
          <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] bg-[rgb(255,95,87)]"></div>
          <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] bg-[rgb(254,188,46)]"></div>
          <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] bg-[rgb(45,200,66)]"></div>
        </div>

        <Copy
          className="text-blue-500 w-[20px] cursor-pointer hover:text-blue-600 transition ml-auto"
          onClick={() => {
            navigator.clipboard.writeText(paste.content);
            toast.success("Copies to Clipboard", {
              position: "top-right",
            });
          }}
        />
      </div>

      <div className="">
        <textarea
          className="border border-t-0 border-gray-800 rounded-md rounded-t-none text-black p-2 w-full focus:outline-none focus:ring-1  focus:ring-gray-700 transition"
          value={paste.content}
          placeholder="Enter content here..."
          onChange={(e) => setValue(e.target.value)}
          rows={20}
          disabled
        />
      </div>
    </div>
  );
}

export default viewPaste
