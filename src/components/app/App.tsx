// import styles from './App.css';

import * as React from 'react';
import { Project } from '../project/Project';

export class App extends React.Component<IAppProps, IAppState> {

    public render ():JSX.Element {
        return (
            <>
                {this.props.projects.map(pProjectData => (
                    <Project key={pProjectData.name} data={pProjectData} />
                ))}
            </>
        );
    } 

}

export interface IAppProps {
    projects:Array<ProjectData>;
}

interface IAppState {

}