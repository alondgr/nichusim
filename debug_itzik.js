require('dotenv').config({ path: '.env.local' });
const { clerkClient } = require('@clerk/clerk-sdk-node');

async function debug() {
  try {
    const users = await clerkClient.users.getUserList({ limit: 500 });
    const itzik = users.data.filter(u => 
      u.firstName?.includes('איציק') || 
      u.lastName?.includes('חי') || 
      u.username?.includes('itzik') || 
      (u.firstName + ' ' + u.lastName).includes('איציק חי')
    );
    if (itzik.length > 0) {
      console.log("Found Itzik:");
      itzik.forEach(i => {
        console.log("ID:", i.id);
        console.log("Name:", i.firstName, i.lastName);
        console.log("Predictions:", JSON.stringify(i.privateMetadata.predictions, null, 2));
      });
    } else {
      console.log("No Itzik found. Showing all users:", users.data.map(u => u.firstName + ' ' + u.lastName));
    }
  } catch (error) {
    console.error(error);
  }
}
debug();
