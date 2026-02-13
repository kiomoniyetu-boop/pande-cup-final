// path: src/services/StatsEngine.js

// 🧠 Pande Cup AI Stats Engine (v3.0 - Mwakere Edition)
export const StatsEngine = {
  
  // 1. 📊 ADVANCED STANDINGS (Msimamo)
  calculateStandings: (matches) => {
    const standings = {};
    // Panga mechi kuanzia ya zamani kwenda mpya
    const sortedMatches = [...matches].sort((a, b) => new Date(a.matchDate) - new Date(b.matchDate));

    sortedMatches.forEach(match => {
      [match.homeTeam, match.awayTeam].forEach(team => {
        if (team && !standings[team]) {
          standings[team] = { 
            team: team, p: 0, w: 0, d: 0, l: 0, 
            gf: 0, ga: 0, gd: 0, pts: 0,
            form: [], cleanSheets: 0
          };
        }
      });

      const isFinal = match.score && (match.score.includes('-') || match.score.includes(':')) && !match.score.toUpperCase().includes('VS');
      
      if (isFinal) {
        const parts = match.score.includes('-') ? match.score.split('-') : match.score.split(':');
        const homeGoals = parseInt(parts[0]);
        const awayGoals = parseInt(parts[1]);

        if (!isNaN(homeGoals) && !isNaN(awayGoals)) {
          standings[match.homeTeam].p++;
          standings[match.awayTeam].p++;
          standings[match.homeTeam].gf += homeGoals;
          standings[match.homeTeam].ga += awayGoals;
          standings[match.awayTeam].gf += awayGoals;
          standings[match.awayTeam].ga += homeGoals;

          if (awayGoals === 0) standings[match.homeTeam].cleanSheets++;
          if (homeGoals === 0) standings[match.awayTeam].cleanSheets++;

          if (homeGoals > awayGoals) {
            standings[match.homeTeam].w++;
            standings[match.homeTeam].pts += 3;
            standings[match.homeTeam].form.push('W');
            standings[match.awayTeam].l++;
            standings[match.awayTeam].form.push('L');
          } else if (awayGoals > homeGoals) {
            standings[match.awayTeam].w++;
            standings[match.awayTeam].pts += 3;
            standings[match.awayTeam].form.push('W');
            standings[match.homeTeam].l++;
            standings[match.homeTeam].form.push('L');
          } else {
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

    return Object.values(standings)
      .map(t => ({ ...t, gd: t.gf - t.ga, formGuide: t.form.slice(-5).join('') }))
      .sort((a, b) => {
        if (b.pts !== a.pts) return b.pts - a.pts;
        if (b.gd !== a.gd) return b.gd - a.gd;
        return b.gf - a.gf;
      });
  },

  // 2. 🦍 GORILLA MWAKERE PERSONALITY (Tanga Flavor)
  getGorillaBanter: (standings, matches) => {
    // 1. KAMA HAKUNA DATA KABISA
    if (!standings || standings.length === 0) {
      return [
        "Oya wanangu! Mwakere nimerudi... Ligi bado mbichi, timu zinajipanga au ndio zinapigana vikumbo? Leteni mpira tuchambue!",
        "Usinene ukamara! Mpira bado haujaanza kudunda vizuri. Subiri nivae miwani yangu ya mbao."
      ];
    }

    const topTeam = standings[0];
    const bottomTeam = standings[standings.length - 1];
    
    // Hesabu za haraka haraka
    const totalMatches = matches.filter(m => m.score && (m.score.includes('-') || m.score.includes(':'))).length;
    let totalGoals = 0;
    standings.forEach(t => totalGoals += t.gf);
    const avgGoals = totalMatches > 0 ? (totalGoals / totalMatches).toFixed(1) : 0;
    
    const comments = [];

    // --- A: MWANZO WA LIGI (Mechi Chache - Dar Scenario Fix) ---
    if (totalMatches > 0 && totalMatches <= 3) {
        comments.push(`Ligi ndio kwanza inaanza, **usinene ukamara**! Bado mapema sana kusema nani bingwa.`);
        
        if (avgGoals < 1.5) {
            comments.push(`Huku sioni magoli, naona **Mpira Chiguruni** tu! Mabeki wamekaza au washambuliaji wameula wa chuya? 😂`);
        }
    }

    // --- B: TIMU BORA (Top of the Table) ---
    if (topTeam && topTeam.pts > 0) {
      if (topTeam.formGuide && topTeam.formGuide.includes('WW')) {
         comments.push(`Eeh bana wee! Hawa **${topTeam.team}** wanapiga **Pira Biriani**! Wapo kileleni na pointi ${topTeam.pts}. Wengine wanajifunza soka.`);
      } else {
         comments.push(`Kwa sasa **${topTeam.team}** ndio wameweka kwapani, wanaongoza ligi. Lakini wasijisahau, **Mpira Chiguruni** huu!`);
      }
    }

    // --- C: TIMU BOVU (Bottom of the Table) ---
    if (bottomTeam && bottomTeam.l > 0) {
      if (bottomTeam.gd < -3) {
         comments.push(`Hawa **${bottomTeam.team}** ni **Wafungashwa** rasmi! Wanakula **Kipigo cha Mbwa Kachoka** kila wakikanyaga uwanjani. Kocha amka! 😴`);
      } else {
         comments.push(`Pole sana kwa **${bottomTeam.team}**, mambo bado magumu. Soka lenu limepoa kama chai ya jana.`);
      }
    }

    // --- D: UKUTA MGUMU (Clean Sheets) ---
    const defensiveMaster = [...standings].sort((a, b) => b.cleanSheets - a.cleanSheets)[0];
    if (defensiveMaster && defensiveMaster.cleanSheets > 1) {
      comments.push(`Ukuta wa Yeriko! **${defensiveMaster.team}** wamegoma kufungwa, wana 'Clean Sheets' ${defensiveMaster.cleanSheets}. Hapa hakupiti hata panya!`);
    }

    // --- E: MAGOLI MENGI VS MACHACHE ---
    if (avgGoals > 3.0) {
      comments.push(`Wiki hii kumenuka! Timu zinagawa **Kipigo cha Sigara Bwege**. Wastani wa magoli **${avgGoals}** kwa mechi. Makipa wananaawa uso tu! 🔥`);
    } else if (avgGoals > 0 && avgGoals < 1.0 && totalMatches > 3) {
      comments.push(`Dah! Washambuliaji wamegoma kufunga? Wastani wa goli **${avgGoals}**? Huu mpira au mieleka?`);
    }

    // --- F: KAMA LIGI IMEMALIZA ---
    if (matches.every(m => m.status === 'FINAL') && matches.length > 10) {
        comments.push(`Ligi imeiva! **Usinene ukamara**, bingwa anakaribia kupatikana.`);
    }

    // Hakikisha haturudishi array tupu
    if (comments.length === 0) {
        return ["Natafakari takwimu... **Usinene ukamara**, data zinakuja!"];
    }

    return comments;
  }
};