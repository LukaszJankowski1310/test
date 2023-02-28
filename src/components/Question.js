import React from 'react'
import "../styles/Question.css"

function Question(props) {
    let {id, answers,  questionText, markedQuestion} = props.data



    const answers_components = answers.map((ans, index) => {
        let styles;

        if (!props.submitted) {
            styles = ans.marked ? { backgroundColor : "#D6DBF5",  color: "#293264", border: "none" } 
            :{ backgroundColor : "transparent", color: "black",  border: "solid #293264 2px"}
        } else {
            styles =  ans.correct ? { backgroundColor : "#94D7A2",  color: "#293264", border:"none"} : ans.marked && !ans.correct ?  { backgroundColor : "#F8BCBC",  color: "#293264", border:"none"} : {}
        }
      
        return(
            <button 
                key={index}
                className='button'
                style={styles}
                onClick={() => props.handleMarkAnswer(id, ans.id)}
                >
                {ans.answerText} 
            </button>
        )
    })
     
   
    // let questionTextSyles = props.notFullFilledQuizSubmitted ? {} : {}
    return(
        <div className='question_container'>
            {props.notFullFilledQuizSubmitted && !markedQuestion &&  <h4 style={{color:"red"}}>Fill in this field</h4>}
            <h3 className='question'>{`${props.number}. ${questionText}`}</h3>
            <div className='answers_container'>
              {answers_components}
            </div>
        </div>
    )
}
export default Question



