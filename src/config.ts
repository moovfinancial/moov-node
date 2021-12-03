let _privateKey: string, _publicKey: string, _facilitatorID: string;
let _baseUrl = 'https://api.moov.io/'

interface Config {
    privateKey: string, 
    publicKey: string, 
    facilitatorID: string,
    baseUrl: string
}

const setConfig = (privateKey: string, publicKey: string, facilitatorID: string, env?: 'staging') => {
    _privateKey = privateKey;
    _publicKey = publicKey;
    _facilitatorID = facilitatorID
    if(env = 'staging') {
        _baseUrl = 'https://api.moov-staging.io/'
    }
}

const getConfig = (): Config => {
    return {
        privateKey: _privateKey,
        publicKey: _publicKey,
        facilitatorID: _facilitatorID,
        baseUrl: _baseUrl
    }
}


export {
    setConfig,
    getConfig,
    Config
}