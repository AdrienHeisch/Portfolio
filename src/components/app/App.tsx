import * as styles from './App.css';

import * as React from 'react';
import { Project } from '../project/Project';
import { languages, localizedText } from './../../utils/LocalizedText';
import { Button } from '@material-ui/core';

export class App extends React.Component<IAppProps, IAppState> {

    private changeLanguage (pLanguage:string):void {
        localizedText.setLanguage(pLanguage);
        this.setState({});
    }

    public render ():JSX.Element {
        return (
            <>
                <div>
                    {languages.map(pLanguage => (
                        <Button key={pLanguage} variant='contained' color='primary' lang={pLanguage} onClick={(pEvent) => this.changeLanguage(pEvent.currentTarget.lang)}>{pLanguage.toLocaleUpperCase()}</Button>
                    ))}
                </div>
                <div className={styles.projects}>
                    {this.props.projects.map(pProjectData => (
                        <Project key={pProjectData.name} data={pProjectData} />
                    ))}
                </div>
            </>
        );
    } 

}

export interface IAppProps {
    projects:Array<ProjectData>;
}

interface IAppState {

}