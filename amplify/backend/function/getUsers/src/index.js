/* Amplify Params - DO NOT EDIT
	API_REACT_GRAPHQLAPIIDOUTPUT
	API_REACT_USERTABLE_ARN
	API_REACT_USERTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient({region: "us-east-1"});
const utenti = new Array();
const success = true;

exports.handler = async(event, context, callback) => {
    let params = {
        TableName: process.env.API_REACT_USERTABLE_NAME,
        Limit: 100,
    }

    const ret = await dynamo.query(params).promise();
    ret.Items.map(user => utenti.push(user))

    if(success) {
        return utenti
    }
    else{
        return {
            statusCode : 400,
            body : 'Errore nella richiesta'
        }
    }
    
}