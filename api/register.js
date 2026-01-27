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

    // TUMEWEKA KILA KITU HERUFI NDOGO ILI KULINGANA NA ID ZA CONTENTFUL
    await environment.createEntry('registration', { 
      fields: {
        teamName: { 'en-US': teamName || 'Haikuwekwa' },
        coachName: { 'en-US': coachName || 'Haikuwekwa' },
        phoneNumber: { 'en-US': phoneNumber || 'Haikuwekwa' },
        location: { 'en-US': location || 'Haikuwekwa' }, // 'l' ndogo hapa
        jerseyColor: { 'en-US': jerseyColor || 'Haikuwekwa' },
        paymentStatus: { 'en-US': false } 
      }
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('FULL ERROR:', error);
    
    // HAPA: Tunachimba kosa halisi ili lijionyeshe kwenye simu yako
    let detailMsg = error.message;
    if (error.details && error.details.errors) {
      detailMsg += " - " + JSON.stringify(error.details.errors);
    }

    return res.status(500).json({ 
      success: false, 
      message: `VALIDATION ERROR (422): ${detailMsg}`
    });
  }
};