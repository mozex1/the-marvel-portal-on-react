import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/errorMessage';
import Spinner from '../spinner/Spinner.js';
import './comicsList.scss';

const ComicsList = () => {
    const [comics, setComics] = useState([]);
    const [newComicsLoading, setNewComicsLoading] = useState(true);
    const [offset, setOffset] = useState(18);
    const {error, cleanError, loading, getAllComics } = useMarvelService();

    useEffect(() => {
        getAllComics().then(data => setComics(data));
        setNewComicsLoading(false);
    }, []);

    const onAddNewComics = (newComics) => {
        setNewComicsLoading(true);
        setComics(comics => ([...comics, ...newComics]));
        setOffset(offset => offset + 8);
    }

    const onLoadMoreComics = () => {
        getAllComics(offset).then(onAddNewComics);
        setNewComicsLoading(false);
    }
    
    const comicsList = comics.map(comic => {
        return (
            <li key={comic.id} className="comics__item">
                    <a href={comics.urls}>
                        <img src={comic.thumbnail} alt={comic.title} className="comics__item-img"/>
                        <div className="comics__item-name">{comic.title}</div>
                        <div className="comics__item-price">{comic.price}</div>
                    </a>
                </li>
        )
    });
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newComicsLoading ? <Spinner/> : null;
    const content = !(loading && error) ? comicsList : null;

    return (
        <div className="comics__list">
            <ul className="comics__grid">
                {content}
            </ul>
            {errorMessage}
            <div className='comics__spinner'>
            {spinner}
            </div>
            <button onClick={onLoadMoreComics} className="button button__main button__long">
                <div  className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;