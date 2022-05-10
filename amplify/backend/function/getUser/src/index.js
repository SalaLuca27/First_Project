/* Amplify Params - DO NOT EDIT
	API_REACT_GRAPHQLAPIIDOUTPUT
	API_REACT_USERTABLE_ARN
	API_REACT_USERTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const AWS = require('aws-sdk');
var dbclient = new AWS.DynamoDB.DocumentClient({region: "us-east-1"});
var success = true;
 
exports.handler = async(event, context, callback) => {
    let params = {
        Key: {'id': event.arguments.id},
        TableName: process.env.API_REACT_USERTABLE_NAME
    };
 
    const ret =  await dbclient.query(params, variables).promise();
 
     if(success) {
        return ret;
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
