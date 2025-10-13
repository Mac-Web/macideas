import { useEffect, useRef, useState } from "react";

function LabelList({ setLabelList, icon }) {
  const [labels, setLabels] = useState(JSON.parse(localStorage.getItem("macideas-labels")) || []);
  const [newLabel, setNewLabel] = useState("");
  const listRef = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (!listRef.current.contains(e.target) && e.target !== icon) {
        setLabelList(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("macideas-labels", JSON.stringify(labels));
  }, [labels]);

  function handleAdd(e) {
    e.preventDefault();
    setLabels([...labels, newLabel]);
    setNewLabel("");
  }

  function handleRemove(i) {
    let newLabels = [...labels];
    newLabels.splice(i, 1);
    setLabels(newLabels);
  }

  return (
    <div ref={listRef} className="label-list">
      {labels.length > 0 ? (
        <div className="label-items">
          {labels.map((label, i) => {
            return (
              <div className="label-item">
                <input type="checkbox" />
                {label}
                <img src="/macideas/icons/delete.svg" onClick={() => handleRemove(i)} />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="message">No labels added</div>
      )}
      <form onSubmit={handleAdd} className="add-label">
        <input type="text" value={newLabel} onInput={(e) => setNewLabel(e.target.value)} placeholder="Add label" />
      </form>
    </div>
  );
}

export default LabelList;
