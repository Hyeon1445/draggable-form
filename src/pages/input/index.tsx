import { Title } from '@components/title'
import styled from '@emotion/styled'
import { Formik, Form } from 'formik'
import { useEffect, useState } from 'react'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd'
import * as yup from 'yup'

const initialValues = {
  items: ['name1', 'name2', 'name3', 'name4'],
}

const InputListPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  useEffect(() => setIsLoading(false), [])

  return (
    <div>
      <Title>Draggable Inputs</Title>
      <Formik
        initialValues={initialValues}
        validationSchema={yup.object().shape({
          items: yup.array().of(yup.string().required('필수 입력값입니다.')),
        })}
        onSubmit={(values) => {
          console.log(values)
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            {!isLoading && (
              <DragDropContext
                onDragEnd={(result: DropResult) => {
                  if (!result.destination) return
                  const { source, destination } = result
                  const item = values.items[source.index]
                  const newList = [...values.items]
                  newList.splice(source.index, 1)
                  newList.splice(destination.index, 0, item)
                  setFieldValue('items', newList)
                }}
              >
                <Droppable droppableId="list">
                  {(provided) => (
                    <CardContainer
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {values.items.map((item, index) => (
                        <Draggable key={item} draggableId={item} index={index}>
                          {(provided) => (
                            <Card
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                            >
                              <DragButton
                                className="material-icons"
                                {...provided.dragHandleProps}
                              >
                                menu
                              </DragButton>
                              {item}
                            </Card>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                      <Button type="submit">Submit</Button>
                    </CardContainer>
                  )}
                </Droppable>
              </DragDropContext>
            )}
          </Form>
        )}
      </Formik>
    </div>
  )
}

const Card = styled.li`
  user-select: none;
  height: 3rem;
  width: 10rem;
  background-color: teal;
  color: white;
  margin: 0.5rem 0;
  display: flex;
  align-items: center;
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

const DragButton = styled.div`
  color: white;
  font-size: 16px;
  margin: 0 0.5rem;
`

const Button = styled.button`
  background-color: white;
  color: teal;
  border: 2px solid teal;
  font-weight: 800;
  height: 2rem;
  width: 5rem;
  margin: 1rem auto 0;
`

export default InputListPage
