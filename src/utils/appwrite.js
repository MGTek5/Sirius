import { Appwrite } from "appwrite";

// Init your Web SDK
const app = new Appwrite();

app
    .setEndpoint('https://api.nirah.tech/v1') // Your Appwrite Endpoint
    .setProject('618d4b5b761f4') // Your project ID
;

export {app};