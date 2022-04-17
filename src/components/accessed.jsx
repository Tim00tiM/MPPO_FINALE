import AccButton from "./accbutton"

function Accessed(props){
        return (
            <>
            {props.numbers.accessed.map((number) => (
                <AccButton numbers={number.data_id} login={props.numbers.login} password={props.numbers.password} accessed={props.numbers.accessed}></AccButton>
            ))}
            </>
        );
}



export default Accessed;