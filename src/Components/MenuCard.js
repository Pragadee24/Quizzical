export default function MenuCard(props)
{
    return(
        <div className="MenuCard">
            <h1 className="MenuCard--Heading">Quizzical</h1>
            <p className="MenuCard--Details">Some description if needed</p>
            <button className="MenuCard--StartBtn" onClick={props.Load}>Start Quiz</button>
        </div>
    )
} 