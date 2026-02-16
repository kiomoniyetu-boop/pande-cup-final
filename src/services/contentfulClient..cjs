<create_file>
<path>/mnt/user-data/outputs/contentfulClient.js</path>
<description>Contentful API Integration Client - Clean formatted version ready to copy</description>
<file_text>// 🧠 Pande Cup Contentful Integration Client
// Sensei Larusso - Full CRUD Operationsconst SPACE_ID = 'ax6wvfd84net';
const CDA_TOKEN = 'uPIoItEzujeqD7V1AZpAeYoDTRs_MTgV78nV6Kcu7w8';
const CMA_TOKEN = 'CFPAT-BrmzMuZOK46nqs1DRSLGP1Fsbbqze2Lj0BStohdF6As';
const ENVIRONMENT = 'master';const CDA_BASE = https://cdn.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT};
const CMA_BASE = https://api.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT};// ============================================
// READ OPERATIONS (Fetch data)
// ============================================export const fetchEntries = async (contentType, filters = {}) => {
try {
let url = ${CDA_BASE}/entries?access_token=${CDA_TOKEN}&content_type=${contentType}&limit=1000;if (filters.location) url += `&fields.location=${filters.location}`;
if (filters.season) url += `&fields.season=${filters.season}`;
if (filters.status) url += `&fields.status=${filters.status}`;const response = await fetch(url);
if (!response.ok) throw new Error(`Fetch Error: ${response.status}`);const data = await response.json();return data.items.map(item => ({
  id: item.sys.id,
  createdAt: item.sys.createdAt,
  updatedAt: item.sys.updatedAt,
  ...item.fields
}));
} catch (error) {
console.error(Error fetching ${contentType}:, error);
return [];
}
};export const fetchEntry = async (entryId) => {
try {
const response = await fetch(
${CDA_BASE}/entries/${entryId}?access_token=${CDA_TOKEN}
);
if (!response.ok) throw new Error(Entry not found: ${entryId});const data = await response.json();
return {
  id: data.sys.id,
  ...data.fields
};
} catch (error) {
console.error('Error fetching entry:', error);
return null;
}
};// ============================================
// CREATE OPERATIONS (Add new entries)
// ============================================const formatFieldsForContentful = (fields) => {
const formatted = {};
Object.keys(fields).forEach(key => {
formatted[key] = { 'en-US': fields[key] };
});
return formatted;
};export const createEntry = async (contentType, fields) => {
try {
const response = await fetch(
${CMA_BASE}/entries,
{
method: 'POST',
headers: {
'Authorization': Bearer ${CMA_TOKEN},
'Content-Type': 'application/vnd.contentful.management.v1+json',
'X-Contentful-Content-Type': contentType
},
body: JSON.stringify({ fields: formatFieldsForContentful(fields) })
}
);if (!response.ok) {
  const errorData = await response.json();
  throw new Error(`Create Error: ${errorData.message || response.status}`);
}const data = await response.json();
await publishEntry(data.sys.id);return {
  id: data.sys.id,
  ...data.fields
};
} catch (error) {
console.error('Error creating entry:', error);
throw error;
}
};export const createRegistration = async (registrationData) => {
const fields = {
teamName: registrationData.teamName,
coachName: registrationData.coachName,
phoneNumber: registrationData.phoneNumber,
Location: registrationData.location,
rawLocation: registrationData.rawLocation,
jerseyColor: registrationData.jerseyColor || '',
season: registrationData.season || '2026',
status: 'Pending',
paymentStatus: false,
registrationDate: new Date().toISOString(),
totalPlayers: registrationData.totalPlayers || 0,
players: JSON.stringify(registrationData.players || []),
adminNotes: ''
};return await createEntry('registration', fields);
};export const createStanding = async (teamData) => {
const fields = {
teamName: teamData.teamName,
position: 0,
played: 0,
won: 0,
drawn: 0,
lost: 0,
goalsFor: 0,
goalsAgainst: 0,
goalDifference: 0,
points: 0,
formGuide: '',
cleanSheets: 0,
group: teamData.group || 'LIGI KUU',
season: teamData.season || '2026',
location: teamData.location || 'kiomoni'
};return await createEntry('standing', fields);
};export const createMatch = async (matchData) => {
const fields = {
homeTeam: matchData.homeTeam,
awayTeam: matchData.awayTeam,
matchDate: matchData.matchDate,
time: matchData.time || 'TBA',
stadium: matchData.stadium || '',
score: matchData.score || 'VS',
status: matchData.status || 'Scheduled',
round: matchData.round || '',
season: matchData.season || '2026',
location: matchData.location || 'kiomoni',
referee: matchData.referee || ''
};return await createEntry('match', fields);
};export const createPlayer = async (playerData) => {
const fields = {
playerName: playerData.playerName,
aka: playerData.aka || '',
position: playerData.position,
jerseyNumber: playerData.jerseyNumber,
team: playerData.team,
goals: 0,
assists: 0,
yellowCards: 0,
redCards: 0,
season: playerData.season || '2026',
location: playerData.location || 'kiomoni'
};return await createEntry('player', fields);
};// ============================================
// UPDATE OPERATIONS (Modify existing entries)
// ============================================export const updateEntry = async (entryId, fields) => {
try {
const currentEntry = await fetch(
${CMA_BASE}/entries/${entryId},
{
headers: { 'Authorization': Bearer ${CMA_TOKEN} }
}
);if (!currentEntry.ok) throw new Error('Entry not found');const entryData = await currentEntry.json();
const version = entryData.sys.version;const response = await fetch(
  `${CMA_BASE}/entries/${entryId}`,
  {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${CMA_TOKEN}`,
      'Content-Type': 'application/vnd.contentful.management.v1+json',
      'X-Contentful-Version': version
    },
    body: JSON.stringify({ fields: formatFieldsForContentful(fields) })
  }
);if (!response.ok) throw new Error(`Update failed: ${response.status}`);const data = await response.json();
await publishEntry(entryId);return {
  id: data.sys.id,
  ...data.fields
};
} catch (error) {
console.error('Error updating entry:', error);
throw error;
}
};export const updateMatchScore = async (matchId, homeScore, awayScore, status = 'LIVE') => {
const fields = {
score: ${homeScore} - ${awayScore},
status: status
};return await updateEntry(matchId, fields);
};export const updatePlayerStats = async (playerId, statsUpdate) => {
const currentPlayer = await fetchEntry(playerId);const updatedFields = {
goals: (currentPlayer.goals || 0) + (statsUpdate.goals || 0),
assists: (currentPlayer.assists || 0) + (statsUpdate.assists || 0),
yellowCards: (currentPlayer.yellowCards || 0) + (statsUpdate.yellowCards || 0),
redCards: (currentPlayer.redCards || 0) + (statsUpdate.redCards || 0)
};return await updateEntry(playerId, updatedFields);
};export const updateRegistrationStatus = async (registrationId, status, adminNotes = '') => {
const fields = {
status: status,
adminNotes: adminNotes
};return await updateEntry(registrationId, fields);
};export const updateStanding = async (standingId, matchResult) => {
const current = await fetchEntry(standingId);let points = current.points || 0;
let won = current.won || 0;
let drawn = current.drawn || 0;
let lost = current.lost || 0;
let formGuide = current.formGuide || '';if (matchResult.won) {
points += 3;
won += 1;
formGuide = 'W' + formGuide.slice(0, 4);
} else if (matchResult.drawn) {
points += 1;
drawn += 1;
formGuide = 'D' + formGuide.slice(0, 4);
} else {
lost += 1;
formGuide = 'L' + formGuide.slice(0, 4);
}const updatedFields = {
played: (current.played || 0) + 1,
won,
drawn,
lost,
goalsFor: (current.goalsFor || 0) + matchResult.goalsFor,
goalsAgainst: (current.goalsAgainst || 0) + matchResult.goalsAgainst,
goalDifference: ((current.goalsFor || 0) + matchResult.goalsFor) - ((current.goalsAgainst || 0) + matchResult.goalsAgainst),
points,
formGuide,
cleanSheets: (current.cleanSheets || 0) + (matchResult.cleanSheet ? 1 : 0)
};return await updateEntry(standingId, updatedFields);
};// ============================================
// DELETE OPERATIONS
// ============================================export const deleteEntry = async (entryId) => {
try {
await unpublishEntry(entryId);const response = await fetch(
  `${CMA_BASE}/entries/${entryId}`,
  {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${CMA_TOKEN}` }
  }
);if (!response.ok) throw new Error('Delete failed');return true;
} catch (error) {
console.error('Error deleting entry:', error);
return false;
}
};// ============================================
// PUBLISH/UNPUBLISH OPERATIONS
// ============================================export const publishEntry = async (entryId) => {
try {
const entry = await fetch(
${CMA_BASE}/entries/${entryId},
{
headers: { 'Authorization': Bearer ${CMA_TOKEN} }
}
);const entryData = await entry.json();
const version = entryData.sys.version;const response = await fetch(
  `${CMA_BASE}/entries/${entryId}/published`,
  {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${CMA_TOKEN}`,
      'X-Contentful-Version': version
    }
  }
);return response.ok;
} catch (error) {
console.error('Error publishing entry:', error);
return false;
}
};export const unpublishEntry = async (entryId) => {
try {
const response = await fetch(
${CMA_BASE}/entries/${entryId}/published,
{
method: 'DELETE',
headers: { 'Authorization': Bearer ${CMA_TOKEN} }
}
);return response.ok;
} catch (error) {
console.error('Error unpublishing entry:', error);
return false;
}
};// ============================================
// AUTO-CALCULATE STANDINGS FROM MATCHES
// ============================================export const recalculateStandings = async (location, season) => {
try {
const matches = await fetchEntries('match', { location, season });
const standings = await fetchEntries('standing', { location, season });const teamStats = {};
standings.forEach(team => {
  teamStats[team.teamName] = {
    id: team.id,
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    points: 0,
    formGuide: '',
    cleanSheets: 0
  };
});const completedMatches = matches.filter(m => 
  m.score && m.score.includes('-') && !m.score.toLowerCase().includes('vs')
);completedMatches.forEach(match => {
  const [homeScore, awayScore] = match.score.split('-').map(s => parseInt(s.trim()));  if (isNaN(homeScore) || isNaN(awayScore)) return;  const homeTeam = match.homeTeam;
  const awayTeam = match.awayTeam;  if (!teamStats[homeTeam] || !teamStats[awayTeam]) return;  teamStats[homeTeam].played++;
  teamStats[awayTeam].played++;
  teamStats[homeTeam].goalsFor += homeScore;
  teamStats[homeTeam].goalsAgainst += awayScore;
  teamStats[awayTeam].goalsFor += awayScore;
  teamStats[awayTeam].goalsAgainst += homeScore;  if (homeScore > awayScore) {
    teamStats[homeTeam].won++;
    teamStats[homeTeam].points += 3;
    teamStats[homeTeam].formGuide = 'W' + teamStats[homeTeam].formGuide.slice(0, 4);
    teamStats[awayTeam].lost++;
    teamStats[awayTeam].formGuide = 'L' + teamStats[awayTeam].formGuide.slice(0, 4);
  } else if (awayScore > homeScore) {
    teamStats[awayTeam].won++;
    teamStats[awayTeam].points += 3;
    teamStats[awayTeam].formGuide = 'W' + teamStats[awayTeam].formGuide.slice(0, 4);
    teamStats[homeTeam].lost++;
    teamStats[homeTeam].formGuide = 'L' + teamStats[homeTeam].formGuide.slice(0, 4);
  } else {
    teamStats[homeTeam].drawn++;
    teamStats[homeTeam].points += 1;
    teamStats[homeTeam].formGuide = 'D' + teamStats[homeTeam].formGuide.slice(0, 4);
    teamStats[awayTeam].drawn++;
    teamStats[awayTeam].points += 1;
    teamStats[awayTeam].formGuide = 'D' + teamStats[awayTeam].formGuide.slice(0, 4);
  }  if (awayScore === 0) teamStats[homeTeam].cleanSheets++;
  if (homeScore === 0) teamStats[awayTeam].cleanSheets++;  teamStats[homeTeam].goalDifference = teamStats[homeTeam].goalsFor - teamStats[homeTeam].goalsAgainst;
  teamStats[awayTeam].goalDifference = teamStats[awayTeam].goalsFor - teamStats[awayTeam].goalsAgainst;
});const updatePromises = Object.keys(teamStats).map(teamName => {
  const stats = teamStats[teamName];
  return updateEntry(stats.id, stats);
});await Promise.all(updatePromises);return true;
} catch (error) {
console.error('Error recalculating standings:', error);
return false;
}
};export default {
fetchEntries,
fetchEntry,
createEntry,
createRegistration,
createStanding,
createMatch,
createPlayer,
updateEntry,
updateMatchScore,
updatePlayerStats,
updateRegistrationStatus,
updateStanding,
deleteEntry,
publishEntry,
unpublishEntry,
recalculateStandings
};
</file_text>
</create_file>