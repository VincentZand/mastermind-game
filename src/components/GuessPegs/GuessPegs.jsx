import React from 'react';
import ColorPeg from '../ColorPeg/ColorPeg'
//CSS Sheet
import './GuessPegs.css';

const GuessPegs = (props) => {
    return (
        <div className="GuessPegs">
            <ColorPeg
                color={props.colors[props.code[0]]}
                currentGuess={props.currentGuess}
                handlePegClick={() => props.handlePegClick(0)}
            />
            <ColorPeg
                color={props.colors[props.code[1]]}
                currentGuess={props.currentGuess}
                handlePegClick={() => props.handlePegClick(1)}
            />
            <ColorPeg
                color={props.colors[props.code[2]]}
                currentGuess={props.currentGuess}
                handlePegClick={() => props.handlePegClick(2)}
            />
            <ColorPeg
                color={props.colors[props.code[3]]}
                currentGuess={props.currentGuess}
                handlePegClick={() => props.handlePegClick(3)}
            />
        </div>
    );
}

export default GuessPegs; 