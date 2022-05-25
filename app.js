//const { stdin, stdout } = require('process');
const repository = require('./repository');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

const showCompanies =()=>{
    const onCompaniesFetched = (companies) => {
        companies.forEach(element => {
            console.table(element);
        });
    };
    const onCompaniesError =(msg)=>{
        console.error(msg);
    }
    try{
        repository.getCompanies(onCompaniesFetched, onCompaniesError);
    }
    catch(err){
        onCompaniesError(err);
    }
}
const showCompanyById =()=>{
    const onCompanyFetched = (companies) => {
        companies.forEach(element => {
            console.table(element);
        });
        //GO TO REDLINE AGAIN
        showCompanyById();
    };
    const onCompanyError =(msg)=>{
        console.error(msg);
        showCompanyById();
    }
    const onCompanyExit =()=>{
        console.log('Thank you!');
    }
    readline.question('Enter Company Id: (FOR EXIT - TYPE X) ', (companyId) =>{
        if (companyId == 'X'){
            onCompanyExit();
        }
        if (isNaN(companyId)){
            onCompanyError('Not a Valid Id!');
        }
        else{
            try{
                repository.getCompany(companyId, onCompanyFetched, onCompanyError);
            }
            catch(err){
                onCompanyError(err);
            }
           
        }
        
    });
}
const onDbConnected =()=>{
    //showCompanies(); -CLAUSE # 1 IN ASIGNMENT
    showCompanyById(); //CLUASE # 2 IN ASIGNMENT
}

const onConnectionError =(msg)=>{
    console.error(msg);
}

repository.connect(onDbConnected, onConnectionError);



// #1
//showCompanies();

//#2




