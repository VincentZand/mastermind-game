import React, { Component } from 'react';
import './App.css';
import GameBoard from './components/GameBoard/GameBoard';
import ColorPicker from './components/ColorPicker/ColorPicker';
import NewGameButton from './components/NewGameButton/NewGameButton';

let headFootStyle = {
  height: 50,
  padding: 10,
  margin: '15px 0',
  color: 'grey',
  fontSize: 18,
  textAlign: 'center'
}
let colors = ['#00A399', '#B2D969', '#FAD02F', '#F04F50'];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      colors,
      code: this.genCode(colors.length),
      selColorIdx: 0,
      guesses: [this.getNewGuess()]
    };
  }

  getNewGuess() {
    return {
      code: [null, null, null, null],
      // code: [3, 2, 1, 0], // for testing purposes
      score: {
        perfect: 0,
        almost: 0
      }
    };
  }

  genCode(size) {
    return new Array(size).fill().map(dummy => Math.floor(Math.random() * size));
  }

  getWinTries() {
    // if winner, return num guesses, otherwise 0 (no winner)
    let lastGuess = this.state.guesses.length - 1;
    return this.state.code.join() === this.state.guesses[lastGuess].code.join() ? lastGuess + 1 : 0;
  }

  // Event handlers
  handleNewGame = () => {
    this.setState(this.getInitialState());
  }

  handleColorSelection = (colorIdx) => {
    this.setState({selColorIdx: colorIdx});
  }

  handlePegClick = (pegIdx) => {
    // get copy of state.guesses
    let copyGuesses = [...this.state.guesses];

    // get copy of last guess
    let copyGuess = Object.assign({}, this.state.guesses.last());

    // get copy of code array of the last guess
    let copyCode = [...copyGuess.code];

    // change copy of code array
    copyCode[pegIdx] = this.state.selColorIdx;

    // put copy code into copy guess
    copyGuess.code = copyCode;

    // replace last guess in copyGuesses with copyGuess
    copyGuesses[copyGuesses.length - 1] = copyGuess

    // setState with new guesses
    this.setState({guesses: copyGuesses});
  }


  // Lifecycle Methods

  render() {
    let winTries = this.getWinTries();
    return (
      <div className="App">
        <header style={headFootStyle}>R E A C T &nbsp;&nbsp; M A S T E R M I N D</header>
        <div className="App-game">
          <GameBoard 
            guesses={this.state.guesses}
            colors={this.state.colors}
            handlePegClick={this.handlePegClick}
          />
          <div className="App-controls">
            <ColorPicker 
            colors={this.state.colors} 
            selColorIdx={this.state.selColorIdx} 
            handleColorSelection={this.handleColorSelection}
            />
            <NewGameButton handleNewGame={this.handleNewGame} />
          </div>
        </div>
        <footer style={headFootStyle}>{(winTries ? `You Won in ${winTries} Guesses!` : 'Good Luck!')}</footer>
      </div>
    );
  }
}


export default App;
