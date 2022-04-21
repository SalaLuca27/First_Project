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

const AWS = require('aws-sdk');
var dbclient = new AWS.DynamoDB.DocumentClient({region: "us-east-1"});

exports.handler = async(event, context, callback) => {
    let params = {
        TableName: "User-zxzpbzksgzhmlfyzozcol6p5ge-staging",
        Limit: 100
    }

    await dbclient.scan(params, (err, data) => {
        if(err){
            callback(err, null);
        }
        else{
            callback(null, data);
        }
    }).promise();
}