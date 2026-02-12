import React, { useState, useEffect } from 'react';
import { Trophy, Users, Activity, CheckCircle, X, Plus, LogOut } from 'lucide-react';
import { createClient } from 'contentful-management';

const SPACE_ID = 'ax6wvfd84net';
const ACCESS_TOKEN = 'uPIoItEzujeqD7V1AZpAeYoDTRs_MTgV78nV6Kcu7w8';
const ENVIRONMENT = 'master';

const client = createClient({ accessToken: ACCESS_TOKEN });

const darkCard = {
  background: 'rgba(20,20,30,0.98)',
  borderRadius: '16px',
  boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
  padding: '32px',
  color: '#fff',
  marginBottom: '32px',
  border: '1px solid #222',
};

// WhatsApp Notification Placeholder
const sendWhatsAppAlert = async (data) => {
  // Fetch sponsors from Contentful
  try {
    const space = await client.getSpace(SPACE_ID);
    const env = await space.getEnvironment(ENVIRONMENT);
    const sponsorsRes = await env.getEntries({ content_type: 'sponsors' });
    const sponsors = sponsorsRes.items;
    // Pick random sponsor
    const sponsor = sponsors.length > 0 ? sponsors[Math.floor(Math.random() * sponsors.length)] : null;
    const sponsorName = sponsor?.fields?.name?.['en-US'] || 'Pande Cup';
    const sponsorLink = sponsor?.fields?.websiteUrl?.['en-US'] || 'https://pandecup.co.tz';
    // Format WhatsApp message
    let msg = '';
    if (data.type === 'goal') {
      msg = `⚽ GOAL ALERT! ${data.playerName} scored for ${data.teamName} at ${data.minute}'. Sponsored by ${sponsorName}. See full stats at ${sponsorLink}`;
    } else if (data.type === 'player') {
      msg = `New Player Registered: ${data.playerName} (${data.teamName}). Welcome to Pande Cup! Sponsored by ${sponsorName}.`;
    }
    // Placeholder: send to WhatsApp API
    await fetch('https://your-whatsapp-api-endpoint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: msg })
    });
    // For now, just log
    console.log('WhatsApp Alert:', msg);
  } catch (err) {
    console.error('WhatsApp Alert Error:', err);
  }
};

const sendWhatsAppNotification = async (eventData, sponsorName) => {
  const { playerName, teamName, minute, type } = eventData;
  // Secure phone number from env variable
  const adminPhone = process.env.NEXT_PUBLIC_ADMIN_PHONE;
  const message = `⚽ GOAL! ${playerName} of ${teamName} scored at ${minute} min. Sponsored by ${sponsorName}.`;
  try {
    const response = await fetch('https://api.whatsapp-provider.com/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        number: adminPhone,
        message: message,
      }),
    });
    if (response.ok) {
      console.log("WhatsApp alert sent successfully with sponsor: " + sponsorName);
    }
  } catch (error) {
    console.error("WhatsApp Error:", error);
  }
};

