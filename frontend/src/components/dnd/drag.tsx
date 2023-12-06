import { Draggable } from "react-beautiful-dnd";

export const Drag = ({ id, index, isDraggable, ...props }: any) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...props}
            {...(isDraggable ? provided.dragHandleProps : {})}
            isBeingDragged={snapshot.isDragging && !snapshot.isDropAnimating}
          >
            {props.children}
          </div>
        );
      }}
    </Draggable>
  );
};
