import styles from './sampleImage.module.scss';
import { Utils } from '../../lib/utils';

export class SampleImage extends HTMLElement {
    public static moduleName: string = 'sample-image';

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    protected attributeChangedCallback(name, oldValue, newValue): void {
        this._updateRendering();
    }

    protected connectedCallback(): void {
        this.addEventListener('click', (event: Event) => {
            console.log(event);
        });

        this._updateRendering();
    }
    
    private _updateRendering(): void {
        let htmlCode: string = require('./sampleImage.module.html');
        const template: HTMLTemplateElement = document.createElement('template');
        template.innerHTML = htmlCode;
        
        Utils.renderCustomElement(template, SampleImage.moduleName);

        let image = <HTMLImageElement>template.content.querySelector(".sample-img");
        image.src = this.getAttribute("data-img");
        image.alt = this.getAttribute("data-name");
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    private replaceAll(initial: string, target: string, replacement: string): string {
        return initial.split(target).join(replacement);
    }
}
