import React from 'react';
import data from "./data.js";
import MenuCard  from './Components/MenuCard.js';
import QuesCard from './Components/QuesCard.js';
import QuizCard from './Components/QuizCard.js';

function App()
{
  const[startQuiz,setStartQuiz] = React.useState(false)
  const[orderedQues,setOrderedQues] = React.useState(initQues())
  const[showAnswer,setShowAnswer] = React.useState(false)
  const[score,setScore] = React.useState(0)


  const Ques = orderedQues.map((ordQues)=> <QuesCard key = {ordQues.Id}  {...ordQues} selectOption = { selectOption}/>)

  function initQues()
  {
    const quesArr = []
    for(let i=0; i<5 ; i++)
    {
      quesArr.push({Id:i, Question:"", Option:[], Answer: ""})
    }
    return quesArr
  }

  function loadQues()
  {
    setOrderedQues(prevState => {
      const ques = []
      for(let i = 0; i < 5 ; i++)
      {
        let tempOrderedQues = prevState[i]         
        tempOrderedQues.Question = data[i].question
        tempOrderedQues.Option = [{value: data[i].incorrect_answers[0], isHeld : false, result : 0},
                                  {value: data[i].incorrect_answers[1], isHeld : false, result : 0},
                                  {value: data[i].incorrect_answers[2], isHeld : false, result : 0},
                                  {value: data[i].correct_answer,       isHeld : false, result : 0}]
        for (var k = tempOrderedQues.Option.length - 1; k > 0; k--)
        {
          var j = Math.floor(Math.random() * (k + 1));         
          var temp = tempOrderedQues.Option[k];
          tempOrderedQues.Option[k] = tempOrderedQues.Option[j];
          tempOrderedQues.Option[j] = temp;
        }
        tempOrderedQues.Answer = data[i].correct_answer
        ques.push(tempOrderedQues)
      }
      return ques
    })
  }

  function canStartQuiz()
  {
    setStartQuiz(prevState => !prevState)
    loadQues()
  }

  function playAgain()
  {
    setStartQuiz(prevState => !prevState)
    setShowAnswer(prevState=> !prevState)
    setScore(prevState=>prevState*0)
  }



  function selectOption(ID,OptionID)
  {
    setOrderedQues(prevState => {
      const ordQues = []
      for(let i=0; i<5; i++)
      {
        let tempOrderedQues = prevState[i]
        if(tempOrderedQues.Id === ID)
        {
          for (let j=0; j<tempOrderedQues.Option.length; j++ )
          {
            if(j === OptionID)
              tempOrderedQues.Option[j].isHeld = !prevState[i].Option[j].isHeld
            else
              tempOrderedQues.Option[j].isHeld = false
          }
        }
        ordQues.push(tempOrderedQues)
      }
      return ordQues
    })
  }

  function checkAnswer()
  {
    setOrderedQues(prevState => {
      const ordQues = []
      for(let i=0; i<5; i++)
      {
        let tempOrderedQues = prevState[i]
        for (let j=0; j<tempOrderedQues.Option.length; j++ )
        {
          if(tempOrderedQues.Option[j].value === tempOrderedQues.Answer)
          {
            tempOrderedQues.Option[j].result = 1
            if(tempOrderedQues.Option[j].isHeld)
            {
              setScore(prevState=>prevState+1)
            }
          }
          else if(tempOrderedQues.Option[j].isHeld && tempOrderedQues.Option[j].value !== tempOrderedQues.Answer)
          {
            tempOrderedQues.Option[j].result = 2
          }
          else
          {
            tempOrderedQues.Option[j].result = 3
          }
        }
        ordQues.push(tempOrderedQues)
      }
      return ordQues
    })
    setShowAnswer(prevState=> !prevState)
  }
  function test()
  {
    console.log("test")
  }

  return(
    <div className="App">
      {!startQuiz && <MenuCard Load = {canStartQuiz}/>}
      {startQuiz && <QuizCard ques = {Ques} checkAnswer = {checkAnswer} playAgain = {playAgain} showAnswer = {showAnswer} score = {score}/>}
    </div>
  );
}

export default App;

  // React.useEffect(()=>
  //   {
  //     console.log("Fetch")
  //     fetch("https://opentdb.com/api.php?amount=5&type=multiple")
  //     .then(res => res.json())
  //     .then(data => setCurQues(data.results))
  //   }, []
  // )
