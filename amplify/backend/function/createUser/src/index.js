// /* Amplify Params - DO NOT EDIT
// 	API_REACT_GRAPHQLAPIIDOUTPUT
// 	API_REACT_USERTABLE_ARN
// 	API_REACT_USERTABLE_NAME
// 	ENV
// 	REGION
// Amplify Params - DO NOT EDIT */

// /**
//  * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
//  */
// exports.handler = async (event) => {
//     console.log(`EVENT: ${JSON.stringify(event)}`);
//     return {
//         statusCode: 200,
//     //  Uncomment below to enable CORS requests
//     //  headers: {
//     //      "Access-Control-Allow-Origin": "*",
//     //      "Access-Control-Allow-Headers": "*"
//     //  }, 
//         body: JSON.stringify('Hello from Lambda!'),
//     };
// };


//lambda per la mutation createUser ==> create
const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient({region: "us-east-1"});


exports.handler = ({name, surname, age, username, password}, context, callback) => {
    console.log("Processing...");
    const params = {
        Item: {
            name: name,
            surname: surname,
            age: age,
            username: username,
            password: password
        },
        TableName: "User-zxzpbzksgzhmlfyzozcol6p5ge-staging"
    };

    const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(params.Item),
  };
    
    const res = await dynamo.put(params, function(err, data) {
        if(err){
            callback(err, null);
        } else {
            callback(null, data);
        }
    })

    if(!res){
        console.log('Errore inserimento utente');
    }
    else{
        return data;
    }
};