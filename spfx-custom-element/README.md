# SPFx-custom-element

A SPFx boilerplate project based on native web elements like :
* Custom Element
* Shadow Dom

This project shows you how to use the native JavaScript to create web components.
There is two controls (SampleImage & WelcomeSharePoint).

![alt text](https://github.com/Supaibo/spfx/blob/master/spfx-custom-element/Screenshot.png?raw=true "The sample component")

### Building the code

```bash
git clone https://github.com/Supaibo/spfx.git
npm i
npm i -g gulp
gulp serve
```

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.

### References
* https://developer.mozilla.org/en-US/docs/Web/Web_Components/Custom_Elements
* https://developers.google.com/web/fundamentals/web-components/customelements
* https://www.youtube.com/watch?v=iVJA-lGkEFw
* https://github.com/SharePoint/sp-dev-docs/blob/master/docs/spfx/toolchain/integrate-gulp-tasks-in-build-pipeline.md