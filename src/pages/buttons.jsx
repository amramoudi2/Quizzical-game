import { decode } from "html-entities";

export default function Buttons(props) {
    function getStyles() {
        let styles = {
            border: "#a1a9cc 2px solid",
            backgroundColor:"",
            color:"#a1a9cc"
        };

        if (props.timeToSubmit) {
            if (props.isRight === false) {
                styles = {
                    border:"none",
                    backgroundColor: "#F8BCBC", 
                    color:"#a1a9cc"
                };
            } else if (props.isRight) {
                styles = {
                    backgroundColor: "#94D7A2", 
                    border:"none",
                    color:"#293264"
                };
            }
        } else {
            styles = {
                backgroundColor: props.isHeld ? "#D6DBF5" : "",
            };
        }
        return styles;
    }

    return (
        <div onClick={props.handleClick} className="radio">
            <input className="radio--btn" type="radio" value={props.answer} />
            <label style={getStyles()} className="radio--label">
                {decode(props.answer)}
            </label>
        </div>
    );
}
