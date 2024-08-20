// MotionBlock.js
import React from "react";
import { useDrag } from 'react-dnd';

const MotionBlock = ({ action }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'block',
    item: { action },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-2 my-2 bg-lime-500 text-white rounded ${isDragging ? 'opacity-50' : ''}`}
    >
      {action}
    </div>
  );
};

export default MotionBlock;
