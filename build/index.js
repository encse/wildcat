function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

document.documentElement.classList.toggle("dark", getCookie("theme") === "dark");

// window.onload = () => {
//     const button = document.createElement('div');
//     button.style.backgroundImage=`url("data:image/svg+xml,%3Csvg xmlns:dc='http://purl.org/dc/elements/1.1/' xmlns:cc='http://creativecommons.org/ns%23' xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns%23' xmlns:svg='http://www.w3.org/2000/svg' xmlns='http://www.w3.org/2000/svg' version='1.1' id='svg5676' viewBox='0 0 99.999963 99.999994' height='99.999992' width='99.999962'%3E%3Cdefs id='defs5678'/%3E%3Cmetadata id='metadata5681'%3E%3Crdf:RDF%3E%3Ccc:Work rdf:about=''%3E%3Cdc:format%3Eimage/svg+xml%3C/dc:format%3E%3Cdc:type rdf:resource='http://purl.org/dc/dcmitype/StillImage'/%3E%3Cdc:title/%3E%3C/cc:Work%3E%3C/rdf:RDF%3E%3C/metadata%3E%3Cg transform='translate(-467.14292,-662.36221)' id='layer1'%3E%3Cg id='g5668' style='display:inline' transform='translate(2832.9859,467.44267)'%3E%3Cpath style='fill:%23efed81;fill-opacity:1;stroke:%23efed81;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1' d='m -2303.8319,237.42104 a 25.75,25.75 0 0 1 4.1621,14.02344 25.75,25.75 0 0 1 -25.75,25.75 25.75,25.75 0 0 1 -7.7129,-1.1875 27.125,27.125 0 0 0 24.3379,15.1875 27.125,27.125 0 0 0 27.125,-27.125 27.125,27.125 0 0 0 -22.1621,-26.64844 z' id='path5332'/%3E%3Cpath style='display:inline;fill:%23142b54;fill-opacity:1' d='m -2286.4537,285.37038 a 50,50 0 0 1 -69.8401,-11.06158 l 80.9016,-58.77853 a 50,50 0 0 1 -11.0615,69.84011 z' id='path4979-3-4'/%3E%3Cpath style='display:inline;fill:%23b5d3ff;fill-opacity:1' d='m -2345.2323,204.46868 a 50,50 0 0 0 -11.0615,69.84012 l 80.9016,-58.77853 a 50,50 0 0 0 -69.8401,-11.06159 z' id='path4979-3-6-6'/%3E%3Cpath style='display:inline;fill:%23ffffff;fill-opacity:1' d='m -2328.2188,202.82617 a 5.1229018,3.8939083 8.174505 0 0 -4.1718,1.70899 5.3737542,4.1350772 8.5790619 0 0 -2.6973,-1.09961 5.3737542,4.1350772 8.5790619 0 0 -6.043,3.16797 5.3737542,4.1350772 8.5790619 0 0 0.2168,1.87695 5.4190855,3.2619352 0 0 0 -2,2.5293 5.4190855,3.2619352 0 0 0 5.42,3.26171 5.4190855,3.2619352 0 0 0 3.7949,-0.9375 5.1229018,3.8939083 8.174505 0 0 2.0078,0.6875 5.1229018,3.8939083 8.174505 0 0 4.3594,-0.88671 4.2209855,3.5112091 12.489483 0 0 2.6699,1.45312 4.2209855,3.5112091 12.489483 0 0 0.8359,0.082 4.2209855,3.5112091 12.489483 0 0 3.8946,-2.78125 4.2209855,3.5112091 12.489483 0 0 -3.0332,-4.0957 5.1229018,3.8939083 8.174505 0 0 0.047,-0.19727 5.1229018,3.8939083 8.174505 0 0 -4.3418,-4.67773 5.1229018,3.8939083 8.174505 0 0 -0.959,-0.0918 z m 30.459,4.84766 a 4.0134658,2.7032154 0 0 0 -3.9433,2.20703 3.4728226,2.7032154 0 0 0 -1.8242,-0.40625 3.4728226,2.7032154 0 0 0 -3.4727,2.70312 3.4728226,2.7032154 0 0 0 0.041,0.40235 3.3827153,2.7032154 0 0 0 -0.5742,-0.041 3.3827153,2.7032154 0 0 0 -3.3828,2.70313 3.3827153,2.7032154 0 0 0 2.1152,2.5039 3.2926083,2.7032154 0 0 0 0,0.0195 3.2926083,2.7032154 0 0 0 3.293,2.70313 3.2926083,2.7032154 0 0 0 2.4101,-0.86719 3.2926083,2.7032154 0 0 0 2.9961,1.58789 3.2926083,2.7032154 0 0 0 2.8868,-1.40234 4.4315354,4.7756803 0 0 0 2.7578,1.04101 4.4315354,4.7756803 0 0 0 4.4316,-4.77539 4.4315354,4.7756803 0 0 0 -3.9707,-4.74804 4.0134658,2.7032154 0 0 0 0.25,-0.92774 4.0134658,2.7032154 0 0 0 -4.0117,-2.70312 l 0,0 z m -47.0507,24.17187 a 7.5114311,3.4539996 0 0 0 -7.4454,3.02344 6.1503518,3.2684096 0 0 0 -3.1718,-0.47266 6.1503518,3.2684096 0 0 0 -6.1504,3.26758 6.1503518,3.2684096 0 0 0 2.8633,2.75977 6.6290901,3.2684096 0 0 0 -0.629,1.38086 6.6290901,3.2684096 0 0 0 4.3145,3.05859 5.8311931,3.2684096 0 0 0 -0.4844,1.30078 5.8311931,3.2684096 0 0 0 5.8321,3.26758 5.8311931,3.2684096 0 0 0 5.6386,-2.45312 7.8482269,5.7741905 0 0 0 4.6758,1.14453 7.8482269,5.7741905 0 0 0 7.8477,-5.77344 7.8482269,5.7741905 0 0 0 -6.4063,-5.67188 7.5114311,3.4539996 0 0 0 0.627,-1.37695 7.5114311,3.4539996 0 0 0 -7.5117,-3.45508 z' id='path5020-7-8'/%3E%3Cpath style='display:inline;fill:%23ff8516;fill-opacity:1' d='m -2332.1875,205.87421 a 0.78806295,0.78806295 0 0 0 -0.6485,0.31836 l -2.5586,3.44727 a 16.287882,16.287882 0 0 1 6.0567,-1.17579 16.287882,16.287882 0 0 1 1.1113,0.0566 l -3.5195,-2.5 a 0.78806295,0.78806295 0 0 0 -0.4414,-0.14648 z m 9.3672,0.99219 a 0.78806295,0.78806295 0 0 0 -0.2676,0.0644 l -3.9629,1.71484 a 16.287882,16.287882 0 0 1 6.7793,2.58203 l -1.7852,-3.90234 a 0.78806295,0.78806295 0 0 0 -0.6836,-0.45898 0.78806295,0.78806295 0 0 0 -0.08,0 z m -18.0469,2.86523 a 0.78806295,0.78806295 0 0 0 -0.7793,0.69727 l -0.4942,4.28515 a 16.287882,16.287882 0 0 1 5.6309,-4.57421 l -4.2793,-0.40625 a 0.78806295,0.78806295 0 0 0 -0.078,-0.002 z m 11.5293,0.44922 a 14.571537,14.571537 0 0 0 -14.5703,14.57031 14.571537,14.571537 0 0 0 14.5703,14.57227 14.571537,14.571537 0 0 0 14.5722,-14.57227 14.571537,14.571537 0 0 0 -14.5722,-14.57031 z m 10.039,1.76758 a 16.287882,16.287882 0 0 1 4.5743,5.63281 l 0.4062,-4.28125 a 0.78806295,0.78806295 0 0 0 -0.6953,-0.85742 l -4.2852,-0.49414 z m -23.5625,3.73828 -3.9023,1.78516 a 0.78806295,0.78806295 0 0 0 -0.3945,1.02929 l 1.7148,3.96094 a 16.287882,16.287882 0 0 1 2.582,-6.77539 z m 28.6368,3.00781 a 16.287882,16.287882 0 0 1 1.1757,6.0586 16.287882,16.287882 0 0 1 -0.055,1.10742 l 2.498,-3.51758 a 0.78806295,0.78806295 0 0 0 -0.1719,-1.08984 l -3.4472,-2.5586 z m -31.3457,4.95118 a 16.287882,16.287882 0 0 0 0,0.004 l 0,-0.004 0,0 z m 0,0.004 -2.4981,3.51171 a 0.78806295,0.78806295 0 0 0 0.1719,1.08985 l 3.4473,2.55859 a 16.287882,16.287882 0 0 1 -1.1758,-6.05664 16.287882,16.287882 0 0 1 0.055,-1.10351 z m 32.3398,3.39062 a 16.287882,16.287882 0 0 1 -2.582,6.77734 l 3.9023,-1.78515 a 0.78806295,0.78806295 0 0 0 0.3945,-1.0293 l -1.7148,-3.96289 z m -30.7187,4.88477 -0.4063,4.27929 a 0.78806295,0.78806295 0 0 0 0.6953,0.85742 l 4.2852,0.49415 a 16.287882,16.287882 0 0 1 -4.5742,-5.63086 z m 27.416,2.86523 a 16.287882,16.287882 0 0 1 -5.6309,4.57422 l 4.2793,0.40625 a 0.78806295,0.78806295 0 0 0 0.8574,-0.69531 l 0.4942,-4.28516 z m -21.8692,3.48633 1.7852,3.90234 a 0.78806295,0.78806295 0 0 0 1.0293,0.39453 l 3.9629,-1.71484 a 16.287882,16.287882 0 0 1 -6.7774,-2.58203 z m 15.1211,1.58789 a 16.287882,16.287882 0 0 1 -6.0566,1.17578 16.287882,16.287882 0 0 1 -1.1035,-0.0566 l 3.5136,2.5 a 0.78806295,0.78806295 0 0 0 1.0899,-0.17187 l 2.5566,-3.44727 z' id='path5018-3'/%3E%3Cpath style='display:inline;fill:%23efed81;fill-opacity:1;stroke:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1' d='m -2281.4668,227.06641 -0.3203,1.93359 -1.9336,0.31836 1.9336,0.32031 0.3203,1.9336 0.3184,-1.9336 1.9336,-0.32031 -1.9336,-0.31836 -0.3184,-1.93359 z m 9.5,9.5 -0.5664,3.4375 -3.4375,0.56445 3.4375,0.56641 0.5664,3.4375 0.5645,-3.4375 3.4375,-0.56641 -3.4375,-0.56445 -0.5645,-3.4375 z m -22.791,6.41211 a 0.50004997,0.50004997 0 0 0 -0.4727,0.69336 c 1.3571,3.25291 1.7544,6.82694 1.1426,10.29882 -1.7686,10.02964 -11.3146,16.71738 -21.3379,14.95118 -1.5258,-0.27711 -3.0096,-0.74519 -4.418,-1.39454 a 0.50004997,0.50004997 0 0 0 -0.6523,0.6875 c 2.7193,5.11589 7.6422,8.69514 13.3457,9.70313 10.2349,1.80454 20.0088,-5.04279 21.8145,-15.2832 1.367,-7.81191 -2.3053,-15.64677 -9.1817,-19.58985 a 0.50004997,0.50004997 0 0 0 -0.2383,-0.0664 l 0,0 z m -14.6992,3.10546 -0.3379,2.04883 -2.0469,0.33594 2.0469,0.33789 0.3379,2.04688 0.3379,-2.04688 2.0468,-0.33789 -2.0468,-0.33594 -0.3379,-2.04883 z m 33.2402,7.02735 -0.3125,1.89648 -1.8965,0.31055 1.8965,0.3125 0.3125,1.89648 0.3106,-1.89648 1.8964,-0.3125 -1.8964,-0.31055 -0.3106,-1.89648 z m -64.8066,18.74219 -0.4239,2.57812 -2.5781,0.42578 2.5781,0.42383 0.4239,2.57813 0.4257,-2.57813 2.5782,-0.42383 -2.5782,-0.42578 -0.4257,-2.57812 z m 15.7422,6.37304 -0.7774,4.72461 -4.7246,0.7793 4.7246,0.77734 0.7774,4.72461 0.7792,-4.72461 4.7247,-0.77734 -4.7247,-0.7793 -0.7792,-4.72461 z m 28.5527,3.74414 -0.3125,1.89453 -1.8965,0.3125 1.8965,0.3125 0.3125,1.89649 0.3105,-1.89649 1.8965,-0.3125 -1.8965,-0.3125 -0.3105,-1.89453 z' id='path5257-0'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;
//     button.style.width="100px";
//     button.style.height="100px";
//     button.style.position="absolute";
//     button.style.top="24px";
//     button.style.right="24px";
//     document.getElementsByTagName('header')[0].appendChild(button);
//     let theme = "light";
//     const applyTheme = (newTheme) => {
//             theme = newTheme;
//             document.documentElement.classList.toggle("dark", theme === "dark");
//             button.style.transform = theme === "dark" ? "rotate(180deg)" : "";
//             document.cookie = `theme=${theme};path=/`;
//     };

