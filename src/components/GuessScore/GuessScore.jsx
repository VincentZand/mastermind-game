import React from 'react';
// CSS stylesheet
import './GuessScore.css';

const GuessScore = ({ score }) => {
  let scores = ('P'.repeat(score.perfect) + 'A'.repeat(score.almost) +
    'I'.repeat(4 - score.perfect - score.almost)).split('');
  
  let baseStyle = {
    width: '6px',
    height: '6px',
    margin: 1,
    border: '1px solid',
    borderRadius: '50%'
  };

  let pegStyles = {
    'P': {
      borderColor: 'black',
      backgroundColor: 'black'
    },
    'A': {
      borderColor: 'black',
      backgroundColor: 'white'
    },
    'I': {
      borderColor: 'white',
      backgroundColor: 'lightgrey'
    }
  };

  return (
    <div className='GuessScore'>
      {scores.map((score, idx) => 
      <div key={idx}
        style={Object.assign({}, baseStyle, pegStyles[score])}
          >
      </div>
    )}
    </div>
  );
}
export default GuessScore;