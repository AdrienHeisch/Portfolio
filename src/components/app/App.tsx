import './App.css';
import nspImg from '../../../assets/images/NotSpaceWar.png';

import * as React from 'react';

export default class App extends React.Component {

    public render ():JSX.Element {
        return (
            <div>
                <span>Hello world!</span>
                <img src={nspImg} />
            </div>
        );
    } 

}