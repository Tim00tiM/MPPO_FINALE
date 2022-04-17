import "./button.css"
import { Link } from 'react-router-dom'

function AccButton(props){
        return(
            <>
                <Link to={`/sensor/${props.numbers}`}
                    state = { {login: props.login, password: props.password, accessed: props.accessed, id:props.numbers} }
                    className="button">
                    <button className="button">{props.numbers}</button>                   
                </Link>
            </>
        )
}

export default AccButton;