function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

document.documentElement.classList.toggle("dark", getCookie("theme") === "dark");

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
        
        html {
        }
        
        .wrapper {
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
            background-color: rgba(0,0,0,10%);
            border-radius: 40px;
            border: 2px solid rgba(0,0,0,40%);
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
            background-color: rgba(0,0,0,10%);
            border-color: rgba(0,0,0,40%)
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

};