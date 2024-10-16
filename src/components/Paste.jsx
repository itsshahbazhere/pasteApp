import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPaste } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";

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
    toast.success("Copied to clipboard");
  }

  //share pastes to someone
  function handleShare(pasteId) {
    const shareableLink = `${window.location.origin}/pastes/${pasteId}`;
    navigator.clipboard
      .writeText(shareableLink)
      .then(() => toast.success("Shareable link copied to clipboard!"))
      .catch(() => toast.error("Failed to copy link."));
  }


  return (
    <div>
      <input
        className="p-2 rounded-2xl min-w-[600px] mt-5"
        type="search"
        placeholder="Search here..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex flex-col gap-5 mt-5">
        {filterData.length > 0 ? (
          filterData.map((paste) => {
            return (
              <div className="border" key={paste?._id}>
                <div>{paste.title}</div>
                <div>{paste.content}</div>

                <div className="flex flex-row gap-4 place-content-evenly">
                  <button>
                    <NavLink to={`/?pasteId=${paste?._id}`}>
                    Edit
                    </NavLink>
                  </button>
                  <button>
                    <NavLink to={`/pastes/${paste?._id}`}>
                      View
                    </NavLink>
                    </button>
                  <button onClick={() => handleDelete(paste?._id)}>
                    Delete
                  </button>
                  <button onClick={() => handleCopy(paste)}>Copy</button>
                  <button onClick={() => handleShare(paste?._id)}>Share</button>
                </div>

                <div>{paste.createdAt}</div>
              </div>
            );
          })
        ) : (
          <p>No result found</p>
        )}
      </div>
    </div>
  );
};

export default Paste;
