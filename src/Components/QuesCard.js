import Option from "./Option"

export default function QuesCard(props)
{
    const option = props.Option.map((reqOption) => <Option key = {props.Option.indexOf(reqOption)} option = {reqOption} selectOption = {() => props.selectOption(props.Id,props.Option.indexOf(reqOption))}/>)
    return(
        <div className="QuesCard">
            <h4 className="QuesCard--Ques">{props.Question}</h4>
            <div className="QuesCard--Options-div">
            {option}
            </div>
            <div class="line"></div>
        </div>
    )
}