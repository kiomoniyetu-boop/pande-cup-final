// api/register.js
const { createClient } = require('contentful-management');

module.exports = async (req, res) => {
  // Hii inaruhusu data kupita (Security headers)
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Kama browser inauliza njia (OPTIONS),iruhusu
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Tunapokea POST tu (Kutuma data)
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Tunachambua data zilizotumwa
  const { teamName, coachName, phoneNumber, location, jerseyColor } = req.body;

  // Hakikisha data muhimu zipo
  if (!teamName || !phoneNumber) {
    return res.status(400).json({ message: 'Data haijakamilika' });
  }

  try {
    // Unganisha na Contentful
    const client = createClient({
      accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN
    });

    const space = await client.getSpace(process.env.REACT_APP_SPACE_ID);
    const environment = await space.getEnvironment('master');

    // Hifadhi data (Tengeneza Entry mpya)
    await environment.createEntry('registration', {
      fields: {
        teamName: { 'en-US': teamName },
        coachName: { 'en-US': coachName },
        phoneNumber: { 'en-US': phoneNumber },
        Location: { 'en-US': location },
        jerseyColor: { 'en-US': jerseyColor },
        paymentStatus: { 'en-US': false }
      }
    });

    // Jibu kwamba imefanikiwa
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Contentful Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};