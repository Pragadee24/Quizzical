export default function Option(props)
{
    let Style = {
        backgroundColor : "",
        border: ""
    }
    switch(props.option.result)
    {
        case 1: 
        Style = {
            backgroundColor : "#94D7A2", // Correct Answer
            border: "None"
        }
        break
        case 2: 
        Style = {
            backgroundColor : "#F8BCBC", // Worng Answer
            opacity : 0.5,
            border: "None"
        }
        break
        case 3: 
        Style = {
            opacity : 0.5,  // Rest Options
            border: "None"
        }
        break
    }

    const Styles = {
        backgroundColor : "#D6DBF5",
        border: "None"
    }
    const StylesNone = {
        backgroundColor : "",
        border: ""
    }
    return(
        <button className="QuesCard--Option" style={props.option.result > 0 ? Style : (props.option.isHeld ? Styles : StylesNone)} onClick={props.selectOption}> {props.option.value} </button>
    )
}