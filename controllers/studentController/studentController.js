const STU_ARR = [
    {id: 1, name: "Dake", age: 33, gender: "Male", address: "Vernon"},
    {id: 2, name: "Rana", age: 18, gender: "Female", address: "Vancouver"},
    {id: 3, name: "Laura", age: 6, gender: "Female", address: "Kelowna"},
    {id: 4, name: "Tom", age: 15, gender: "Male", address: "Toronto"},
]

// define a router to retrieve all the students' information
exports.getAllStudents = (req, res) => {
    console.log("get request received");
    if(STU_ARR.length === 0) {
        return res.send({
            status: "ok",
            data: []
        });
    }
    res.send({
        status: "ok",
        data: STU_ARR
    });
};

// define a router to retrieve a student's information
exports.getStudentById =  (req, res) => {
    const id = +req.params.id;
    const stu = STU_ARR.find(stu => stu.id === id);
    if (!stu) {
        res.status(403).send({
            status: "error",
            message: "Student not found."
        });
    } else {
        res.send({
            status: "ok",
            data: stu
        });
    }
};

// define a router to add a new student
exports.addStudent = (req, res) => {
    console.log("post request received");
    // extract student data from request body
    const { name, age, gender, address } = req.body;
    // verify the data
    if (
        !name || typeof name !== 'string' ||
        !age || typeof age !== 'number' || age < 0 ||
        !gender || (gender !== 'Male' && gender !== 'Female') ||
        !address || typeof address !== 'string'
    ) {
        return res.status(403).send({
            status: "error",
            message: "Invalid student data provided."
        });
    }
    const stu = {
        id: STU_ARR.length > 0 ? STU_ARR[STU_ARR.length - 1].id + 1 : 1, // if STU_ARR is empty, start with id=1
        name,
        age,
        gender,
        address
    };
    STU_ARR.push(stu);
    res.send({
        status: "ok",
        data: stu
    });
};

// define a router to delete a student
exports.deleteStudent =  (req, res) => {
    const id = +req.params.id;
    const index = STU_ARR.findIndex(stu => stu.id === id);
    if (index === -1) {
        res.status(403).send({
            status: "error",
            message: "Student not found."
        });
    } else {
        STU_ARR.splice(index, 1);
        res.send({
            status: "ok",
            message: "Student deleted.",
            data: STU_ARR[index]
        });
    }
};

// define a router to update a student
exports.updateStudent = (req, res) => {
    const {id, name, age, gender, address} = req.body;
    const updatedStu = STU_ARR.find(stu => stu.id === id);

    if (updatedStu) {
        updatedStu.name = name;
        updatedStu.age = age;
        updatedStu.gender = gender;
        updatedStu.address = address;

        res.send({
            status: "ok",
            message: "Student updated.",
            data: updatedStu
        });
    } else {
        res.status(403).send({
            status: "error",
            message: "Student not found."
        });
    }
};