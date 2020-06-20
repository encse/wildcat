function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

window.onload = () => {
    const button = document.createElement('div');
    button.style.backgroundImage=`url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8' standalone='no'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg width='100%25' height='100%25' viewBox='0 0 32 16' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xml:space='preserve' xmlns:serif='http://www.serif.com/' style='fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;'%3E%3Cpath d='M7.948,16C3.557,15.972 0,12.398 0,8C0,3.585 3.585,0 8,0L24,0C28.415,0 32,3.585 32,8C32,12.415 28.415,16 24,16L8,16L7.948,16Z' style='fill:rgb(235,235,235);'/%3E%3Cpath d='M24,16L8,16L7.948,16C3.557,15.972 0,12.398 0,8C0,3.585 3.585,0 8,0L24,0C28.415,0 32,3.585 32,8C32,12.415 28.415,16 24,16ZM24,0.867L8,0.867C4.063,0.867 0.867,4.063 0.867,8C0.867,11.922 4.038,15.108 7.954,15.133L8,15.133L24,15.133C27.937,15.133 31.133,11.937 31.133,8C31.133,4.063 27.937,0.867 24,0.867Z'/%3E%3Cg transform='matrix(0.0225786,0,0,0.0225786,-2.50355,-26.3388)'%3E%3Ccircle cx='481.272' cy='1520.86' r='233.081' style='fill:rgb(66,70,90);'/%3E%3Cpath d='M481.272,1237.58C324.928,1237.58 197.997,1364.51 197.997,1520.86C197.997,1677.2 324.928,1804.13 481.272,1804.13C637.616,1804.13 764.548,1677.2 764.548,1520.86C764.548,1364.51 637.616,1237.58 481.272,1237.58ZM481.272,1287.78C609.913,1287.78 714.353,1392.22 714.353,1520.86C714.353,1649.5 609.913,1753.94 481.272,1753.94C352.632,1753.94 248.192,1649.5 248.192,1520.86C248.192,1392.22 352.632,1287.78 481.272,1287.78Z'/%3E%3C/g%3E%3C/svg%3E%0A")`;
    button.style.width="48px";
    button.style.height="24px";
    button.style.position="absolute";
    button.style.top="24px";
    button.style.right="24px";
    document.getElementsByTagName('header')[0].appendChild(button);
    let theme = "light"
    const applyTheme = (newTheme) => {
            theme = newTheme;
            document.documentElement.classList.toggle("dark", theme === "dark");
            button.style.transform = theme === "dark" ? "rotate(180deg)" : "";
            document.cookie = `theme=${theme};path=/`;
    };

    applyTheme(getCookie("theme"));
    button.onclick = () => {
        applyTheme(theme === "dark" ? "light" : "dark");
    }
};
