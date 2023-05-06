import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd'

const items = ['1', '2', '3', '4', '5']

const Home = () => {
  const [list, setList] = useState<Array<string>>(items)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => setIsLoading(true), [])

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return
    const { source, destination } = result // source.index: 원위치, destination.index: 목적지
    const item = list[source.index] // 이동할 item
    const newList = [...list]
    newList.splice(source.index, 1) // 이동할 item 삭제
    newList.splice(destination.index, 0, item) // item 새 위치에 끼워넣기
    setList(newList)
  }

  return (
    <div>
      <Title>Draggable Cards</Title>
      {isLoading && (
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="list">
            {(provided) => (
              <CardContainer
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {list.map((item, index) => (
                  <Draggable key={item} draggableId={item} index={index}>
                    {(provided) => (
                      <Card
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
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
      )}
    </div>
  )
}

const Card = styled.li`
  user-select: none;
  cursor: pointer;
  height: 3rem;
  width: 10rem;
  background-color: teal;
  color: white;
  margin: 0.5rem 0;
`

const CardContainer = styled.ul`
  display: flex;
  flex-direction: column;
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

export default Home