//     applyTheme(getCookie("theme"));
//     button.onclick = () => {
//         applyTheme(theme === "dark" ? "light" : "dark");
//     }
// };


window.onload = () => {
    const button = document.createElement('div');
    button.innerHTML=`
        <div class="wrapper">
            <div class="toggle">
                <input class="toggle-input" type="checkbox" />
                <div class="toggle-bg"></div>
                <div class="toggle-switch">
                <div class="toggle-switch-figure"></div>
                <div class="toggle-switch-figureAlt"></div>
                </div>  
            </div>
        </div>`;

    const style = document.createElement('style');

    style.innerHTML=`/*
        F5EB42 - sun inner
        E4C74D - sun outer
        FFFFFF - cloud inner
        D4D4D2 - cloud outer
        81C0D5 - parent outer
        C0E6F6 - parent inner
        FFFDF2 - moon inner
        DEE1C5 - moon outer
        FCFCFC - stars
        */
        // body {
        // background-color: #F3F3F3;
        // }
        
        .wrapper {
            padding-top: 40px;
            text-align: center;
        }
        
        .toggle {
            position: relative;
            display: inline-block;
            width: 100px;
            padding: 4px;
            border-radius: 40px;
        }
        
        .toggle:before,
        .toggle:after {
            content: '';
            display: table;
        }
        
        .toggle:after {
            clear: both;
        }
        
        .toggle-bg {
            position: absolute;
            top: -4px;
            left: -4px;
            width: 100%;
            height: 100%;
            background-color: #C0E6F6;
            border-radius: 40px;
            border: 4px solid #81C0D5;
            -webkit-transition: all 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            transition: all 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .toggle-input {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: 1px solid red;
            border-radius: 40px;
            z-index: 2;
            opacity: 0;
        }
        
        .toggle-switch {
            position: relative;
            width: 40px;
            height: 40px;
            margin-left: 50px;
            background-color: #F5EB42;
            border: 4px solid #E4C74D;
            border-radius: 50%;
            -webkit-transition: all 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            transition: all 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .toggle-switch-figure {
            position: absolute;
            bottom: -14px;
            left: -50px;
            display: block;
            width: 80px;
            height: 30px;
            border: 8px solid #D4D4D2;
            border-radius: 20px;
            background-color: #fff;
            -webkit-transform: scale(0.4);
                    transform: scale(0.4);
            -webkit-transition: all 0.12s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            transition: all 0.12s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .toggle-switch-figure:after {
            content: '';
            display: block;
            position: relative;
            top: -65px;
            right: -42px;
            width: 15px;
            height: 15px;
            border: 8px solid #D4D4D2;
            border-radius: 100%;
            border-right-color: transparent;
            border-bottom-color: transparent;
            -webkit-transform: rotateZ(70deg);
                    transform: rotateZ(70deg);
            background-color: #fff;
        }
        .toggle-switch-figure:before {
            content: '';
            display: block;
            position: relative;
            top: -25px;
            right: -10px;
            width: 30px;
            height: 30px;
            border: 8px solid #D4D4D2;
            border-radius: 100%;
            border-right-color: transparent;
            border-bottom-color: transparent;
            -webkit-transform: rotateZ(30deg);
                    transform: rotateZ(30deg);
            background-color: #fff;
        }
        
        .toggle-switch-figureAlt {
            content: '';
            position: absolute;
            top: 5px;
            left: 2px;
            width: 2px;
            height: 2px;
            background-color: #EFEEDA;
            border-radius: 100%;
            border: 4px solid #DEE1C5;
            box-shadow: 42px -7px 0 -3px #FCFCFC, 75px -10px 0 -3px #FCFCFC, 54px 4px 0 -4px #FCFCFC, 83px 7px 0 -2px #FCFCFC, 63px 18px 0 -4px #FCFCFC, 44px 28px 0 -2px #FCFCFC, 78px 23px 0 -3px #FCFCFC;
            -webkit-transition: all 0.12s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            transition: all 0.12s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            -webkit-transform: scale(0);
                    transform: scale(0);
        }
        
        .toggle-switch-figureAlt:before {
            content: '';
            position: absolute;
            top: -6px;
            left: 18px;
            width: 7px;
            height: 7px;
            background-color: #EFEEDA;
            border-radius: 100%;
            border: 4px solid #DEE1C5;
        }
        
        .toggle-switch-figureAlt:after {
            content: '';
            position: absolute;
            top: 19px;
            left: 15px;
            width: 2px;
            height: 2px;
            background-color: #EFEEDA;
            border-radius: 100%;
            border: 4px solid #DEE1C5;
        }
        
        .toggle-input:checked ~ .toggle-switch {
            margin-left: 0;
            border-color: #DEE1C5;
            background-color: #FFFDF2;
        }
        
        .toggle-input:checked ~ .toggle-bg {
            background-color: #484848;
            border-color: #202020;
        }
        
        .toggle-input:checked ~ .toggle-switch .toggle-switch-figure {
            margin-left: 40px;
            opacity: 0;
            -webkit-transform: scale(0.1);
                    transform: scale(0.1);
        }
        
        .toggle-input:checked ~ .toggle-switch .toggle-switch-figureAlt {
            -webkit-transform: scale(1);
                    transform: scale(1);
        }
    `;

    button.appendChild(style);

    button.style.width="100px";
    button.style.height="100px";
    button.style.position="absolute";
    button.style.top="0";
    button.style.right="0";
    button.style.transform="scale(.6)";
    document.getElementsByTagName('header')[0].appendChild(button);

    let theme = "light";
    const applyTheme = (newTheme) => {
            theme = newTheme;
            if (theme === "dark"){
                document.getElementsByClassName('toggle-input')[0].checked = true;
            }
            document.documentElement.classList.toggle("dark", theme === "dark");
            document.documentElement.classList.toggle("dark", theme === "dark");
            document.cookie = `theme=${theme};path=/`;
    };

    applyTheme(getCookie("theme"));
    button.onclick = () => {
        applyTheme(theme === "dark" ? "light" : "dark");
    }

}