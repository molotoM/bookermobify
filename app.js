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
//GET BY CLIENT IDENTITY NUMBER=========================================================================
router.get('/getIdNumber/:userId', (req, res, next) => {

    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control_Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");

    const functionName = `online_book.fn_user_get_by_id(${req.params.userId})`;

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
                    message: 'bad Request',
                    error: error,
                    status: false
                });
            }))

});

//GET BY CLIENT NUMBER=========================================================================
router.get('/getUserId/:userId', (req, res, next) => {

    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control_Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");

    const functionName = `online_book.fn_vehicle_get_by_id (${req.params.userId})`;

        postgres.callFnWithResultsById(functionName)  
            .then((data) => {
                res.status(200).json({
                    message: 'You discovered a Car',
                    user: data,
                    status: true
                });
            })
            .catch((error => {
                debugger;
                console.log(error);
                res.status(500).json({
                    message: 'bad Request',
                    error: error,
                    status: false
                });
            }))

});
//GET CLIENT APPOINTMENTS NUMBER=========================================================================
router.get('/getClientAppointments/:userId', (req, res, next) => {

    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control_Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");

    const functionName = `online_book.fn_get_client_app(${req.params.userId})`;

        postgres.callFnWithResultsById(functionName)  
            .then((data) => {
                res.status(200).json({
                    message: 'You discovered a Car',
                    user: data,
                    status: true
                });
            })
            .catch((error => {
                debugger;
                console.log(error);
                res.status(500).json({
                    message: 'bad Request',
                    error: error,
                    status: false
                });
            }))

});
//GET APPOINTMENTS FOR A TECHICIAN=========================================================================
router.get('/techAppointments/:userId', (req, res, next) => {

    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control_Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");

    const functionName = `online_book.fn_get_all_appointments(${req.params.userId})`;

        postgres.callFnWithResultsById(functionName)  
            .then((data) => {
                res.status(200).json({
                    message: 'Here are your appointments',
                    appointments: data,
                    status: true
                });
            })
            .catch((error => {
                debugger;
                console.log(error);
                res.status(500).json({
                    message: 'bad Request',
                    error: error,
                    status: false
                });
            }))

});


//GET ALL REQUESTED APPOINTMENTS=========================================================================
router.get('/getRequestedApp', (req, res,next) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control_Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
   
 debugger;

    const functionName = `online_book.fn_get_unapproved_appointments`;

    return new Promise((resolve, reject) => {

        postgres.functionWithResults(functionName)
            .then((data) => {
                debugger;
                res.status(200).json({
                    message: 'Here is all appointments',
                    appointments: data,
                    status: true
                });
                resolve(data);

            })
            .catch((error => {
                debugger;
                res.status(500).json({
                    message: 'bad Request',
                    error: error,
                    status: false
                });
                reject(error);
            }))

    })
});
//================================================================================================================
//REGISTER USERS========================================================================================
router.post('/addNewUser/', (req, res, next) => {
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

        const functionName = `online_book.fn_user_add`;

        const sql = `${functionName}(${placeholder})`;

        postgres.callFnWithResultsAdd(sql, paramsValues)
        .then((data) => {
            debugger;
            res.status(201).json({
                message: 'Successfully Added user',
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
//FILL IN INSEPECTION ========================================================================================
router.post('/inspectionAdd/', (req, res, next) => {
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

        const functionName = `online_book.fn_inspection_new_add`;

        const sql = `${functionName}(${placeholder})`;

        postgres.callFnWithResultsAdd(sql, paramsValues)
        .then((data) => {
            debugger;
            res.status(201).json({
                message: 'Inspection added',
                inspection: data
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
//POST A NEW INSTALLATION===========================================================================
router.post('/addNewAppointment/', (req, res, next) => {
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

        const functionName = `online_book.fn_appointment_new_add`;

        const sql = `${functionName}(${placeholder})`;

        postgres.callFnWithResultsAdd(sql, paramsValues)
        .then((data) => {
            debugger;
            res.status(201).json({
                message: 'Successfully Added user',
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
//================================================================================================================
//TECHNICIAN APPROVE APPOINTMENTS=================================================================================
router.patch('/approveAppointments', (req, res, next) => {
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

        const functionName = `online_book.fn_appointment_approve`;

        const sql = `${functionName}(${placeholder})`;

        postgres.callFnWithResultsAdd(sql, paramsValues)
        .then((data) => {
            debugger;
            res.status(201).json({
                message: 'Successfully Updated user',
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

//TECHNICIAN UPDATE APPOINTMENT =================================================================================
router.patch('/updateAppointments/', (req, res, next) => {
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

        const functionName = `online_book.fn_appointment_update`;

        const sql = `${functionName}(${placeholder})`;

        postgres.callFnWithResultsAdd(sql, paramsValues)
        .then((data) => {
            debugger;
            res.status(201).json({
                message: 'Successfully Updated Appointment',
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