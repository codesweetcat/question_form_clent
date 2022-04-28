

  const getSingleAnswers =  (answerBrief,choiceAnswers, answerIndex, position)=> {
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

const logger = {
    getSingleAnswers,

}

    export default logger