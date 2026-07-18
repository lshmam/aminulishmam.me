// get-token.js
require('dotenv').config({ path: '.env.local' });
const { GoogleAuth } = require('google-auth-library');

(async () => {
    const auth = new GoogleAuth({ scopes: 'https://www.googleapis.com/auth/cloud-platform' });
    const client = await auth.getClient();
    const token = await client.getAccessToken();
    console.log(token.token);
})();