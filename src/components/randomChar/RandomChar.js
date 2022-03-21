import { useState, useEffect } from 'react';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/errorMessage';
import mjolnir from '../../resources/img/mjolnir.png';
import Spinner from '../spinner/Spinner.js';
import './randomChar.scss';

const RandomChar = () => {
    const [char, setChar] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    
    useEffect(() => {
        updateChar();
    }, [])

    const marvelService = new MarvelService();

    const onError = () => {
        setLoading(false);
        setError(true)
    };

    const onCharLoaded = (char) => {
        setLoading(false);
        setChar(char);
    }

    const updateChar = () => {
        setLoading(true);
        let id = Math.floor(Math.random() * 400 + 1011000);
        marvelService.getCharacter(id).then(onCharLoaded).catch(onError);
        
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
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={updateChar} className="button button__main">
                    <div className="inner">try it</div>
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
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
    )
}

export default RandomChar;