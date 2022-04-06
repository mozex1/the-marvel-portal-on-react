import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import SkeletonComics from '../skeleton/SkeletonComics';
import ErrorMessage from '../errorMessage/errorMessage';
import Spinner from '../spinner/Spinner.js';
import './comicsList.scss';


const ComicsList = (props) => {
    const [comics, setComics] = useState([]);
    const [firstLoading, setFirstLoading] = useState(true);
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
        setFirstLoading(false);
        getAllComics(offset).then(onAddNewComics);
        setNewComicsLoading(false);
    }
    
    const comicsList = comics.map((comic, i) => {
        return (
            <li key={i} className="comics__item">
                    <Link to={`/comics/${comic.id}`}>
                        <img src={comic.thumbnail} alt={comic.title} className="comics__item-img"/>
                        <div className="comics__item-name">{comic.title}</div>
                        <div className="comics__item-price">{comic.price}</div>
                    </Link>
                </li>
        )
    });
    const skeleton = firstLoading && loading ? <SkeletonComics/>  : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = !firstLoading && loading ? <Spinner/> : null;
    const content = !(loading && error) ? comicsList : null;

    return (
        <div className="comics__list">
            <ul className="comics__grid">
                {skeleton}
                {content}
            </ul>
            {errorMessage}
            <div className='comics__spinner'>
            {spinner}
            </div>
            <button onClick={onLoadMoreComics} className="button button__main button__long">
                <div  className="inner">Загрузить еще</div>
            </button>
        </div>
    )
}

export default ComicsList;