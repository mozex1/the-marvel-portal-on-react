import ErrorMessage from '../components/errorMessage/errorMessage.js';
import Spinner from '../components/spinner/Spinner.js';
import Skeleton from '../components/skeleton/Skeleton.js';

const setContent = (process, Component, data) => {
    switch (process) {
        case 'waiting': 
            return <Skeleton/>;
        case 'loading':
            return <Spinner/>
        case 'confirmed':
            return <Component data={data}/>;
        case 'error':
            return <ErrorMessage/>;
        default:
            throw new Error('Unexpected process state');
    }
}

export default setContent;