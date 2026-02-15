// 🧠 Pande Cup AI Stats Engine (v3.0 - Mwakere Edition)
export const StatsEngine = {
  
  // 1. 📊 ADVANCED STANDINGS (Auto-Calculate kutoka kwenye Mechi)
  calculateStandings: (matches) => {
    const standings = {};
    // Panga mechi kuanzia ya zamani kwenda mpya
    const sortedMatches = [...matches].sort((a, b) => new Date(a.matchDate) - new Date(b.matchDate));

    sortedMatches.forEach(match => {
      const home = match.homeTeam || match.home;
      const away = match.awayTeam || match.away;

      [home, away].forEach(team => {
        if (team && !standings[team]) {
          standings[team] = { 
            team: team, p: 0, w: 0, d: 0, l: 0, 
            gf: 0, ga: 0, gd: 0, pts: 0,
            form: [], cleanSheets: 0
          };
        }
      });

      const score = match.score || "";
      const isFinal = score && (score.includes('-') || score.includes(':')) && !score.toUpperCase().includes('VS');
      
      if (isFinal) {
        const parts = score.includes('-') ? score.split('-') : score.split(':');
        const homeGoals = parseInt(parts[0]);
        const awayGoals = parseInt(parts[1]);

        if (!isNaN(homeGoals) && !isNaN(awayGoals) && home && away) {
          standings[home].p++;
          standings[away].p++;
          standings[home].gf += homeGoals;
          standings[home].ga += awayGoals;
          standings[away].gf += awayGoals;
          standings[away].ga += homeGoals;

          if (awayGoals === 0) standings[home].cleanSheets++;
          if (homeGoals === 0) standings[away].cleanSheets++;

          if (homeGoals > awayGoals) {
            standings[home].w++;
            standings[home].pts += 3;
            standings[home].form.push('W');
            standings[away].l++;
            standings[away].form.push('L');
          } else if (awayGoals > homeGoals) {
            standings[away].w++;
            standings[away].pts += 3;
            standings[away].form.push('W');
            standings[home].l++;
            standings[home].form.push('L');
          } else {
            standings[home].d++;
            standings[home].pts += 1;
            standings[home].form.push('D');
            standings[away].d++;
            standings[away].pts += 1;
            standings[away].form.push('D');
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

  // 2. 🦍 GORILLA MWAKERE PERSONALITY (Tanga & Mtaa Flavor)
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
    
    // Hesabu za haraka haraka (Tunalinda code isicrash kama 'gf' haipo)
    const totalMatches = matches ? matches.filter(m => m.score && (m.score.includes('-') || m.score.includes(':'))).length : 0;
    let totalGoals = 0;
    standings.forEach(t => { totalGoals += (t.gf || 0); });
    const avgGoals = totalMatches > 0 ? (totalGoals / totalMatches).toFixed(1) : 0;
    
    const comments = [];

    // Tunasoma properties zote kwa usalama (Contentful format VS Calculated format)
    const topTeamName = topTeam.team || topTeam.teamName || "Kinara";
    const topTeamPts = topTeam.pts || topTeam.points || 0;
    const topTeamForm = topTeam.formGuide || "";

    const bottomTeamName = bottomTeam.team || bottomTeam.teamName || "Mkia";
    const bottomTeamLosses = bottomTeam.l !== undefined ? bottomTeam.l : 0; // Kama hakuna 'l', weka 0
    const bottomTeamGD = bottomTeam.gd || bottomTeam.goalDifference || 0;

    // --- A: MWANZO WA LIGI (Mechi Chache) ---
    if (totalMatches > 0 && totalMatches <= 3) {
        comments.push(`Ligi ndio kwanza inaanza, usinene ukamara! Bado mapema sana kusema nani bingwa.`);
        if (avgGoals > 0 && avgGoals < 1.5) {
            comments.push(`Huku sioni magoli, naona Mpira Chiguruni tu! Mabeki wamekaza au washambuliaji wameula wa chuya? 😂`);
        }
    }

    // --- B: TIMU BORA (Top of the Table) ---
    if (topTeamPts > 0) {
      if (topTeamForm.includes('WW')) {
         comments.push(`Eeh bana wee! Hawa ${topTeamName} wanapiga Pira Biriani! Wapo kileleni na pointi ${topTeamPts}. Wengine wanajifunza soka.`);
      } else {
         comments.push(`Kwa sasa ${topTeamName} ndio wameweka kwapani, wanaongoza ligi na alama ${topTeamPts}. Lakini wasijisahau, Mpira Chiguruni huu!`);
      }
    }

    // --- C: TIMU BOVU (Bottom of the Table) ---
    // Kama timu ina GD ya hasi kubwa, inapewa za uso
    if (parseInt(bottomTeamGD) < -3) {
        comments.push(`Hawa ${bottomTeamName} ni Wafungashwa rasmi! Wanakula Kipigo cha Mbwa Kachoka kila wakikanyaga uwanjani. Kocha amka! 😴`);
    } else if (bottomTeamLosses > 1) {
        comments.push(`Pole sana kwa ${bottomTeamName}, mambo bado magumu. Soka lenu limepoa kama chai ya jana.`);
    }

    // --- D: UKUTA MGUMU (Clean Sheets) ---
    const defensiveMaster = [...standings].sort((a, b) => (b.cleanSheets || 0) - (a.cleanSheets || 0))[0];
    if (defensiveMaster && defensiveMaster.cleanSheets > 1) {
      const defTeamName = defensiveMaster.team || defensiveMaster.teamName;
      comments.push(`Ukuta wa Yeriko! ${defTeamName} wamegoma kufungwa, wana 'Clean Sheets' ${defensiveMaster.cleanSheets}. Hapa hakupiti hata panya!`);
    }

    // --- E: MAGOLI MENGI VS MACHACHE ---
    if (avgGoals > 3.0) {
      comments.push(`Wiki hii kumenuka! Timu zinagawa Kipigo cha Sigara Bwege. Wastani wa magoli ${avgGoals} kwa mechi. Makipa wananaawa uso tu! 🔥`);
    } else if (avgGoals > 0 && avgGoals < 1.0 && totalMatches > 3) {
      comments.push(`Dah! Washambuliaji wamegoma kufunga? Wastani wa goli ${avgGoals} tu? Huu mpira au mieleka?`);
    }

    // --- F: KAMA LIGI IMEMALIZA ---
    if (matches && matches.length > 10 && matches.every(m => m.status && m.status.toUpperCase() === 'FINAL')) {
        comments.push(`Ligi imeiva! Usinene ukamara, mambo yote yapo hadharani sasa.`);
    }

    // Fallback kama hakuna comment iliyopatikana
    if (comments.length === 0) {
        return ["Natafakari takwimu... Usinene ukamara, data zinakuja!"];
    }

    return comments;
  }
};