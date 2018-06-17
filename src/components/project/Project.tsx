import * as styles from './Project.css';

import * as React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, AppBar, Toolbar, IconButton, Typography, Slide } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import { TransitionProps } from 'react-transition-group/Transition';
import Markdown from 'markdown-to-jsx';
import { dynamicMarkdown } from '../../utils/DynamicMarkdown';

export class Project extends React.Component<IProjectProps, IProjectState> {

    private getMarkdownMap ():Map<string, string> {
        const lMap:Map<string, string> = new Map();

        lMap.set('project-image', this.state.imageSource);

        return lMap;
    }

    public state = {
        open: false,
        description: '',
        imageSource: '',
        stackImagesSources: new Map<string, string>()
    };

    private handleOpen = () => this.setState({ open: true });
    private handleClose = () => this.setState({ open: false });
    private openProject = () => window.open(`https://${this.props.data.ghAuthor.toLowerCase()}.github.io/${this.props.data.name}`);
    private openSource = () => window.open(`https://github.com/${this.props.data.ghAuthor}/${this.props.data.name}`);

    public componentDidMount ():void {
        import(`../../../assets/text/project-descriptions/${this.props.data.name}.md`).then(pResponse =>
            this.setState({ description: pResponse.default })
        );

        import(`../../../assets/images/projects/${this.props.data.name}.png`).then(pResponse =>
            this.setState({ imageSource: pResponse.default })
        );

        this.props.data.stack.forEach(pItem =>
            import(`../../../assets/images/tech/${pItem}.png`).then(pResponse =>
                this.setState(pPrevState => {
                    pPrevState.stackImagesSources.set(pItem, pResponse.default);
                    return pPrevState;
                })
            )
        );
    }

    public render ():JSX.Element {
        return (
            <>
                <Button onClick={this.handleOpen}>{this.props.data.name}</Button>
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
                                <>
                                    {this.props.data.stack.map(pItem => 
                                        <img key={pItem} title={pItem} src={this.state.stackImagesSources.get(pItem)} />
                                    )}
                                </>
                            </div>
                        </Toolbar>
                    </AppBar>
                    <DialogContent style={{ height: '100%', overflow: 'hidden', fontFamily: '"Open sans", sans serif', paddingBottom: 0 }}>
                        <div className={styles.description}>
                            <Markdown>{dynamicMarkdown(this.state.description, this.getMarkdownMap())}</Markdown>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button color='primary' variant='contained' onClick={this.openProject}>Open</Button>
                        <Button color='primary' variant='contained' onClick={this.openSource}>See source code</Button>
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
    imageSource:string;
    stackImagesSources:Map<string, string>;
}

function Transition(pProps:TransitionProps) {
    return <Slide direction="left" {...pProps} />;
}