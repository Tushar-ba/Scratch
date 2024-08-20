import React, { useState } from "react";
import MotionBlock from "./components/MotionBlock";
import Workspace from "./components/Workspace";
import CatSprite from "./components/CatSprite";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  const [stack, setStack] = useState([]);
  const [executedActions, setExecutedActions] = useState([]);

  const handleStackChange = (newStack) => {
    setStack(newStack);
  };

  const handleExecute = (action) => {
    // Immediately execute new action
    setExecutedActions([action]);
  };

  const handleReplay = (newStack) => {
    // Replay the entire stack
    setExecutedActions(newStack);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen">
        <div className="w-1/3 bg-gray-100 p-4">
          <h2 className="text-xl mb-4">Motion</h2>
          <MotionBlock action="Move 10 steps" />
          <MotionBlock action="Turn 15 degrees" />
          <MotionBlock action="Go back 10 steps" /> {/* New action */}
          <MotionBlock action="Turn -15 degrees" /> {/* New action */}
          
          <h2 className="text-xl mt-8 mb-4">Looks</h2> {/* New section */}
          <MotionBlock action="Say Hello" /> {/* New action */}
          <MotionBlock action="Disappear" /> {/* New action */}
          {/* Add more looks blocks if needed */}
        </div>
        <div className="w-1/3">
          <Workspace onStackChange={handleStackChange} onExecute={handleExecute} onReplay={handleReplay} />
        </div>
        <div className="w-1/3">
          <CatSprite actions={executedActions} />
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
