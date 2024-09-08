import React from 'react';
import Question from './Question';
import { nanoid } from "nanoid";

export default function MainApp(props) {

    const [apiData, setApiData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [fromObject, setFromObject] = React.useState({});
    const [questions, setQuestions] = React.useState([]);
    const [renderAnswers, setRenderAnswers] = React.useState([]);

    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
            .then(res => res.json())
            .then(data => {
                setApiData(data.results);
                setLoading(true);
            });
    }, []);

    React.useEffect(() => {
        if (apiData.length > 0) {
            const questionTexts = apiData.map(item => item.question);
            setQuestions(questionTexts);
        }
    }, [apiData]);

    React.useEffect(() => {
        if (apiData.length > 0) {
            const mappedAnswers = apiData.map((data, index) => (
                <Question
                    key={nanoid()}
                    correctAnswer={data.correct_answer}
                    incorrectAnswers={data.incorrect_answers}
                    question={data.question}
                    indexRow={index}
                    setFromObject={setFromObject}
                />
            ));
            setRenderAnswers(mappedAnswers);
        }
    }, [apiData]);

    function submitBtn() {
        const rightAnswerArr = apiData.map(item => item.correct_answer);

        const resultArr = questions.map((question, i) => {
            const selectedAnswer = fromObject[question];
            const correctAnswer = rightAnswerArr[i];
            return {
                question,
                selected: selectedAnswer,
                correctAnswer,
                wasRight: selectedAnswer === correctAnswer
            };
        });

        props.setResultData(resultArr);
        props.endClick();
    }

    return (
        <div className="second--body">
            <div>
                {!loading && <h1 className="loading">LOADING...</h1>}
                {loading && renderAnswers}
            </div>
            {loading &&
            <div className="btn--alighn">
                <button className="submit--btn" onClick={submitBtn}>Check answers</button>
            </div>
            }
        </div>
    );
}
