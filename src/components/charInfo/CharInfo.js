import { Component } from 'react/cjs/react.development';
import PropTypes from 'prop-types';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/errorMessage';
import Spinner from '../spinner/Spinner.js';
import Skeleton from '../skeleton/Skeleton';
import './charInfo.scss';

class CharInfo extends Component {
    state = {
        char: null,
        loading: false,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    updateChar = () => {
        const {charId} = this.props;
        if(!charId) return;
        this.onCharLoading();
        this.marvelService.getCharacter(charId).then(this.onCharLoaded).catch(this.onError);
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        });
    };

    onCharLoaded = (char) => {
        this.setState({char: char, loading: false});
    }

    onCharLoading = () => {
        this.setState({loading: true});
    }

    render() {
        const {char, loading, error} = this.state;
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
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    const imgNotFound = char.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
    const comicsList = comics.map((comics, i) => {
                        if (i > 9) return null;
                        return (
                                <li key={i} className="char__comics-item">
                                    {comics.name}
                                </li>
                            )});
    const notComics = comics.length > 0 ? null : 'There are no comics with this character.';
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgNotFound ? {objectFit:'contain'} : {objectFit:'cover'}}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
                <div className="char__descr">
                    {description}
                </div>
                <div className="char__comics">Comics:</div>
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