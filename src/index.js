fs = require("fs");
r = require("node-html-parser");

base = "../zsonglor.csokavar.hu/";
fs.readdirSync(base).forEach(file => {
    d = r.parse(fs.readFileSync(base+file, "utf8"));
    try{

    d.querySelector('#comments') ? d.querySelector('#comments').set_content('') : '';
    d.querySelector('#respond')? d.querySelector('#respond').set_content(''):'';
    d.querySelector('#footer') ? d.querySelector('#footer').set_content(''):'';

    } catch(e){

    }
    function foo(d){
        if (d.tagName == null){
            return d.rawText.trim();
        } else if(d.tagName =='a'){
            let href = d.getAttribute('href');
            if (href.startsWith('https://zsonglor.csokavar.hu/')){
                href = href.replace('https://zsonglor.csokavar.hu/', '#');
            } 
            if (href.endsWith("/")){
                href = href.replace("/", "-html")
            }
            return ` [${d.rawText}](${(href)}) `
        } else if(d.tagName =='img'){
            return ` ![img](${d.getAttribute('src')}) `
        } else if (d.classNames.indexOf('video') >= 0) {
            let src = d.querySelector('source').getAttribute('src');
            name = src.split('/')[src.split('/').length-1].split(".")[0]
            return `\n![${name}](${d.querySelector('source').getAttribute('src')})\n`
        } else if(d.tagName == 'br') {
            return '\n';
        } else if(
            d.tagName == 'section' ||
            d.tagName == 'li' ||
            d.tagName == 'ul' ||
            d.tagName == 'h1' || 
            d.tagName == 'h2' || 
            d.tagName == 'h3' || 
            d.tagName == 'div' || 
            d.tagName == 'p' ||
             d.tagName == 'span' || 
             d.tagName == 'em'
             ) {
            let st = ""

            if(d.tagName == 'p' || d.tagName == 'h1' || d.tagName == 'h2' || d.tagName == 'h3' || d.tagName == 'ul'){
                st += "\n"
            }
            if (d.tagName == "li"){
                st += "1. "
            }
            if (d.tagName == "h1"){
                st += `# <a name="${file.replace(/\./g, "-")}"></a>`
            }
            if (d.tagName == "h2"){
                st += "## "
            }
            if (d.tagName == "h3"){
                st += "### "
            }
            for (node of d.childNodes){
                st += foo(node);
            }

            if(d.tagName == 'em') {
                st = ` **${st}** `;
            }
            if(d.tagName == 'span') {
                st = `  ${st} `;
            }
            if(d.tagName !== "p" && d.tagName !== "span" && d.tagName !== "em" && st.length > 0 && !st.endsWith("\n")) {
                st += "\n"
            }
            
            return st;
        } else {
            console.log(d.tagName);
            throw new Error();
        }
    }

    d = d.querySelector('#page');
    let st = foo(d);
    st = st.replace(/&#8230;/g, '…');
    st = st.replace(/&#8243;/g, '"');
    st = st.replace(/&#8220;/g, '"');
    st = st.replace(/&#8221;/g, '"');
    st = st.replace(/&#8216;/g, '"');
    st = st.replace(/&#8217;/g, '"');
    st = st.replace(/&#8211;/g, '–');
    st = st.replace(/&#039/g, '\'');
    st = st.replace(/&quot;/g, '"');
    console.log(st);

});

