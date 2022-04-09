import fs from 'fs';
import path from 'path';
import MarkdownIt from 'markdown-it'
import metadataParse from 'markdown-yaml-metadata-parser';
import crypto from 'crypto';


function stripMargin(strings: TemplateStringsArray, ...values: any[]): string {
	let s = strings[0];
	for (let i = 0; i < values.length; i++) {
		s += values[i];
		s += strings[i+1];
	}
	return s.trim().split("\n").map(line => line.replace(/^\s*\| /, "")).join('\n');
}

const pick: <T> (items: T[]) => T = (() => {
    let i = 0;
    return items => items[(i++) % items.length];
})();

const fail = (st: string): never => {
    throw new Error(st);
};

type I18n = ((en: string, hu: string) => string) & {lang: "en" | "hu"};
const i18n = (fpatIn: string): I18n => {
    const lang = fpatIn.indexOf('/en/') >=0 ? "en" : "hu";
    const fn = (en, hu) => lang == "en" ? en : hu;
    fn.lang = lang  as "en" | "hu";
    return fn;
};

enum ItemKind {
    Page,
    Asset
}

type Item = {
    kind: ItemKind;
    path: string;
    content: () => string | NodeJS.ArrayBufferView;
}

type Sitemap = Item[];

function version(fpat: string){
    const shasum = crypto.createHash('sha1')
    shasum.update(fs.readFileSync(fpat, 'utf-8'));
    return shasum.digest('hex');
}

function randomRotate(){
    return pick(['rotateA', 'rotateB']);
}

function pageFromMarkdown(isFrontPage:boolean, i18n: I18n, markdown: string): string {

    const {metadata, content} = metadataParse(markdown);

    const md = MarkdownIt({
        html: true
    });

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

            const name = token.content.replace(/"/g,"&quot;");
            const description = i18n(
                    `How to juggle the ${
                        metadata.props === 'balls' ? "balls" :
                        metadata.props === 'club' ? "clubs" :
                        metadata.props === 'ring' ? "rings" :
                        metadata.props === 'rubber-band' ? "rubber bands" :
                        fail("invalid prop " + metadata.props)
                    }? Instructor: Rob Abram (Wildcat Jugglers)`,
                    `Zsonglőrködés ${
                        metadata.props === 'balls' ? "labdával" :
                        metadata.props === 'club' ? "buzogánnyal" :
                        metadata.props === 'ring' ? "karikával" :
                        metadata.props === 'rubber-band' ? "befőttes gumival" :
                        fail("invalid prop " + metadata.props)
                    }. Bemutatja: Rob Abram (Wildcat Jugglers)`);

            return stripMargin`
                | <script type="application/ld+json">
                | {
                |     "@context": "http://schema.org",
                |     "@type": "VideoObject",
                |     "name": "${name}",
                |     "description": "${description}",
                |     "thumbnailUrl": "${poster}",
                |     "contentUrl": "${mp4}",
                |     "uploadDate": "2003-02-05T08:00:00+08:00"
                | }
                | </script>
                | <div class="video"><video muted loop playsinline autoplay src="${mp4}" poster="${poster}" class="${randomRotate()}"></video></div>
            `
        }

        return defaultRender(tokens, idx, options, env, self);
    };

    md.renderer.rules.link_open = function (tokens, idx, options, _, self) {
        const aIndex = tokens[idx].attrIndex('href');

        let href = tokens[idx].attrs[aIndex][1];
        if (href.endsWith("README.md")) {
            href = href.replace('README.md', '');
        }

        if (href.startsWith("/site")){
            href = href.substring("/site".length);
        }

        tokens[idx].attrs[aIndex][1] = href;

        return self.renderToken(tokens, idx, options);
    };

    const html = md.render(content);
    const longTitle = i18n('Wildcat Jugglers tutorial', 'Wildcat Zsonglőr oldalak')
    const titleText = isFrontPage ?  longTitle : "Wildcat";
    const colophon = i18n(
        `<a href="/hu/kolofon">Colophon</a>`,
        `<a href="/hu/kolofon">Kolofon</a>`);
   
    const title = isFrontPage ? 
        `<h1>${titleText}</h1>` : 
        `<h1>${i18n(
            `<a href="/en">${titleText}</a>`,
            `<a href="/hu">${titleText}</a>`)}
        </h1>`;
    const nav = isFrontPage ? `<nav>${i18n(
        '<a href="/en">Home</a> | <a href="/en/about/">About</a> | <a href="/hu">Magyarul</a>',
        '<a href="/hu">Főoldal</a> | <a href="/hu/tortenet/">Történet</a> | <a href="/en">English</a>')
    }</nav>`: '';

    const footerImage = pick([
        "/images/dobol-macska.svg",
        "/images/diabolo-macska.svg",
        "/images/macska-alszik.svg",
        "/images/tandem-macska.svg",
        "/images/zsonglor-macska.svg"
    ]);

    const bodyClass = isFrontPage ? 'class="home"' : '';


    return stripMargin`
        | <!DOCTYPE HTML>
        | <html lang="${i18n.lang}">
        | <head>
        |     <meta charset="UTF-8">
        |     <meta name="viewport" content="width=device-width, initial-scale=1.0">
        |     <title>${titleText} - ${metadata.title}</title>
        |     <link rel="preconnect" href="https://fonts.googleapis.com">
        |     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        |     <link rel="stylesheet" 
        |           href="https://fonts.googleapis.com/css2?family=Francois+One&family=Merriweather:ital,wght@0,400;0,700;1,400;1,700&display=swap" 
        |           media="print" 
        |           onload="this.media='all'"
        |     >
        |     <link rel="stylesheet" href="/css/site.css?v=${version('site/css/site.css')}">
        |     <script async src="https://www.googletagmanager.com/gtag/js?id=UA-203054-6"></script>
        |     <script async src="/index.js?v=${version('site/index.js')}" type="module"></script>
        |     <script>
        |          window.dataLayer = window.dataLayer || [];
        |          function gtag(){dataLayer.push(arguments);}
        |          gtag('js', new Date());
        |          gtag('config', 'UA-203054-6');
        |      </script>
        | </head>
        | <body ${bodyClass}>
        | <header>
        | <div id="background1"></div>
        | <div id="background2"></div>
        | ${title}
        | ${nav}
        | </header>
        | <main>
        | <article>
        | <h1>${metadata.title}</h1>
        | ${html}
        | </article>
        | </main>
        | <footer>
        | <a class="donate" href="https://www.paypal.com/donate/?hosted_button_id=FMMVLP6ZN7AQ2" target="_blank"></a>
        | <img class="footer-image" src="${footerImage}" />
        | © 2004-<span name="year"></span> ${longTitle} | ${colophon} | <a href="https://github.com/encse/wildcat/">GitHub</a>
        | <script>
        |    const year =  "" + new Date().getFullYear();
        |    document.getElementsByName("year").forEach(n => n.innerText = year);
        | </script>
        | </footer>
        | </body>
        | </html>
    `;
}

