# Wildcat Jugglers Tutorial

This repository is the home of the Wildcat Jugglers Tutorial or Wildcat Zsonglőr oldalak in Hungarian. This is a statically generated site created by Rob Abram and David Nemeth-Csoka. 
The original site was created back in the old days around the year 2000, later translated to Hungarian, went around multiple domains and lived in different formats. Today it's hosted at https://zsonglor.csokavar.hu.

To build the site, you need to run:

``` 
npm install
npm run build
```

This will set up everything and create a new version in the build directory.

The content can be found in the [pages](pages) folder in markdown format, from which tad simple [script](src/index.ts) walks over it and generates the necessary html output.

Happy juggling anyone!

![img](resources/images/diabolo-macska.png)