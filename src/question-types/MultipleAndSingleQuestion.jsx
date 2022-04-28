import React,{forwardRef, useImperativeHandle, useState} from 'react';
import {Checkbox, FormGroup, FormControlLabel} from '@mui/material';
import './MultipleAndSingle.css'


const MultipleAndSingleQuestion = forwardRef(({questionSetId,choiceAnswers, questionIdex},ref) => {
  const [answerBrief, setAnswerBrief] = useState([])
 
  const [checkedState, setCheckedState] = React.useState({
      '0': new Array(choiceAnswers[0]['answers'].length).fill(false),
      '1': new Array(choiceAnswers[1]['answers'].length).fill(false),

    });

  useImperativeHandle(ref,()=>({
      getMultipleAndSingleQuestionAnswers() {
        return {
            user_id:1,
            question_sets_id: questionSetId,
            answers_brief:answerBrief
        }
      }
  }))

  const getUpdatedCheckedState = (answerIndex,position)=>{
    const checkedStateInId = checkedState[answerIndex.toString()]
    const updatesCheckedStateInId = checkedStateInId.map((item, index)=>index === position ? !item :item)
    return {
            ...checkedState,
            [answerIndex.toString()]:updatesCheckedStateInId
    }
  }
  const getMultipleAnswers = (choiceAnswers, answerIndex, position)=>{
    const checkedAnswerTitle = choiceAnswers[answerIndex]['answers'][position]['answer_title']
    const checkIndex = answerBrief.findIndex((item)=>item === checkedAnswerTitle)

    if(checkIndex!==-1) return answerBrief.filter(t=>t!==checkedAnswerTitle); 
    else return [...answerBrief,checkedAnswerTitle]
  }

  const getSingleAnswers = (choiceAnswers, answerIndex, position)=>{
         const checkedAnswerTitle = choiceAnswers[answerIndex]['describtion']
         console.log('checkedAnswerTitle',checkedAnswerTitle)

        const checkedAnswer = choiceAnswers[answerIndex]['answers'][position]['answer_title']
         const checkIndex = answerBrief.findIndex((item)=>item === checkedAnswerTitle)
         console.log('checkedAnswer',checkedAnswer ,checkIndex)

    if(checkedAnswer==='Yes' &&  checkIndex ===-1) {
        console.log('checkedAnswerTitle',checkedAnswerTitle)
        return [...answerBrief,checkedAnswerTitle]
       
    }else{
        return answerBrief.filter(t=>t!==checkedAnswerTitle); 
    }
  }

const handleChange = (answerIndex,position) => {
    setCheckedState(getUpdatedCheckedState(answerIndex,position));
   if(answerIndex===0) {
    setAnswerBrief(getMultipleAnswers(choiceAnswers, answerIndex, position))
   }
   if(answerIndex===1){
    setAnswerBrief(getSingleAnswers(choiceAnswers, answerIndex, position))
   }
};


  return (<>
    {choiceAnswers.map((answer,answerIndex)=>(
              <div className={"container"} key={answerIndex}>
                    <span>{answer.describtion}</span>
                    {answer.answers.sort((a,b)=>a.sort_code > b.sort_code).map((answerTitle,index)=>(
                                <FormGroup>
                                     <FormControlLabel control={
                                        <Checkbox
                                        checked={checkedState[answerIndex][index]}
                                        onChange={()=>handleChange(answerIndex,index)}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                         } label={answerTitle.answer_title} />
                                </FormGroup>
                ))}
              </div>
        ))}
          </>
  );
}
)

export default MultipleAndSingleQuestion;
