import React, { useState, useRef } from "react";
import { useDrop } from "react-dnd";

function Workspace({ onStackChange, onExecute, onReplay }) {
  const [stack, setStack] = useState([]);
  const [isReplaying, setIsReplaying] = useState(false);
  const replayTimeout = useRef(null);

  const [{ isOver }, drop] = useDrop({
    accept: "block",
    drop: (item) => {
      if (!isReplaying) {
        // Add the new action to the stack with a unique ID
        const newStack = [...stack, { id: Date.now(), action: item.action }];
        setStack(newStack);
        onStackChange(newStack);
        onExecute(item.action);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const handleReplay = () => {
    if (isReplaying) return; // Prevent starting a new replay if one is already in progress

    setIsReplaying(true);
    const replayActions = stack.map(({ action }) => action); // Extract actions for replay

    const replayNextAction = (index) => {
      if (index < replayActions.length) {
        onExecute(replayActions[index]);
        replayTimeout.current = setTimeout(() => replayNextAction(index + 1), 1000); // Delay between actions (adjust as needed)
      } else {
        setIsReplaying(false);
        if (replayTimeout.current) {
          clearTimeout(replayTimeout.current); // Clear timeout on completion
        }
      }
    };

    replayNextAction(0); // Start replaying from the beginning
  };

  return (
    <div ref={drop} className="h-full p-4 bg-white border border-gray-300">
      <h2 className="text-xl mb-4">Workspace</h2>
      <div className="mb-4">
        <button
          onClick={handleReplay}
          className="bg-blue-500 text-white p-2 rounded"
          disabled={isReplaying}
        >
          Replay
        </button>
      </div>
      {stack.map(({ id, action }, index) => (
        <div key={id} className="mb-2">
          {action}
        </div>
      ))}
    </div>
  );
}

export default Workspace;
