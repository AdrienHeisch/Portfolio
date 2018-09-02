import './stylesheets/Main.css';
import './stylesheets/Fonts.css';

import { createElement } from 'react';
import { render } from 'react-dom';
import { App } from './components/app/App';
import { localizedText } from './utils/LocalizedText';

import jsonData from '../assets/projects.json';

export abstract class Main {

    public static init ():void {
        localizedText.setLanguage('en');
        const projects:Array<ProjectData> = jsonData;
        this.renderApp(projects);
    }

    private static renderApp (pProjects:Array<ProjectData>):void {
        render(createElement(App, { projects: pProjects }), document.getElementById('root'));
    }

}

Main.init();