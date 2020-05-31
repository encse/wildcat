import fs from 'fs';
import path from 'path';
import MarkdownIt from 'markdown-it'


function files(md: string): { filn: string, content: string }[] {
    const lines = md.split('\n');
    const rx = /# <a name=\"(.*)"><\/a>(.*)/;
    let i = 0;
    const blocks: { filn: string, content: string }[] = [];
    while (i < lines.length) {
        const m = lines[i].match(rx);

        if (m) {
            const filn = m[1];
            let content = "# " + m[2] + "\n";
            i++;
            while (i < lines.length && !lines[i].match(rx)) {
                content += lines[i] + "\n";
                i++;
            }
            blocks.push({ filn, content });
        } else {
            i++;
        }
    }
    return blocks;
}

const md = MarkdownIt({
    html: true
});


const defaultRender = md.renderer.rules.image;

md.renderer.rules.image = function (tokens, idx, options, env, self) {
    const token = tokens[idx];
    const aIndex = token.attrIndex('src');

    const src = token.attrs[aIndex][1];
    if (src.endsWith(".mp4")) {
        const parts = src.split("/");
        const file = parts[parts.length-1];
        const poster = "videos/poster/" + file.replace(".mp4", ".jpg");
        return `<video loop playsinline autoplay src="${src}" poster="${poster}"></video>\n`
    }

    return defaultRender(tokens, idx, options, env, self);
};


md.renderer.rules.link_open = function (tokens, idx, options, _, self) {
    // If you are sure other plugins can't add `target` - drop check below
    var aIndex = tokens[idx].attrIndex('href');

    let href = tokens[idx].attrs[aIndex][1];
    if (href.startsWith("#")) {
        href = href.substr(1);
        tokens[idx].attrs[aIndex][1] = href;
    }

    // pass token to default renderer.
    return self.renderToken(tokens, idx, options);
};

const readme = fs.readFileSync("../images/README.md", "utf8");

for (let { filn, content } of files(readme)) {
    const html = md.render(content);
    const loc = "build/" + filn;
    
    if (!fs.existsSync(path.parse(loc).dir)) {
        fs.mkdirSync(path.parse(loc).dir);
    }
    const en = filn.startsWith('/en/');
    let title = en ? 'Wildcat Jugglers tutorial' : 'Wildcat Zsonglőr oldalak';
    let tricks = en ? '<a href="/en">Tricks</a>' : '<a href="/">Trükkök</a>';

    fs.writeFileSync(loc, `
        <!DOCTYPE HTML>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Wildcat</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/open-fonts@1.1.1/fonts/inter.min.css">
            <link rel="stylesheet" href="/awsm.min.css">
        </head>
        <body>
        <header>
        <h1>${title}</h1>
        <nav>
            ${tricks}
        </nav>
        </header>
        <main>
        <article>
        ${html}
        </article>
        </main>
        <footer>
        © 2004-2020 Wildcat Zsonglőr Oldalak | <a href="https://github.com/encse/wildcat/">GitHub</a>
        </footer>
        </body>
        </html>
    `);
}
