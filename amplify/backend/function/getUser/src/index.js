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

exports.handler = async(event, context, callback) => {
    var success = true;
    const id = event.arguments.id;
    let params = {
        Key: event.arguments.id,
        TableName: process.env.API_REACT_USERTABLE_NAME
    };
 
    const utente = await dbclient.get({
        TableName: process.env.API_REACT_USERTABLE_NAME,
        Key: {
            id
        }
      }, (err, data) => {
          if(data.Item === undefined){
              success = false;
          }
          else{
              success = true;
          }
      }).promise();
 
     if(success) {
        return utente.Item;
     }
     else{
        return 'No user with this ID';
    }
}
