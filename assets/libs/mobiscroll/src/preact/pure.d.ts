import { Component, ComponentChild } from './lib/src/index';
export declare class PureComponent<PropsType, StateType> extends Component<PropsType, StateType> {
    render(): ComponentChild;
    /** @hidden */
    shouldComponentUpdate(props: any, state: any): boolean;
}
