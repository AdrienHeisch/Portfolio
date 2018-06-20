declare module 'react-custom-scrollbars' {
    export default class ScrollBars extends React.Component<IScrollbarsProps> {}

    interface IScrollbarsProps {
        autoHide?:boolean;
        autoHideTimeout?:number;
    }
}