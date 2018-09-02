declare module 'react-pdf' {
    export class Document extends React.Component<IDocumentProps> {}

    export class Page extends React.Component<IPageProps> {}
}

interface IPageProps {
    pageNumber:number;
}

interface IDocumentProps {
    file:string;
}