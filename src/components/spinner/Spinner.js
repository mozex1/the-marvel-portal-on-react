import spinner from '../../resources/img/spinner.gif';

const Spinner = () => {
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'none'}}>
            <img src={spinner} alt="spinner"/>
        </div>
    )
}

export default Spinner;