import React from 'react';

const ColorPeg = (props) => {
    let style = {
        width: 40,
        height: 40,
        margin: 5,
        borderRadius: '50%',
        backgroundColor: props.color,
        opacity: 0.85,
        border: props.color || '2px dashed gray',
        cursor: props.currentGuess && 'pointer'
    };

    return (
        <div 
        style={style}
        onClick={() => props.handlePegClick(props.pegIdx)}
        />
    )
}

export default ColorPeg;