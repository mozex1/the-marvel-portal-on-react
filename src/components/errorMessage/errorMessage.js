import './errorMessage.scss'
const ErrorMessage = () => {
    return (
        <div className="error">
            <h2>Произошла ошибка.</h2>
            <img src={process.env.PUBLIC_URL + '/error.gif'} style={{objectFit: 'contain' , width: '250px', height: '165px'}} alt="error" />
        </div>
    )
};

export default ErrorMessage;