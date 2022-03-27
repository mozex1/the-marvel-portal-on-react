import './errorMessage.scss'
const ErrorMessage = (props) => {
    let message = 'Произошла ошибка.'
    if (props.notfound) message = '404. Такой страницы не существует.';
    return (
        <div className="error">
            <h2>{message}</h2>
            <img src={process.env.PUBLIC_URL + '/error.gif'} style={{objectFit: 'contain' , width: '250px', height: '165px'}} alt="error" />
        </div>
    )
};

export default ErrorMessage;