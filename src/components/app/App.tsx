import * as styles from './App.css';

import curriculumVitaeImg from '../../../assets/images/curriculumVitae.png';
import githubImg from '../../../assets/images/github.svg';
import urls from '../../../assets/urls.json';

import * as React from 'react';
import { Project } from '../project/Project';
import { localizedText } from './../../utils/LocalizedText';
import { Paper, Typography, Button } from '@material-ui/core';
import { LanguageSelector } from '../language-selector/LanguageSelector';
import { ConfettiCanvas } from '../confetti-canvas/ConfettiCanvas';
import * as URL from 'url-parse';

export class App extends React.Component<IAppProps, IAppState> {

    public render ():JSX.Element {
        return (
            <>
                {
                    (() => {
                        if (new URL(window.location.href, window.location.href, true).query['party'] !== undefined) return (
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
                        onLanguageSelection={(pLanguage:string) => this.setLanguage(pLanguage)}
                    />
                    <img // CV
                        className={styles.cvImage}
                        src={curriculumVitaeImg}
                        title={localizedText.curriculumVitae}
                        onClick={() => this.handleOpenCV()}
                    />
                </div>
                <div className={styles.projects}>
                    {this.props.projects.map(pProjectData => (
                        <Project key={pProjectData.name} data={pProjectData} />
                    ))}
                    <Button //GitHub
                        onClick={() => window.open("https://github.com/AdrienHeisch")}
                        style={{
                            border: 'solid black 2px'
                        }}
                    >
                        <div>{localizedText.github}</div>
                        <span
                            style={(() => {
                                const o:any = {
                                    position: 'absolute',
                                    left:0,
                                    top:0,
                                    backgroundColor: 'white',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    width: '100%',
                                    height: '100%',
                                    zIndex: -1
                                };

                                if (!window.matchMedia("screen and (max-width: 600px)").matches) {
                                    o.backgroundImage = `url(${githubImg})`;
                                    o.backgroundSize = "50%";
                                }

                                return o;
                            })()}
                        ></span>
                    </Button>
                </div>
                <div className={styles.bottomHider}></div>
            </>
        );
    }

    private handleOpenCV ():void { window.open(urls.cv); }

    private setLanguage (pLanguage:string):void {
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