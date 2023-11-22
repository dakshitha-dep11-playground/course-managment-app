const txtNameElm = document.querySelector('#course-name');
const txtDurationElm = document.querySelector('#course-duration');
const btnAddElm = document.querySelector('#btn-add');
const tblBodyElm = document.querySelector('#tbody');
const btnClear = document.querySelector('#btn-clear');
let selectedCourse = null;
let selectedCourseData = null;

loadAllCourses();


btnAddElm.addEventListener('click', () => {
    const duration = txtDurationElm.value.trim();
    const name = txtNameElm.value.trim();
    if (!/\d{1,}/.test(duration)) {
        txtDurationElm.select();
        txtDurationElm.focus();
        return;
    }

    if (!/[A-Za-z ]{3,}/.test(name)) {
        txtNameElm.select();
        txtNameElm.focus();
        return;
    }


    if (btnAddElm.innerText === "ADD") {
        fetch('http://localhost:8080/courses', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "name": name
                , "durationInMonths": duration
            })

        }).then((res) => {
            if (res.status === 201) {
                console.log(res);
                res.json().then(course => createNewRow(course)).catch(err => {
                    alert('error');
                })
                txtDurationElm.value = "";
                txtNameElm.value = "";
                txtNameElm.focus();
            }
        }).catch(err => {
            alert('Error in saving course');
        });
    } else if (btnAddElm.innerText === "UPDATE") {
        fetch(`http://localhost:8080/courses/${selectedCourseData.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: name, "durationInMonths": duration })
        }).then((res) => {
            // console.log(res);
            // console.log("Wade goda");
            if (res.status === 200) {
                selectedCourse.innerHTML = `<td scope="row">${selectedCourseData.id}</td>
                <td>${txtNameElm.value}</td>
                <td>${txtDurationElm.value} months</td>
                <td><button type="button" class="btn btn-danger">Delete <i class="bi bi-trash-fill"></i></button>
                 </td>`

                btnClear.click();
            }
        }).catch((err) => {
            console.log("We are bad");
        });


    }

})

function createNewRow(course) {
    // console.log(course);
    const trElm = document.createElement('tr');
    trElm.id = `tr-${course.id}`
    trElm.innerHTML = `
    <td scope="row">${course.id}</td>
    <td>${course.name}</td>
    <td>${course.durationInMonths} months</td>
    <td><button type="button" class="btn btn-danger">Delete <i class="bi bi-trash-fill"></i></button>
     </td>
    `
    tblBodyElm.append(trElm)
}

function loadAllCourses() {
    console.log("Load All Courses");
    const promise = fetch('http://localhost:8080/courses', {
        method: 'GET',
    }).then((res) => {

        if (res.status === 200) {
            console.log(res);
            res.json().then(courseList => {
                courseList.forEach(course => {
                    createNewRow(course);
                });
            })
            txtDurationElm.value = "";
            txtNameElm.value = "";
            txtNameElm.focus();
        }
    }).catch(err => {
        console.log(err);
        alert('Error in saving course');
    })
};

document.querySelector('#tbody').addEventListener('click', (e) => {
    console.log(e.target?.tagName);
    const deletingTR = e.target?.closest('tr');
    const deletingID = deletingTR.id.substring(3);
    if (e.target?.tagName === 'BUTTON') {


        fetch(`http://localhost:8080/courses/${deletingID}`, {
            method: 'DELETE'
        }).then((res) => {
            // console.log(res);
            if (res.status === 204) {
                deletingTR.remove();
            }
        }).catch((err) => {
            console.log("We are bad");
        });

        btnClear.click();
    } else {
        fetch(`http://localhost:8080/courses/${deletingID}`, {
            method: 'GET'
        }).then((res) => {
            // console.log(res);
            if (res.status === 200) {
                res.json().then(cousre => {
                    selectedCourse = deletingTR;
                    selectedCourseData = cousre;
                    txtNameElm.value = cousre.name;
                    txtDurationElm.value = cousre.durationInMonths;
                    btnAddElm.innerText = 'UPDATE';
                })
            }
        }).catch((err) => {
            console.log("We are bad");
        });
    }
});

btnClear.addEventListener('click', () => {

    txtDurationElm.value = "";
    txtNameElm.value = "";
    selectedCourse = null;
    selectedCourseData = null;
    btnAddElm.innerText = 'ADD';

})
