import React, { useEffect, useRef } from 'react'

export const useCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)



  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')

    const mouse = {
      x: innerWidth / 2,
      y: innerHeight / 2,
    }
    canvas!.width = innerWidth
    canvas!.height = innerHeight

    const mouseHandler = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    const handleResize = () => {
      canvas!.width = innerWidth
      canvas!.height = innerHeight
    }

    // const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

    canvas?.addEventListener('mousemove', mouseHandler)
    // canvas?.addEventListener('resize', handleResize)
    return () => canvas?.removeEventListener('mousemove', mouseHandler)
  }, [])

  return { canvasRef }
}
