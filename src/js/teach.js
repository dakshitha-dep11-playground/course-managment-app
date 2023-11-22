const txtIdElm = document.querySelector("#t-id");
const txtNameElm = document.querySelector("#name");
const txtContactElm = document.querySelector("#contact");

const [API_BASE_URL] = process.env;
alert(API_BASE_URL)
txtIdElm.disabled = true

const btnSaveElm = document.querySelector("#save");
const btnClearElm = document.querySelector("#reset");

function createNewTeacher(id){
    
    let name = txtNameElm.value;
    let contact = txtContactElm.value;
    const tbodyElm = document.querySelector("tbody")
    const trElm = document.createElement('tr');
    trElm.innerHTML = `
    <td>${id}</td>
    <td>${name}</td>
    <td>${contact}</td>
    <td class="d-flex justify-content-center align-items-center gap-2"><i class="bi bi-trash btn btn-outline-danger"></i><i class="bi bi-pencil-square btn btn-outline-info"></i></td>
    `;
    tbodyElm.append(trElm);

}

btnSaveElm.addEventListener('click',()=>{
    
});


btnClearElm.addEventListener('click',()=>{
    txtIdElm.value = "";
    txtNameElm.value = "";
    txtContactElm.value = "";
    txtIdElm.focus();
});
