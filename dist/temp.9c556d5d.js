const t=document.querySelector("#txt-name"),e=document.querySelector("#txt-contact");document.querySelector("#btn-add").addEventListener("click",n=>{let o=t.value.trim(),c=e.value.trim();if(console.log(o,c),!/^[A-Za-z ]+$/.test(o)){t.focus(),t.select();return}if(!/^\d{3}-\d{7}$/.test(c)){e.focus(),e.select();return}fetch("https://97803577-4761-427d-a367-08996e2c4674.mock.pstmn.io/teachers",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:o,contact:c})}).then(n=>{201===n.status?(n.json().then(t=>(function(t){let e=document.createElement("tr");document.querySelector("#tbl tbody").append(e),e.innerHTML=`
        <tr>
            <td>${t.id}</tr>
            <td>${t.name}</tr>
            <td>${t.contact}</tr>
            <td><button>Delete</button></td>
        </tr>
    `})(t)),e.value="",t.value="",t.focus()):alert("Failed to load ")}).catch(t=>{alert("Error")})});
//# sourceMappingURL=temp.9c556d5d.js.map
