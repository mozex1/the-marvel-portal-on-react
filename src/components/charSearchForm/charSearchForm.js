import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field,  ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from 'yup';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/errorMessage';

import './charSearchForm.scss';

const CharSearchForm = () => {
    const [ char, setChar ] = useState(null);
    const [notFoundChar, setNotFoundChar] = useState(false);
    const {error, cleanError, loading, getCharacterForName } = useMarvelService();

    const onCharLoaded = (char) => {
        setNotFoundChar(false);
        setChar(char);
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
    }

    const errorMessage = error ? <div className="char__search-critical-error"><ErrorMessage /></div> : null;
    const results = char ? 
        <div className="char__search-wrapper">
            <div className="char__search-success">Нашли! Посетить страницу {char.name}? </div> 
            <Link to={`/characters/${char.id}`} className="button button__secondary">
                <div className="inner">Перейти</div>
            </Link>
        </div>
        : null;

    const notRequest = notFoundChar ? <div className="char__search-error">
                            Персонаж не был найден. Проверьте имя и повторите попытку
                        </div> : null;
  
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
                {results}
                {notRequest}
                {errorMessage}
            </div>
        </Formik>
    )
}

export default CharSearchForm;