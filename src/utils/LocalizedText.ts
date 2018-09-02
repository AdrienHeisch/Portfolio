import text from '../../assets/text/staticText.json';
import TextLocalizer from 'react-localization';
import { ILocalizedText } from '../../@types/localizedText';

export const localizedText:ILocalizedText = new TextLocalizer(text);