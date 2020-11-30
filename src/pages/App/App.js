import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch, 
  Route} from 'react-router-dom';
import './App.css';
import GamePage from '../GamePage/GamePage';
import SettingsPage from '../SettingsPage/SettingsPage';
import Modal from '../../components/Modal/Modal';





let colorTable = [
  {name: 'Makkelijk', colors: ['#00A399', '#B2D969', '#FAD02F', '#F04F50']},
  {name: 'Gevorderd', colors: ['#00A399', '#B2D969', '#FAD02F', '#F04F50', '#E58826']},
  {name: 'Moeilijk', colors: ['#00A399', '#B2D969', '#FAD02F', '#F04F50', '#E58826', '#555E7B']}
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = Object.assign(
      {difficultyLevel: 0, colors: colorTable[0].colors},
      this.getInitialState()
    );
  }
  // status van de Modal
  state = {
    show: false
  };
  showModal = e => {
    this.setState({
      show: !this.state.show
    });
  };

  // Helper methods

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

    // Always replace objects/arrays with NEW versions
    let guessesCopy = [...this.state.guesses];
    let codeArrCopy = [...guessesCopy[currentGuessIdx].code];

    // Update the NEW array
    codeArrCopy[pegIdx] = this.state.selColorIdx;

    // Update the NEW guesses array
    guessesCopy[currentGuessIdx].code = codeArrCopy;

    // Update state with the NEW guesses array
    this.setState({
      guesses: guessesCopy
    });
  }

  handleScoreCheck = () => {
    let currentGuessIdx = this.state.guesses.length - 1;

    // Computing the score will modify the guessed code and the
    // secret code, therefore create copies of the originals
    let guessCodeCopy = [...this.state.guesses[currentGuessIdx].code];
    let secretCodeCopy = [...this.state.code];

    let perfect = 0, almost = 0;

    // First pass computes number of "perfect"
    guessCodeCopy.forEach((code, idx) => {
      if (secretCodeCopy[idx] === code) {
        perfect++;
        // ensure does not match again
        guessCodeCopy[idx] = secretCodeCopy[idx] = null;
      }
    });

    // Second pass computes number of "almost"
    guessCodeCopy.forEach((code, idx) => {
      if (code === null) return;
      let foundIdx = secretCodeCopy.indexOf(code);
      if (foundIdx > -1) {
        almost++;
        secretCodeCopy[foundIdx] = null;
      }
    });

    // State must only be updated with NEW objects/arrays
    let guessesCopy = [...this.state.guesses];

    // Set scores
    guessesCopy[currentGuessIdx].score.perfect = perfect;
    guessesCopy[currentGuessIdx].score.almost = almost;

    // Add a new guess if not a winner
    if (perfect !== 4) guessesCopy.push(this.getNewGuess());

    // Finally, update the state with the NEW guesses array
    this.setState({
      guesses: guessesCopy
    });
}

  handleTick = () => {
    this.setState((prevState) => ({
      elapsedTime: ++prevState.elapsedTime
    }));
  }

  render() {
    return (
      <div>
        <header className='header-footer'>Mastermind</header>
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
        <div className="App">
        <h2>Dit is een modal window</h2>
        <Modal />
      </div>
      </div>
    );
  }
}




export default App;
