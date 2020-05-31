import fs from 'fs';
import { JSDOM } from 'jsdom';

const base = "../www.tujuggle.com/WildcatJugglers/";
fs.readdirSync(base).forEach(file => {
    let src = fs.readFileSync(base + file, "utf8");
    src = src.replace(/[ \n\r]+/g, ' ');
    let dom = new JSDOM(src);

    

    let x: HTMLElement = dom.window.document.querySelectorAll('table[width="780"]')[0] as HTMLElement;
    function foo(x: Element) {
        if (x.tagName == null) {
            return x.textContent.trim();
        } else if (x.tagName =='A') {
            let href = x.getAttribute('href');
            if (href.startsWith('https://zsonglor.csokavar.hu/')){
                href = href.replace('https://zsonglor.csokavar.hu/', '#');
            } 
            if (href.endsWith("/")){
                href = href.replace("/", "-html")
            }
            return ` [${x.textContent}](${(href)}) `
        }  else if (x.tagName == "IMG" || x.tagName == "EMBED") {
            let src = x.getAttribute('src');
            let name = src.split('/')[src.split('/').length-1].split(".")[0]
            return `\n![${name}](${src})\n`
        } else if (x.tagName == "BR") {
            return "\n";
        }else if (["TR", "UL", "LI", "TD", "TABLE", "FONT", "TBODY"].indexOf(x.tagName) >= 0) {
            let st = ""

            if (x.tagName == "LI"){
                st += "1. "
            }

            let child = x.firstChild as Element;
            while (child != null){
                st += foo(child);
                child = child.nextSibling as Element;
            }

            if (st.length > 0 && !st.endsWith("\n")) {
                st += "\n"
            }

            return st;
        } else {
            throw new Error(x.tagName);
        }
                // } else if(d.tagName =='img'){
                //     return ` ![img](${d.getAttribute('src')}) `
                // } else if (d.classNames.indexOf('video') >= 0) {
                //     let src = d.querySelector('source').getAttribute('src');
                //     let name = src.split('/')[src.split('/').length-1].split(".")[0]
                //     return `\n![${name}](${d.querySelector('source').getAttribute('src')})\n`
                // } else if(d.tagName == 'br') {
                //     return '\n';
                // } else if(
                //     d.tagName == 'section' ||
                //     d.tagName == 'li' ||
                //     d.tagName == 'ul' ||
                //     d.tagName == 'h1' || 
                //     d.tagName == 'h2' || 
                //     d.tagName == 'h3' || 
                //     d.tagName == 'div' || 
                //     d.tagName == 'p' ||
                //      d.tagName == 'span' || 
                //      d.tagName == 'em'
                //      ) {
                //     let st = ""
        
                //     if(d.tagName == 'p' || d.tagName == 'h1' || d.tagName == 'h2' || d.tagName == 'h3' || d.tagName == 'ul'){
                //         st += "\n"
                //     }
                //     if (d.tagName == "li"){
                //         st += "1. "
                //     }
                //     if (d.tagName == "h1"){
                //         st += `# <a name="${file.replace(/\./g, "-")}"></a>`
                //     }
                //     if (d.tagName == "h2"){
                //         st += "## "
                //     }
                //     if (d.tagName == "h3"){
                //         st += "### "
                //     }
                //     for (node of d.childNodes){
                //         st += foo(node);
                //     }
        
                //     if(d.tagName == 'em') {
                //         st = ` **${st}** `;
                //     }
                //     if(d.tagName == 'span') {
                //         st = `  ${st} `;
                //     }
                //     if(d.tagName !== "p" && d.tagName !== "span" && d.tagName !== "em" && st.length > 0 && !st.endsWith("\n")) {
                //         st += "\n"
                //     }
           
        
    }

    let title = dom.window.document.getElementsByTagName('table')[0].getElementsByTagName('font')[7].textContent
    const res = `# <a name="en/${file}"></a>${title}\n${foo(x)}`;
    console.log(res);

   


    // d = d.querySelector('#page');
    // let st = foo(d);
    // st = st.replace(/&#8230;/g, '…');
    // st = st.replace(/&#8243;/g, '"');
    // st = st.replace(/&#8220;/g, '"');
    // st = st.replace(/&#8221;/g, '"');
    // st = st.replace(/&#8216;/g, '"');
    // st = st.replace(/&#8217;/g, '"');
    // st = st.replace(/&#8211;/g, '–');
    // st = st.replace(/&#039/g, '\'');
    // st = st.replace(/&quot;/g, '"');
    // console.log(st);

});

