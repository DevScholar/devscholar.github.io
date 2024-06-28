class CustomInsert extends HTMLElement {
    constructor() {
        super();
        let templateURL = `/en-US/templates/${this.getAttribute("template")}.txt`;
        function loadXMLDoc() {
            let xmlhttp;
            xmlhttp = new XMLHttpRequest();

            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    this.innerHTML = xmlhttp.responseText;
                }
            }.bind(this); 

            xmlhttp.open("GET", templateURL, true);
            xmlhttp.send();
        }
        loadXMLDoc(templateURL);
    }
}
