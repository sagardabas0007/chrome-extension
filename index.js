saveBtn = document.querySelector("#save-el");
getBtn = document.querySelector("#get-el");
deleteBtn = document.querySelector("#delete-el");
ulEl = document.querySelector("#ul-el");
inputEl = document.querySelector("#input-el");

let myLeads = [];

let itemsStored = JSON.parse(localStorage.getItem("myLeads"));
if (itemsStored) {
    myLeads = itemsStored;
    render(myLeads);
}

saveBtn.addEventListener("click", function () {
    myLeads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
})

function render(leads) {
    let listitems = "";
    for (let i = 0; i < leads.length; i++){
        listitems += `
        <li>
        <a target='_blank' href='${leads[i]}'>
        ${leads[i]}
        </a>
        </li>
        `;
    }
    ulEl.innerHTML = listitems; 
}


getBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        let url = tabs[0].url;
        myLeads.push(url);
        localStorage, setItem("myLeads", JSON.stringify(myLeads));
        console.log("clicked");
        render(myLeads);
    })
})


deleteBtn.addEventListener("dblclick", function(){
    myLeads = [];
    localStorage.clear();
    ulEl.innerHTML = ""
    render(myLeads);
})






