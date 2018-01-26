import styles from './welcome.module.scss';
import { Utils } from '../../lib/utils';

export class WelcomeSharePoint extends HTMLElement {
    public static moduleName: string = 'welcome-sharepoint';

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    protected attributeChangedCallback(name, oldValue, newValue): void {
        this._updateRendering();
    }

    protected connectedCallback(): void {
        this._updateRendering();
    }

    protected disconnectedCallback(): void {
    }

    private _updateRendering(): void {
        let htmlCode: string = require('./welcome.module.html');
        const template: HTMLTemplateElement = document.createElement('template');
        template.innerHTML = htmlCode;

        Utils.renderCustomElement(template, WelcomeSharePoint.moduleName);

        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}
