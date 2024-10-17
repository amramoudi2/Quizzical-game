import "../index.css"


export default function Start(props){
    return (
        <div className="start--background--bobl">
            <div className="Start--backgound">
                <div className="Start">
                    <h1>Quizzical</h1>
                    <button onClick={props.startClick}>Start quiz</button>
                </div>
            </div>
        </div>
    )
}