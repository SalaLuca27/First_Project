// /* Amplify Params - DO NOT EDIT
// 	API_REACT_GRAPHQLAPIIDOUTPUT
// 	API_REACT_USERTABLE_ARN
// 	API_REACT_USERTABLE_NAME
// 	ENV
// 	REGION
// Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk');
var dbclient = new AWS.DynamoDB.DocumentClient({region: "us-east-1"});
var utenti = {};
var success = true;

exports.handler = async({id}, context, callback) => {
    let params = {
        Key : {id : id},
        TableName: "User-zxzpbzksgzhmlfyzozcol6p5ge-staging"
    };

    await dbclient.delete(params, (err, data) => {
        if(err){
            success = false;
            //callback(err, null);
        }
        else{

            utenti = data;
            //callback(null, data);
        }
    }).promise();

    if(success) {
        return {
            statusCode : 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
            body : 'Utente eliminato'
        }
    }
    else{
        return {
            statusCode : 400,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            }, 
            body : 'Errore nella richiesta'
        }
    }
    
}