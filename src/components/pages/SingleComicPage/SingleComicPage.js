import { useParams, useNavigate, useNavigationType } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useMarvelService from '../../../services/MarvelService';
import AppBanner from '../../appBanner/AppBanner';
import ErrorMessage from '../../errorMessage/errorMessage';
import Spinner from '../../spinner/Spinner.js';
import './singleComicPage.scss';

const SingleComicPage = () => {
    const [comic, setComic] = useState(null);
    const {comicId} = useParams();
    const {error, cleanError, loading, getComic} = useMarvelService();

    useEffect(() => {
        updateComic();
    },[comicId])

    const updateComic = () => {
        cleanError();
        getComic(comicId).then(onComicLoaded);
    }

    const onComicLoaded = (comic) => {
        setComic(comic);
    }


    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !comic) ? <View comic={comic}/> : null;
    return (
        <>
            <AppBanner/>
            {errorMessage}
            <div style={{'marginTop': '50px'}}>
                {spinner}
            </div>
            {content}
        </>
    )
}

const View = ({comic}) => {
    const {title, description, pageCount, thumbnail, language, price} = comic;
    const navigate = useNavigate();
    const navType = useNavigationType();
    const navigateBack = () => {
        if (navType !== 'POP') return navigate(-1);
        return navigate("../comics", { replace: true });
    }

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <button onClick={navigateBack} className="single-comic__back">Back</button>
        </div>
    )
}

export default SingleComicPage;