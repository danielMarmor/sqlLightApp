const sqlite3 = require('sqlite3').verbose();
const EventsEmitter = require('events');

const noDataFoundEmmiter = new EventsEmitter();
noDataFoundEmmiter.on('no_data_found', (_) =>{
    throw Error('No Data Found!');
})

let dbConnection =null;

const connect =(onDbConnected, onError)=> {
    dbConnection = new sqlite3.Database('./first.db', (err)=>{
        if (err){
            onError(err);
            return;
        }  
        console.log('Connected To DataBase');  
        onDbConnected();
    });
}

const getCompanies =(onDataFetched, onError)=> {  
    let query = `SELECT * FROM COMPANY`;
    dbConnection.all(query, (error, rows)=>{
        if (error){
            onError(error);
            return;
        }
        onDataFetched(rows);
    });  
}

const getCompany =(companyId, onDataFetched, onError) =>{
    let query = `SELECT * FROM COMPANY WHERE ID = ${companyId}`;
    dbConnection.all(query, (error, rows)=>{
        if (error){
            onError(error);
            return;
        }
        if (rows.length == 0){
            onError("Data Not Found!")
            return;
        }       
        onDataFetched(rows);
    });  
}


// function resolveAfter2Seconds() {
//     return new Promise(resolve => {
//       setTimeout(() => {
//         resolve('resolved');
//       }, 2000);
//     });
//   }
  
//   async function asyncCall() {
//     console.log('calling');
//     const result = await resolveAfter2Seconds();
//     console.log(result);
//     // expected output: "resolved"
//   }
  
//   asyncCall();

module.exports.connect = connect;
module.exports.getCompanies = getCompanies;
module.exports.getCompany = getCompany;
    