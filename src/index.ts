import fs from 'fs';
import MarkdownIt from 'markdown-it'
import metadataParse from 'markdown-yaml-metadata-parser';

function stripMargin(strings: TemplateStringsArray, ...values: any[]): string {
	let s = strings[0];
	for (let i = 0; i < values.length; i++) {
		s += values[i];
		s += strings[i+1];
	}
	return s.trim().split("\n").map(line => line.replace(/^\s*\| /, "")).join('\n');
}

function getLang(fpatIn: string): string{
    return fpatIn.indexOf('/en/') >=0 ?'en' : 'hu';
}


function fail(st: string): never {
  throw new Error(st);
}

type SitemapEntry = {
    name: string;
    fpat: string;
}

function generate(fpatIn: string, fpatOut: string, ipage: number): SitemapEntry {
    const input = fs.readFileSync(fpatIn, "utf-8");

    const {metadata, content} = metadataParse(input);

    const md = MarkdownIt({
        html: true
    });

    const lang = getLang(fpatIn);

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
            const description = lang == 'en' ?
                    `How to juggle the ${
                        metadata.props == 'balls' ? "balls" :
                        metadata.props == 'club' ? "clubs" :
                        metadata.props == 'ring' ? "rings" :
                        metadata.props == 'rubber-band' ? "rubber bands" :
                        fail("invalid prop " + metadata.props)
                    }? Instructor: Rob Abram (Wildcat Jugglers)` :
                    `Zsonglőrködés ${
                        metadata.props == 'balls' ? "labdával" :
                        metadata.props == 'club' ? "buzogánnyal" :
                        metadata.props == 'ring' ? "karikával" :
                        metadata.props == 'rubber-band' ? "befőttes gumival" :
                        fail("invalid prop " + metadata.props)
                    }. Bemutatja: Rob Abram (Wildcat Jugglers)`;

            return `<script type="application/ld+json">{
                "@context": "http://schema.org",
                "@type": "VideoObject",
                "name": "${name}",
                "description": "${description}",
                "thumbnailUrl": "${poster}",
                "contentUrl": "${mp4}",
                "uploadDate": "2003-02-05T08:00:00+08:00"
            }
            </script><video loop playsinline autoplay src="${mp4}" poster="${poster}"></video>\n`
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
    const title = lang === 'en' ? 'Wildcat Jugglers tutorial' : 'Wildcat Zsonglőr oldalak';
    const nav = lang === 'en' ?
        '<a href="/en">Home</a> | <a href="/en/about/">About</a> | <a href="/hu">Magyarul</a>' :
        '<a href="/hu">Főoldal</a> | <a href="/hu/tortenet/">Történet</a> | <a href="/en">English</a>';


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
        |     <title>${title} - ${metadata.title}</title>
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
        | <h1>${metadata.title}</h1>
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

    return {
        name: metadata.title,
        fpat: fpatOut
    };
}

function process(inputDir: string, outputDir: string, ipage: number): SitemapEntry[] {
    const items = fs.readdirSync(inputDir);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }
    let res = [];
    items.forEach(item => {
        const fpatIn = inputDir + "/" + item;

        if (fs.lstatSync(fpatIn).isDirectory()) {
            const fpatOut = outputDir + "/" + item;
            res.push(...process(fpatIn, fpatOut, ipage));
        } else if(fpatIn.endsWith('.md')){
            res.push(generate(
                fpatIn,
                outputDir + "/" + item.replace('README.md', 'index.html'),
                ipage++));
        } else {
            fs.copyFileSync(fpatIn, outputDir + "/" + item);
        }
    });
    return res;
}


const sitemapEntries = process('site', 'build', 0);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${sitemapEntries.map(
        entry => `<url><loc>https://zsonglor.csokavar.hu/${entry.fpat.replace('/index.html', '/').replace('build/','')}</loc></url>`
    ).join("\n\t")}
</urlset>`;
fs.writeFileSync('build/sitemap.xml', sitemap);

