import * as React from 'react';
import * as DOM from 'react-dom';
import './index.sass';
import Weather from './components/Weather'

const root = document.getElementById('root');

class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>Hello World</div>
        );
    }
}

DOM.render(<Main />, root);

// Hot Module Replacement
// if (module.hot) {
//   module.hot.accept();
// }
