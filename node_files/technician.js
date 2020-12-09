const express = require('express');

const router = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const Database = require('./database');


router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(cors());

var postgres = new Database();

//Get BYS=================================================================================================
//GET BY TECHNICIAN IDENTITY NUMBER=========================================================================
router.get('/techIdNumber/:userId', (req, res, next) => {

    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control_Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");

    const functionName = `booking_system.fn_employee_get_by_id(${req.params.userId})`;

        postgres.callFnWithResultsById(functionName)  
            .then((data) => {
                res.status(200).json({
                    message: 'You discovered the ID',
                    user: data,
                    status: true
                });
            })
            .catch((error => {
                debugger;
                console.log(error);
                res.status(500).json({
                    message: 'The user does not exist',
                    error: error,
                    status: false
                });
            }))

});
//================================================================================================================
//REGISTER USERS========================================================================================
router.post('/addNewTech/', (req, res, next) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control_Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");

    debugger;
    return new Promise((resolve, reject) => {
        let placeholder = '';
        let count = 1;
        const params = Object.keys(req.body).map(key => [(key), req.body[key]]);

        const paramsValues = Object.keys(req.body).map(key => req.body[key]);

        if (Array.isArray(params)) {
            params.forEach(() => {
                placeholder += `$${count},`;
                count += 1;
            });
        } 

        placeholder = placeholder.replace(/,\s*$/, ''); 

        const functionName = `booking_system.fn_employee_add`;

        const sql = `${functionName}(${placeholder})`;

        postgres.callFnWithResultsAdd(sql, paramsValues)
        .then((data) => {
            debugger;
            res.status(201).json({
                message: 'Successfully Added Technician',
                addedUser: data
            });
            resolve(data);

        })
        .catch((error) => {
            debugger;
            res.status(500).json({
                message: 'bad Request',
                error: error,
                status: false
            });
            reject(error);
        })
    })
});

module.exports = router;