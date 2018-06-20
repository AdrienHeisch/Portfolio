import './stylesheets/Main.css';
import './stylesheets/Fonts.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './components/app/App';
import { localizedText } from './utils/LocalizedText';

import jsonData from '../assets/projects.json';

export abstract class Main {

    public static init ():void {
        localizedText.setLanguage('fr');
        (<any>window).localized = localizedText;
        const projects:Array<ProjectData> = jsonData;
        this.renderApp(projects);
    }

    private static renderApp (pProjects:Array<ProjectData>):void {
        ReactDOM.render(React.createElement(App, { projects: pProjects }), document.getElementById('root'));
    }

    // private static async importImages (pProjects:Array<ProjectData>):Promise<void> {
    //     await Promise.all(
    //         pProjects.map(
    //             pProject => import(`../assets/images/${pProject.name}.png`).then(pResponse => pProject.imageSrc = pResponse.default)
    //         )
    //     );
    // }

}

Main.init();