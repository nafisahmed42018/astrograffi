'use client'
import React, { useEffect, useRef } from 'react'

class LightParticle {
  x: number
  y: number
  radius: number
  color: string

  constructor(x: number, y: number, radius: number, color: string) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
  }

  update(context: CanvasRenderingContext2D | null) {
    if (context) {
      this.draw(context)
    }
  }

  draw(context: CanvasRenderingContext2D) {
    context.save()
    context.beginPath()
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    context.shadowColor = this.color
    context.shadowBlur = 15
    context.shadowOffsetX = 0
    context.shadowOffsetY = 0
    context.fillStyle = this.color
    context.fill()
    context.closePath()
    context.restore()
  }
}

const StarTrail: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const lightParticles: LightParticle[] = []
  let timer = 0
  let opacity = 1
  let speed = 0.003
  const colors = [
    '#6f9fe8',
    '#A5BFF0',
    '#118CD6',
    '#1AAEE8',
    '#F2E8C9',
    '#2185C5',
    '#7ECEFD',
    '#FFF6E5',
    '#FF7F66',
  ]
  let isMouseDown = false
  const handleMouseDown = () => {
    isMouseDown = true
  }

  const handleMouseUp = () => {
    isMouseDown = false
  }


  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    canvas.width = document.body.clientWidth
    canvas.height = window.innerHeight

    const particleCount = 1200

    const initializeParticles = () => {
      for (let i = 0; i < particleCount; i++) {
        const canvasWidth = canvasRef.current!.width + 1000
        const canvasHeight = canvasRef.current!.height + 2000
        const randomColorIndex = Math.floor(Math.random() * 9)
        const randomRadius = Math.random() * 2
        const x = Math.random() * canvasWidth - canvasWidth / 2
        const y = Math.random() * canvasHeight - canvasHeight / 2
        lightParticles.push(
          new LightParticle(x, y, randomRadius, colors[randomColorIndex]),
        )
      }
    }

    initializeParticles()

    const animate = () => {
      const context = canvas.getContext('2d')
      if (!context) return

      requestAnimationFrame(animate)

      context.save()

      if (isMouseDown === true) {
        const desiredOpacity = 0.005 //.01
        opacity += (desiredOpacity - opacity) * 0.03
        context.fillStyle = `rgba(0, 0, 0, ${opacity})`

        const desiredSpeed = 0.004 //.012
        speed += (desiredSpeed - speed) * 0.01
        timer += speed
      } else {
        const originalOpacity = 1
        opacity += (originalOpacity - opacity) * 0.01
        context.fillStyle = `rgba(0, 0, 0, ${opacity})`

        const originalSpeed = 0.003
        speed += (originalSpeed - speed) * 0.01
        timer += speed
      }

      context.fillRect(0, 0, canvas.width, canvas.height)
      context.translate(canvas.width / 2, canvas.height / 2)
      context.rotate(timer)

      for (let i = 0; i < lightParticles.length; i++) {
        lightParticles[i].update(context)
      }

      context.restore()
    }

    window.addEventListener('resize', () => {
      canvas.width = document.body.clientWidth
      canvas.height = innerHeight
    })

    animate()
  }, [])

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}

    ></canvas>
  )
}

export default StarTrail
