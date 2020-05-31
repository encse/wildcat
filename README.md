# Wildcat Jugglers Tutorial

This repository is the home of the Wildcat Jugglers Tutorial or Wildcat Zsonglőr oldalak in Hungarian. This is a statically generated site created by Rob Abram and David Nemeth-Csoka. 

The site's origins go back to the beginning of the new century. It was later translated to Hungarian, went around multiple domains and lived in different formats. Today it's hosted at https://zsonglor.csokavar.hu.

To build the site, you need to run:

``` 
npm install
npm run build
```

This will set up everything and create a new version in the build directory.

The content can be found in the [pages](pages) folder in markdown format, from which a tad simple [script](src/index.ts) generates the necessary html output.

Happy juggling anyone!

![img](resources/images/diabolo-macska.png)
