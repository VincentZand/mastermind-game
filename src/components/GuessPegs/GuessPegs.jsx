import React from 'react';
import ColorPeg from '../ColorPeg/ColorPeg'
//CSS Sheet
import './GuessPegs.css';

const GuessPegs = (props) => {
    return (
        <div className="GuessPegs">
            <ColorPeg 
            currentGuess={props.currentGuess} 
            color={props.colors[props.code[0]]} 
            handlePegClick={props.handlePegClick} pegIdx={0}
            />
            <ColorPeg 
            currentGuess={props.currentGuess} 
            color={props.colors[props.code[1]]}
            handlePegClick={props.handlePegClick} pegIdx={1} 
            />
            <ColorPeg 
            currentGuess={props.currentGuess} 
            color={props.colors[props.code[2]]} 
            handlePegClick={props.handlePegClick} pegIdx={2}
            />
            <ColorPeg 
            currentGuess={props.currentGuess} 
            color={props.colors[props.code[3]]} 
            handlePegClick={props.handlePegClick} pegIdx={3}
            />
        </div>
    );
}

export default GuessPegs; 