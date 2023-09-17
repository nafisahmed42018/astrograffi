'use client'

import { useCanvas } from '@/hooks/useCanvas'
import { randomIntFromRange, randomColor, distance } from '@/utils/startrail'

const StarTrail = () => {
  const { canvasRef } = useCanvas()
  return (
    <div className="flex items-center justify-center h-[100vh] w-[100vw]">
      <canvas ref={canvasRef}  />
    </div>
  )
}

export default StarTrail
