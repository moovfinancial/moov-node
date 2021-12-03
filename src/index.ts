import { setConfig, getConfig, Config } from './config';
import * as token from './token';

const init = (publicKey: string, privateKey: string, facilitatorID: string, env?: 'staging') => {
    setConfig(privateKey, publicKey, facilitatorID, env);
}

const getConfiguration = (): Config => {
    return getConfig()
}

export {
    init,
    getConfiguration,
    token
}