import { Appwrite } from "appwrite";
import Dexie from 'dexie';
import { USER_POSITION_COLLECTION } from "./constants";

// Init your Web SDK
const app = new Appwrite();

app
    .setEndpoint('https://api.nirah.tech/v1') // Your Appwrite Endpoint
    .setProject('618d4b5b761f4') // Your project ID
;

/**
 * 
 * @param {String} collectionID 
 * @param {Object} data 
 * @param {Array<String>} read 
 * @param {Array<String>} write 
 */
const createDocument = async(collectionID, data, read, write) => {
    await app.database.createDocument(collectionID, data, read, write)
}

/**
 * 
 * @param {*} data 
 */
const createPositionRecord = async(data) => {
    try {
        await createDocument(USER_POSITION_COLLECTION, data, ["role:member"], ["role:member"])
    } catch (error) {
        if (navigator.onLine) throw error
        const db = new Dexie("userPosition")
        db.version(1).stores({
            positions: `++id, user, latitude, longitude`
        })
        await db.positions.put({...data})
    }
}


export {app, createPositionRecord};