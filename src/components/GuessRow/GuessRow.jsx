import React from 'react';
import ColorPeg from '../ColorPeg/ColorPeg';
import GuessPegs from '../GuessPegs/GuessPegs';
import GuessScore from '../GuessScore/GuessScore';

const GuessRow = (props) => {
    return (
        <div>
            <ul>
            ###
            <GuessPegs />
                <div><ColorPeg /></div>
                <div><ColorPeg /></div>
                <div><ColorPeg /></div>
                <div><ColorPeg /></div>
            <GuessScore />
            </ul>
        </div>
    );
}

export default GuessRow;