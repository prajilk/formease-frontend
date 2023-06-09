import React from 'react'
import './GearSVG.css'

const GearSVG = ({ w, h }) => {

    return (
        <div>
            <svg id="GearSVG" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 150 70" shapeRendering="geometricPrecision" textRendering="geometricPrecision" style={{ width: `${w}px`, height: `${h}px` }}>
                <g id="gearGrp">
                    <g id="smallGear" transform="translate(40.499998,39.5) rotate(0)">
                        <g transform="translate(-40.499998,-39.5)">
                            <path
                                d="M37.6402,22.427c.5879-3.1711,5.1317-3.1711,5.7196,0v0c.4205,2.2685,3.1883,3.1678,4.8618,1.5797v0c2.3396-2.22,6.0156.4509,4.6273,3.3619v0c-.9932,2.0824.7174,4.4368,3.0047,4.1357v0c3.1977-.4208,4.6018,3.9007,1.7675,5.4397v0c-2.0275,1.1009-2.0275,4.0111,0,5.112v0c2.8343,1.539,1.4302,5.8605-1.7675,5.4397v0c-2.2873-.3011-3.9979,2.0533-3.0047,4.1357v0c1.3883,2.911-2.2877,5.5819-4.6273,3.3619v0c-1.6735-1.5881-4.4413-.6888-4.8618,1.5797v0c-.5879,3.1711-5.1317,3.1711-5.7196,0v0c-.4205-2.2685-3.1883-3.1678-4.8618-1.5797v0c-2.3396,2.22-6.0156-.4509-4.6273-3.3619v0c.9932-2.0824-.7174-4.4368-3.0047-4.1357v0c-3.1977.4208-4.6018-3.9007-1.7675-5.4397v0c2.0275-1.1009,2.0275-4.0111,0-5.112v0c-2.8343-1.539-1.4302-5.8605,1.7675-5.4397v0c2.2873.3011,3.9979-2.0533,3.0047-4.1357v0c-1.3883-2.911,2.2877-5.5819,4.6273-3.3619v0c1.6735,1.5881,4.4413.6888,4.8618-1.5797v0Z"
                                fill="#00bfff" />
                            <ellipse rx="9.75001" ry="9.75" transform="translate(40.5001 39.5)" fill="#fff" />
                        </g>
                    </g>
                    <g id="largeGear" transform="translate(74.999916,75.000072) rotate(0)">
                        <g transform="translate(-74.999916,-75.000072)">
                            <path
                                d="M71.067,46.2163c.8085-4.3612,7.0575-4.3612,7.866,0l.626,3.3771c.5783,3.1197,4.3847,4.3565,6.6863,2.1725l2.4915-2.3641c3.2175-3.0531,8.2731.62,6.3637,4.6235l-1.4785,3.1c-1.3659,2.8639.9866,6.1018,4.1323,5.6877l3.4057-.4481c4.397-.5788,6.328,5.3644,2.43,7.481l-3.018,1.6389c-2.7884,1.5141-2.7884,5.5163,0,7.0304l3.018,1.6389c3.898,2.1166,1.967,8.0598-2.43,7.481l-3.4057-.4481c-3.1457-.4141-5.4982,2.8238-4.1323,5.6877l1.4785,3.1c1.9094,4.0035-3.1462,7.6763-6.3637,4.6233l-2.4915-2.3639c-2.3016-2.184-6.108-.9472-6.6863,2.1729l-.626,3.377c-.8085,4.361-7.0575,4.361-7.866,0l-.626-3.377c-.5783-3.1201-4.3847-4.3569-6.6863-2.1729l-2.4915,2.3639c-3.2175,3.053-8.2731-.6198-6.3637-4.6233l1.4785-3.1c1.3659-2.8639-.9866-6.1018-4.1323-5.6877l-3.4052.4481c-4.3976.5788-6.3287-5.3644-2.4307-7.481l3.0183-1.6389c2.7883-1.5141,2.7883-5.5163,0-7.0304l-3.0184-1.6389c-3.8979-2.1166-1.9668-8.0598,2.4308-7.481l3.4052.4481c3.1457.4141,5.4982-2.8238,4.1323-5.6877l-1.4785-3.1c-1.9094-4.0035,3.1462-7.6766,6.3637-4.6235l2.4915,2.3641c2.3016,2.184,6.108.9472,6.6863-2.1725l.626-3.3771Z"
                                fill="#7a73ff" />
                            <circle r="15" transform="translate(75 75)" fill="#fff" />
                        </g>
                    </g>
                </g>
            </svg>
        </div>
    )
}

export default GearSVG
