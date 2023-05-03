import styled from '@emotion/styled'
import { useState } from 'react'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd'

const items = ['1', '2', '3', '4', '5']

const SimpleDndExample = () => {
  const [list, setList] = useState(items)

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return
    const { source, destination } = result
    const item = list[source.index]
    const newList = [...list]
    newList.splice(source.index, 1)
    newList.splice(destination.index, 0, item)
    setList(newList)
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="list">
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {list.map((item, index) => (
              <Draggable key={item} draggableId={item} index={index}>
                {(provided) => (
                  <Card
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={provided.draggableProps.style}
                  >
                    {item}
                  </Card>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  )
}

const Card = styled.li`
  user-select: none;
  cursor: pointer;
  height: 3rem;
  width: 10rem;
  background-color: yellow;
`

export default SimpleDndExample
