import { useParams, useNavigate, useNavigationType } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import useMarvelService from '../../../services/MarvelService';
import setContent from '../../../utils/setContent';
import AppBanner from '../../appBanner/AppBanner';
import './singleCharacterPage.scss';

const SingleCharacterPage = () => {
    const [char, setChar] = useState(null);
    const {charId} = useParams();
    const { cleanError, getCharacter, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateChar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[charId])

    const updateChar = () => {
        cleanError();
        getCharacter(charId).then(onCharLoaded).then(() => setProcess('confirmed'));
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    return (
        <>
            <AppBanner/>
            <div style={{'marginTop': 50}}>
                {setContent(process, View, char)}
            </div>
        </>
    )
}

const View = ({data}) => {
    const { name, description, thumbnail } = data;
    const navigate = useNavigate();
    const navType = useNavigationType();

    const navigateBack = () => {
        if (navType !== 'POP') return navigate(-1);
        return navigate("../", { replace: true });
    }

    return (
        <div className="single-comic">
            <Helmet>
                <meta
                    name="description"
                    content={name}
                    />
                <title>{name}</title>
            </Helmet>
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