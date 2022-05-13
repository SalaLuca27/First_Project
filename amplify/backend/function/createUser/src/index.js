// /* Amplify Params - DO NOT EDIT
// 	API_REACT_GRAPHQLAPIIDOUTPUT
// 	API_REACT_USERTABLE_ARN
// 	API_REACT_USERTABLE_NAME
// 	ENV
// 	REGION
// Amplify Params - DO NOT EDIT */

//lambda per la mutation createUser ==> create
const AWS = require('aws-sdk');
const { v4: ID } = require('uuid');
const dbclient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });

exports.handler = async (event, context, callback) => {
    var success = false;
    var newUser = {};
    const date = new Date().toISOString();
    console.log('event: ', event);
    const params = {
        Item: {
            id: ID(),
            name: event.arguments.name,
            surname: event.arguments.surname,
            age: event.arguments.age,
            username: event.arguments.username,
            password: event.arguments.password,
            createdAt: date,
            updatedAt: date,
            owner: event.identity.username
        },
        TableName: process.env.API_REACT_USERTABLE_NAME
    };

    if(event.arguments.name ===  '' || event.arguments.surname ===  '' || event.arguments.age === '' || event.arguments.username === '' || event.arguments.password === ''){
        success = false;
    }
    else{
                
        newUser = await dbclient.put(params).promise();
        success = true;
    }

    return params.Item;
};