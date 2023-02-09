import S3 from "aws-sdk/clients/s3.js";

let config = {}


// Check to see if this code is running on cyclic
// if so create a new config variable to be passed to the S3 constructor
// aws names are reserved on cyclic, so we have to use differnt names for our variables
// refer to the docs for more information - https://docs.cyclic.sh/concepts/env_vars#reserved-environment-variables
if(process.env.CYCLIC_APP_ID){
	config = {
		region: process.env.MY_REGION,
		credentials:{
			accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
			secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY
		}
	  }
}

console.log(process.env.CYCLIC_APP_ID, ' prod')


export const s3 = new S3(config); 