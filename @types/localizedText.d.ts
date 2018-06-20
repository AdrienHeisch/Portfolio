import { LocalizedStringsMethods } from "react-localization";

declare interface ILocalizedText extends LocalizedStringsMethods {
    projectDialog:{
        buttons:{
            try:string;
            source:string;
        }
        snackbars:{
            mobile:string;
            source:string;
        }
    }
}