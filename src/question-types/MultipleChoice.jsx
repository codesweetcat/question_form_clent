import React,{forwardRef, useImperativeHandle, useState} from 'react';
import {Checkbox, FormGroup, FormControlLabel} from '@mui/material';
import './MultipleAndSingle.css'
import {clickNoneBox} from '../utils/utils'


const MultipleChoice = forwardRef(({questionSetId,choiceAnswers, questionIdex},ref) => {
   
  const [answerBrief, setAnswerBrief] = useState([])
 
  const [checkedState, setCheckedState] = React.useState(
      new Array(choiceAnswers['answers'].length).fill(false),

    );

    const describtion = choiceAnswers.describtion

  useImperativeHandle(ref,()=>({
      getMultipleQuestionAnswers() {
        return {
            user_id:1,
            question_sets_id: questionSetId,
            answers_brief:answerBrief
        }
      }
  }))

  const getUpdatedCheckedState = (answerIndex)=>{
    //check none box
   if(checkedState.length === answerIndex+1){
      return  clickNoneBox(checkedState,answerIndex)
    }
   else {//check not none box
    const flapedState =  checkedState.map((item, index)=>index === answerIndex ? !item :item)
    flapedState[checkedState.length-1]=false
    return flapedState
    }
  }
  const getMultipleAnswers = (choiceAnswers, answerIndex)=>{
    const checkedAnswerTitle = choiceAnswers[answerIndex]['answer_title']
    const checkIndex = answerBrief.findIndex((item)=>item === checkedAnswerTitle)

    if(checkIndex!==-1) return answerBrief.filter(t=>t!==checkedAnswerTitle); 
    else return [...answerBrief,checkedAnswerTitle]
  }


const handleChange = (answerIndex) => {
    console.log(answerIndex,checkedState)
    setCheckedState(getUpdatedCheckedState(answerIndex));
    setAnswerBrief(getMultipleAnswers(choiceAnswers['answers'], answerIndex))
};


  return (<>
     <span>{describtion}</span>
    {choiceAnswers.answers.sort((a,b)=>a.sort_code > b.sort_code).map((answer,answerIndex)=>(
              <div className={"container"}>
                                <FormGroup>
                                     <FormControlLabel control={
                                        <Checkbox
                                        checked={checkedState[answerIndex]}
                                        onChange={()=>handleChange(answerIndex)}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                         } label={answer.answer_title} />
                                </FormGroup>
              </div>
        ))}
          </>
  );
}
)

export default MultipleChoice;
