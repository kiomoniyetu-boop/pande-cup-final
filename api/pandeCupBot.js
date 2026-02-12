// Pande Cup Bot: Contentful Event Listener & WhatsApp Notification

require('dotenv').config();
const contentful = require('contentful-management');
const fetch = require('node-fetch');

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const ENVIRONMENT = process.env.CONTENTFUL_ENVIRONMENT || 'master';
const ADMIN_PHONE = process.env.ADMIN_PHONE;

// Internal tally for Golden Boot
const topScorers = {};
// Suspended players
const suspendedPlayers = new Set();

const client = contentful.createClient({ accessToken: ACCESS_TOKEN });

async function listenForMatchEvents() {
  const space = await client.getSpace(SPACE_ID);
  const env = await space.getEnvironment(ENVIRONMENT);
  let lastEventId = null;

  setInterval(async () => {
    const eventsRes = await env.getEntries({ content_type: 'matchEvents', order: '-sys.createdAt', limit: 1 });
    const event = eventsRes.items[0];
    if (!event || event.sys.id === lastEventId) return;
    lastEventId = event.sys.id;

    // Deep fetch references
    const playerRef = event.fields.player['en-US'].sys.id;
    const matchRef = event.fields.match['en-US'].sys.id;
    const eventType = event.fields.eventType['en-US'];
    const minute = event.fields.minute['en-US'];

    // Fetch Player
    const playerEntry = await env.getEntry(playerRef);
    const playerName = playerEntry.fields.name['en-US'];
    const teamRef = playerEntry.fields.team['en-US'].sys.id;
    // Fetch Team
    const teamEntry = await env.getEntry(teamRef);
    const teamName = teamEntry.fields.name['en-US'];

    // Fetch Match
    const matchEntry = await env.getEntry(matchRef);
    const homeTeam = matchEntry.fields.homeTeam['en-US'].fields.name['en-US'];
    const awayTeam = matchEntry.fields.awayTeam['en-US'].fields.name['en-US'];
    const matchName = `${homeTeam} vs ${awayTeam}`;

    // WhatsApp Notification
    const message = `⚽ PANDE CUP UPDATE: ${playerName} scored a ${eventType} in the ${minute}th minute! This event is linked to ${matchName}.`;
    await sendWhatsAppAlert(message);

    // Golden Boot & Standings
    if (eventType.toLowerCase() === 'goli') {
      topScorers[playerRef] = (topScorers[playerRef] || 0) + 1;
    }
    if (eventType.toLowerCase() === 'kadi nyekundu') {
      suspendedPlayers.add(playerRef);
    }
  }, 5000); // Poll every 5 seconds
}

async function sendWhatsAppAlert(message) {
  try {
    await fetch('https://api.whatsapp-provider.com/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        number: ADMIN_PHONE,
        message,
      }),
    });
  } catch (err) {
    console.error('WhatsApp Error:', err);
  }
}

listenForMatchEvents();

module.exports = { listenForMatchEvents, topScorers, suspendedPlayers };
