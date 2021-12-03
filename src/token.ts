import { getConfig } from "./config";
const fetch = require('node-fetch')

const accountCreateToken = (): Promise<string> => {
    return new Promise(async (resolve, reject) => {
        try {
            const token = await httpTokenOnly('/accounts.write');
            resolve(token);
        } catch(err) {
            reject(err);
        }
    })
}

const httpTokenOnly = (scope: string): Promise<string> => {
    return new Promise(async(resolve, reject) => {
        try {
            console.log(scope)
            const res = await fetch(
                getConfig().baseUrl + 'oauth2/token', 
                {
                    method: 'Post',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        'grant_type': 'client_credentials',
                        'client_id': getConfig().publicKey,
                        'client_secret': getConfig().privateKey,
                        'scope': scope,
                    })
                }
            )
            const json = await res.json();
            console.log(res)
            console.log(json);
            if(json.error){
                reject(json.error);
            }
            resolve(json.access_token);
        } catch(err) {
            reject(err);
        }
    });
}


export {
    accountCreateToken
}