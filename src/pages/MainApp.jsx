import React from 'react';
import { nanoid } from "nanoid";
import {decode} from "html-entities";
import Buttons from "./buttons.jsx";

export default function MainApp() {
    const [apiData, setApiData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [newData, setNewData] = React.useState([]);
    const [clicks, setClicks] = React.useState([]);
    const [displaySubimter, setDisplaySubimter] = React.useState([]);
    const [timeToSubmit, setTimeToSubmit] = React.useState(false);
    const [score, setScore] = React.useState(0)
    const [playAgain,setPlayAgain] = React.useState(false)

    React.useEffect(() => {
        if(apiData.length === 0){
            fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
                .then(res => res.json())
                .then(data => {
                    setApiData(data.results);
                    setLoading(true);
                });   
        }
    }, [apiData]);

    React.useEffect(() => {
        const answers = apiData.map((item) => {
            let allAnswerArr = [...item.incorrect_answers];
            allAnswerArr.splice((allAnswerArr.length + 1) * Math.random() | 0, 0, item.correct_answer);
            const dataObj = {
                question: item.question,
                correctAnswer: item.correct_answer,
                allAnswers: allAnswerArr,
            }
            return dataObj
        })
        setNewData(answers)
    },[loading])

    React.useEffect(()=>{
        const all5ra = newData.map(item => {
            return item.allAnswers.map(items => {
                return {isHeld: false, items,isRight:undefined}
            })
        })
        setClicks(all5ra)

    },[newData])

    function handleClick(selectedAnswer, questionIndex) {
        setClicks(prevClicks =>
            prevClicks.map((answers, index) =>
                index === questionIndex
                    ? answers.map(answer => {

                        setDisplaySubimter(prev => {
                            if (!prev.includes(index)) {
                                return [...prev, index];
                            } else {
                                return prev;
                            }
                        })

                        return answer.items === selectedAnswer
                            ? { ...answer, isHeld: true }
                            : { ...answer, isHeld: false }
                    })
                    : answers
            )
        );
    }



    function renderQuestion() {
        const questions = newData.map((item,index) => {

            if(!clicks[index]) return null

            const button = clicks[index].map((button) => {
                return (
                    <Buttons
                        key={nanoid()}
                        answer={button.items}
                        handleClick={() => handleClick(button.items,index)}
                        isHeld={button.isHeld}
                        isRight={button.isRight}
                        timeToSubmit={timeToSubmit}
                    />
                )
            })

            return (
                <div key={nanoid()} className="mainApp--question--alighn">
                    <h1 className="mainApp--question">{decode(item.question)}</h1>
                    <div className="inputs">
                        {button}
                    </div>
                    <hr/>
                </div>
            )

        })
        return questions
    }

    function onSubmit() {
        setClicks(prevClicks =>
            prevClicks.map((answers, index) =>{

                const correctAnswerLoop = newData[index].correctAnswer

                return answers.map(item => {

                    const correct_answer = correctAnswerLoop === item.items ? true : false

                    if (correct_answer && item.isHeld) {
                        const help = {...item, isRight: correct_answer};

                        setScore(prev => prev + 1)

                        return help
                    }else if(!correct_answer && item.isHeld){
                        return {...item, isRight:false}
                    }else if(correct_answer && !item.isHeld) {
                        return { ...item, isRight:true};
                    }else{
                        return {...item}
                    }
                })

            })
        );
        setTimeToSubmit(true);
    }

    function handleSubmit(e) {
        e.preventDefault()
        onSubmit()
        setPlayAgain(true)
    }

    function handlePlayAgain(){
        setApiData([])
        setLoading(false)
        setNewData([])
        setClicks([])
        setDisplaySubimter([])
        setTimeToSubmit(false)
        setScore(0)
        setPlayAgain(false)
    }

    return (
        <div className="second--body">
        <div>
                    {!loading && <h1 className="loading">LOADING...</h1>}
                    {renderQuestion()}
                </div>
                {loading &&
                    <div className="btn--alighn">
                        {displaySubimter.length === apiData.length && 
                            <button style={{display : !timeToSubmit ? "block" : "none"}} type={"submit"} onClick={handleSubmit} className="submit--btn">SUBMIT</button>}
                    </div>
                }

                {
                    playAgain &&
                    <div className="btn--alighn">
                        <h1 className="results--score">You Score is {score}/{apiData.length}</h1>
                        <button onClick={handlePlayAgain} className="results--btn">Play again</button>
                    </div>
                }

            </div>
    );
}
