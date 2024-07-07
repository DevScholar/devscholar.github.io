class CustomInsert extends HTMLElement {
    constructor() {
        super();

        let templateURL = `/zh-CN/templates/${this.getAttribute("template")}.htm`;
        let self = this; 

        let xmlhttp = new XMLHttpRequest();
        
        xmlhttp.open("GET", templateURL, true);
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                self.outerHTML = xmlhttp.responseText;
            }
        };
        
        xmlhttp.send();
    }
}

customElements.define("custom-insert", CustomInsert);

class ScriptInsert extends HTMLElement {
    constructor() {
        super();
        this.style.display = "none";
        let scriptURL;
        if (this.getAttribute("src")) {
            scriptURL = this.getAttribute("src")
        }
        let self = this;
        let scriptElement = document.createElement("script");
        scriptElement.text = this.innerHTML;
        if (scriptURL) {
            scriptElement.src = scriptURL;
        }
        this.appendChild(scriptElement);
    }
}

customElements.define("script-insert", ScriptInsert);