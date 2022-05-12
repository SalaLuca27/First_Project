// /* Amplify Params - DO NOT EDIT
// 	API_REACT_GRAPHQLAPIIDOUTPUT
// 	API_REACT_USERTABLE_ARN
// 	API_REACT_USERTABLE_NAME
// 	ENV
// 	REGION
// Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk');
var dbclient = new AWS.DynamoDB.DocumentClient({region: "us-east-1"});
var success = true;

exports.handler = async(event, context, callback) => {
    let params = {
        Key : {'id' : event.arguments.id},
        TableName: process.env.API_REACT_USERTABLE_NAME
    };

    await dbclient.delete(params, (err, data) => {
        if(err){
            success = false;
        }
        else{
            success = true;
        }
    }).promise();

    if(success) {
        return 'Utente eliminato'
    }
    else{
        return 'Errore nella richiesta'
    }
    
}