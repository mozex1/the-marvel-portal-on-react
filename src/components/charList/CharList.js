import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/errorMessage';
import Spinner from '../spinner/Spinner.js';
import './charList.scss';

const CharList = (props) => {

    const [chars, setChars] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charsEnded, setCharsEnded] = useState(false);
    const [selectedChar, setSelectedChar] = useState(null);

    const {getAllCharacters, error, loading} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    },[])

    const onCharsLoaded = (newChars) => {
        if(Object.keys(newChars).length === 0){
            newChars = null;
            throw new Error('error')
        }
        let ended = false;
        if(newChars.length < 8){
            ended = true;
        } 
        setChars(chars =>[...chars, ...newChars]);
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setCharsEnded(charsEnded => ended);

    }

    const onRequest = (offset, init) => {
        init ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset).then(onCharsLoaded);
    }

    const updateSelectedChar = (char) => {
        setSelectedChar(selectedChar => char.id)
        props.onCharSelected(char.id);
    }

    
    const View = ({chars}) => {
        return (
            <>
            <ul className="char__grid">
                {chars.map((char, i) => {
                    const imgNotFound = char.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
                    return (
                        <li key={char.id} 
                        className={char.id === selectedChar ? "char__item_selected" : "char__item"} 
                        onClick={() => updateSelectedChar(char)}>
                            <img 
                            src={char.thumbnail} 
                            className='char__item_img'
                            style={imgNotFound ? {objectFit:'contain'} : {objectFit:'cover'}} alt="char"/>
                            <div className="char__name">{char.name}</div>
                        </li>
                    )
                })}
            </ul>
            </>
        )
    }
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;
    // const content = !((loading && !newItemLoading) || error) ? <View chars={chars}/> : null;
    
    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            <View chars={chars}/>
            <button 
            onClick={() => onRequest(offset)} 
            disabled={newItemLoading} 
            style={{'display': charsEnded ? 'none' : 'block'}}
            className="button button__main button__long">
                    <div className="inner">load more</div>
            </button>
        </div>
    )

}

CharList.propTypes = {
    onCharSelected: PropTypes.func
}

export default CharList;