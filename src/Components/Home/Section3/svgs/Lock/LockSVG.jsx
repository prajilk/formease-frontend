import React from 'react'
import './LockSVG.css'

const LockSVG = ({ w, h }) => {
    return (
        <div>
            <svg id="LockSVG" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 150 70" shapeRendering="geometricPrecision" textRendering="geometricPrecision" style={{ width: `${w}px`, height: `${h}px` }}>
                <g id="lock" transform="translate(50,50) rotate(0)">
                    <g transform="translate(-50,-50)">
                        <path d="M68,38c0-11.0457-7.1634-20-16-20s-16,8.9543-16,20" fill="none" stroke="#7a73ff"
                            strokeWidth="5" strokeDasharray="56.73" />
                        <g>
                            <rect width="45" height="45" rx="4.5" ry="4.5" transform="translate(29.5 40.5)"
                                fill="#ffffff" stroke="#7a73ff" strokeWidth="5" />
                            <g>
                                <polygon
                                    points="0,-1.391563 4.28279,-1.391563 2.64691,3.643159 -2.64691,3.643159 -4.28279,-1.391563 0,-1.391563"
                                    transform="matrix(-1 0 0-2.375878 52 71.655701)" fill="#00bfff"
                                    strokeWidth="0" />
                                <circle r="5" transform="translate(52 60)" fill="#00bfff" />
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
        </div>
    )
}

export default LockSVG
