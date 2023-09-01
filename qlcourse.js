var coursesApi = ' http://localhost:3000/courses';
function start() {
    getcourses(rendercourses);

    handleCreateFrom()
}
start();
//function;
function getcourses(callback) {
    fetch(coursesApi)
        .then((response) => {
            return response.json();
        })
        .then(callback);
}

function rendercourses(courses) {
    var listcoursesBlock = document.querySelector('#list-courses');
    var htmls = courses.map((course) => {
        return `
        <li class="course-item-${course.id}">
            <h4>${course.name}</h4>
            <p>${course.description}</p>
            <button onclick="handleDeleteForm(${course.id})">Xóa</button>
            <button onclick="handleUpdateCourse(${course.id})">Thay đổi dữ liệu</button>
        </li>
        `
    })
    listcoursesBlock.innerHTML = htmls.join('');
}
function createForm(data, callback) {
    var options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }
    fetch(coursesApi, options)
        .then((response) => {
            response.json();
        })
        .then(callback);
}
function handleDeleteForm(id) {
    var options = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        }
    }
    fetch(coursesApi + '/' + id, options)
        .then((response) => {
            response.json();
        })
        .then(() => {
            var courseItem = document.querySelector('.course-item-' + id);
            if (courseItem) {
                courseItem.remove();
            }
        });
}


function handleCreateFrom() {
    var createBtn = document.querySelector('#create');
    createBtn.onclick = () => {
        var name = document.querySelector('input[name="name"]').value;
        var description = document.querySelector('input[name="description"]').value;
        var formdata = {
            name: name,
            description: description
        }
        createForm(formdata, () => {
            getcourses(rendercourses);
        });
    }
}

//update

function updateCourse(id, data, cb) {
    var options = {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)

    };
    fetch(coursesApi + '/' + id, options)
        .then((response) => {
            response.json();
        })
        .then(cb);
}

function handleUpdateCourse(id) {
    var copname = document.querySelector('.course-item-' + id + ' h4').innerText;
    var copdescription = document.querySelector('.course-item-' + id + ' p').innerText;
    document.querySelector('input[name="name"]').value = copname;
    document.querySelector('input[name="description"]').value = copdescription;
    var btn = document.querySelector('#create');
    btn.innerHTML = 'Sao lưu';
    btn.onclick = () => {
        var name = document.querySelector('input[name="name"]').value;
        var description = document.querySelector('input[name="description"]').value;
        var formdata = {
            name: name,
            description: description
        }
        updateCourse(id, formdata, () => {
            getcourses(rendercourses);

        })
    }

}