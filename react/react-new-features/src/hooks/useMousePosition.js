import { useState, useEffect } from 'react'

// just naming convention to start with 'use'
const useMousePosition = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 }) // it's okay to track multiple info inside the same useState if the info naturally gets updated at the same time (e.g. mouse position through the mouse movement event )

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosition({
                x: e.pageX,
                y: e.pageY
            })
        }

        console.log('setting up event')
        document.addEventListener('mousemove', handleMouseMove)

        return () => {
            console.log('removing event')
            document.removeEventListener('mousemove', handleMouseMove)
        }
    }, [])

    return position
}

export default useMousePosition