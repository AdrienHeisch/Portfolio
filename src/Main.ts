import './Main.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/app/App';

export default abstract class Main {

    public static projects:Array<any> = [
        { name: 'NotSpaceWar', type: 'game', tech:[ 'ActionScript3', 'Adobe Flash/Animate' ], mobile:false, webUrl: '', sourceUrl: '', imgUrl: '' }
    ]

    public static init ():void {
        this.renderApp();
    }

    private static renderApp ():void {
        ReactDOM.render(React.createElement(App), document.getElementById('root'));
    }

}

Main.init();