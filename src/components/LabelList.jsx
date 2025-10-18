import { useEffect, useRef, useState } from "react";

function LabelList({ setLabelList,displayed,setDisplayed,labels,setLabels, icon }) {
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

  function handleAdd(e) {
    e.preventDefault();
    setLabels([...labels, newLabel]);
    setNewLabel("");
  }

  function handleCheck(e, i) {
    if (e.target.checked) {
      setDisplayed([...displayed, labels[i]]);
    } else {
      setDisplayed(displayed.filter((label) => label !== labels[i]));
    }
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
              <label className="label-item">
                <input type="checkbox" checked={displayed.includes(label)} onChange={(e) => handleCheck(e, i)} />
                {label}
                <img src="/macideas/icons/delete.svg" onClick={() => handleRemove(i)} />
              </label>
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