const AdminConsole = () => {
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [events, setEvents] = useState([]);
  const [activeTab, setActiveTab] = useState('players');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Player Registration State
  const [newPlayer, setNewPlayer] = useState({ name: '', position: '', number: '', team: '' });

  // Match Event Logging State
  const [selectedMatch, setSelectedMatch] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [eventType, setEventType] = useState('goal');
  const [minute, setMinute] = useState('');

  // Fetch Teams, Players, Matches
  useEffect(() => {
    setLoading(true);
    Promise.all([
      client.getSpace(SPACE_ID).then(space => space.getEnvironment(ENVIRONMENT).then(env => env.getEntries({ content_type: 'teams' }))),
      client.getSpace(SPACE_ID).then(space => space.getEnvironment(ENVIRONMENT).then(env => env.getEntries({ content_type: 'players' }))),
      client.getSpace(SPACE_ID).then(space => space.getEnvironment(ENVIRONMENT).then(env => env.getEntries({ content_type: 'match' }))),
      client.getSpace(SPACE_ID).then(space => space.getEnvironment(ENVIRONMENT).then(env => env.getEntries({ content_type: 'matchEvents' })))
    ]).then(([teamsRes, playersRes, matchesRes, eventsRes]) => {
      setTeams(teamsRes.items);
      setPlayers(playersRes.items);
      setMatches(matchesRes.items);
      setEvents(eventsRes.items);
      setLoading(false);
    }).catch(err => {
      setError('Failed to fetch Contentful data');
      setLoading(false);
    });
  }, []);

  // Player Registration Handler
  const handleAddPlayer = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');
    try {
      const space = await client.getSpace(SPACE_ID);
      const env = await space.getEnvironment(ENVIRONMENT);
      const entry = await env.createEntry('players', {
        fields: {
          name: { 'en-US': newPlayer.name },
          position: { 'en-US': newPlayer.position },
          number: { 'en-US': newPlayer.number },
          team: { 'en-US': { sys: { type: 'Link', linkType: 'Entry', id: newPlayer.team } } }
        }
      });
      setSuccess('✅ Mchezaji ameongezwa!');
      // WhatsApp notification
      await sendWhatsAppAlert({
        type: 'player',
        playerName: newPlayer.name,
        teamName: teams.find(t => t.sys.id === newPlayer.team)?.fields?.name?.['en-US'] || ''
      });
      setNewPlayer({ name: '', position: '', number: '', team: '' });
      setLoading(false);
    } catch (err) {
      setError('Error adding player: ' + err.message);
      setLoading(false);
    }
  };

  // Match Event Logger Handler
  const handleAddEvent = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');
    try {
      const space = await client.getSpace(SPACE_ID);
      const env = await space.getEnvironment(ENVIRONMENT);
      const entry = await env.createEntry('matchEvents', {
        fields: {
          player: { 'en-US': { sys: { type: 'Link', linkType: 'Entry', id: selectedPlayer } } },
          eventType: { 'en-US': eventType },
          minute: { 'en-US': minute },
          match: { 'en-US': { sys: { type: 'Link', linkType: 'Entry', id: selectedMatch } } }
        }
      });
      setSuccess('✅ Tukio limehifadhiwa na WhatsApp imetumwa!');
      // WhatsApp notification
      const playerObj = players.find(p => p.sys.id === selectedPlayer);
      const matchObj = matches.find(m => m.sys.id === selectedMatch);
      const teamId = playerObj?.fields?.team?.['en-US']?.sys?.id;
      const teamObj = teams.find(t => t.sys.id === teamId);
      // Fetch sponsors
      const sponsorsRes = await env.getEntries({ content_type: 'sponsors' });
      const sponsors = sponsorsRes.items;
      const sponsor = sponsors.length > 0 ? sponsors[Math.floor(Math.random() * sponsors.length)] : null;
      const sponsorName = sponsor?.fields?.name?.['en-US'] || 'Pande Cup';
      await sendWhatsAppNotification({
        type: eventType,
        playerName: playerObj?.fields?.name?.['en-US'] || '',
        teamName: teamObj?.fields?.name?.['en-US'] || '',
        minute
      }, sponsorName);
      // Toast notification already handled by 'success' state
      setSelectedMatch('');
      setSelectedPlayer('');
      setEventType('goal');
      setMinute('');
      setLoading(false);
    } catch (err) {
      setError('Error logging event: ' + err.message);
      setLoading(false);
    }
  };

  // Filter players for selected match
  const getPlayersForMatch = () => {
    if (!selectedMatch) return [];
    const match = matches.find(m => m.sys.id === selectedMatch);
    if (!match) return [];
    const homeTeamId = match.fields.homeTeam?.['en-US']?.sys?.id;
    const awayTeamId = match.fields.awayTeam?.['en-US']?.sys?.id;
    return players.filter(p => {
      const teamId = p.fields.team?.['en-US']?.sys?.id;
      return teamId === homeTeamId || teamId === awayTeamId;
    });
  };

  return (
    <div style={{ background: '#181a1b', minHeight: '100vh', color: '#fff', fontFamily: 'Inter, sans-serif', padding: '40px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
          <button onClick={() => setActiveTab('players')} style={{ ...darkCard, background: activeTab === 'players' ? '#23272f' : 'rgba(20,20,30,0.98)', color: activeTab === 'players' ? '#a3e635' : '#fff', fontWeight: 'bold', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px', border: 'none', cursor: 'pointer' }}>
            <Users size={22} /> Wachezaji
          </button>
          <button onClick={() => setActiveTab('events')} style={{ ...darkCard, background: activeTab === 'events' ? '#23272f' : 'rgba(20,20,30,0.98)', color: activeTab === 'events' ? '#a3e635' : '#fff', fontWeight: 'bold', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px', border: 'none', cursor: 'pointer' }}>
            <Activity size={22} /> Matokeo & Matukio
          </button>
        </div>

        {/* Success/Error Notification */}
        {(success || error) && (
          <div style={{ marginBottom: '24px', padding: '18px', borderRadius: '12px', background: success ? '#23272f' : '#2d1a1a', color: success ? '#a3e635' : '#ef4444', fontWeight: 'bold', fontSize: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}>
            {success || error}
            <button onClick={() => { setSuccess(''); setError(''); }} style={{ float: 'right', background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}><X size={18} /></button>
          </div>
        )}

        {/* PLAYER REGISTRATION TAB */}
        {activeTab === 'players' && (
          <div style={{ ...darkCard, maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ color: '#a3e635', fontWeight: '900', marginBottom: '24px', fontSize: '24px' }}><Users size={22} /> Sajili Mchezaji</h2>
            <form onSubmit={handleAddPlayer}>
              <input
                type="text"
                placeholder="Jina la Mchezaji"
                value={newPlayer.name}
                onChange={e => setNewPlayer({ ...newPlayer, name: e.target.value })}
                style={{ width: '100%', padding: '12px', marginBottom: '16px', borderRadius: '8px', border: '1px solid #333', background: '#23272f', color: '#fff', fontSize: '16px' }}
                required
              />
              <input
                type="text"
                placeholder="Nafasi (mfano: Mlinzi)"
                value={newPlayer.position}
                onChange={e => setNewPlayer({ ...newPlayer, position: e.target.value })}
                style={{ width: '100%', padding: '12px', marginBottom: '16px', borderRadius: '8px', border: '1px solid #333', background: '#23272f', color: '#fff', fontSize: '16px' }}
                required
              />
              <input
                type="number"
                placeholder="Namba ya Jezi"
                value={newPlayer.number}
                onChange={e => setNewPlayer({ ...newPlayer, number: e.target.value })}
                style={{ width: '100%', padding: '12px', marginBottom: '16px', borderRadius: '8px', border: '1px solid #333', background: '#23272f', color: '#fff', fontSize: '16px' }}
                required
              />
              <select
                value={newPlayer.team}
                onChange={e => setNewPlayer({ ...newPlayer, team: e.target.value })}
                style={{ width: '100%', padding: '12px', marginBottom: '24px', borderRadius: '8px', border: '1px solid #333', background: '#23272f', color: '#fff', fontSize: '16px' }}
                required
              >
                <option value="">Chagua Timu...</option>
                {teams.map(team => (
                  <option key={team.sys.id} value={team.sys.id}>{team.fields.name?.['en-US']}</option>
                ))}
              </select>
              <button type="submit" style={{ width: '100%', padding: '14px', background: '#a3e635', color: '#181a1b', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '18px', cursor: 'pointer', marginTop: '8px' }}>
                <Plus size={18} /> Hifadhi Mchezaji
              </button>
            </form>
          </div>
        )}

        {/* MATCH EVENTS LOGGER TAB */}
        {activeTab === 'events' && (
          <div style={{ ...darkCard, maxWidth: '700px', margin: '0 auto' }}>
            <h2 style={{ color: '#a3e635', fontWeight: '900', marginBottom: '24px', fontSize: '24px' }}><Activity size={22} /> Matokeo & Matukio</h2>
            <form onSubmit={handleAddEvent}>
              <select
                value={selectedMatch}
                onChange={e => setSelectedMatch(e.target.value)}
                style={{ width: '100%', padding: '12px', marginBottom: '16px', borderRadius: '8px', border: '1px solid #333', background: '#23272f', color: '#fff', fontSize: '16px' }}
                required
              >
                <option value="">Chagua Mechi...</option>
                {matches.map(match => (
                  <option key={match.sys.id} value={match.sys.id}>
                    {match.fields.homeTeam?.['en-US']?.fields?.name} vs {match.fields.awayTeam?.['en-US']?.fields?.name}
                  </option>
                ))}
              </select>
              <select
                value={selectedPlayer}
                onChange={e => setSelectedPlayer(e.target.value)}
                style={{ width: '100%', padding: '12px', marginBottom: '16px', borderRadius: '8px', border: '1px solid #333', background: '#23272f', color: '#fff', fontSize: '16px' }}
                required
                disabled={!selectedMatch}
              >
                <option value="">Chagua Mchezaji...</option>
                {getPlayersForMatch().map(player => (
                  <option key={player.sys.id} value={player.sys.id}>
                    {player.fields.number?.['en-US']} - {player.fields.name?.['en-US']}
                  </option>
                ))}
              </select>
              <select
                value={eventType}
                onChange={e => setEventType(e.target.value)}
                style={{ width: '100%', padding: '12px', marginBottom: '16px', borderRadius: '8px', border: '1px solid #333', background: '#23272f', color: '#fff', fontSize: '16px' }}
                required
              >
                <option value="goal">⚽ Goal</option>
                <option value="yellow">🟨 Yellow Card</option>
                <option value="red">🟥 Red Card</option>
              </select>
              <input
                type="number"
                placeholder="Dakika ya Tukio (mfano: 23)"
                value={minute}
                onChange={e => setMinute(e.target.value)}
                style={{ width: '100%', padding: '12px', marginBottom: '24px', borderRadius: '8px', border: '1px solid #333', background: '#23272f', color: '#fff', fontSize: '16px' }}
                required
              />
              <button type="submit" style={{ width: '100%', padding: '14px', background: '#a3e635', color: '#181a1b', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '18px', cursor: 'pointer', marginTop: '8px' }}>
                <CheckCircle size={18} /> Hifadhi Tukio
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminConsole;
