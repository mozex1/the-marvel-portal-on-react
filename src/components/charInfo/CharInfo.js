import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/errorMessage';
import Spinner from '../spinner/Spinner.js';
import Skeleton from '../skeleton/Skeleton';
import './charInfo.scss';
import { Link } from 'react-router-dom';

const CharInfo = (props) => {
    const [char, setChar] = useState(null);

    const {error, cleanError, loading, getCharacter} = useMarvelService();

    useEffect(() => {
        updateChar();
    },[])

    useEffect(() => {
        updateChar();
    }, [props.charId])

    const updateChar = () => {
        const {charId} = props;
        if(!charId) return;
        cleanError();
        getCharacter(charId).then(onCharLoaded);
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const skeleton = char || loading || error ? null : <Skeleton/>
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;
    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )

}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    
    const imgNotFound = char.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
    const comicsList = comics.map((comics, i) => {
                        let comicId = comics.resourceURI.match(/\d+/g)[1];
                        if (i > 9) return null;
                        return (
                                <Link to={`/comics/${comicId}`} key={i} className="char__comics-item">
                                    {comics.name}
                                </Link>
                            )});
    const notComics = comics.length > 0 ? null : 'Комиксов с этим персонажем нет.';
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgNotFound ? {objectFit:'contain'} : {objectFit:'cover'}}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">Домашняя</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Вики</div>
                        </a>
                    </div>
                </div>
            </div>
                <div className="char__descr">
                    {description}
                </div>
                <div className="char__comics">Комиксы:</div>
                <ul className="char__comics-list">
                    {comicsList}
                    {notComics}
                </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;