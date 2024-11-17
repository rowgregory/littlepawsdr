import { useState } from 'react'

interface UseSingleItemCarouselReturn<T> {
  currentItem: T
  currentIndex: number
  next: () => void
  previous: () => void
  totalItems: number
  setCurrentIndex: (index: number) => void
}

const useSingleItemCarousel = <T>(items: T[]): UseSingleItemCarouselReturn<T> => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const totalItems = items.length

  const next = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems)
  }

  const previous = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalItems) % totalItems)
  }

  return {
    currentItem: items[currentIndex],
    currentIndex,
    next,
    previous,
    totalItems,
    setCurrentIndex
  }
}

export default useSingleItemCarousel
