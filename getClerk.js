require('dotenv').config({ path: '.env.local' });
const secretKey = process.env.CLERK_SECRET_KEY;
fetch('https://api.clerk.dev/v1/users?limit=100', {
  headers: { 'Authorization': 'Bearer ' + secretKey }
}).then(r=>r.json()).then(data => {
  const usersWithLive = data.filter(u => u.public_metadata && Object.keys(u.public_metadata).length > 0);
  console.log(JSON.stringify(usersWithLive, null, 2));
});
