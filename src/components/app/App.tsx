import * as styles from './App.css';

import curriculumVitaeImg from '../../../assets/images/curriculumVitae.png';
import urls from '../../../assets/urls.json';

import * as React from 'react';
import { Project } from '../project/Project';
import { localizedText } from './../../utils/LocalizedText';
import { Paper, Typography } from '@material-ui/core';
import { LanguageSelector } from '../language-selector/LanguageSelector';
import { ConfettiCanvas } from '../confetti-canvas/ConfettiCanvas';

export class App extends React.Component<IAppProps, IAppState> {

    public render ():JSX.Element {
        return (
            <>
                {
                    (() => {
                        if (window.location.href.includes('party')) return (
                            <ConfettiCanvas
                                width={window.innerWidth}
                                height={window.innerHeight}
                                nCanons={Math.round(window.innerWidth / 255)}
                                nParticles={window.innerWidth * window.innerWidth / 1000}
                                delay={1}
                            />
                        );
                    })()
                }
                <div className={styles.headerContainer}>
                    <Paper className={styles.header} style={{ fontFamily: 'Open sans', padding: '10px' }}>
                        <Typography variant={'title'} style={{ fontFamily: 'inherit' }} align={'center'}>{localizedText.header.title}</Typography>
                        <Typography variant={'body1'} style={{ fontFamily: 'inherit', whiteSpace: 'pre-wrap' }}>
                            <br/>{localizedText.header.body}
                        </Typography>
                        <Typography variant={'body2'} style={{ fontFamily: 'inherit', lineHeight: '1rem', position: 'absolute', right: '10px', bottom: '10px' }}>{localizedText.header.bottom}</Typography>
                    </Paper>
                    <LanguageSelector
                        languages={localizedText.getAvailableLanguages()}
                        onLanguageSelection={this.setLanguage}
                    />
                    <img // CV
                        className={styles.cvImage}
                        src={curriculumVitaeImg}
                        title={localizedText.curriculumVitae}
                        onClick={this.handleOpenCV}
                    />
                </div>
                <div className={styles.projects}>
                    {this.props.projects.map(pProjectData => (
                        <Project key={pProjectData.name} data={pProjectData} />
                    ))}
                </div>
                <div className={styles.bottomHider}></div>
            </>
        );
    }

    private handleOpenCV = ():Window => window.open(urls.cv);

    private setLanguage = (pLanguage:string):void => {
        localizedText.setLanguage(pLanguage);
        this.setState({});
    }

}

export interface IAppProps {
    projects:Array<ProjectData>;
}

export interface IAppState {
    drawerOpen:boolean;
}