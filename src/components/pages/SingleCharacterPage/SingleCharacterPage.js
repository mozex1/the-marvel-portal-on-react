import { useParams, useNavigate, useNavigationType } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useMarvelService from '../../../services/MarvelService';
import AppBanner from '../../appBanner/AppBanner';
import ErrorMessage from '../../errorMessage/errorMessage';
import Spinner from '../../spinner/Spinner.js';
import './singleCharacterPage.scss';

const SingleCharacterPage = () => {
    const [char, setChar] = useState(null);
    const {charId} = useParams();
    const {error, cleanError, loading, getCharacter} = useMarvelService();

    useEffect(() => {
        updateChar();
    },[charId])

    const updateChar = () => {
        cleanError();
        getCharacter(charId).then(onCharLoaded);
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;
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

const View = ({char}) => {
    const { name, description, thumbnail } = char;
    const navigate = useNavigate();
    const navType = useNavigationType();

    const navigateBack = () => {
        if (navType !== 'POP') return navigate(-1);
        return navigate("../", { replace: true });
    }

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={name} className="single-comic__char-img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
            </div>
            <button onClick={navigateBack} className="single-comic__back">Back</button>
        </div>
    )
}

export default SingleCharacterPage;