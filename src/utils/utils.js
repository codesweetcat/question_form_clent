

  export const getSingleAnswers =  (answerBrief,choiceAnswers, answerIndex, position)=> {
    const checkedAnswerTitle = choiceAnswers[answerIndex]["describtion"];
    const checkedAnswer = choiceAnswers[answerIndex]["answers"][position]["answer_title"];
    const checkIndex = answerBrief.findIndex((item)=>item === checkedAnswerTitle);
        if(checkedAnswer==="Yes" &&  checkIndex ===-1) {
           return [...answerBrief,checkedAnswerTitle];
        } else {
           return answerBrief.filter(t=>t!==checkedAnswerTitle); 
        }
};

  export const clickNoneBox = (checkedState,answerIndex)=>{
      const isCurrSelectedNone = checkedState[answerIndex];
      let outputState = [];
      if(!isCurrSelectedNone){//current not been kicked, need flap up
        outputState = checkedState.map((item, index)=>index === answerIndex ? !item :false);
      }else{
        outputState = checkedState.map((item, index)=>index === answerIndex ? !item :item);
      }
      return outputState;
    };
