import React, { useRef, useEffect } from 'react'

const Canvas = props => {

    const canvasRef = useRef(null)

    const draw = ctx => {
        props.map(item => {
        ctx.fillstyle = '#000000'
        ctx.beginPath()
        ctx.arc(item.x, item.y, item.rad, 0, 2*Math.PI)
        ctx.stroke()
        }
        )}

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')

        draw(context)
        //Our first draw 
      }, [canvasRef])


return <canvas ref = {canvasRef}/>

}

export default Canvas