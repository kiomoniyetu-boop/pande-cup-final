// 🎮 ADMIN DATA SERVICE - Team & Match Management

// Simple unique ID generator for testing
function uuidv4() {
  return 'id-' + Math.random().toString(36).substr(2, 16);
}

const STORAGE_KEY = 'pande_cup_admin_data';

const defaultData = {
  teams: [],
  players: [],
  matches: [],
  goals: [],
  cards: []
};

export const AdminService = {
  // Initialize local storage
  initialize: () => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
    }
  },

  getData: () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || defaultData;
    } catch {
      return defaultData;
    }
  },

  saveData: (data) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },

  // TEAMS
  addTeam: (teamData) => {
    const data = AdminService.getData();
    const newTeam = {
      id: uuidv4(),
      ...teamData,
      createdAt: new Date(),
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
      data.teams[teamIndex] = { ...data.teams[teamIndex], ...updates };
      AdminService.saveData(data);
      return data.teams[teamIndex];
    }
    return null;
  },

  deleteTeam: (teamId) => {
    const data = AdminService.getData();
    data.teams = data.teams.filter(t => t.id !== teamId);
    data.players = data.players.filter(p => p.teamId !== teamId);
    AdminService.saveData(data);
  },

  // PLAYERS
  addPlayer: (teamId, playerData) => {
    const data = AdminService.getData();
    const newPlayer = {
      id: uuidv4(),
      teamId,
      ...playerData,
      goals: 0,
      assists: 0,
      matches: 0
    };
    data.players.push(newPlayer);
    const team = data.teams.find(t => t.id === teamId);
    if (team) {
      team.players = team.players || [];
      team.players.push(newPlayer.id);
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
    AdminService.saveData(data);
  },

  getTeamPlayers: (teamId) => {
    const data = AdminService.getData();
    return data.players.filter(p => p.teamId === teamId);
  },

  // MATCHES
  createMatch: (matchData) => {
    const data = AdminService.getData();
    const newMatch = {
      id: uuidv4(),
      ...matchData,
      status: 'SCHEDULED',
      createdAt: new Date(),
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
      ...goalData,
      timestamp: new Date()
    };
    data.goals.push(goal);
    const match = data.matches.find(m => m.id === matchId);
    if (match) {
      match.goals = match.goals || [];
      match.goals.push(goal);
    }
    AdminService.saveData(data);
    return goal;
  },

  recordCard: (matchId, cardData) => {
    const data = AdminService.getData();
    const card = {
      id: uuidv4(),
      matchId,
      ...cardData,
      timestamp: new Date()
    };
    data.cards.push(card);
    const match = data.matches.find(m => m.id === matchId);
    if (match) {
      match.cards = match.cards || [];
      match.cards.push(card);
    }
    AdminService.saveData(data);
    return card;
  },

  updateMatchScore: (matchId, homeScore, awayScore, status = 'FINAL') => {
    const data = AdminService.getData();
    const match = data.matches.find(m => m.id === matchId);
    if (match) {
      match.score = `${homeScore}-${awayScore}`;
      match.status = status;
      AdminService.saveData(data);
      return match;
    }
    return null;
  },

  // REPORTS
  generateReport: (type = 'full') => {
    const data = AdminService.getData();
    
    const report = {
      generatedAt: new Date(),
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
        players: data.players.filter(p => p.teamId === t.id).length,
        matches: data.matches.filter(m => m.homeTeam === t.name || m.awayTeam === t.name).length
      }));
    }

    return report;
  }
};

const getPaymentReport = () => {
  const payments = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('payment_')) {
      payments.push(JSON.parse(localStorage.getItem(key)));
    }
  }
  return payments;
};
