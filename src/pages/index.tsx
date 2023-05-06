import DraggableCards from '@components/draggable-cards'
import { Title } from '@components/title'
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

export default Home
