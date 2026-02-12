// 🧠 AI STATS ENGINE - Automatic calculations & insights
export const StatsEngine = {
  // Calculate top scorers
  getTopScorers: (matches, players) => {
    const scorers = {};
    matches.forEach(match => {
      if (match.goals) {
        match.goals.forEach(goal => {
          scorers[goal.playerName] = (scorers[goal.playerName] || 0) + 1;
        });
      }
    });
    return Object.entries(scorers)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([name, goals], idx) => ({ rank: idx + 1, name, goals }));
  },

  // Calculate team standings
  calculateStandings: (matches) => {
    const standings = {};
    
    matches.forEach(match => {
      if (!standings[match.homeTeam]) {
        standings[match.homeTeam] = { team: match.homeTeam, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 };
      }
      if (!standings[match.awayTeam]) {
        standings[match.awayTeam] = { team: match.awayTeam, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 };
      }

      if (match.status === 'FINAL' && match.score) {
        const [homeGoals, awayGoals] = match.score.split('-').map(Number);
        
        // Update stats
        standings[match.homeTeam].p++;
        standings[match.awayTeam].p++;
        standings[match.homeTeam].gf += homeGoals;
        standings[match.homeTeam].ga += awayGoals;
        standings[match.awayTeam].gf += awayGoals;
        standings[match.awayTeam].ga += homeGoals;

        if (homeGoals > awayGoals) {
          standings[match.homeTeam].w++;
          standings[match.homeTeam].pts += 3;
          standings[match.awayTeam].l++;
        } else if (awayGoals > homeGoals) {
          standings[match.awayTeam].w++;
          standings[match.awayTeam].pts += 3;
          standings[match.homeTeam].l++;
        } else {
          standings[match.homeTeam].d++;
          standings[match.homeTeam].pts += 1;
          standings[match.awayTeam].d++;
          standings[match.awayTeam].pts += 1;
        }
      }
    });

    return Object.values(standings)
      .map(t => ({ ...t, gd: t.gf - t.ga }))
      .sort((a, b) => {
        if (b.pts !== a.pts) return b.pts - a.pts;
        return (b.gf - b.ga) - (a.gf - a.ga);
      });
  },

  // Player performance metrics
  getPlayerStats: (matches, playerName) => {
    let goals = 0, assists = 0, cards = 0;
    matches.forEach(match => {
      if (match.goals) {
        goals += match.goals.filter(g => g.playerName === playerName).length;
      }
      if (match.assists) {
        assists += match.assists.filter(a => a.playerName === playerName).length;
      }
      if (match.cards) {
        cards += match.cards.filter(c => c.playerName === playerName).length;
      }
    });
    return { goals, assists, cards };
  },

  // Auto-generate insights
  generateInsights: (standings, matches) => {
    const insights = [];
    
    if (standings.length > 0) {
      insights.push(`🏆 ${standings[0].team} inanangoja kwa ${standings[0].pts} pointi`);
    }
    
    const totalMatches = matches.filter(m => m.status === 'FINAL').length;
    const avgGoals = matches
      .filter(m => m.status === 'FINAL' && m.score)
      .reduce((sum, m) => {
        const [h, a] = m.score.split('-').map(Number);
        return sum + h + a;
      }, 0) / Math.max(totalMatches, 1);
    
    if (avgGoals) {
      insights.push(`⚽ Wastani wa${avgGoals.toFixed(1)} magoli kwa mechi`);
    }
    
    const topTeam = standings[0];
    if (topTeam) {
      insights.push(`📈 ${topTeam.team} ina kiwango cha ${((topTeam.w / topTeam.p) * 100).toFixed(1)}% ushindi`);
    }

    return insights;
  }
};
