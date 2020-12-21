const {
    Pool,
    types
} = require('pg');

var pg = require('pg');
pg.defaults.ssl = true;
const Sequelize = require('sequelize');
const connection_string = 'postgres://dqcpyrrdqbqpnp:7264ee2cdef2e977c0c1239cdf42ac2f427c9a0bb6f6ee3df2337c95738e4299@ec2-54-211-99-192.compute-1.amazonaws.com:5432/de2gvkaoprq93i';

module.exports = class Database {
    constructor() {
        try {
            this.pool = new Pool({
                connectionString: connection_string,
                ssl:true
            });

            types.setTypeParser(1700, value => parseFloat(value));

            types.setTypeParser(20, value => parseInt(value));
        } catch (error) {
            throw error;
        }

        this.pool.on('error', (err, client) => {
            console.error('Unexpected error on idle client', err);
        });
    }

    functionWithResults(functionname) {
        debugger;
        const removeQuotes = `SELECT * FROM ${functionname}()`

        removeQuotes.replace(/'/g, "''");

        return new Promise((resolve, reject) => {
            this.pool.connect()
                .then(client => client.query(removeQuotes)
                    .then((res) => {
                        const rb = {
                            status: true,
                            message: 'Success',
                            data: res.rows
                        }

                        resolve(rb);
                    })
                    .catch((err) => {
                        const rb = {
                            status: false,
                            message: `Failed To Retrieve Data ${err.stack}`,
                            data: err
                        }
                        reject(rb);
                    }));
        });
    }


    callFnWithResultsById(functionname) {

        try {
            const removeQuotes = `SELECT * FROM ${functionname}`

            removeQuotes.replace(/'/g, "''");
    
            return new Promise((resolve, reject) => {
                this.pool.connect()
                    .then(client => client.query(removeQuotes)
                        .then((res) => {
                            const rb = {
                                status: true,
                                message: 'Success',
                                data: res.rows
                            }
    
                            resolve(rb);
                        })
                        .catch((err) => {
                            const rb = {
                                status: false,
                                message: `Failed To Retrieve Data ${err.stack}`,
                                data: err
                            }
                            reject(rb);
                        }));
            });
        } catch (err) {
            const rb = {
                status: false,
                message: `Failed To Retrieve Data ${err.stack}`,
                data: err
            }
            reject(rb);
        }
        
       
    }

    
    callFnWithResultsAdd(functionname, adduser) {
        debugger;
        const removeQuotes = `SELECT * FROM ${functionname}`

        removeQuotes.replace(/'/g, "''");

        return new Promise((resolve, reject) => {
            this.pool.connect()
                .then(client => client.query(removeQuotes, adduser)
                    .then((res) => {
                        const rb = {
                            status: true,
                            message: 'Success',
                            data: res.rows
                        }

                        resolve(rb);
                    })
                    .catch((err) => {
                        const rb = {
                            status: false,
                            message: `Failed To addData ${err.stack}`,
                            data: err
                        }
                        reject(rb);
                    }));
        });
    }


};