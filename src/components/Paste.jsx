import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPaste } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
import {
  Calendar,
  Eye,
  Trash2,
  Copy,
  Share,
  PencilLine,
  Search,
} from "lucide-react";
import { format } from "date-fns"; //date format


const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const filterData = pastes.filter(
    ({ title, content }) =>
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //delete not possible without id
  function handleDelete(pasteId) {
    dispatch(removeFromPaste(pasteId));
  }

  //copy content to clipboard
  function handleCopy(paste) {
    navigator.clipboard.writeText(paste?.content);
    toast.success("Copied to clipboard", {
      position: "bottom-right",
    });
  }

  //share pastes to someone
  function handleShare(pasteId) {
    const shareableLink = `${window.location.origin}/pastes/${pasteId}`;
    navigator.clipboard
      .writeText(shareableLink)
      .then(() =>
        toast.success("Shareable link copied to clipboard!", {
          position: "bottom-right",
        })
      )
      .catch(() =>
        toast.error("Failed to copy link.", {
          position: "top-right",
        })
      );
  }

  
  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5">
      <div className="group flex border border-blue-500 rounded-md text-black p-2 px-4 w-full focus-within:ring-2 focus-within:ring-blue-300 transition">
        <Search className="w-[20px] mr-2 text-blue-500" />
        <input
          className="h-full w-full outline-none"
          type="search"
          placeholder="Search Your Paste Here...."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="w-full border-[rgba(128,121,121,0.3)] border rounded-md mt-5 bg-white">
        <h2 className="text-xl font-bold border-[rgba(128,121,121,0.3)] border-b p-3 bg-gray-800 text-white rounded-t-md select-none">
          ALL PASTES
        </h2>
        {filterData.length > 0 ? (
          filterData.map((paste) => {
            const formattedDate = format(
              new Date(paste?.createdAt),
              "MMMM d, yyyy"
            );
            // Limit the content to the first 50 characters
            const limitedContent =
              paste.content.length > 50
                ? `${paste.content.slice(0, 100)}.......`
                : paste.content;
            return (
              <div
                className="md:h-[130px] h-[240px] flex md:flex-row flex-col justify-between border-[rgba(128,121,121,0.3)] border rounded-md p-4 m-4 bg-white shadow hover:shadow-lg transition-shadow"
                key={paste?._id}
              >
                <div className="lg:w-[70%] md:w-[60%] w-[100%]">
                  <div className="text-2xl font-medium mb-2">{paste.title}</div>
                  <div className="text-sm text-[#707070]">{limitedContent}</div>
                </div>

                <div className="w-[220px] flex flex-col ">
                  <div className="flex flex-wrap justify-between">
                    <button className="transition-colors duration-200 ease-in-out p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-purple-600">
                      <NavLink to={`/?pasteId=${paste?._id}`}>
                        <PencilLine
                          className="text-black transition-colors duration-200 ease-in-out group-hover:text-purple-600"
                          size={20}
                        />
                      </NavLink>
                    </button>
                    <button className="p-2 rounded-[0.2rem] transition-colors duration-200 ease-in-out bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-orange-500">
                      <NavLink to={`/pastes/${paste?._id}`}>
                        <Eye
                          className="text-black transition-colors duration-200 ease-in-out group-hover:text-orange-500"
                          size={20}
                        />
                      </NavLink>
                    </button>
                    <button
                      onClick={() => handleDelete(paste?._id)}
                      className="p-2 transition-colors duration-200 ease-in-out rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-red-600"
                    >
                      <Trash2
                        className="text-black transition-colors duration-200 ease-in-out group-hover:text-red-600"
                        size={20}
                      />
                    </button>
                    <button
                      onClick={() => handleCopy(paste)}
                      className="p-2 transition-colors duration-200 ease-in-out rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-green-500"
                    >
                      <Copy
                        className="text-black transition-colors duration-200 ease-in-out group-hover:text-green-500"
                        size={20}
                      />
                    </button>
                    <button
                      onClick={() => handleShare(paste?._id)}
                      className="p-2 transition-colors duration-200 ease-in-out rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-blue-500"
                    >
                      <Share
                        className="text-black transition-colors duration-200 ease-in-out group-hover:text-blue-500"
                        size={20}
                      />
                    </button>
                  </div>

                  <div className="flex gap-x-2 mt-4 md:ml-auto">
                    <Calendar className="text-black" size={20} />
                    {formattedDate}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="h-[100px] flex items-center justify-center">No result found!</p>
        )}
      </div>
    </div>
  );
};

export default Paste;