function getSitemap(inputDir: string): Sitemap {
    const items = fs.readdirSync(inputDir);
    const sitemap: Sitemap = [];
    items.forEach(item => {
        const fpatIn = path.join(inputDir, item);
        const fpatOut = path.join(...inputDir.split('/').slice(1));
        console.log(`found ${fpatIn}`);

        if (fs.lstatSync(fpatIn).isDirectory()) {
            sitemap.push(...getSitemap(fpatIn));
        } else if (item.startsWith(".") && item != '.nojekyll') {
            // skip
            return;
        } else if (item.endsWith('.md')) {
            const isFrontPage = fpatIn == 'site/en/README.md' || fpatIn == 'site/hu/README.md';
            sitemap.push({
                kind: ItemKind.Page,
                path: path.join(fpatOut, item.replace("README", "index").replace("md", "html")),
                content: () => pageFromMarkdown(isFrontPage, i18n(fpatIn), fs.readFileSync(fpatIn, "utf-8"))
            });
        } else {
            sitemap.push({
                kind: ItemKind.Asset,
                path: path.join(fpatOut, item),
                content: () => fs.readFileSync(fpatIn)
            });
        }
    });
    return sitemap;
}

function generate(fpatIn: string, fpatOut: string, writeFile: (fpat: string, content: string | NodeJS.ArrayBufferView) => void) {
    const sitemap = getSitemap(fpatIn);
    for (let item of sitemap){
        writeFile(path.join(fpatOut, item.path), item.content());
    }

    writeFile(path.join(fpatOut, 'sitemap.xml'), stripMargin`
        | <?xml version="1.0" encoding="UTF-8"?>
        | <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        |     ${sitemap.filter(item => item.kind === ItemKind.Page).map(
                 entry => `<url><loc>https://zsonglor.csokavar.hu/${entry.path.replace('/index.html', '/')}</loc></url>`
             ).join("\n    ")}
        | </urlset>
    `);
}

generate('site', 'docs', (fpat: string, content: string | NodeJS.ArrayBufferView) => {
    fs.mkdirSync(path.parse(fpat).dir, { recursive: true });
    console.log(`writing ${fpat}`);
    fs.writeFileSync(fpat, content);
});

