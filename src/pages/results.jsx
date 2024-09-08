import React from 'react';
import { decode } from 'html-entities';
import { nanoid } from "nanoid";

export default function Results(props) {

    let count = 0


    const result = props.resultData.map(obj => {
        if(!obj.wasRight){
            return(
                <div key={nanoid()} className="radio">
                    <h1 className="resutl--question mainApp--question">{decode(obj.question)}</h1>
                    <div>
                        <h2 id="wrong--answer" className="mainApp--question">
                            the option <span className="wrong--answer">{decode(obj.selected)}</span> was wrong, the correct answer is <span className="correct--answer">{decode(obj.correctAnswer)}</span>
                        </h2>
                    </div>
                    <hr className="results--hr"/>
                </div>
            )
        }else {
            count++
            return (
                <div key={nanoid()} className="radio">
                    <h1 className="resutl--question mainApp--question">{decode(obj.question)}</h1>
                    <div>
                        <h2 id="right--answer" className="mainApp--question">
                            the option <span className="correct--answer">{decode(obj.selected)}</span> was right
                        </h2>
                    </div>
                    <hr className="results--hr"/>
                </div>
            )
        }
    })

    return (
        <div className="mainApp--question--alighn">
            <div className="results">
                {result}
            </div>
            <div className="results--info">
                <h3 className="results--score">You scored {count}/5 correct answers</h3>
                <button onClick={props.endClick} className="results--btn">Play again</button>
            </div>
        </div>
    );
}
