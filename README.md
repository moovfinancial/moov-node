

# Usage
## Initilization
To initilize the sdk, pass the public and private keys, and the faciliator ID.
```
import { init } from '@moov/node'

const publicKey = '';
const privateKey = '';
const facilitatorID = '';

init(publicKey, privateKey, facilitatorID)
```

## Token Generation
You can get a token to do a specific action by importing `token` and using the attached methods. Return this token to your front end to initialize moov.js with.
``` 
const newToken = await token.accountCreateToken();
```
