/* Amplify Params - DO NOT EDIT
	API_REACT_GRAPHQLAPIIDOUTPUT
	API_REACT_USERTABLE_ARN
	API_REACT_USERTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk');
const dbclient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });

exports.handler = async (event) => {
    var success = false;
    const id = event.arguments.id;

    const utente = await dbclient.scan({
        TableName: process.env.API_REACT_USERTABLE_NAME,
        FilterExpression: "username = :username",
        ExpressionAttributeValues: {
            ":username": event.arguments.username
        }}, (error, data) => {
            console.log(data);
            if(data === undefined || error){
                success = false;
            }
            else{
                success = true;
            }
        }
    ).promise();
    
    if(success){
        return utente.Items;
    }
    else{
        return {Errore: "Errore nel trovare l'utente"}
    }

};
