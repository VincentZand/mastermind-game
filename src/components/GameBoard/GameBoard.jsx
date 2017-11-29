import React from 'react';
import ColorPicker from '../ColorPicker/ColorPicker';
import GuessRow from '../GuessRow/GuessRow';
import NewGameButton from '../NewGameButton/NewGameButton';
import ScoreButton from '../ScoreButton/ScoreButton';

const GameBoard = (props) => {
    return (
        <div>
        <GuessRow />
        <GuessRow />
        <ColorPicker />
        <NewGameButton />
        <ScoreButton />
        </div>
    );
}

export default GameBoard;