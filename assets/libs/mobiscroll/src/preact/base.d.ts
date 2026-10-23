import { PureComponent } from './pure';
export interface IDirectiveType {
    standalone?: boolean;
}
export declare function Directive(args: any): (ctor: any) => any;
export declare class Base<PropsType, StateType> extends PureComponent<PropsType, StateType> {
    /** @hidden */
    static _fname: string;
    /** @hidden */
    static _selector: string;
    /** @hidden */
    static _renderOpt: any;
    /** @hidden */
    s: PropsType;
    _el: HTMLElement;
    /** @hidden */
    _shouldEnhance?: HTMLElement | string | boolean | null;
    protected _opt: any;
    protected _newProps: any;
    private _baseValue;
    value: any;
    /** @hidden */
    componentDidMount(): void;
    /** @hidden */
    componentDidUpdate(): void;
    /** @hidden */
    componentWillUnmount(): void;
    /** @hidden */
    render(): any;
    /** @hidden */
    getInst(): this;
    /**
     * Sets or updates options of the component. Options can be updated dynamically after the initialization.
     *
     * It receives an options object as parameter. Calling `setOptions` will overwrite all the options that
     * have a key in the options object parameter, and it will re-render the component.
     *
     * ```js
     * inst.setOptions({
     *   themeVarian: 'dark',
     * })
     * ```
     * @method javascript
     * @method jquery
     */
    setOptions(opt: PropsType): void;
    /** @hidden */
    _setEl: (el: any) => void;
    /** @hidden */
    _safeHtml(html: string): any;
    protected _init(): void;
    protected _baseInit(): void;
    protected _emit(name: string, args: any): void;
    protected _template(s: PropsType, state: StateType): any;
    protected _mounted(): void;
    protected _updated(): void;
    protected _destroy(): void;
    protected _baseDestroy(): void;
    protected _willUpdate(): void;
    private _enhance;
}
