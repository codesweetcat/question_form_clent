import './App.css';
import React,{useEffect, useRef, useState} from 'react';
import MultipleAndSingleQuestion from './question-types/MultipleAndSingleQuestion'
import MultipleChoice from './question-types/MultipleChoice'

import { Box} from '@mui/material';

function App() {
  const [questionSets, setQuestionSets] = useState([])
  const answersMultipleAndSingleRef = useRef(null)
  const answersMultipleRef = useRef(null)


  useEffect(() => {
    fetch('http://localhost:9898')
        .then(response => response.json())
        .then(data => {
          const {question_sets} = data
          setQuestionSets(question_sets)}
          );
    }, []);

    const hanleSubmit = async (e)=>{
      e.preventDefault()

      const answersMultipleAndSingleQuestion = answersMultipleAndSingleRef.current.getMultipleAndSingleQuestionAnswers();
      const answersMultipleQuestion = answersMultipleRef.current.getMultipleQuestionAnswers();
      const allAnswers = [answersMultipleAndSingleQuestion,answersMultipleQuestion]
      
      console.log('answersMultipleAndSingleQuestion',answersMultipleAndSingleQuestion,answersMultipleQuestion)
      try {
        
        let res = await fetch("http://localhost:9898/postQuestion", {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
           },
          body: JSON.stringify({
            res: allAnswers
          }),
        });
        if (res.status === 200) {
          alert("Answers add successfully!");
        } else {
          alert("Some error occured");
        }
      } catch (err) {
        console.log(err);
      }

    }

  return (
    <div className="App">
      <header className="App-header">
      <form onSubmit={hanleSubmit}>

      {questionSets && questionSets.map((q,questionIdex)=>{
        const choiceAnswers = q.answers
        return(
              <Box
                sx={{
                  position:"relative",
                  width: 500,
                  height: 600,
                  backgroundColor: 'primary.light',
                }}
              >
              <h2>{q.title}</h2>
              {(q.type === 'multipleChoiceAndSingleChoice') && (
                <MultipleAndSingleQuestion questionSetId={q.id} questionIdex={questionIdex}choiceAnswers={choiceAnswers} ref={answersMultipleAndSingleRef}/>
              )}

              {(q.type === 'multipleChoice') && (
                <MultipleChoice questionSetId={q.id} questionIdex={questionIdex}choiceAnswers={choiceAnswers} ref={answersMultipleRef}/>
              )}
            
              </Box>
           

        )
      })}
      <input type="submit" value="Submit" />
          </form>
      </header>
    </div>
  );
}

export default App;
