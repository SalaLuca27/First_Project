// /* Amplify Params - DO NOT EDIT
// 	API_REACT_GRAPHQLAPIIDOUTPUT
// 	API_REACT_USERTABLE_ARN
// 	API_REACT_USERTABLE_NAME
// 	ENV
// 	REGION
// Amplify Params - DO NOT EDIT */

//lambda per la mutation createUser ==> create
const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient({region: "us-east-1"});
var success = true;

exports.handler = async ({name, surname, age, username, password}, context, callback) => {
    console.log("Processing...");
    const params = {
        Item: {
            id: Date.now().toString(),
            name: name,
            surname: surname,
            age: age,
            username: username,
            password: password
        },
        TableName: "User-zxzpbzksgzhmlfyzozcol6p5ge-staging"
    };
    
    await dynamo.put(params, function(err, data) {
        if(err){
            //callback(err, null);
            success = false;
        } else {
            //callback(null, data);
            success = true;
        }
    }).promise();
    
    if(success){
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            }, 
            body: 'SUCCESS',
        };
    }
    else{
        return {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            }, 
            body: 'ERROR',
        };
    }
};