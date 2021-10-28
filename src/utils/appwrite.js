import { Appwrite } from "appwrite";

// Init your Web SDK
const app = new Appwrite();

app
    .setEndpoint('https://api.nirah.tech/v1') // Your Appwrite Endpoint
    .setProject('61780ec6bc986') // Your project ID
;

export {app};