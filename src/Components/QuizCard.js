import React from 'react';

export default function QuizCard(props)
{
    return(
      <div className="QuizCard">
        {props.ques}
        
        {props.showAnswer ? 
            <div className="Scorecard">
            <h3 className="Score">You scored {props.score}/5 correct answers</h3>
            <button className="PlayAgainBtn" onClick={props.playAgain}>Play again</button> </div>
            : <button className="CheckAnswersBtn" onClick={props.checkAnswer}>Check answers</button>}
      </div>
    )
}