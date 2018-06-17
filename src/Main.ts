import './stylesheets/Main.css';
import './stylesheets/Fonts.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './components/app/App';

import jsonData from '../assets/projects.json';

export abstract class Main {

    public static async init ():Promise<void> {
        const projects:Array<ProjectData> = jsonData;
        // await this.importImages(projects);
        this.renderApp(projects);
    }

    private static async importImages (pProjects:Array<ProjectData>):Promise<void> {
        // await Promise.all(
        //     pProjects.map(
        //         pProject => import(`../assets/images/${pProject.name}.png`).then(pResponse => pProject.imageSrc = pResponse.default)
        //     )
        // );
    }

    private static renderApp (pProjects:Array<ProjectData>):void {
        ReactDOM.render(React.createElement(App, { projects: pProjects }), document.getElementById('root'));
    }

}

Main.init();