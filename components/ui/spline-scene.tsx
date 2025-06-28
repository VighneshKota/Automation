"use client"

import { useEffect, useRef } from "react"

export const SplineScene = ({ className }: { className: string }) => {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let spline: any
    ;(async () => {
      spline = await import("@splinetool/react-spline")
      if (container.current) {
        const scene = new spline.default.Scene(container.current)
        scene.load("https://prod.spline.design/jXeo9eu4IeFq-5Rj/scene.splinecode")
      }
    })()
    return () => {
      if (spline && container.current) {
        //spline.unload(container.current);
      }
    }
  }, [])

  return <div className={className} ref={container} />
}
