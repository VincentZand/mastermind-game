import React, { Component } from 'react';
import './App.css';
import GameBoard from './components/GameBoard/GameBoard';
import ColorPicker from './components/ColorPicker/ColorPicker';
import NewGameButton from './components/NewGameButton/NewGameButton';

class App extends Component {
  constructor(props) {
    super(props);
    let colors = ['#00A399', '#B2D969', '#FAD02F', '#F04F50'];
    this.state = {
      colors,
      code: this.genCode(colors.length),
      selColorIdx: 0,
      guesses: [this.getNewGuess(), this.getNewGuess(), this.getNewGuess()]
    };
  }

  getNewGuess() {
    return {
      // code: [null, null, null, null],
      code: [3, 2, 1, 0], // for testing purposes
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

  render() {
    let winTries = this.getWinTries();
    return (
      <div>
        <header className="App-header">R E A C T  M A S T E R M I N D</header>
        <div>
          <GameBoard 
            guesses={this.state.guesses}
            colors={this.state.colors}
          />
          <div>
            <ColorPicker colors={this.state.colors} />
            <NewGameButton />
          </div>
        </div>
        <footer>{(winTries ? 'You Won in ${winTries} Guesses!' : 'Good Luck!')}</footer>
      </div>
    );
  }
}


export default App;
