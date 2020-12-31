import React from 'react'
import useLatestData from '../utils/useLatestData'

function CurrentlySlicing(){
    return (
        <div>
            <p>Currently Slicing</p>
        </div>
    )
}

function HotSlices(){
    return (
        <div>
            <p>HotSlices</p>
        </div>
    )
}

export default function HomePage(){
    const {slicemasters, hotSlices} = useLatestData();
    return (
        <div className="center">
            <h1>The best pizza Downtown!</h1>
            <p>Open 11am to 11pm Every Single Day</p>
            <div>
                <CurrentlySlicing slicemasters={slicemasters} />
                <HotSlices HotSlices={hotSlices} />
            </div>
        </div>
    )
}