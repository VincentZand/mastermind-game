import React from 'react';
import {Link} from 'react-router-dom';
import './GamePage.css';
import GameBoard from '../../components/GameBoard/GameBoard';
import ColorPicker from '../../components/ColorPicker/ColorPicker';
import NewGameButton from '../../components/NewGameButton/NewGameButton';
import GameTimer from '../../components/GameTimer/GameTimer';

const GamePage = (props) => {

  // if winner, return num guesses, otherwise 0 (no winner)
  let lastGuess = props.guesses.length - 1;
  let winTries = props.guesses[lastGuess].score.perfect === 4 ? lastGuess + 1 : 0;

  return (
    <div className="GamePage">
      <div className="GamePage-game">
        <GameBoard
          guesses={props.guesses}
          colors={props.colors}
          handlePegClick={props.handlePegClick}
          handleScoreCheck={props.handleScoreCheck}
        />
        <div className="GamePage-controls"><b>Kies een kleur:</b><br></br>
          <ColorPicker
            handleColorSelection={props.handleColorSelection}
            colors={props.colors}
            selColorIdx={props.selColorIdx}
          />
          <GameTimer 
          elapsedTime={props.elapsedTime}
          interval={1000}
          handleTick={props.handleTick}
          isTiming={props.isTiming}
          />
          <Link className='btn btn-default' style={{ margin: '0 10px'}} to='/settings'>Moeilijkheidsgraad</Link>
          <NewGameButton handleNewGame={props.handleNewGame}/>
        </div>
      </div>
      <footer className='header-footer'>{(winTries ? `U won in ${winTries} pogingen!` : 'Probeer de code op te lossen door de juiste kleurcode in te vullen.')}</footer>
   
      
      <footer>&copy; Vincent Zandstra</footer>
    </div>
  );

}

export default GamePage;