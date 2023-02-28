import React, {useEffect, useState} from 'react'
import { v4 as uuidv4 } from 'uuid';
import Question from './Question'
import "../styles/Quiz.css"
import Loading from './Loading';

function Quiz(props) {
    const [questions, setQuestions] = useState([]) 
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [notFullFilledQuizSubmitted, setNotFullFilledQuizSubmitted]  = useState(false)

    const [loading, setLoading] = useState(true)
    const linkAPI = `https://opentdb.com/api.php?amount=${props.numberOfQuestions}`

    console.log(questions)
    useEffect(() => {
        fetch(linkAPI)
        .then(res => res.json())
        .then(data => {
            console.log("zapytanie do API")
            const parser = new DOMParser();
            const questionArr = []

            const questionsSet = data.results
            questionsSet.forEach(question => {
                let answers = []
                const questionText = parser.parseFromString(question.question, "text/html").documentElement.textContent;
                
                answers.push({
                    id: uuidv4(),
                    answerText : parser.parseFromString(question.correct_answer, "text/html").documentElement.textContent,
                    marked : false,
                    correct : true,
                    formSubmitted : false
                })

                question.incorrect_answers.forEach(ans => {
                    answers.push({
                        id: uuidv4(),
                        answerText : parser.parseFromString(ans, "text/html").documentElement.textContent,
                        marked : false,
                        correct : false,
                        formSubmitted : false
                    })
                })

                answers = answers.sort(() => Math.random() - 0.5);


                const questionObj = {
                    id : uuidv4(),
                    questionText : questionText,
                    category : question.category,
                    answers : answers
                }

                questionArr.push(questionObj)

            })


            setTimeout(() => {
               setLoading(false)
            }, 2000);
           
            setQuestions(questionArr)

           

        })
    }, [linkAPI])
    


function getMakredAns(question) {   
    return question.answers.find(ans => ans.marked) 
} 

function countResult() {
    let res = 0
    questions.forEach(question => {
        const ans = getMakredAns(question)
        if (ans.correct) res+=1
    })

    return res
}


function submitAnswers() {
    const newQuestions = []
    const allMarked = questions.every(question => getMakredAns(question) !== undefined) 

    if (allMarked) { 
        setHasSubmitted(true)
    } 
    
    else {
        // info - answer for all question
        setNotFullFilledQuizSubmitted(true)
        alert("You left the fields blank")
    }
}



    function getQuestionById(id) {
        return questions.find(question => question.id === id);
    }

    function getIndexQuestionById(id) {
        for (let i = 0; i < questions.length; i++) {
            const question = questions[i];
            if (question.id === id) return i;
        }
        return -1;
    }

    function getAnswerById(question, idAnswer) {
        return question.answers.find(answer => answer.id === idAnswer);
    }


    function handleMarkAnswer(idQuestion, idAnswer) {
        console.log(idQuestion, idAnswer)
        const question = getQuestionById(idQuestion)
        const questionIndex = getIndexQuestionById(idQuestion)
        const clickedAnswer = getAnswerById(question, idAnswer)
        if (clickedAnswer.marked) {
            clickedAnswer.marked = false
            question.markedQuestion = false
        }
        else {
            question.answers.forEach(ans => ans.marked = false)
            clickedAnswer.marked = true
            question.markedQuestion = true
        }

        const newQuestions = [...questions]
        newQuestions[questionIndex] = question

        setNotFullFilledQuizSubmitted(false)

        setQuestions(newQuestions)
    
    }



    const questionComponents = questions.map((question, index) => (
            <Question 
                key={index}
                number={index+1}
                data={question} 
                handleMarkAnswer={!hasSubmitted ? handleMarkAnswer : () => {}} 
                submitted={hasSubmitted}   
                notFullFilledQuizSubmitted={notFullFilledQuizSubmitted}
                markedQuestion={false}
            />
        )
    )

    return(
         
        <>
        {loading 
        ?    
        <Loading/>
        :
        <main className='quiz_container'>
            {questionComponents}

            <div className='quiz_summary'>
                {hasSubmitted ? <button onClick={props.newQuiz} className="button quiz_button">Start new quiz</button>    :  
                <button onClick={submitAnswers} className="button quiz_button">Submit answers</button> }
                {hasSubmitted && <span className='quiz__result'>{`Result : ${countResult()}/${questions.length}`}</span>}
            </div>

            
        </main>     
        }
        </>  
    )
}
export default Quiz;