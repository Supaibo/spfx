import '@webcomponents/webcomponentsjs/webcomponents-sd-ce.js';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';
import { XProduct } from '../../elements/product/product.module';
import { WelcomeSharePoint } from '../../elements/welcome/welcome.module';

export interface IHelloWorldWebPartProps {
  description: string;
  targetProperty: string;
}

export default class HelloWorldWebPart extends BaseClientSideWebPart<IHelloWorldWebPartProps> {
  constructor() {
    super();

    // Define the new element
    if (!this.elementIsRegistered('sample-product'))
      window.customElements.define('sample-product', XProduct);

    if (!this.elementIsRegistered('welcome-sharepoint'))
      window.customElements.define('welcome-sharepoint', WelcomeSharePoint);
  }

  public render(): void {
    this.domElement.innerHTML = `<welcome-sharepoint class="welcome-sharepoint" />`;
  }

  private elementIsRegistered(value): boolean {
    return window.customElements.get(value) ? true : false;
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: "Property Pane"
          },
          groups: [
            {
              groupName: "Group",
              groupFields: [
                PropertyPaneTextField('description', {
                  label: "Description"
                }),
                PropertyPaneTextField('targetProperty', {
                  label: "Target Property"
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
