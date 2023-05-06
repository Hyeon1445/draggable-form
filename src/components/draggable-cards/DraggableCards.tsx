import { useState } from 'react'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd'
import * as S from './DraggableCards.style'

const items = ['1', '2', '3', '4', '5']
const DraggableCards = () => {
  const [list, setList] = useState<Array<string>>(items)

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
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="list">
        {(provided) => (
          <S.CardContainer {...provided.droppableProps} ref={provided.innerRef}>
            {list.map((item, index) => (
              <Draggable key={item} draggableId={item} index={index}>
                {(provided) => (
                  <S.Card
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {item}
                  </S.Card>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </S.CardContainer>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default DraggableCards
