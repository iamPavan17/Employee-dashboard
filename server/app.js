const express = require('express');
const app = express();
const port = 3050;
const fs = require('fs');
const axios = require('axios');
const cors = require('cors');
const uuid = require('uuid/v1');

app.use(cors());
app.use(express.json());

app.post('/user', (req, res) => {
    fs.readFile('./data/users.json', 'utf-8', (err, users) => {
        users = JSON.parse(users);
        let data = {
            "id": uuid(),
            "firstName": req.body.firstName,
            "lastName": req.body.lastName,
            "age": req.body.age,
            "email": req.body.email,
            "place": req.body.place,
            "phone": req.body.phone,
            "employeeName": req.body.employeeName
        };
        users.push(data);
        json = JSON.stringify(users)
        fs.writeFile('./data/users.json', json, 'utf-8', (err) => {
            console.log('User successfully added!!!');
        })
    })
});

app.post('/user-remove', (req, res) => {
    fs.readFile('./data/users.json', 'utf-8', (err, users) => {
        users = JSON.parse(users);
        filteredUsers = users.filter(user => {
            return user.id !== req.body.id
        })
        json = JSON.stringify(filteredUsers)
        fs.writeFile('./data/users.json', json, 'utf-8', (err) => {
            console.log('User successfully removed!!!');
        })
    })
})

app.get('/users', (req, res) => {
    fs.readFile('./data/users.json', 'utf-8', (err, users) => {
        users = JSON.parse(users)
        if(err) {
            res.json({ error: err })
        } else {
            res.json(users)
        }
    })
})

//getting employees list
app.get('/employees', (req, res) => {
    fs.readFile('./data/employees.json', 'utf-8', (err, employees) => {
        employees = JSON.parse(employees)
        // console.log(employees[0].username)
        if(err) {
            res.json({ error: err })
        } else {
            res.json(employees)
        }
    })
});


app.post('/login', (req, res) => {
    let data = req.body;
    fs.readFile('./data/employees.json', 'utf-8', (err, employees) => {
        employees = JSON.parse(employees)
        let result = employees.find(employee => {
            return employee.username == req.body.username && employee.password == req.body.password
        })
        if(result) {
            res.send({
                isLogin: true,
                error: '',
                name: result.username
            })
        } else {
            res.send({
                isLogin: false,
                error: 'username/password is incorrect!!!'
            })
        }
    })
})

app.use((req, res) => {
    res.status(404).send('Page not found!!!');
})
app.listen(port, () => {
    console.log(`Listening to port ${port}...`)
})