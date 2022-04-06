import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/errorMessage';
import mjolnir from '../../resources/img/mjolnir.png';
import Spinner from '../spinner/Spinner.js';
import './randomChar.scss';

const RandomChar = () => {
    const [char, setChar] = useState({});

    const {loading, error, getCharacter, cleanError} = useMarvelService();
    
    useEffect(() => {
        updateChar();
    }, [])

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = () => {
        cleanError();
        let id = Math.floor(Math.random() * 400 + 1011000);
        getCharacter(id).then(onCharLoaded);
        
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? <View char={char}/> : null;
    return (
        <div className="randomchar">
            {errorMessage}
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Случайный персонаж на сегодня!<br/>
                    Вы хотите узнать о нем подробнее?
                </p>
                <p style={{'fontSize': 20}} className="randomchar__title">
                    Или попробуйте еще раз
                </p>
                <button onClick={updateChar} className="button button__main">
                    <div className="inner">Новый персонаж</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki} = char;
    const imgNotFound = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';

    return (
        <div className="randomchar__block">
                <img src={thumbnail} style={imgNotFound ? {objectFit:'contain'} : {objectFit:'cover'}} alt="Random character" className="randomchar__img"/>
                <div className="randomchar__info">
                    <p className="randomchar__name">{name}</p>
                    <p className="randomchar__descr">
                        {description}
                    </p>
                    <div className="randomchar__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">Домашняя</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Вики</div>
                        </a>
                    </div>
                </div>
            </div>
    )
}

export default RandomChar;