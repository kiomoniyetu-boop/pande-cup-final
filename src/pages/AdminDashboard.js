
import React, { useState, useEffect } from 'react';
import { Lock, Trash2, Download } from 'lucide-react';
import { AdminService } from '../services/AdminService';

const fontStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Oswald:wght@700&display=swap');
  body, input, button, select, textarea { font-family: 'Inter', Arial, sans-serif; }
  .admin-heading { font-family: 'Oswald', Arial, sans-serif; letter-spacing: 1px; }
`;

const ADMIN_PASSWORD = 'pandecup2024';

const AdminDashboard = () => {
  // State
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('teams');
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [events, setEvents] = useState([]);
  const [newTeam, setNewTeam] = useState({ name: '', coachName: '', phone: '' });
  const [newPlayer, setNewPlayer] = useState({ name: '', position: '', number: '' });
  const [selectedTeam, setSelectedTeam] = useState('');
  const [selectedMatch, setSelectedMatch] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [selectedAction, setSelectedAction] = useState('goal');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (authenticated) {
      AdminService.initialize();
      const data = AdminService.getData();
      setTeams(data.teams);
      setPlayers(data.players);
      setMatches(data.matches);
      setEvents(data.events || []);
    }
  }, [authenticated]);

  // Logic Handlers (NO JSX)
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setPassword('');
    } else {
      setMessage('❌ Neno la siri si sahihi');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleAddTeam = (e) => {
    e.preventDefault();
    if (newTeam.name && newTeam.coachName) {
      AdminService.addTeam(newTeam);
      const data = AdminService.getData();
      setTeams(data.teams);
      setNewTeam({ name: '', coachName: '', phone: '' });
      setMessage('✅ Timu imeongezwa');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleAddPlayer = (e) => {
    e.preventDefault();
    if (selectedTeam && newPlayer.name) {
      AdminService.addPlayer(selectedTeam, newPlayer);
      const data = AdminService.getData();
      setPlayers(data.players);
      setNewPlayer({ name: '', position: '', number: '' });
      setMessage('✅ Mchezaji ameongezwa');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleDeleteTeam = (teamId) => {
    if (window.confirm('Thibiti kuondoa timu?')) {
      AdminService.deleteTeam(teamId);
      const data = AdminService.getData();
      setTeams(data.teams);
      setMessage('🗑️ Timu imeondolewa');
    }
  };

  const handleDeletePlayer = (playerId) => {
    if (window.confirm('Thibiti kuondoa mchezaji?')) {
      AdminService.deletePlayer(playerId);
      const data = AdminService.getData();
      setPlayers(data.players);
      setMessage('🗑️ Mchezaji ameondolewa');
    }
  };

  const handleRecordEvent = (e) => {
    e.preventDefault();
    if (!selectedMatch || !selectedPlayer) return;
    if (selectedAction === 'goal') {
      AdminService.recordGoal(selectedMatch, { playerId: selectedPlayer });
    } else if (selectedAction === 'yellow') {
      AdminService.recordCard(selectedMatch, { playerId: selectedPlayer, cardType: 'yellow' });
    } else if (selectedAction === 'red') {
      AdminService.recordCard(selectedMatch, { playerId: selectedPlayer, cardType: 'red' });
    }
    const data = AdminService.getData();
    setEvents(data.events || []);
    setSelectedMatch('');
    setSelectedPlayer('');
    setSelectedAction('goal');
    setMessage(`✅ Tukio limerekodi: ${selectedAction.toUpperCase()}`);
    setTimeout(() => setMessage(''), 3000);
  };

  const generateReport = () => {
    const report = AdminService.generateReport('full');
    const dataStr = JSON.stringify(report, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `pande_cup_report_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    setMessage('📊 Ripoti imetengenezwa');
  };

  // UI
  if (!authenticated) {
    return (
      <>
        <style>{fontStyles}</style>
        <div style={{ minHeight: '100vh', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{
            background: 'rgba(30,41,59,0.7)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '20px',
            padding: '40px',
            width: '100%',
            maxWidth: '400px',
            boxShadow: '0 8px 32px 0 rgba(163,230,53,0.10)'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <Lock size={48} style={{ color: '#a3e635', marginBottom: '16px' }} />
              <h1 className="admin-heading" style={{ fontSize: '24px', fontWeight: '900', margin: '0 0 8px', color: 'white', letterSpacing: '1px' }}>PANDE CUP ADMIN</h1>
              <p style={{ color: '#a3e635', margin: 0, fontWeight: 600 }}>Kiungo cha Kufanya Kazi</p>
            </div>
            <form onSubmit={handleLogin}>
              <input
                type="password"
                placeholder="Ingiza Neno la Siri"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '8px',
                  border: '1.5px solid #a3e635',
                  background: 'rgba(30,41,59,0.9)',
                  color: 'white',
                  fontSize: '16px',
                  marginBottom: '16px',
                  fontFamily: 'Inter, Arial, sans-serif',
                  boxSizing: 'border-box',
                  outline: 'none',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
                autoFocus
              />
              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '14px',
                  background: '#a3e635',
                  color: 'black',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  fontFamily: 'Oswald, Arial, sans-serif',
                  fontSize: '18px',
                  cursor: 'pointer',
                  letterSpacing: '1px',
                  marginTop: '4px',
                  boxShadow: '0 0 0 0 transparent',
                  transition: 'box-shadow 0.2s',
                }}
              >
                INGIA
              </button>
            </form>
            {message && (
              <div style={{ marginTop: '16px', padding: '12px', background: '#fff3cd', borderRadius: '8px', color: '#856404', textAlign: 'center', fontFamily: 'Inter, Arial, sans-serif' }}>
                {message}
              </div>
            )}
          </div>
        </div>
      </>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', color: 'white', padding: '0 0 40px 0' }}>
      <style>{fontStyles}</style>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 0' }}>
        <h1 className="admin-heading" style={{ fontSize: 36, color: '#a3e635', marginBottom: 8 }}>Pande Cup Admin Console</h1>
        <div style={{
          marginBottom: 32,
          display: 'flex',
          gap: 16,
        }}>
          {[
            { key: 'teams', label: 'Timu' },
            { key: 'players', label: 'Wachezaji' },
            { key: 'events', label: 'Matukio' },
            { key: 'reports', label: 'Ripoti' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                background: activeTab === tab.key ? 'rgba(30,41,59,0.85)' : 'rgba(30,41,59,0.7)',
                color: activeTab === tab.key ? '#a3e635' : '#fff',
                border: activeTab === tab.key ? '2px solid #a3e635' : '1.5px solid rgba(255,255,255,0.13)',
                borderRadius: 12,
                padding: '12px 28px',
                fontWeight: 700,
                fontSize: 18,
                fontFamily: 'Oswald, Arial, sans-serif',
                letterSpacing: '1px',
                boxShadow: activeTab === tab.key ? '0 2px 16px 0 rgba(163,230,53,0.10)' : '0 1px 4px 0 rgba(0,0,0,0.10)',
                cursor: 'pointer',
                outline: 'none',
                transition: 'all 0.2s',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Teams Tab */}
        {activeTab === 'teams' && (
          <div style={{
            background: 'rgba(30,41,59,0.7)',
            borderRadius: 16,
            padding: 24,
            marginBottom: 32,
            boxShadow: '0 4px 32px 0 rgba(163,230,53,0.10)',
            border: '1px solid rgba(255,255,255,0.08)',
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            gap: 32,
          }}>
            <form onSubmit={handleAddTeam} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <h2 style={{ color: '#a3e635', fontSize: 22, marginBottom: 8 }}>Ongeza Timu</h2>
              <input type="text" placeholder="Jina la Timu" value={newTeam.name} onChange={e => setNewTeam({ ...newTeam, name: e.target.value })} required
                style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1.5px solid #a3e635', borderRadius: 8, padding: 12, fontSize: 16 }} />
              <input type="text" placeholder="Jina la Kocha" value={newTeam.coachName} onChange={e => setNewTeam({ ...newTeam, coachName: e.target.value })} required
                style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1.5px solid #a3e635', borderRadius: 8, padding: 12, fontSize: 16 }} />
              <input type="text" placeholder="Namba ya Simu" value={newTeam.phone} onChange={e => setNewTeam({ ...newTeam, phone: e.target.value })}
                style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1.5px solid #a3e635', borderRadius: 8, padding: 12, fontSize: 16 }} />
              <button type="submit" style={{ background: '#a3e635', color: '#0f172a', border: 'none', borderRadius: 8, padding: '12px 20px', fontWeight: 'bold', fontSize: 16, cursor: 'pointer', marginTop: 8 }}>Ongeza Timu</button>
              {message && <div style={{ marginTop: 8, color: '#a3e635', fontWeight: 600 }}>{message}</div>}
            </form>
            <div>
              <h2 style={{ color: '#a3e635', fontSize: 22, marginBottom: 16 }}>Timu Zote</h2>
              {teams.length === 0 ? <p style={{ color: '#fff' }}>Hakuna timu bado</p> : (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {teams.map(team => (
                    <li key={team.id} style={{ background: 'rgba(255,255,255,0.04)', color: '#fff', borderRadius: 8, padding: 16, marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <b style={{ color: '#a3e635', fontSize: 18 }}>{team.name}</b>
                        <div style={{ fontSize: 14, color: '#fff', opacity: 0.8 }}>Kocha: {team.coachName} | Simu: {team.phone}</div>
                      </div>
                      <button onClick={() => handleDeleteTeam(team.id)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }} title="Futa Timu"><Trash2 size={20} /></button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {/* Players Tab */}
        {activeTab === 'players' && (
          <div style={{
            background: 'rgba(30,41,59,0.7)',
            borderRadius: 16,
            padding: 24,
            marginBottom: 32,
            boxShadow: '0 4px 32px 0 rgba(163,230,53,0.10)',
            border: '1px solid rgba(255,255,255,0.08)',
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            gap: 32,
          }}>
            <form onSubmit={handleAddPlayer} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <h2 style={{ color: '#a3e635', fontSize: 22, marginBottom: 8 }}>Ongeza Mchezaji</h2>
              <select value={selectedTeam} onChange={e => setSelectedTeam(e.target.value)} required
                style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1.5px solid #a3e635', borderRadius: 8, padding: 12, fontSize: 16 }}>
                <option value="">Chagua Timu...</option>
                {teams.map(team => <option key={team.id} value={team.id}>{team.name}</option>)}
              </select>
              <input type="text" placeholder="Jina la Mchezaji" value={newPlayer.name} onChange={e => setNewPlayer({ ...newPlayer, name: e.target.value })} required
                style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1.5px solid #a3e635', borderRadius: 8, padding: 12, fontSize: 16 }} />
              <input type="text" placeholder="Nafasi" value={newPlayer.position} onChange={e => setNewPlayer({ ...newPlayer, position: e.target.value })}
                style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1.5px solid #a3e635', borderRadius: 8, padding: 12, fontSize: 16 }} />
              <input type="number" placeholder="Namba" value={newPlayer.number} onChange={e => setNewPlayer({ ...newPlayer, number: e.target.value })}
                style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1.5px solid #a3e635', borderRadius: 8, padding: 12, fontSize: 16 }} />
              <button type="submit" style={{ background: '#a3e635', color: '#0f172a', border: 'none', borderRadius: 8, padding: '12px 20px', fontWeight: 'bold', fontSize: 16, cursor: 'pointer', marginTop: 8 }}>Ongeza Mchezaji</button>
              {message && <div style={{ marginTop: 8, color: '#a3e635', fontWeight: 600 }}>{message}</div>}
            </form>
            <div>
              <h2 style={{ color: '#a3e635', fontSize: 22, marginBottom: 16 }}>Wachezaji Wote</h2>
              {players.length === 0 ? <p style={{ color: '#fff' }}>Hakuna wachezaji bado</p> : (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {players.map(player => (
                    <li key={player.id} style={{ background: 'rgba(255,255,255,0.04)', color: '#fff', borderRadius: 8, padding: 16, marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <b style={{ color: '#a3e635', fontSize: 18 }}>{player.name}</b>
                        <div style={{ fontSize: 14, color: '#fff', opacity: 0.8 }}>#{player.number} | Nafasi: {player.position}</div>
                      </div>
                      <button onClick={() => handleDeletePlayer(player.id)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }} title="Futa Mchezaji"><Trash2 size={20} /></button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div style={{ background: 'rgba(30,41,59,0.7)', borderRadius: 16, padding: 24, marginBottom: 32, boxShadow: '0 4px 32px 0 rgba(163,230,53,0.10)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <h2 style={{ color: '#a3e635', fontSize: 22, marginBottom: 16 }}>Matukio</h2>
            <form onSubmit={handleRecordEvent} style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
              <select value={selectedMatch} onChange={e => setSelectedMatch(e.target.value)} required
                style={{ background: 'rgba(30,41,59,0.9)', color: '#a3e635', border: '1.5px solid #a3e635', borderRadius: 8, padding: 12, fontSize: 16, flex: 1, minWidth: 180 }}>
                <option value="">Chagua Mechi...</option>
                {matches.map(match => <option key={match.id} value={match.id}>{match.homeTeam || 'Team A'} vs {match.awayTeam || 'Team B'}</option>)}
              </select>
              <select value={selectedPlayer} onChange={e => setSelectedPlayer(e.target.value)} required disabled={!selectedMatch}
                style={{ background: 'rgba(30,41,59,0.9)', color: '#a3e635', border: '1.5px solid #a3e635', borderRadius: 8, padding: 12, fontSize: 16, flex: 1, minWidth: 180, opacity: selectedMatch ? 1 : 0.5 }}>
                <option value="">Chagua Mchezaji...</option>
                {selectedMatch && players.map(player => <option key={player.id} value={player.id}>{player.number} - {player.name}</option>)}
              </select>
              <select value={selectedAction} onChange={e => setSelectedAction(e.target.value)} required
                style={{ background: 'rgba(30,41,59,0.9)', color: '#a3e635', border: '1.5px solid #a3e635', borderRadius: 8, padding: 12, fontSize: 16, flex: 1, minWidth: 120 }}>
                <option value="goal">⚽ Goal</option>
                <option value="yellow">🟨 Yellow</option>
                <option value="red">🟥 Red</option>
              </select>
              <button type="submit" style={{ background: '#a3e635', color: '#0f172a', border: 'none', borderRadius: 8, padding: '12px 20px', fontWeight: 'bold', fontSize: 16, cursor: 'pointer', minWidth: 120 }}>Hifadhi Tukio</button>
            </form>
            <div style={{ color: '#a3e635', fontWeight: 600, marginBottom: 16 }}>{message}</div>
            <div style={{ marginTop: 24 }}>
              <h3 style={{ color: '#a3e635', fontSize: 18, marginBottom: 8 }}>Magoli</h3>
              {Array.isArray(matches) && matches.length > 0 && matches.some(m => m.goals && m.goals.length > 0) ? (
                matches.map(match =>
                  match.goals && match.goals.length > 0 ? (
                    <div key={match.id} style={{ marginBottom: 12 }}>
                      {match.goals.map(goal => {
                        const player = players.find(p => p.id === goal.playerId);
                        return (
                          <div key={goal.id} style={{ background: 'rgba(163,230,53,0.08)', border: '1px solid #a3e635', borderRadius: 8, padding: 10, marginBottom: 6, color: '#fff' }}>
                            <b style={{ color: '#a3e635' }}>⚽ {player?.name || 'Unknown'}</b>
                            <span style={{ marginLeft: 8, fontSize: 13, color: '#fff', opacity: 0.7 }}>#{player?.number || 'N/A'} - {new Date(goal.timestamp).toLocaleString()}</span>
                          </div>
                        );
                      })}
                    </div>
                  ) : null
                )
              ) : <p style={{ color: '#fff' }}>Hakuna magoli bado</p>}
              <h3 style={{ color: '#a3e635', fontSize: 18, margin: '24px 0 8px' }}>Kadi</h3>
              {Array.isArray(matches) && matches.length > 0 && matches.some(m => m.cards && m.cards.length > 0) ? (
                matches.map(match =>
                  match.cards && match.cards.length > 0 ? (
                    <div key={match.id} style={{ marginBottom: 12 }}>
                      {match.cards.map(card => {
                        const player = players.find(p => p.id === card.playerId);
                        const cardColor = card.cardType === 'yellow' ? '#facc15' : '#ef4444';
                        return (
                          <div key={card.id} style={{ background: 'rgba(255,255,255,0.08)', border: `1.5px solid ${cardColor}`, borderRadius: 8, padding: 10, marginBottom: 6, color: cardColor }}>
                            <b>{card.cardType === 'yellow' ? '🟨' : '🟥'} {player?.name || 'Unknown'}</b>
                            <span style={{ marginLeft: 8, fontSize: 13, color: '#fff', opacity: 0.7 }}>#{player?.number || 'N/A'} - {new Date(card.timestamp).toLocaleString()}</span>
                          </div>
                        );
                      })}
                    </div>
                  ) : null
                )
              ) : <p style={{ color: '#fff' }}>Hakuna kadi bado</p>}
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div style={{ background: 'rgba(30,41,59,0.7)', borderRadius: 16, padding: 24, marginBottom: 32, boxShadow: '0 4px 32px 0 rgba(163,230,53,0.10)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <h2 style={{ color: '#a3e635', fontSize: 22, marginBottom: 16 }}>Ripoti na Takwimu</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 15, marginBottom: 20 }}>
              <div style={{ background: 'rgba(59,130,246,0.13)', padding: 20, borderRadius: 12, borderLeft: '4px solid #3b82f6', color: 'white' }}>
                <p style={{ margin: 0, fontSize: 12, color: '#a3e635' }}>Timu Jumla</p>
                <h2 style={{ margin: '8px 0 0', fontSize: 32, fontWeight: 'bold', color: '#a3e635' }}>{teams.length}</h2>
              </div>
              <div style={{ background: 'rgba(16,185,129,0.13)', padding: 20, borderRadius: 12, borderLeft: '4px solid #10b981', color: 'white' }}>
                <p style={{ margin: 0, fontSize: 12, color: '#a3e635' }}>Wachezaji Jumla</p>
                <h2 style={{ margin: '8px 0 0', fontSize: 32, fontWeight: 'bold', color: '#a3e635' }}>{players.length}</h2>
              </div>
              <div style={{ background: '#fef3c7', padding: 20, borderRadius: 8, borderLeft: '4px solid #f59e0b' }}>
                <p style={{ margin: 0, fontSize: 12, color: '#666' }}>Mechi Jumla</p>
                <h2 style={{ margin: '8px 0 0', fontSize: 32, fontWeight: 'bold' }}>{matches.length}</h2>
              </div>
            </div>
            <button onClick={generateReport} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: '#667eea', color: 'white', border: 'none', borderRadius: 8, fontWeight: 'bold', cursor: 'pointer' }}>
              <Download size={16} /> Pakua Ripoti
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
