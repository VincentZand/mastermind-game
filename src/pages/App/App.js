import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch, 
  Route} from 'react-router-dom';
import './App.css';
import GamePage from '../GamePage/GamePage';
import SettingsPage from '../SettingsPage/SettingsPage';

let colorTable = [
  {name: 'Easy', colors: ['#00A399', '#B2D969', '#FAD02F', '#F04F50']},
  {name: 'Moderate', colors: ['#00A399', '#B2D969', '#FAD02F', '#F04F50', '#E58826']},
  {name: 'Difficult', colors: ['#00A399', '#B2D969', '#FAD02F', '#F04F50', '#E58826', '#555E7B']}
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = Object.assign(
      {difficultyLevel: 0, colors: colorTable[0].colors, scores: []},
      this.getInitialState()
    );
  }

  // Helper methods

  componentWillMount() {
    console.log('App: componentWillMount')
  }

  componentDidMount() {
    console.log('App; componentDidMount')
  }

  getInitialState() {
    return {
      code: this.genCode(colorTable[0].colors.length),
      selColorIdx: 0,
      guesses: [this.getNewGuess()],
      elapsedTime: 0,
      finalTime: 0
    };
  }

  getNewGuess() {
    return {
      code: [null, null, null, null],
      score: {
        perfect: 0,
        almost: 0
      }
    };
  }

  genCode(size) {
    return new Array(size).fill().map(dummy => Math.floor(Math.random() * size));
  }

  setDifficulty = (level) => {
    this.setState({
      difficultyLevel: level,
      colors: colorTable[level].colors
    });
  }


  // Event handlers & callback methods
  handleNewGame = () => {
    this.setState(this.getInitialState());
  }

  handleColorSelection = (colorIdx) => {
    this.setState({selColorIdx: colorIdx});
  }

  handlePegClick = (pegIdx) => {
    let currentGuessIdx = this.state.guesses.length - 1;

    // get copy of state.guesses
    let copyGuesses = [...this.state.guesses];

    // get copy of code array of the last guess
    let copyCode = [...copyGuesses[currentGuessIdx].code];

    // change copy of code array
    copyCode[pegIdx] = this.state.selColorIdx;

    // put copy code into copy guess
    copyGuesses[currentGuessIdx].code = copyCode;

    // setState with new guesses
    this.setState({guesses: copyGuesses});
  }

  handleScoreCheck = () => {
    let currentGuessIdx = this.state.guesses.length - 1;

    // compute score will modify guessed code and secret code, so create copies of originals

    let guessCodeCopy = [...this.state.guesses[currentGuessIdx].code];
    let secretCodeCopy = [...this.state.code];

    let perfect = 0, almost = 0;

    // first pass computes number of 'perfect'
    guessCodeCopy.forEach((code, idx) => {
      if (secretCodeCopy[idx] === code) {
        perfect++;
        // ensure doesn't match again
        guessCodeCopy[idx] = secretCodeCopy[idx] = null;
      }
    });

    // second pass computes number of 'almost'
    guessCodeCopy.forEach((code, idx) => {
      if (code === null) return;
      let foundIdx = secretCodeCopy.indexOf(code);
      if (foundIdx > -1) {
        almost++;
        secretCodeCopy[foundIdx] = null;
      }
    });

    // state must only be updated with new object/arrays
    let copyGuesses = [...this.state.guesses];

    // set scores
    copyGuesses[currentGuessIdx].score.perfect = perfect;
    copyGuesses[currentGuessIdx].score.almost = almost;

    // add new guess if not a winner
    if (perfect !== 4) copyGuesses.push(this.getNewGuess());

    // lastly, update state with new guesses array
    this.setState(prevState => ({
      guesses: copyGuesses,
      finalTime: (perfect === 4) ? prevState.elapsedTime : 0
    }));
}

  handleTick = () => {
    this.setState((prevState) => ({
      elapsedTime: ++prevState.elapsedTime
    }));
  }

  render() {
    return (
      <div>
        <header className='header-footer'>R E A C T &nbsp;&nbsp; M A S T E R M I N D</header>
        <Router>
          <Switch>
            <Route exact path ='/' render={() =>
              <GamePage 
                colors={this.state.colors}
                guesses={this.state.guesses}
                handleColorSelection={this.handleColorSelection}
                handleNewGame={this.handleNewGame}
                handlePegClick={this.handlePegClick}
                handleScoreCheck={this.handleScoreCheck}
                elapsedTime={this.state.elapsedTime}
                interval={1000}
                handleTick={this.handleTick}
                isTiming={!this.state.finalTime}
              />
            }/>
            <Route exact path='/settings' render={() => 
              <SettingsPage 
              colorTable={colorTable}
              difficultyLevel={this.state.difficultyLevel}
              handleDifficultyChange={this.setDifficulty}
              handleNewGame={this.handleNewGame}
              />
            }/>
          </Switch>
        </Router>
      </div>
    );
  }
}


export default App;
