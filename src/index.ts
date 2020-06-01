import fs from 'fs';
import path from 'path';
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
    if (src.endsWith(".mp4")) {
        const parts = src.split("/");
        const file = parts[parts.length-1];
        const poster = "/videos/poster/" + file.replace(".mp4", ".jpg");
        return `<video loop playsinline autoplay src="${src}" poster="${poster}"></video>\n`
    }

    return defaultRender(tokens, idx, options, env, self);
};


md.renderer.rules.link_open = function (tokens, idx, options, _, self) {
    var aIndex = tokens[idx].attrIndex('href');

    let href = tokens[idx].attrs[aIndex][1];
    if (href.startsWith("#")) {
        href = href.substr(1);
        tokens[idx].attrs[aIndex][1] = href;
    }

    return self.renderToken(tokens, idx, options);
};

function generate(fpat: string, ipage: number) {
    const content = fs.readFileSync(fpat, "utf-8");
    const html = md.render(content);
    const loc = fpat.replace('.md', '.html').replace('pages', 'build');
    
    if (!fs.existsSync(path.parse(loc).dir)) {
        fs.mkdirSync(path.parse(loc).dir);
    }

    const en = fpat.indexOf('/en/') > 0;
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

    fs.writeFileSync(loc, stripMargin`
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

function process(dir, ipage: number) {
    const items = fs.readdirSync(dir);
    items.forEach(item => {
        const p = dir + "/" + item;
        if (fs.lstatSync(p).isDirectory()) {
            process(p, ipage);
        } else {
            generate(p, ipage++)
        }
    })
}

process('pages', 0);
