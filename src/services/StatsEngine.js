// path: src/services/StatsEngine.js

// 🧠 Pande Cup AI Stats Engine (v2.0)
export const StatsEngine = {
  
  // 1. 📊 ADVANCED STANDINGS (Msimamo)
  calculateStandings: (matches) => {
    const standings = {};
    // Panga mechi kuanzia ya zamani kwenda mpya kwa ajili ya Form Guide
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

      // Angalia kama mechi imeisha na ina matokeo sahihi
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

  // 2. 🦍 GORILLA MWAKERE PERSONALITY (Maneno ya Shombo)
  getGorillaBanter: (standings, matches) => {
    // Kama hakuna data kabisa
    if (!standings || standings.length === 0) {
      return [
        "Oya wanangu! Mwakere nimerudi... Ligi bado mbichi, timu zinajipanga au ndio zinapigana vikumbo? Leteni mpira tuchambue!",
        "Msimu mpya, mambo mapya. Nani atabeba ndoo? Nani atalia kama mtoto? Kaa hapa hapa nikupe umbea wa soka!"
      ];
    }

    const topTeam = standings[0];
    const bottomTeam = standings[standings.length - 1];
    const comments = [];

    // Banter kwa anayeongoza
    if (topTeam && topTeam.pts > 0) {
      comments.push(`Eeh bana wee! Hawa **${topTeam.team}** wamekamia kinoma. Wana pointi ${topTeam.pts} utafikiri wanakimbizwa na deni! 😂`);
    }

    // Banter kwa anayeshika mkia
    if (bottomTeam && bottomTeam.p > 2 && bottomTeam.pts < 2) {
      comments.push(`Dah! Hawa **${bottomTeam.team}** vipi? Mbona wanagawa pointi kama njugu? Kocha amka usingizini, ligi inaisha hiyo! 😴`);
    }

    // Banter kwa Clean Sheets
    const defensiveMaster = [...standings].sort((a, b) => b.cleanSheets - a.cleanSheets)[0];
    if (defensiveMaster && defensiveMaster.cleanSheets > 1) {
      comments.push(`Ukuta wa Yeriko! **${defensiveMaster.team}** wamegoma kufungwa, wana 'Clean Sheets' ${defensiveMaster.cleanSheets}. Makipa wengine waige hapa.`);
    }

    // Banter kwa Magoli
    const totalMatches = matches.filter(m => m.score && (m.score.includes('-') || m.score.includes(':'))).length;
    let totalGoals = 0;
    standings.forEach(t => totalGoals += t.gf);
    const avgGoals = (totalGoals / Math.max(totalMatches, 1)).toFixed(1);

    if (avgGoals > 2.5) {
      comments.push(`Wavu unacheka tu! Wastani wa magoli **${avgGoals}** kwa mechi. Hii sio soka, hii ni vita ya magoli! 🔥`);
    } else {
       comments.push(`Leo niko sawa, nasubiri mechi ijayo nione nani atapigwa nyingi.`);
    }

    // Hakikisha haturudishi array tupu
    return comments.length > 0 ? comments : ["Nasubiri data zaidi ili nianze kuwachana!"];
  }
};