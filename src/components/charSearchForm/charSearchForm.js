import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field,  ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from 'yup';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/errorMessage';

import './charSearchForm.scss';

const CharSearchForm = () => {
    const [ char, setChar ] = useState(null);
    const [charList, setCharList] = useState([]);
    const [notFoundChar, setNotFoundChar] = useState(false);
    const {error, cleanError, loading, getCharacterForName, getCharactersForNameStartsWith } = useMarvelService();

    const onCharLoaded = (char) => {
        setNotFoundChar(false);
        setChar(char);
    }

    const onCharListLoaded = (charList) => {
        setCharList(charList);
    }

    const notRequestChar = () => {
        setNotFoundChar(true);
    }

    const updateChar = ({charName}) => {
        setChar(null);
        cleanError();
        getCharacterForName(charName)
            .then(onCharLoaded)
            .catch(notRequestChar);  
        getCharactersForNameStartsWith(charName).then(onCharListLoaded);  
    }

    const errorMessage = error ? <div className="char__search-critical-error"><ErrorMessage /></div> : null;
    const resultsChar = char ? 
        <div className="char__search-wrapper">
            <div className="char__search-success">Нашли! Посетить страницу {char.name}? </div> 
            <Link to={`/characters/${char.id}`} className="button button__secondary">
                <div className="inner">Перейти</div>
            </Link>
        </div>
        : null;
    const notRequest = notFoundChar ? <div className="char__search-error">
                            Такой персонаж не был найден. Может вы имели ввиду:
                        </div> : null;

    const charsList = charList.map((char, i) => {
        if (i > 9) return null;
        return (
                <Link to={`/characters/${char.id}`} key={i} className="char__comics-item">
                    {char.name}
                </Link>
            )});
  
    return (
        <Formik
        initialValues = {{
            charName: ''
        }}
        validationSchema = {Yup.object({
            charName: Yup.string().min(2, 'Минимум 2 символа').required('Введите имя для поиска'),
        })}
        onSubmit = {values => updateChar(values)}
        >
            <div className="char__search-form">
                <Form>
                    <label htmlFor="charName" className="char__search-label">Или найдите персонажа по имени:</label>
                    <div className='char__search-wrapper'>
                        <Field 
                            id="charName" 
                            name="charName" 
                            type='text' 
                            placeholder="Напишите имя"/>
                        <button 
                            className="button button__main" 
                            type='submit' 
                            disabled={loading}
                            >
                            <div className="inner">Искать</div>
                        </button>
                    </div>
                    <FormikErrorMessage className="char__search-error" name="charName" component="div"/>
                </Form>
                {resultsChar}
                {notRequest}
                {charsList}
                {errorMessage}
            </div>
        </Formik>
    )
}

export default CharSearchForm;