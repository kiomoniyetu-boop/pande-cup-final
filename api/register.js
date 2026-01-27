// api/register.js
const { createClient } = require('contentful-management');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { teamName, coachName, phoneNumber, location, jerseyColor } = req.body;

  try {
    const client = createClient({
      accessToken: 'CFPAT-Thhq98H2yEpRpYg8Pcyg8_cMv977e8nu4dJnfw6fRZU' 
    });

    const space = await client.getSpace('ax6wvfd84net'); 
    const environment = await space.getEnvironment('master');

    // HAPA: Imerudi kuwa herufi ndogo kufuata maelekezo yako
    await environment.createEntry('registration', { 
      fields: {
        teamName: { 'en-US': teamName || 'Haikuwekwa' },
        coachName: { 'en-US': coachName || 'Haikuwekwa' },
        phoneNumber: { 'en-US': phoneNumber || 'Haikuwekwa' },
        Location: { 'en-US': location || 'Haikuwekwa' },
        jerseyColor: { 'en-US': jerseyColor || 'Haikuwekwa' },
        paymentStatus: { 'en-US': false }
      }
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('ERROR:', error);
    return res.status(500).json({ 
      success: false, 
      message: `SYSTEM ERROR: ${error.message}`,
      hint: "Hakikisha Content Model ID kule Contentful imeshakuwa Published kama 'registration'"
    });
  }
};