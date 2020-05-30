import fs from 'fs';
import MarkdownIt from 'markdown-it'
const readme = fs.readFileSync("../images/README.md", "utf8");
const md = MarkdownIt({
    html: true
});

const defaultRender = md.renderer.rules.image;

md.renderer.rules.image = function (tokens, idx, options, env, self) {
    const token = tokens[idx];
    const aIndex = token.attrIndex('src');

    const src = token.attrs[aIndex][1];
    if (src.endsWith(".mp4")) {
        return `<video class="center" playsinline="" controls="" loop="">
			  <source src="${src}" type="video/mp4">
				Your browser does not support the video tag.
            </video>\n`
    }

    return defaultRender(tokens, idx, options, env, self);
};


const html = md.render(readme);
fs.writeFileSync("build/index.html", `
<!DOCTYPE HTML>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wildcat</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/open-fonts@1.1.1/fonts/inter.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@exampledev/new.css@1.1.2/new.min.css">
</head>
<body>
<header>
<h1>Wildcat Zsonglőr oldalak</h1>
<nav>
    <a href="https://github.com/xz/new.css">GitHub</a> / 
</nav>
</header>
${html}
<footer>
<p>© 2004-2020 Wildcat Zsonglőr Oldalak <a href="">GitHub</></p>
</footer>
</body>
</html>
`);
