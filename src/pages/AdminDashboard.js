import React, { useState, useEffect } from 'react';
import { Lock, LogOut, Plus, Edit, Trash2, BarChart3, Download, AlertCircle, CheckCircle, Users, Trophy, Zap, Target, Activity } from 'lucide-react';
import { AdminService } from '../services/AdminService';
import { StatsEngine } from '../services/StatsEngine';

const AdminDashboard = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('teams');
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [events, setEvents] = useState([]);
  const [newTeam, setNewTeam] = useState({ name: '', coachName: '', phone: '' });
  const [newPlayer, setNewPlayer] = useState({ name: '', position: '', number: '' });
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [selectedAction, setSelectedAction] = useState('goal');
  const [message, setMessage] = useState('');

  const ADMIN_PASSWORD = 'pandecup2024'; // Change this to your actual password

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
      setMessage('✅ Mchezaji imeongezwa');
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
      setMessage('🗑️ Mchezaji imeondolewa');
    }
  };

  const handleRecordEvent = (e) => {
    e.preventDefault();
    if (selectedMatch && selectedPlayer && selectedAction) {
      const eventData = {
        matchId: selectedMatch,
        playerId: selectedPlayer,
        action: selectedAction,
        timestamp: new Date()
      };

      if (selectedAction === 'goal') {
        AdminService.recordGoal(selectedMatch, { playerId: selectedPlayer });
      } else if (selectedAction === 'yellow') {
        AdminService.recordCard(selectedMatch, { playerId: selectedPlayer, cardType: 'yellow' });
      } else if (selectedAction === 'red') {
        AdminService.recordCard(selectedMatch, { playerId: selectedPlayer, cardType: 'red' });
      }

      const data = AdminService.getData();
      setEvents(data.events || []);
      setSelectedMatch(null);
      setSelectedPlayer(null);
      setSelectedAction('goal');
      setMessage(`✅ Tukio limerekodi: ${selectedAction.toUpperCase()}`);
      setTimeout(() => setMessage(''), 3000);
    }
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

  // Login UI
  if (!authenticated) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ background: 'white', borderRadius: '16px', padding: '40px', width: '100%', maxWidth: '400px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <Lock size={48} style={{ color: '#667eea', marginBottom: '16px' }} />
            <h1 style={{ fontSize: '24px', fontWeight: '900', margin: '0 0 8px' }}>PANDE CUP ADMIN</h1>
            <p style={{ color: '#666', margin: 0 }}>Kiungo cha Kufanya Kazi</p>
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
                border: '2px solid #e0e0e0',
                fontSize: '16px',
                marginBottom: '16px',
                boxSizing: 'border-box'
              }}
              autoFocus
            />
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '14px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              INGIA
            </button>
          </form>

          {message && (
            <div style={{ marginTop: '16px', padding: '12px', background: '#fff3cd', borderRadius: '8px', color: '#856404', textAlign: 'center' }}>
              {message}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Dashboard UI
  return (
    <div style={{ minHeight: '100vh', background: '#f5f7fa', padding: '20px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '900', margin: 0 }}>📊 PANDE CUP ADMIN</h1>
          <button
            onClick={() => setAuthenticated(false)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            <LogOut size={16} /> TOKA
          </button>
        </div>

        {message && (
          <div style={{ marginBottom: '20px', padding: '16px', background: message.includes('✅') ? '#d1fae5' : '#fee2e2', borderLeft: '4px solid ' + (message.includes('✅') ? '#10b981' : '#ef4444'), borderRadius: '8px', color: message.includes('✅') ? '#047857' : '#7f1d1d' }}>
            {message}
          </div>
        )}

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', background: 'white', padding: '10px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          {['teams', 'players', 'events', 'reports'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '10px 20px',
                background: activeTab === tab ? '#667eea' : '#f3f4f6',
                color: activeTab === tab ? 'white' : '#374151',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold',
                textTransform: 'capitalize'
              }}
            >
              {tab === 'teams' && <Users size={16} style={{ display: 'inline', marginRight: '6px' }} />}
              {tab === 'players' && <Trophy size={16} style={{ display: 'inline', marginRight: '6px' }} />}
              {tab === 'events' && <Activity size={16} style={{ display: 'inline', marginRight: '6px' }} />}
              {tab === 'reports' && <BarChart3 size={16} style={{ display: 'inline', marginRight: '6px' }} />}
              {tab === 'events' ? 'Matokeo & Matukio' : tab}
            </button>
          ))}
        </div>

        {/* TEAMS TAB */}
        {activeTab === 'teams' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
            {/* Add Team Form */}
            <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
              <h3 style={{ marginTop: 0 }}>➕ ONGEZA TIMU</h3>
              <form onSubmit={handleAddTeam}>
                <input
                  type="text"
                  placeholder="Jina la Timu"
                  value={newTeam.name}
                  onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
                  style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '6px', border: '1px solid #ddd', boxSizing: 'border-box' }}
                />
                <input
                  type="text"
                  placeholder="Jina la Kocha"
                  value={newTeam.coachName}
                  onChange={(e) => setNewTeam({ ...newTeam, coachName: e.target.value })}
                  style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '6px', border: '1px solid #ddd', boxSizing: 'border-box' }}
                />
                <input
                  type="tel"
                  placeholder="Namba ya Simu"
                  value={newTeam.phone}
                  onChange={(e) => setNewTeam({ ...newTeam, phone: e.target.value })}
                  style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '6px', border: '1px solid #ddd', boxSizing: 'border-box' }}
                />
                <button type="submit" style={{ width: '100%', padding: '10px', background: '#10b981', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                  ONGEZA TIMU
                </button>
              </form>
            </div>

            {/* Teams List */}
            <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
              <h3 style={{ marginTop: 0 }}>📋 TIMU ZOTE</h3>
              {teams.length === 0 ? (
                <p style={{ color: '#999' }}>Hakuna timu bado</p>
              ) : (
                teams.map(team => (
                  <div key={team.id} style={{ padding: '12px', background: '#f9fafb', borderRadius: '8px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong>{team.name}</strong>
                      <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#666' }}>Kocha: {team.coachName}</p>
                    </div>
                    <button onClick={() => handleDeleteTeam(team.id)} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* PLAYERS TAB */}
        {activeTab === 'players' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
            {/* Add Player Form */}
            <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
              <h3 style={{ marginTop: 0 }}>➕ ONGEZA MCHEZAJI</h3>
              <select
                value={selectedTeam || ''}
                onChange={(e) => setSelectedTeam(e.target.value)}
                style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '6px', border: '1px solid #ddd', boxSizing: 'border-box' }}
              >
                <option value="">Chagua Timu</option>
                {teams.map(team => (
                  <option key={team.id} value={team.id}>{team.name}</option>
                ))}
              </select>
              <form onSubmit={handleAddPlayer}>
                <input
                  type="text"
                  placeholder="Jina la Mchezaji"
                  value={newPlayer.name}
                  onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
                  style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '6px', border: '1px solid #ddd', boxSizing: 'border-box' }}
                />
                <input
                  type="text"
                  placeholder="Nafasi (mfano: Mlinzi)"
                  value={newPlayer.position}
                  onChange={(e) => setNewPlayer({ ...newPlayer, position: e.target.value })}
                  style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '6px', border: '1px solid #ddd', boxSizing: 'border-box' }}
                />
                <input
                  type="number"
                  placeholder="Namba ya Jezi"
                  value={newPlayer.number}
                  onChange={(e) => setNewPlayer({ ...newPlayer, number: e.target.value })}
                  style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '6px', border: '1px solid #ddd', boxSizing: 'border-box' }}
                />
                <button type="submit" disabled={!selectedTeam} style={{ width: '100%', padding: '10px', background: selectedTeam ? '#10b981' : '#ccc', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: selectedTeam ? 'pointer' : 'not-allowed' }}>
                  ONGEZA MCHEZAJI
                </button>
              </form>
            </div>

            {/* Players List */}
            <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
              <h3 style={{ marginTop: 0 }}>👥 WACHEZAJI WOTE</h3>
              {players.length === 0 ? (
                <p style={{ color: '#999' }}>Hakuna wachezaji bado</p>
              ) : (
                players.map(player => (
                  <div key={player.id} style={{ padding: '12px', background: '#f9fafb', borderRadius: '8px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong>{player.number} - {player.name}</strong>
                      <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#666' }}>{player.position}</p>
                    </div>
                    <button onClick={() => handleDeletePlayer(player.id)} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* EVENTS TAB - MATOKEO & MATUKIO */}
        {activeTab === 'events' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
            {/* Event Logger Form */}
            <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
              <h3 style={{ marginTop: 0 }}>⚡ HIFADHI TUKIO</h3>
              <form onSubmit={handleRecordEvent}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '12px', color: '#666' }}>Chagua Mechi</label>
                <select
                  value={selectedMatch || ''}
                  onChange={(e) => setSelectedMatch(e.target.value)}
                  style={{ width: '100%', padding: '10px', marginBottom: '12px', borderRadius: '6px', border: '1px solid #ddd', boxSizing: 'border-box' }}
                >
                  <option value="">Chagua Mechi...</option>
                  {matches.map(match => (
                    <option key={match.id} value={match.id}>
                      {match.homeTeam || 'Team A'} vs {match.awayTeam || 'Team B'}
                    </option>
                  ))}
                </select>

                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '12px', color: '#666' }}>Chagua Mchezaji</label>
                <select
                  value={selectedPlayer || ''}
                  onChange={(e) => setSelectedPlayer(e.target.value)}
                  disabled={!selectedMatch}
                  style={{ width: '100%', padding: '10px', marginBottom: '12px', borderRadius: '6px', border: '1px solid #ddd', boxSizing: 'border-box', opacity: selectedMatch ? 1 : 0.5 }}
                >
                  <option value="">Chagua Mchezaji...</option>
                  {selectedMatch && players.map(player => (
                    <option key={player.id} value={player.id}>
                      {player.number} - {player.name}
                    </option>
                  ))}
                </select>

                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '12px', color: '#666' }}>Aina ya Tukio</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '12px' }}>
                  <button
                    type="button"
                    onClick={() => setSelectedAction('goal')}
                    style={{
                      padding: '10px',
                      background: selectedAction === 'goal' ? '#10b981' : '#f3f4f6',
                      color: selectedAction === 'goal' ? 'white' : '#374151',
                      border: 'none',
                      borderRadius: '6px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    ⚽ GOAL
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedAction('yellow')}
                    style={{
                      padding: '10px',
                      background: selectedAction === 'yellow' ? '#f59e0b' : '#f3f4f6',
                      color: selectedAction === 'yellow' ? 'white' : '#374151',
                      border: 'none',
                      borderRadius: '6px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    🟨 YELLOW
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedAction('red')}
                    style={{
                      padding: '10px',
                      background: selectedAction === 'red' ? '#ef4444' : '#f3f4f6',
                      color: selectedAction === 'red' ? 'white' : '#374151',
                      border: 'none',
                      borderRadius: '6px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    🟥 RED
                  </button>
                </div>

                <button 
                  type="submit" 
                  disabled={!selectedMatch || !selectedPlayer}
                  style={{ 
                    width: '100%', 
                    padding: '12px', 
                    background: (selectedMatch && selectedPlayer) ? '#667eea' : '#ccc', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '6px', 
                    fontWeight: 'bold', 
                    cursor: (selectedMatch && selectedPlayer) ? 'pointer' : 'not-allowed',
                    fontSize: '14px'
                  }}
                >
                  HIFADHI TUKIO
                </button>
              </form>
            </div>

            {/* Events Log */}
            <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
              <h3 style={{ marginTop: 0 }}>📝 TUKIO ZOTE</h3>
              {/* Goals Section */}
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: '700', color: '#666', textTransform: 'uppercase' }}>⚽ MAGOLI</h4>
                {Array.isArray(matches) && matches.length > 0 && matches.some(m => m.goals && m.goals.length > 0) ? (
                  matches.map(match => 
                    match.goals && match.goals.length > 0 ? (
                      <div key={match.id}>
                        {match.goals.map(goal => {
                          const player = players.find(p => p.id === goal.playerId);
                          return (
                            <div key={goal.id} style={{ padding: '10px', background: '#f0fdf4', border: '1px solid #dbeafe', borderRadius: '6px', marginBottom: '8px', fontSize: '13px' }}>
                              <strong>⚽ {player?.name || 'Unknown'}</strong>
                              <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#666' }}>#{player?.number || 'N/A'} - {new Date(goal.timestamp).toLocaleString()}</p>
                            </div>
                          );
                        })}
                      </div>
                    ) : null
                  )
                ) : (
                  <p style={{ color: '#999', fontSize: '12px' }}>Hakuna magoli bado</p>
                )}
              </div>

              {/* Cards Section */}
              <div>
                <h4 style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: '700', color: '#666', textTransform: 'uppercase' }}>📋 KADI</h4>
                {Array.isArray(matches) && matches.length > 0 && matches.some(m => m.cards && m.cards.length > 0) ? (
                  matches.map(match =>
                    match.cards && match.cards.length > 0 ? (
                      <div key={match.id}>
                        {match.cards.map(card => {
                          const player = players.find(p => p.id === card.playerId);
                          const cardColor = card.cardType === 'yellow' ? '#fef3c7' : '#fee2e2';
                          const cardEmoji = card.cardType === 'yellow' ? '🟨' : '🟥';
                          return (
                            <div key={card.id} style={{ padding: '10px', background: cardColor, border: '1px solid #dbeafe', borderRadius: '6px', marginBottom: '8px', fontSize: '13px' }}>
                              <strong>{cardEmoji} {player?.name || 'Unknown'}</strong>
                              <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#666' }}>#{player?.number || 'N/A'} - {new Date(card.timestamp).toLocaleString()}</p>
                            </div>
                          );
                        })}
                      </div>
                    ) : null
                  )
                ) : (
                  <p style={{ color: '#999', fontSize: '12px' }}>Hakuna kadi bado</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* REPORTS TAB */}
        {activeTab === 'reports' && (
          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            <h3 style={{ marginTop: 0 }}>📊 RIPOTI NA TAKWIMU</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '20px' }}>
              <div style={{ background: '#f0f9ff', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #3b82f6' }}>
                <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>TIMU JUMLA</p>
                <h2 style={{ margin: '8px 0 0', fontSize: '32px', fontWeight: 'bold' }}>{teams.length}</h2>
              </div>
              <div style={{ background: '#f0fdf4', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #10b981' }}>
                <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>WACHEZAJI JUMLA</p>
                <h2 style={{ margin: '8px 0 0', fontSize: '32px', fontWeight: 'bold' }}>{players.length}</h2>
              </div>
              <div style={{ background: '#fef3c7', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #f59e0b' }}>
                <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>MECHI JUMLA</p>
                <h2 style={{ margin: '8px 0 0', fontSize: '32px', fontWeight: 'bold' }}>{matches.length}</h2>
              </div>
            </div>
            <button onClick={generateReport} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: '#667eea', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
              <Download size={16} /> PAKUA RIPOTI
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
