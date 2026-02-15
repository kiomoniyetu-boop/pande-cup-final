// 🎮 PANDE CUP ADMIN DATA SERVICE (v3.0) - Team & Match Management
// Inatumia LocalStorage kwa sasa (Testing Phase)

// Simple unique ID generator for testing
function uuidv4() {
  return 'id-' + Math.random().toString(36).substr(2, 16);
}

const STORAGE_KEY = 'pande_cup_admin_data';

// Muundo wa Data zetu (Schema)
const defaultData = {
  teams: [],
  players: [],
  matches: [],
  goals: [],
  cards: []
};

export const AdminService = {
  // 1. INITIALIZE: Washa mtambo wa Database
  initialize: () => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
      }
    } catch (e) {
      console.warn("Storage access denied or full:", e);
    }
  },

  // 2. GET DATA: Vuta mzigo wote
  getData: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : defaultData;
    } catch (e) {
      console.error("Error parsing admin data:", e);
      return defaultData;
    }
  },

  // 3. SAVE DATA: Hifadhi mzigo
  saveData: (data) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error("Error saving admin data. Storage might be full:", e);
    }
  },

  // ==========================================
  // 🛡️ TIMU (TEAMS) MANAGEMENT
  // ==========================================
  addTeam: (teamData) => {
    const data = AdminService.getData();
    const newTeam = {
      id: uuidv4(),
      ...teamData,
      createdAt: new Date().toISOString(), // Tumia ISO string kwa usalama wa tarehe
      players: []
    };
    data.teams.push(newTeam);
    AdminService.saveData(data);
    return newTeam;
  },

  updateTeam: (teamId, updates) => {
    const data = AdminService.getData();
    const teamIndex = data.teams.findIndex(t => t.id === teamId);
    if (teamIndex !== -1) {
      data.teams[teamIndex] = { ...data.teams[teamIndex], ...updates, updatedAt: new Date().toISOString() };
      AdminService.saveData(data);
      return data.teams[teamIndex];
    }
    return null;
  },

  deleteTeam: (teamId) => {
    const data = AdminService.getData();
    // Futa timu na wachezaji wake wote (Cascade Delete)
    data.teams = data.teams.filter(t => t.id !== teamId);
    data.players = data.players.filter(p => p.teamId !== teamId);
    AdminService.saveData(data);
  },

  // ==========================================
  // 🏃‍♂️ WACHEZAJI (PLAYERS) MANAGEMENT
  // ==========================================
  addPlayer: (teamId, playerData) => {
    const data = AdminService.getData();
    const newPlayer = {
      id: uuidv4(),
      teamId,
      ...playerData,
      goals: 0,
      assists: 0,
      matches: 0,
      registeredAt: new Date().toISOString()
    };
    
    data.players.push(newPlayer);
    
    // Update team roster
    const teamIndex = data.teams.findIndex(t => t.id === teamId);
    if (teamIndex !== -1) {
      data.teams[teamIndex].players = data.teams[teamIndex].players || [];
      data.teams[teamIndex].players.push(newPlayer.id);
    }
    
    AdminService.saveData(data);
    return newPlayer;
  },

  updatePlayer: (playerId, updates) => {
    const data = AdminService.getData();
    const playerIndex = data.players.findIndex(p => p.id === playerId);
    if (playerIndex !== -1) {
      data.players[playerIndex] = { ...data.players[playerIndex], ...updates };
      AdminService.saveData(data);
      return data.players[playerIndex];
    }
    return null;
  },

  deletePlayer: (playerId) => {
    const data = AdminService.getData();
    data.players = data.players.filter(p => p.id !== playerId);
    // Hapa tunaweza pia kuondoa ID ya mchezaji kwenye array ya timu kama tunataka usafi wa 100%
    AdminService.saveData(data);
  },

  getTeamPlayers: (teamId) => {
    const data = AdminService.getData();
    return data.players.filter(p => p.teamId === teamId);
  },

  // ==========================================
  // ⚽ MECHI (MATCHES) & MATUKIO
  // ==========================================
  createMatch: (matchData) => {
    const data = AdminService.getData();
    const newMatch = {
      id: uuidv4(),
      ...matchData,
      status: 'SCHEDULED', // SCHEDULED, LIVE, FINAL
      score: 'VS',
      createdAt: new Date().toISOString(),
      goals: [],
      cards: []
    };
    data.matches.push(newMatch);
    AdminService.saveData(data);
    return newMatch;
  },

  recordGoal: (matchId, goalData) => {
    const data = AdminService.getData();
    const goal = {
      id: uuidv4(),
      matchId,
      ...goalData, // inategemewa iwe na { playerId, teamId, minute }
      timestamp: new Date().toISOString()
    };
    
    data.goals.push(goal);
    
    // Weka goli kwenye mechi husika
    const matchIndex = data.matches.findIndex(m => m.id === matchId);
    if (matchIndex !== -1) {
      data.matches[matchIndex].goals = data.matches[matchIndex].goals || [];
      data.matches[matchIndex].goals.push(goal);
    }
    
    AdminService.saveData(data);
    return goal;
  },

  recordCard: (matchId, cardData) => {
    const data = AdminService.getData();
    const card = {
      id: uuidv4(),
      matchId,
      ...cardData, // { playerId, type: 'YELLOW'/'RED', minute }
      timestamp: new Date().toISOString()
    };
    data.cards.push(card);
    
    const matchIndex = data.matches.findIndex(m => m.id === matchId);
    if (matchIndex !== -1) {
      data.matches[matchIndex].cards = data.matches[matchIndex].cards || [];
      data.matches[matchIndex].cards.push(card);
    }
    
    AdminService.saveData(data);
    return card;
  },

  updateMatchScore: (matchId, homeScore, awayScore, status = 'FINAL') => {
    const data = AdminService.getData();
    const matchIndex = data.matches.findIndex(m => m.id === matchId);
    if (matchIndex !== -1) {
      data.matches[matchIndex].score = `${homeScore}-${awayScore}`;
      data.matches[matchIndex].status = status;
      AdminService.saveData(data);
      return data.matches[matchIndex];
    }
    return null;
  },

  // ==========================================
  // 📈 RIPOTI (REPORTS GENERATION)
  // ==========================================
  generateReport: (type = 'full') => {
    const data = AdminService.getData();
    
    const report = {
      generatedAt: new Date().toISOString(),
      type,
      summary: {
        totalTeams: data.teams.length,
        totalPlayers: data.players.length,
        totalMatches: data.matches.length,
        completedMatches: data.matches.filter(m => m.status === 'FINAL').length
      }
    };

    if (type === 'full' || type === 'financial') {
      report.payments = getPaymentReport();
    }

    if (type === 'full' || type === 'standings') {
      report.standings = data.teams.map(t => ({
        team: t.name,
        playersCount: data.players.filter(p => p.teamId === t.id).length,
        matchesPlayed: data.matches.filter(m => (m.homeTeam === t.name || m.awayTeam === t.name) && m.status === 'FINAL').length
      }));
    }

    return report;
  }
};

// Internal function kuvuta payment logs kama zipo kwenye LocalStorage
const getPaymentReport = () => {
  const payments = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('payment_')) {
        payments.push(JSON.parse(localStorage.getItem(key)));
      }
    }
  } catch (e) {
    console.error("Error reading payments:", e);
  }
  return payments;
};