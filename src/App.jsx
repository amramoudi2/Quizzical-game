import React from 'react';
import Start from "./pages/Start"
import MainApp from "./pages/MainApp";
import Results from "./pages/results";


export default function App(){

    const [start,setStart] = React.useState(false);
    const [end,setEnd] = React.useState(false);
    const [resultData, setResultData] = React.useState([]);

    function startClick(){
        setStart(prevStart => !prevStart);
    }

    function endClick(){
        setEnd(prevEnd => !prevEnd);
    }



    return(
        <div className="App Start--backgound">
            <div className="App start--background--bobl">
                {!start && <Start startClick={startClick}/>}

                {start && !end && <MainApp

                    setResultData={setResultData}
                    endClick={endClick}

                />}

                {end && <Results
                    resultData={resultData}
                    endClick={endClick}
                />}
            </div>
        </div>
    )
}