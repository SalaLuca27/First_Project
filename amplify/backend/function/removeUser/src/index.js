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
            //callback(err, null);
        }
        else{
            success = true;
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