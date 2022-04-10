/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';
import './charInfo.scss';

const CharInfo = (props) => {
    const [char, setChar] = useState(null);
    const { cleanError, process, setProcess, getCharacter } = useMarvelService();

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
        getCharacter(charId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'));
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    return (
        <div className="char__info">
            {setContent(process, View, char)}
        </div>
    )

}

const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = data;
    
    const imgNotFound = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
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