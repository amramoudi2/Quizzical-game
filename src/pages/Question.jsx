import React from 'react';
import "../index.css"
import { nanoid } from 'nanoid'
import { decode } from 'html-entities'

export default function Question(props) {

    const [selectedAnswer, setSelectedAnswer] = React.useState('')

    const [shuffledAnswers, setShuffledAnswers] = React.useState([]);


    React.useEffect(() => {
        const allAnswers = getAllAnswers();
        setShuffledAnswers(allAnswers);


        const firstAnswer = allAnswers[0];
        setSelectedAnswer(firstAnswer);


        const event = {
            target: {
                name: props.question,
                value: firstAnswer,
                type: "radio",
                checked: true
            }
        };
        updateFromObject(event);

    }, []);

    function updateFromObject(event) {
        const { name, value, type, checked } = event.target;
        setSelectedAnswer(value);
        props.setFromObject(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            };
        });

    }

    const correctAnswer = props.correctAnswer;
    const question = decode(props.question);
    const incorrectAnswers = props.incorrectAnswers;

    function getAllAnswers() {
        let allAnswerArr = [...incorrectAnswers];
        allAnswerArr.splice((allAnswerArr.length + 1) * Math.random() | 0, 0, correctAnswer);
        return allAnswerArr;
    }

    const answers = shuffledAnswers.map((answer, index) => {
        return (
            <div className="radio" key={nanoid()}>
                <input
                    onChange={updateFromObject}
                    className="radio--btn"
                    name={props.question}
                    type="radio"
                    id={`answer-${index}-${props.indexRow}`}
                    value={answer}
                    checked={selectedAnswer === answer}
                />
                <label className="radio--label" htmlFor={`answer-${index}-${props.indexRow}`}>{decode(answer)}</label>
            </div>
        );
    });

    return (
        <div className="mainApp--question--alighn">
            <h1 className="mainApp--question">{question}</h1>
            <div className="inputs">
                {answers}
            </div>
            <hr/>
        </div>
    );
}
