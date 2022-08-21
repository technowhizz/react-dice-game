import React from "react"

export default function Dice(props){
    return(
        <div className={`dice ${props.state}`} onClick={() => props.hold(props.id)} name={props.id}>
            <h1 className="dice--number">{props.value}</h1>
        </div>
    )
}
