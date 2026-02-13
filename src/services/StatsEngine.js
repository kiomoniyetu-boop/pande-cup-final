// 🧠 Pande Cup AI Stats Engine (v2.0)
// Powered by Algorithmic Intelligence for deep insights

export const StatsEngine = {
  
  // 1. 📊 ADVANCED STANDINGS (With Form Guide & H2H Logic)
  calculateStandings: (matches) => {
    const standings = {};

    // Sort matches by date first to ensure Form Guide is accurate
    const sortedMatches = [...matches].sort((a, b) => new Date(a.matchDate) - new Date(b.matchDate));

    sortedMatches.forEach(match => {
      // Initialize Team Objects if not exist
      [match.homeTeam, match.awayTeam].forEach(team => {
        if (team && !standings[team]) {
          standings[team] = { 
            team: team, 
            p: 0, w: 0, d: 0, l: 0, 
            gf: 0, ga: 0, gd: 0, pts: 0,
            form: [], // Stores last 5 results: 'W', 'D', 'L'
            cleanSheets: 0
          };
        }
      });

      // Process only VALID and FINAL matches
      const isFinal = match.score && (match.score.includes('-') || match.score.includes(':')) && !match.score.toUpperCase().includes('VS');
      
      if (isFinal) {
        const parts = match.score.includes('-') ? match.score.split('-') : match.score.split(':');
        const homeGoals = parseInt(parts[0]);
        const awayGoals = parseInt(parts[1]);

        if (!isNaN(homeGoals) && !isNaN(awayGoals)) {
          // Update Games Played
          standings[match.homeTeam].p++;
          standings[match.awayTeam].p++;

          // Update Goals
          standings[match.homeTeam].gf += homeGoals;
          standings[match.homeTeam].ga += awayGoals;
          standings[match.awayTeam].gf += awayGoals;
          standings[match.awayTeam].ga += homeGoals;

          // Update Clean Sheets
          if (awayGoals === 0) standings[match.homeTeam].cleanSheets++;
          if (homeGoals === 0) standings[match.awayTeam].cleanSheets++;

          // Determine Result & Update Form
          if (homeGoals > awayGoals) {
            // Home Win
            standings[match.homeTeam].w++;
            standings[match.homeTeam].pts += 3;
            standings[match.homeTeam].form.push('W');
            standings[match.awayTeam].l++;
            standings[match.awayTeam].form.push('L');
          } else if (awayGoals > homeGoals) {
            // Away Win
            standings[match.awayTeam].w++;
            standings[match.awayTeam].pts += 3;
            standings[match.awayTeam].form.push('W');
            standings[match.homeTeam].l++;
            standings[match.homeTeam].form.push('L');
          } else {
            // Draw
            standings[match.homeTeam].d++;
            standings[match.homeTeam].pts += 1;
            standings[match.homeTeam].form.push('D');
            standings[match.awayTeam].d++;
            standings[match.awayTeam].pts += 1;
            standings[match.awayTeam].form.push('D');
          }
        }
      }
    });

    // Convert to Array, Calculate GD, Slice Form, and Sort
    return Object.values(standings)
      .map(t => ({
        ...t,
        gd: t.gf - t.ga,
        formGuide: t.form.slice(-5).join('') // Get last 5 games string e.g. "WWDLW"
      }))
      .sort((a, b) => {
        // Priority 1: Points
        if (b.pts !== a.pts) return b.pts - a.pts;
        // Priority 2: Goal Difference
        if (b.gd !== a.gd) return b.gd - a.gd;
        // Priority 3: Goals For (Attacking strength)
        return b.gf - a.gf;
      });
  },

  // 2. 👟 INTELLIGENT TOP SCORERS (Safeguarded against missing data)
  getTopScorers: (matches) => {
    const scorers = {};
    
    // Check if matches actually contain event data (goals array)
    // CMS structure might not always have detailed events, so we handle safely
    matches.forEach(match => {
      // Assume match.events or match.goals might exist from a rich CMS
      const events = match.goals || []; 
      
      events.forEach(goal => {
        if (goal.playerName) {
          scorers[goal.playerName] = (scorers[goal.playerName] || 0) + 1;
        }
      });
    });

    return Object.entries(scorers)
      .sort((a, b) => b[1] - a[1]) // Sort highest goals first
      .slice(0, 10)
      .map(([name, goals], idx) => ({ rank: idx + 1, name, goals }));
  },

  // 3. 🧠 AI NARRATIVE GENERATOR (Contextual Insights)
  generateAIInsights: (standings, matches) => {
    const insights = [];
    if (!standings || standings.length === 0) return ["Ligi bado changa, data zinakusanywa..."];

    const topTeam = standings[0];
    const totalMatches = matches.filter(m => m.score && (m.score.includes('-') || m.score.includes(':'))).length;

    // Insight 1: League Leader Dominance
    if (topTeam.pts > 0) {
      const winRate = ((topTeam.w / Math.max(topTeam.p, 1)) * 100).toFixed(0);
      insights.push(`🔥 **${topTeam.team}** ndio wababe wa ligi kwa sasa wakiwa na pointi ${topTeam.pts} na ushindi wa asilimia ${winRate}%.`);
    }

    // Insight 2: Goal Scoring Trend
    let totalGoals = 0;
    standings.forEach(t => totalGoals += t.gf);
    const avgGoals = (totalGoals / Math.max(totalMatches, 1)).toFixed(2);
    
    if (avgGoals > 2.5) {
      insights.push(`⚽ Hii ni ligi ya magoli! Wastani wa magoli **${avgGoals}** kwa kila mechi unaonyesha washambuliaji wako moto.`);
    } else if (avgGoals > 0) {
      insights.push(`🛡️ Ligi ina ushindani mkali wa kiulinzi, wastani wa magoli ukiwa **${avgGoals}** kwa mechi.`);
    }

    // Insight 3: Defensive Rock (Clean Sheet Master)
    const defensiveMaster = [...standings].sort((a, b) => b.cleanSheets - a.cleanSheets)[0];
    if (defensiveMaster && defensiveMaster.cleanSheets > 1) {
      insights.push(`🧱 **${defensiveMaster.team}** wana ukuta mgumu zaidi, wakiwa na 'Clean Sheets' ${defensiveMaster.cleanSheets}.`);
    }

    // Insight 4: The Unbeaten Run (Invincibles)
    const unbeatenTeams = standings.filter(t => t.l === 0 && t.p > 2);
    if (unbeatenTeams.length > 0) {
      const names = unbeatenTeams.map(t => t.team).join(' na ');
      insights.push(`🚀 **${names}** bado hawajapoteza mchezo hata mmoja msimu huu.`);
    }

    return insights;
  },

  // 4. 🔮 WIN PROBABILITY CALCULATOR (Simple Predictive Logic)
  // Calculates win chance based on points per game (PPG)
  predictMatch: (homeTeamName, awayTeamName, standings) => {
    const home = standings.find(t => t.team === homeTeamName);
    const away = standings.find(t => t.team === awayTeamName);

    if (!home || !away || home.p === 0 || away.p === 0) {
      return { home: 33, draw: 34, away: 33, text: "Mechi ngumu kutabiri." };
    }

    // Points Per Game
    const homePPG = home.pts / home.p;
    const awayPPG = away.pts / away.p;
    
    // Home advantage weight (standard football metric ~1.2x)
    const homeStrength = homePPG * 1.2;
    const awayStrength = awayPPG;
    const total = homeStrength + awayStrength;

    const homeProb = Math.round((homeStrength / total) * 100);
    const awayProb = Math.round((awayStrength / total) * 100);
    
    // Cap probability to handle draw chance
    const drawChance = 25; // Base draw chance
    const adjustedHome = Math.round(homeProb * 0.75);
    const adjustedAway = Math.round(awayProb * 0.75);
    const adjustedDraw = 100 - (adjustedHome + adjustedAway);

    let predictionText = "Mechi yenye ushindani.";
    if (adjustedHome > 55) predictionText = `${homeTeamName} wana nafasi kubwa ya kushinda nyumbani.`;
    if (adjustedAway > 55) predictionText = `${awayTeamName} wanaonekana kuwa na nguvu zaidi ugenini.`;

    return {
      home: adjustedHome,
      draw: adjustedDraw,
      away: adjustedAway,
      text: predictionText
    };
  }
};