import '@webcomponents/webcomponentsjs/webcomponents-sd-ce.js';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import { SampleImage } from '../../elements/product/sampleImage.module';
import { WelcomeSharePoint } from '../../elements/welcome/welcome.module';
import { Utils } from '../../lib/utils';

export interface IHelloWorldWebPartProps {
  description: string;
}

export default class HelloWorldWebPart extends BaseClientSideWebPart<IHelloWorldWebPartProps> {
  constructor() {
    super();

    // Define the new element
    if (!Utils.elementIsRegistered(SampleImage.moduleName))
      window.customElements.define(SampleImage.moduleName, SampleImage);

    if (!Utils.elementIsRegistered(WelcomeSharePoint.moduleName))
      window.customElements.define(WelcomeSharePoint.moduleName, WelcomeSharePoint);
  }

  public render(): void {
    this.domElement.innerHTML = `<welcome-sharepoint class="welcome-sharepoint" />`;
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
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
