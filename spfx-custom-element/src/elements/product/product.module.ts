import styles from './product.module.scss';
import { loadStyles } from '@microsoft/load-themed-styles';
const { detect } = require('detect-browser');
const browser = detect();

export class XProduct extends HTMLElement {
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
        let htmlCode: string = require('./product.module.html');
        const template: HTMLTemplateElement = document.createElement('template');
        template.innerHTML = htmlCode;
        let styleContent = template.content.querySelector('style');
        if (styleContent) {
            loadStyles(styleContent.innerHTML, false);
            let styleTag: HTMLStyleElement = <any>document.head.lastChild;
            let content: string = styleTag.innerHTML;

            switch (browser && browser.name) {
                case 'chrome':
                    content = this.replaceAll(content, 'sample-product', '');
                    styleTag.remove();
                    break;
                case 'firefox':
                case 'edge':
                    content = this.replaceAll(content, ':host', '');
                    break;
                default:
            }

            styleContent.innerHTML = content;
        }
        
        let image = <HTMLImageElement>template.content.querySelector(".product-img");
        image.src = this.getAttribute("data-img");
        image.alt = this.getAttribute("data-name");
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    private replaceAll(initial: string, target: string, replacement: string): string {
        return initial.split(target).join(replacement);
    }
}
