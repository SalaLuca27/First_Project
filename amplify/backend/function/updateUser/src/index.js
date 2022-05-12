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

exports.handler = async (event) => {
    var success = false;
    const params = {
        TableName: process.env.API_REACT_USERTABLE_NAME,
        Key: {
            "id": event.arguments.id
        },
        UpdateExpression: "set username = :username",
        ExpressionAttributeValues: {
            ":username": event.arguments.username,
        }
    };

    await dbclient.update(params, function(err, data) {
        if(err){
            console.log('Errore:', err);
            success = false;
        }
        else{
            console.log('Data:', data);
            success = true;
        }
    }).promise();

    if(success){
        return true;
    }
    else{
        return false;
    }
};

