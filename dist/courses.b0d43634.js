const e=document.querySelector("#course-name"),t=document.querySelector("#course-duration"),o=document.querySelector("#btn-add"),n=document.querySelector("#tbody");function l(e){let t=document.createElement("tr");t.id=`tr-${e.id}`,t.innerHTML=`
    <td scope="row">${e.id}</td>
    <td>${e.name}</td>
    <td>${e.durationInMonths}</td>
    <td><button type="button" class="btn btn-danger">Delete <i class="bi bi-trash-fill"></i></button></td>
    `,n.append(t)}console.log("Load All Courses"),fetch("http://localhost:8080/courses",{method:"GET"}).then(o=>{200===o.status&&(console.log(o),o.json().then(e=>{e.forEach(e=>{l(e)})}),t.value="",e.value="",e.focus())}).catch(e=>{console.log(e),alert("Error in saving course")}),o.addEventListener("click",()=>{let o=t.value.trim(),n=e.value.trim();if(!/\d{1,}/.test(o)){t.select(),t.focus();return}if(!/[A-Za-z ]{3,}/.test(n)){e.select(),e.focus();return}fetch("http://localhost:8080/courses",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:n,durationInMonths:o})}).then(o=>{201===o.status&&(console.log(o),o.json().then(e=>l(e)).catch(e=>{alert("error")}),t.value="",e.value="",e.focus())}).catch(e=>{alert("Error in saving course")})}),document.querySelector("#tbody").addEventListener("click",e=>{if(console.log(e.target?.tagName),e.target?.tagName==="BUTTON"){let t=e.target?.closest("tr").id.substring(3);fetch(`http://localhost:8080/courses/${t}`,{method:"DELETE"}).then(e=>{console.log(e),204===e.status&&console.log("We are good"),console.log("something else")}).catch(e=>{console.log("We are bad")}).finally(()=>{console.log("finally")}),console.log(t)}});
//# sourceMappingURL=courses.b0d43634.js.map
