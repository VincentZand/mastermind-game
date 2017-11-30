import React from 'react';
import ColorPeg from '../ColorPeg/ColorPeg'

const GuessPegs = (props) => {
    return (
        <div>
            <ColorPeg color={props.colors[props.code[0]]} />
            <ColorPeg color={props.colors[props.code[1]]} />
            <ColorPeg color={props.colors[props.code[2]]} />
            <ColorPeg color={props.colors[props.code[3]]} />
        </div>
    );
}

export default GuessPegs; 