// api/register.js
const { createClient } = require('contentful-management');

module.exports = async (req, res) => {
  // 1. Ruhusu mawasiliano kutoka kwenye simu (CORS)
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { teamName, coachName, phoneNumber, location, jerseyColor } = req.body;

  if (!teamName || !phoneNumber) {
    return res.status(400).json({ message: 'Data haijakamilika' });
  }

  try {
    // --- USAJILI LIVE (HARDCODED TOKENS BY SENSEI YAS) ---
    const client = createClient({
      accessToken: 'CFPAT-Thhq98H2yEpRpYg8Pcyg8_cMv977e8nu4dJnfw6fRZU' 
    });

    const space = await client.getSpace('ax6wvfd84net'); 
    const environment = await space.getEnvironment('master');

    // Hapa tunatengeneza entry mpya Contentful
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

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Contentful Error:', error);
    // Tunatuma kosa halisi ili uone kwenye box jekundu simuni
    res.status(500).json({ success: false, message: error.message });
  }
};