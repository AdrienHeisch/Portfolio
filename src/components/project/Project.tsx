import * as styles from './Project.css';

import notMobileImg from '../../../assets/images/notMobile.png';

import * as React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, AppBar, Toolbar, IconButton, Typography, Slide, Snackbar, Paper } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import { TransitionProps } from 'react-transition-group/Transition';
import Markdown from 'markdown-to-jsx';
import ScrollBars from 'react-custom-scrollbars';
import { dynamicMarkdown } from '../../utils/DynamicMarkdown';
import { isMobile } from '../../utils/IsMobile';
import { localizedText } from './../../utils/LocalizedText';

export class Project extends React.Component<IProjectProps, IProjectState> {

    private getMarkdownMap ():Map<string, string> {
        return new Map<string, string>()
            .set('project-image', this.state.projectImageSource)
        ;
    }

    public state = {
        open: false,
        description: '',
        projectImageSource: '',
        techImageSource: '',
        noMobileOpen: true,
        noSourceOpen: true,
    };

    private handleOpen = ():void => this.setState({ open: true });
    private handleClose = ():void => this.setState({ open: false });

    private openProject = ():Window => window.open(this.props.data.url);
    private openSource = ():Window => window.open(this.props.data.source);

    public componentDidMount ():void {
        import(`../../../assets/text/project-descriptions/${this.props.data.name}.md`).then(pResponse =>
            this.setState({ description: pResponse.default })
        );

        import(`../../../assets/images/projects/${this.props.data.name}.png`).then(pResponse =>
            this.setState({ projectImageSource: pResponse.default })
        );
        
        import(`../../../assets/images/tech/${this.props.data.tech}.png`).then(pResponse =>
            this.setState({ techImageSource: pResponse.default })
        );

        // this.props.data.tech.forEach(pItem =>
        //     import(`../../../assets/images/tech/${pItem}.png`).then(pResponse =>
        //         this.setState(pPrevState => {
        //             pPrevState.techImageSource.set(pItem, pResponse.default);
        //             return pPrevState;
        //         })
        //     )
        // );
    }

    public render ():JSX.Element {
        return (
            <>
                <Button
                    onClick={this.handleOpen}
                >
                    <div className={styles.buttonTitle}>{this.props.data.name}</div>
                    <span
                        style={{
                            position: 'absolute',
                            left:0,
                            top:0,
                            backgroundImage: `url(${this.state.projectImageSource})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            width: '100%',
                            height: '100%',
                            zIndex: -1
                        }}
                    ></span>
                </Button>
                <Dialog
                    fullScreen
                    open={this.state.open}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                >
                    <AppBar style={{ position: 'relative', marginBottom: 15 }}>
                        <Toolbar>
                            <IconButton color='inherit' onClick={this.handleClose}>
                                <CloseIcon />
                            </IconButton>
                            <Typography variant='title' color='inherit' style={{ marginLeft: 5 }}>{this.props.data.name}</Typography>
                            <div className={styles.stack}>
                                {/* {this.props.data.tech.map(pItem => 
                                    <img key={pItem} title={pItem} src={this.state.stackImagesSources.get(pItem)} />
                                )} */}
                                <img title={this.props.data.tech} src={this.state.techImageSource} />
                            </div>
                        </Toolbar>
                    </AppBar>
                    <DialogContent style={{ height: '100%', overflow: 'hidden', fontFamily: '"Open sans", sans serif', paddingBottom: 0 }}>
                        <div className={styles.description}>
                            <ScrollBars
                                autoHide
                                autoHideTimeout={200}
                            >
                                <Markdown>{dynamicMarkdown(this.state.description, this.getMarkdownMap())}</Markdown>
                            </ScrollBars>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <img src={notMobileImg} style={{ width: '1.5rem', minWidth: 'unset', display: isMobile() && !this.props.data.mobile ? 'inline' : 'none' }} />
                        <Button color='primary' variant='contained' disabled={!Boolean(this.props.data.url) || (isMobile() && !this.props.data.mobile)} onClick={this.openProject}>{localizedText.projectDialog.buttons.try}</Button>
                        <Button color='primary' variant='contained' disabled={!Boolean(this.props.data.source)} onClick={this.openSource}>{localizedText.projectDialog.buttons.source}</Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    }

}

export interface IProjectProps {
    data:ProjectData;
}

interface IProjectState {
    open:boolean;
    description:string;
    projectImageSource:string;
    techImageSource:string;
    noMobileOpen:boolean;
    noSourceOpen:boolean;
}

function Transition(pProps:TransitionProps) {
    return <Slide direction="left" {...pProps} />;
}