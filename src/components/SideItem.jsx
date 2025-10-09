import { Link } from "react-router";
import { useState, useEffect, useRef } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

function SideItem({ taskLists, setTaskLists, taskList, i }) {
  const [emoji, setEmoji] = useState(false);
  const [emojiDisplay, setEmojiDisplay] = useState("📃");
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(taskList.name);
  const emojiIcon = useRef();
  const listTextRef = useRef();

  useEffect(() => {
    if (editing) {
      listTextRef.current.focus();
    }
  }, [listTextRef, editing]);

  useEffect(() => {
    const click = (e) => {
      if (emoji) {
        if (e.target !== emojiIcon.current && e.target.nodeName !== "EM-EMOJI-PICKER") {
          setEmoji(false);
        }
      }
    };
    document.addEventListener("click", click);
    return () => {
      document.removeEventListener("click", click);
    };
  }, [emoji]);

  function handleEmoji(e) {
    setEmojiDisplay(e.native);
    const newTaskLists = [...taskLists];
    newTaskLists[i].emoji = e.native;
    setTaskLists(newTaskLists);
    setEmoji(false);
  }

  function handleSave() {
    setEditing(false);
    const newTaskLists = [...taskLists];
    newTaskLists[i].name = name;
    setTaskLists(newTaskLists);
  }

  return (
    <Link to={`/tasks/${i}`} className="sidebar-item">
      <div className="sidebar-item-emoji" title="Pick emoji" ref={emojiIcon} onClick={() => setEmoji(true)}>
        {taskList.emoji || emojiDisplay}
      </div>
      {editing ? (
        <input
          ref={listTextRef}
          onKeyDown={(e) => {
            if (e.key == "Enter") handleSave();
          }}
          onBlur={handleSave}
          onInput={(e) => setName(e.target.value)}
          value={name}
          className="sidebar-item-input"
        />
      ) : (
        <div className="sidebar-item-text">{name}</div>
      )}
      <div className="sidebar-item-icons">
        <img
          src="/macideas/icons/edit.svg"
          className="sidebar-item-icon"
          title="Edit task list"
          onClick={() => setEditing(true)}
        />
        <img src="/macideas/icons/delete.svg" className="sidebar-item-icon" title="Delete task list" />
      </div>
      {emoji && (
        <Picker
          previewPosition="none"
          skinTonePosition="none"
          className="emoji-picker"
          data={data}
          onEmojiSelect={(e) => handleEmoji(e)}
        />
      )}
    </Link>
  );
}

export default SideItem;
