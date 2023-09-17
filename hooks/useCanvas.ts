import React, { useRef, useState, useEffect } from 'react'

export const useCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mouseDown, setMouseDown] = useState(false)
  const [particles, setParticles] = useState<Particle[]>([])
  let radians = 0
  let alpha = 1

  const colors: string[] = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    if (!ctx) return

    canvas.width = innerWidth
    canvas.height = innerHeight

    const handleResize = () => {
      canvas.width = innerWidth
      canvas.height = innerHeight
      init()
    }
    const handleMouseDown = () => {
      setMouseDown(true)
    }
    const handleMouseUp = () => {
      setMouseDown(false)
    }

    canvas.addEventListener('mousedown', handleMouseDown)
    canvas.addEventListener('mouseup', handleMouseUp)
    canvas.addEventListener('resize', handleResize)

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown)
      canvas.removeEventListener('mouseup', handleMouseUp)
      canvas.removeEventListener('resize', handleResize)
    }
  }, [])

  class Particle {
    constructor(
      public x: number,
      public y: number,
      public radius: number,
      public color: string,
    ) {}

    draw() {
      const ctx = canvasRef.current?.getContext('2d')
      if (!ctx) return

      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
      ctx.fillStyle = this.color
      ctx.shadowColor = this.color
      ctx.shadowBlur = 15
      ctx.fill()
      ctx.closePath()
    }

    update() {
      this.draw()
    }
  }
  let newParticles: Particle[]
  const init = () => {
    newParticles = []

    for (let i = 0; i < 200; i++) {
      const canvasWidth = canvasRef.current!.width + 300
      const canvasHeight = canvasRef.current!.height + 300
      const x = Math.random() * canvasWidth - canvasWidth / 2
      const y = Math.random() * canvasHeight - canvasHeight / 2
      const radius = 2 * Math.random()
      const color = colors[Math.floor(Math.random() * colors.length)]

      newParticles.push(new Particle(x, y, radius, color))
    }

    setParticles(newParticles)
  }

  useEffect(() => {
    init()
  }, [])

  const animate = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    requestAnimationFrame(animate)
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return
    ctx.fillStyle = `rgba(10,10,10,${alpha})`
    ctx.clearRect(
      0,
      0,
      canvasRef.current?.width || 0,
      canvasRef.current?.height || 0,
    )

    ctx.save()
    ctx.translate(canvas.width / 2, canvas.height / 2)
    ctx.rotate(radians)
    particles.forEach((particle) => {
      particle.update()
    })
    ctx.restore()

    radians += 0.005
    if (mouseDown && alpha >= 0.1) {
      alpha -= 0.01
    } else if (!mouseDown && alpha < 1) {
      alpha += 0.01
    }
  }

  useEffect(() => {
    animate()
  }, [particles, mouseDown])

  return { canvasRef }
}
