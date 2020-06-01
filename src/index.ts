import fs from 'fs';
import MarkdownIt from 'markdown-it'

const md = MarkdownIt({
    html: true
});

function stripMargin(strings: TemplateStringsArray, ...values: any[]): string {
	let s = strings[0];
	for (let i = 0; i < values.length; i++) {
		s += values[i];
		s += strings[i+1];
	}
	return s.trim().split("\n").map(line => line.replace(/^\s*\| /, "")).join('\n');
}


const defaultRender = md.renderer.rules.image;

md.renderer.rules.image = function (tokens, idx, options, env, self) {
    const token = tokens[idx];
    const aIndex = token.attrIndex('src');

    const src = token.attrs[aIndex][1];
    if (src.startsWith("/site/videos/poster/")) {
        const parts = src.split("/");
        const file = parts[parts.length-1];
        const mp4 = "/videos/mp4/" + file.replace(".jpg", ".mp4");
        const poster = "/videos/poster/" + file;
        return `<video loop playsinline autoplay src="${mp4}" poster="${poster}"></video>\n`
    }

    return defaultRender(tokens, idx, options, env, self);
};


md.renderer.rules.link_open = function (tokens, idx, options, _, self) {
    var aIndex = tokens[idx].attrIndex('href');

    let href = tokens[idx].attrs[aIndex][1];
    if (href.endsWith(".md")) {
        tokens[idx].attrs[aIndex][1] = href.replace('.md', '');
    }

    return self.renderToken(tokens, idx, options);
};

function generate(fpatIn: string, fpatOut: string, ipage: number) {
    const content = fs.readFileSync(fpatIn, "utf-8");
    const html = md.render(content);

    const en = fpatIn.indexOf('/en/') > 0;
    const lang = en ? 'en' : 'hu';
    const title = en ? 'Wildcat Jugglers tutorial' : 'Wildcat Zsonglőr oldalak';
    const nav = en ? 
        '<a href="/en">Home</a> | <a href="/en/about">About</a> | <a href="/hu">Magyarul</a>' : 
        '<a href="/hu">Trükkök</a> | <a href="/hu/tortenet">Történet</a> | <a href="/en">English</a>';


    const footerImages = [
        "/images/dobol-macska.png",
        "/images/diabolo-macska.png",
        "/images/macska-alszik.png",
        "/images/tandem-macska.png",
        "/images/zsonglor-macska.png"
    ];
    const footerImage = footerImages[ipage % footerImages.length];

    fs.writeFileSync(fpatOut, stripMargin`
        | <!DOCTYPE HTML>
        | <html lang="${lang}">
        | <head>
        |     <meta charset="UTF-8">
        |     <meta name="viewport" content="width=device-width, initial-scale=1.0">
        |     <title>Wildcat</title>
        |     <link href="//fonts.googleapis.com/css?family=Merriweather&subset=latin" rel="stylesheet" type="text/css">
        |     <link href="//fonts.googleapis.com/css?family=Francois One&subset=latin" rel="stylesheet" type="text/css">
        |     <link rel="stylesheet" href="/css/awsm.css">
        |     <style>
        |         * {
        |             font-family: 'Merriweather', sans-serif;
        |         }
        |         h1, h2, h3, h4, h5, h6 {
        |             font-family: 'Francois One', sans-serif;
        |         }
        |     </style>
        |    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-203054-6"></script>
        |    <script>
        |         window.dataLayer = window.dataLayer || [];
        |         function gtag(){dataLayer.push(arguments);}
        |         gtag('js', new Date());
        |         gtag('config', 'UA-203054-6');
        |     </script>
        | </head>
        | <body>
        | <header>
        | <h1>${title}</h1>
        | <nav>
        |     ${nav}
        | </nav>
        | </header>
        | <main>
        | <article>
        | ${html}
        | <img src="${footerImage}" />
        | </article>
        | </main>
        | <footer>
        | © 2004-<script>document.write( new Date().getFullYear() );</script> Wildcat Zsonglőr Oldalak | <a href="https://github.com/encse/wildcat/">GitHub</a>
        | </footer>
        | </body>
        | </html>
    `);
}

function process(inputDir: string, outputDir: string, ipage: number) {
    const items = fs.readdirSync(inputDir);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }
    items.forEach(item => {
        const fpatIn = inputDir + "/" + item;

        if (fs.lstatSync(fpatIn).isDirectory()) {
            const fpatOut = outputDir + "/" + item;
            process(fpatIn, fpatOut, ipage);
        } else if(fpatIn.endsWith('.md')){
            generate(
                fpatIn,
                outputDir + "/" + item.replace('.md', '.html'),
                ipage++);
        } else {
            fs.copyFileSync(fpatIn, outputDir + "/" + item);
        }
    })
}

process('site', 'build', 0);
