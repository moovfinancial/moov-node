import { getConfig } from '../config';
import { init, token } from '../index';

// Staging
const publicKey = '';
const privateKey = '';
const facilitatorID = '1474bd17-0240-468f-83d7-b11a6b0e4e2a';

// Production
// const publicKey = '';
// const privateKey = '';
// const facilitatorID = '4d1a17a5-c622-4c41-88ef-77fb0e472063';


test('Check keys are set properly', () => {
    init(publicKey, privateKey, facilitatorID, 'staging');
    
    expect(getConfig().publicKey).toBe(publicKey);
    expect(getConfig().privateKey).toBe(privateKey);
    expect(getConfig().facilitatorID).toBe(facilitatorID);
});

test('Check keys are set properly', async () => {
    init(publicKey, privateKey, facilitatorID, 'staging');

    const newToken = await token.accountCreateToken();
    console.log(newToken);

    
    expect(getConfig().publicKey).toBe(publicKey);
    expect(getConfig().privateKey).toBe(privateKey);
    expect(getConfig().facilitatorID).toBe(facilitatorID);
});