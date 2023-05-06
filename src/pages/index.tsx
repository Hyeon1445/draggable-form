import DraggableCards from '@components/draggable-cards'
import styled from '@emotion/styled'
import { useEffect, useState } from 'react'

const Home = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  useEffect(() => setIsLoading(true), [])

  return (
    <div>
      <Title>Draggable Cards</Title>
      {isLoading && <DraggableCards />}
    </div>
  )
}

const Title = styled.p`
  color: teal;
  font-weight: bold;
  font-size: 14px;
  padding: 1.5rem 1.5rem 0;
`

export default Home
