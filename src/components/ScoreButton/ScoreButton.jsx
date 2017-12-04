import React from 'react';

const ScoreButton = (props) => {
    return (
        <button 
        disabled={props.codes.includes(null)} 
        className="btn btn-default" style={{padding: '2px 6px'}}
        onClick={props.handleScoreCheck}
        >
        ✔
        </button>
    );
}

export default ScoreButton;