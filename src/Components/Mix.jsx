import "./Mix.css";
import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import uuid from "uuid/v4";
const operators = [
  { id: uuid(), content: "+" },
  { id: uuid(), content: "-" },
  { id: uuid(), content: "*" },
  { id: uuid(), content: "/" },
];
const operands = [
  { id: uuid(), content: "Operand A" },
  { id: uuid(), content: "Operand B" },
  { id: uuid(), content: "Operand C" },
];
const columnsData = {
  operators: {
    name: "Operators",
    items: operators,
  },
  operands: {
    name: "Operands",
    items: operands,
  },
  constructor: {
    name: "Constructor",
    items: [],
  },
};
export default function Mix() {
  const [columns, setColumns] = useState(columnsData);
  const onDragEnd = (result, columns, setColumns) => {
    console.log(result);
    if (!result.destination) {
      return;
    }
    const { source, destination } = result;
    console.log(source);
    console.log(destination);
    if (source.droppableId !== destination.droppableId) {
      console.log("hey");
      const sourceColumn = columns[source.droppableId];
      const destinationColumn = columns[destination.droppableId];
      console.log(sourceColumn, destinationColumn);
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destinationColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      console.log(removed);
      destItems.splice(destination.index, 0, removed);
      console.log(destItems);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destinationColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };
  console.log(columns["constructor"].items);
  return (
    <DragDropContext
      onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
    >
      <div className="container">
        <div className="functionContainer">
          <Droppable
            droppableId="operators"
            key="operators"
            direction="horizontal"
          >
            {(provided, snapshot) => {
              return (
                <>
                  <div className="line">
                    {columns["constructor"].items.map((i) => i.content + " ")}
                  </div>
                  <div
                    className="operatorsContainer"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{
                      background: snapshot.isDraggingOver
                        ? "lightblue"
                        : "transparent",
                    }}
                  >
                    {columns["operators"].items.map((item, index) => {
                      return (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided, snapshot) => {
                            return (
                              <div
                                className="operators"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  backgroundColor: snapshot.isDragging
                                    ? "#263b4a"
                                    : "#4badce",

                                  ...provided.draggableProps.style,
                                }}
                              >
                                {item.content}
                              </div>
                            );
                          }}
                        </Draggable>
                      );
                    })}
                  </div>
                </>
              );
            }}
          </Droppable>

          <Droppable
            droppableId="constructor"
            key="constructor"
            direction="horizontal"
          >
            {(provided, snapshot) => {
              return (
                <div
                  className="functionConstructorContainer"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{
                    background: snapshot.isDraggingOver
                      ? "lightblue"
                      : "transparent",
                  }}
                >
                  {columns["constructor"].items.map((item, index) => {
                    return (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided, snapshot) => {
                          return (
                            <div
                              className="operators"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                backgroundColor: snapshot.isDragging
                                  ? "#263b4a"
                                  : "#4badce",

                                ...provided.draggableProps.style,
                              }}
                            >
                              {item.content}
                            </div>
                          );
                        }}
                      </Draggable>
                    );
                  })}
                </div>
              );
            }}
          </Droppable>
        </div>
        <Droppable droppableId="operands" key="operands">
          {(provided, snapshot) => {
            return (
              <div
                className="operandContainer"
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  background: snapshot.isDraggingOver
                    ? "lightblue"
                    : "transparent",
                }}
              >
                {columns["operands"].items.map((item, index) => {
                  return (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => {
                        return (
                          <div
                            className="operand"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              backgroundColor: snapshot.isDragging
                                ? "#263b4a"
                                : "#4badce",

                              ...provided.draggableProps.style,
                            }}
                          >
                            {item.content}
                          </div>
                        );
                      }}
                    </Draggable>
                  );
                })}
              </div>
            );
          }}
        </Droppable>
      </div>
    </DragDropContext>
  );
}
