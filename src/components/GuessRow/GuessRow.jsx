import React from 'react';
import GuessPegs from '../GuessPegs/GuessPegs';
import GuessScore from '../GuessScore/GuessScore';
import ScoreButton from '../ScoreButton/ScoreButton';
// CSS stylesheet
import './GuessRow.css';

const GuessRow = (props) => {
    return (
        <div className="GuessRow">
            <div 
            className="GuessRow-Num" 
            style={{color: props.currentGuess ? 'black' : 'lightgrey'}}>
            {props.rowIdx + 1}
            </div>
        <GuessPegs 
        code={props.guess.code} 
        colors={props.colors} 
        currentGuess={props.currentGuess}
        handlePegClick={props.handlePegClick}
        />
        {props.currentGuess && (props.guess.score.perfect !== 4) ? <ScoreButton handleScoreCheck={props.handleScoreCheck} disabled={props.guess.code.includes(null)} /> : 
        <GuessScore score={props.guess.score} /> }
        </div>
    );
}

export default GuessRow;