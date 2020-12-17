const {
    Pool,
    types
} = require('pg');

const connection_string = "postgres://postgres:mobifytracker@localhost:5432/datastore";

module.exports = class Database {
    constructor() {
        try {
            this.pool = new Pool({
                connectionString: connection_string,
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