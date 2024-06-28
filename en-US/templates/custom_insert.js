class CustomInsert extends HTMLElement {
    constructor() {
        super();

        let templateURL = `/en-US/templates/${this.getAttribute("template")}.htm`;
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

