import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Box } from "grommet";
const SortableItem = (props: any) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: "45%",
    height: "100%",
    backgroundColor: "#cccccc",
    margin: "10px",
    zIndex: isDragging ? "100" : "auto",
    opacity: isDragging ? 0.3 : 1
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Box>
        <button {...listeners} {...attributes}>
          Drag handle
        </button>
        <div
          style={{
            minWidth: "30px",
            minHeight: "20px",
            border: "1px solid balck",
            borderColor: "black"
          }}
        >
          {props.children}
        </div>
      </Box>
    </div>
  );
};

export default SortableItem;
