import Spinner from '../../../assets/loading-spinner.gif';
import './Loading.css';

const Loading = () => {
    return <div id='spinner'>
        <img src={Spinner} alt='Loading...' />
    </div>
}

export default Loading;