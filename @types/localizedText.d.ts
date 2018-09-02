import { LocalizedStringsMethods } from "react-localization";

declare interface ILocalizedText extends LocalizedStringsMethods {
    header: {
        title:string;
        body:string;
        bottom:string;
    }
    curriculumVitae:string;
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