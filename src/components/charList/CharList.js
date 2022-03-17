import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/errorMessage';
import Spinner from '../spinner/Spinner.js';
import './charList.scss';

class CharList extends Component {

    state = {
        chars: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210,
        charsEnded: false,
        selectedChar: null,
    }


    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();
    }


    onError = () => {
        this.setState({
            loading: false,
            error: true
        });
    };

    onCharsLoaded = (newChars) => {
        if(Object.keys(newChars).length === 0){
            newChars = null;
            this.setState(() => ({loading: false, error: true}));
            return;
        }
        let ended = false;
        if(newChars.length < 8){
            ended = true;
        } 
        this.setState(({chars, offset}) => ({chars: [...chars, ...newChars], loading: false, newItemLoading: false, offset: offset + 9, charsEnded: ended}));
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset).then(this.onCharsLoaded).catch(this.onError);
    }

    onCharListLoading = () => {
        this.setState({newItemLoading: true});
    }

    updateChars = () => {
        this.marvelService.getAllCharacters().then(this.onCharsLoaded).catch(this.onError);
        
    }

    updateSelectedChar = (char) => {
        this.setState({selectedChar: char.id});
        this.props.onCharSelected(char.id);
    }

    
    render() {
        const {chars, loading, error, offset, newItemLoading, charsEnded, selectedChar} = this.state;
        const View = ({chars}) => {
            return (
                <>
                <ul className="char__grid">
                    {chars.map((char, i) => {
                        const imgNotFound = char.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
                        return (
                            <li key={char.id} 
                            className={char.id === selectedChar ? "char__item_selected" : "char__item"} 
                            onClick={() => this.updateSelectedChar(char)}>
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
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View chars={chars}/> : null;
        
        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button 
                onClick={() => this.onRequest(offset)} 
                disabled={newItemLoading} 
                style={{'display': charsEnded ? 'none' : 'block'}}
                className="button button__main button__long">
                     <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes = {
    onCharSelected: PropTypes.func
}

export default CharList;