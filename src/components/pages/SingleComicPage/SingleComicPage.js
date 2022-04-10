import { useParams, useNavigate, useNavigationType } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import useMarvelService from '../../../services/MarvelService';
import setContent from '../../../utils/setContent';
import AppBanner from '../../appBanner/AppBanner';
import './singleComicPage.scss';

const SingleComicPage = () => {
    const [comic, setComic] = useState(null);
    const {comicId} = useParams();
    const {cleanError, getComic, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateComic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[comicId])

    const updateComic = () => {
        cleanError();
        getComic(comicId).then(onComicLoaded).then(() => setProcess('confirmed'));
    }

    const onComicLoaded = (comic) => {
        setComic(comic);
    }

    return (
        <>
            <AppBanner/>
            <div style={{'marginTop': 50}}>
                {setContent(process, View, comic)}
            </div>
        </>
    )
}

const View = ({data}) => {
    const {title, description, pageCount, thumbnail, language, price} = data;
    const navigate = useNavigate();
    const navType = useNavigationType();
    const navigateBack = () => {
        if (navType !== 'POP') return navigate(-1);
        return navigate("../comics", { replace: true });
    }

    return (
        <div className="single-comic">
            <Helmet>
                <meta
                    name="description"
                    content={title}
                    />
                <title>{title}</title>
            </Helmet>
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