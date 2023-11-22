const txtNameElm = document.querySelector("#txt-name");
const txtContactElm = document.querySelector("#txt-contact");
const btnAddElm = document.querySelector("#btn-add");
const { API_BASE_URL } = process.env;

btnAddElm.addEventListener('click',(e)=>{
    const name = txtNameElm.value.trim();
    const contact = txtContactElm.value.trim();
    // alert("dhcys")
    console.log(name, contact);
    if(!/^[A-Za-z ]+$/.test(name)){
        txtNameElm.focus();
        txtNameElm.select();
        return;
    }
    if(!/^\d{3}-\d{7}$/.test(contact)){
        txtContactElm.focus();
        txtContactElm.select();
        return;
    }

    // Todo : Save the teacher
    fetch(`${API_BASE_URL}/teachers`,{
        method:'POST',
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({name, contact})
    }).then((res) => {
        if(res.status===201){
            // res.json().then(console.log)

            res.json().then(teacher => createNewRow(teacher));

            txtContactElm.value = "";
            txtNameElm.value = "";
            txtNameElm.focus();
        }else{
            alert("Failed to load ")
        }
    }).catch((err) => {
        alert("Error")
    });

});

function createNewRow(teacher){
    const trElm = document.createElement('tr');
    document.querySelector('#tbl tbody').append(trElm);

    trElm.innerHTML =`
        <tr>
            <td>${teacher.id}</tr>
            <td>${teacher.name}</tr>
            <td>${teacher.contact}</tr>
            <td><button>Delete</button></td>
        </tr>
    `
}

function loadAllTeachers(){

}

loadAllTeachers();