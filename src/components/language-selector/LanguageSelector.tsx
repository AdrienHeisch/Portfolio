import * as styles from './LanguageSelector.css';

import * as React from 'react';
import { Menu, MenuItem } from '@material-ui/core';
import langagesIcon from '../../../assets/images/languages.png';
import languagesNames from './languagesNames.json';

export class LanguageSelector extends React.Component<ILanguageSelectorProps, ILanguageSelectorState> {

    public state:ILanguageSelectorState = {
        languagesMenuAnchor: undefined
    }

    public render ():JSX.Element {
        return (
            <>
                <img className={styles.languagesIcon} src={langagesIcon} onClick={(pEvent) => this.setState({ languagesMenuAnchor: pEvent.currentTarget })} />
                <Menu
                    anchorEl={this.state.languagesMenuAnchor}
                    open={ this.state.languagesMenuAnchor !== undefined }
                    onClose={ () => this.closeMenu() }
                >
                    {this.props.languages.map(pLanguage => (
                        <MenuItem
                            key={pLanguage}
                            color='primary'
                            lang={pLanguage}
                            onClick={(pEvent) => {
                                this.props.onLanguageSelection(pEvent.currentTarget.lang);
                                this.closeMenu();
                            }}
                        >
                            {languagesNames[pLanguage]}
                        </MenuItem>
                    ))}
                </Menu>
            </>
        );
    }

    private closeMenu = ():void => this.setState({ languagesMenuAnchor: undefined });

}

interface ILanguageSelectorProps {
    languages:Array<string>;
    onLanguageSelection:(pLanguage:string) => void;
}

interface ILanguageSelectorState {
    languagesMenuAnchor:HTMLElement;
}