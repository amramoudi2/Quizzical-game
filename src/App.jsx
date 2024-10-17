import React from 'react';
import Start from "./pages/Start"
import MainApp from "./pages/MainApp";


export default function App(){

    const [start,setStart] = React.useState(false);

    function startClick(){
        setStart(prevStart => !prevStart);
    }

    return(
        <div className="App Start--backgound">
            <div className="App start--background--bobl">
                {start ? <MainApp/> : <Start startClick={startClick}/>}
            </div>
        </div>
    )
}