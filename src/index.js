import ReactDOM from 'react-dom';
import Game from './App';
import BlockProvider from './BlockProvider';
import './index.css';

ReactDOM.render(
    <BlockProvider>
        <Game title='5x5' />
    </BlockProvider>,
    document.getElementById('root')
);