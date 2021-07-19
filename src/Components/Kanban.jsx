import { useState } from 'react';
import '../App.css';
import { DragDropContext,  Droppable, Draggable } from 'react-beautiful-dnd'
import uuid from 'uuid/v4'

const items = [
  {id: uuid(), content: 'First Task'},
  {id: uuid(), content: 'Second Task'}
]

const columnsData = 
  {
    [uuid()]: {
      name: 'Bucket List',
      items: items
    },
    [uuid()]: {
      name: 'In Progress',
      items: []
    },
    [uuid()]: {
      name: 'Done',
      items: []
    }
  }

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) {
    return
  }
  const {source, destination} = result;
  console.log(result)
  console.log(source)
  console.log(destination)
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId]
    const destinationColumn = columns[destination.droppableId]
    const sourceItems = [...sourceColumn.items]
    const destItems = [...destinationColumn.items]
    const [removed] = sourceItems.splice(source.index, 1)
    console.log(removed)
    destItems.splice(destination.index, 0, removed)
    setColumns({...columns,[source.droppableId]:{
      ...sourceColumn,
      items:sourceItems
    },
    [destination.droppableId] : {
      ...destinationColumn,
      items:destItems
    }
  })
  } else {
    const column = columns[source.droppableId]
    const copiedItems = [...column.items]
    const [removed] = copiedItems.splice(source.index, 1)
    copiedItems.splice(destination.index, 0, removed)
    setColumns({
      ...columns, 
      [source.droppableId]:{
        ...column,
        items: copiedItems
      }
    })
  }
}

export default function Kanban() {
  const [columns, setColumns] = useState(columnsData)
  console.log('hey')
  return(
    <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
        {Object.entries(columns).map(([id, column]) => {
          return (
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
            key={id}
            >
              <h2>{column.name}</h2>
              <div style={{ margin: 8 }}>
            <Droppable droppableId={id} key={id}>
              {
                (provided, snapshot) => {
                  return (
                    <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{
                      background: snapshot.isDraggingOver
                        ? "lightblue"
                        : "lightgrey",
                      padding: 4,
                      width: 250,
                      minHeight: 500
                    }}
                    >
                      {column.items.map((item, index)=> {
                        return (
                          <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided, snapshot) => {
                              return (
                                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                                style={{
                                  userSelect:'none',
                                  padding:16,
                                  margin: '0 0 8px 0',
                                  minHeight: '50px',
                                  backgroundColor: snapshot.isDragging ? '#263b4a' : '#456C86',
                                  color: 'white',
                                  ...provided.draggableProps.style
                                }}
                                >
                                  {item.content}
                                </div>
                              )
                            }}
                          </Draggable>
                        )
                      })}
                      {provided.placeholder}
                    </div>
                  )
                }
              }
            </Droppable>
            </div>
            </div>
          )
        })}
      </DragDropContext>

  )
}