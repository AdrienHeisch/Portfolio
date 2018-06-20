import text from '../../assets/text/staticText.json';
import TextLocalizer from 'react-localization';
import { ILocalizedText } from '../../@types/localizedText';

export const languages:Array<string> = (() => {
    const lArray = [];
    for (const lKey of Object.keys(text)) lArray.push(lKey);
    return lArray;
})();

export const localizedText:ILocalizedText = new TextLocalizer(text);