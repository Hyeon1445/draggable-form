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
    <>
      <Title>Draggable Cards</Title>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="list">
          {(provided) => (
            <CardContainer {...provided.droppableProps} ref={provided.innerRef}>
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
            </CardContainer>
          )}
        </Droppable>
      </DragDropContext>
    </>
  )
}

const Card = styled.li`
  user-select: none;
  cursor: pointer;
  height: 3rem;
  width: 10rem;
  background-color: teal;
  color: white;
`

const CardContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1.5rem;
  background-color: #f2f2f2;
  padding: 1rem;
  list-style: none;
  width: 13rem;
`

const Title = styled.p`
  color: teal;
  font-weight: bold;
  font-size: 14px;
  padding: 1.5rem 1.5rem 0;
`

export default SimpleDndExample
