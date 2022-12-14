import React from 'react'

export default function Dice(props) {
    const styles = { backgroundColor: props.isHeld ? "#59E391" : "#FFF" }

    return (
        <div style={styles} className='dice' onClick={props.holdDice}>
            {props.isDots ?
                <img className='dice-dots' src={`./images/dice-${props.value}.png`} />
                :
                <p>{props.value}</p>}

        </div>
    )
}
