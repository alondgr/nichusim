export interface Team {
  id: string;
  name: string;
  flag: string;
  iso: string;
  group?: string;
  logo?: string;
}

export interface Player {
  id: string;
  name: string;
  team: string;
  flag: string;
  iso: string;
  imageUrl: string;
}

export interface MatchPrediction {
  homeScore: number | '';
  awayScore: number | '';
}

export type PredictionsState = Record<string, MatchPrediction>;


export const TEAMS: Team[] = [
  // Group A
  { id: 'mex', name: 'מקסיקו', flag: '🇲🇽', iso: 'mx', group: 'A' },
  { id: 'rsa', name: 'דרום אפריקה', flag: '🇿🇦', iso: 'za', group: 'A' },
  { id: 'kor', name: 'דרום קוריאה', flag: '🇰🇷', iso: 'kr', group: 'A' },
  { id: 'cze', name: 'צ\'כיה', flag: '🇨🇿', iso: 'cz', group: 'A' },
  
  // Group B
  { id: 'can', name: 'קנדה', flag: '🇨🇦', iso: 'ca', group: 'B' },
  { id: 'bih', name: 'בוסניה והרצגובינה', flag: '🇧🇦', iso: 'ba', group: 'B' },
  { id: 'qat', name: 'קטר', flag: '🇶🇦', iso: 'qa', group: 'B' },
  { id: 'sui', name: 'שווייץ', flag: '🇨🇭', iso: 'ch', group: 'B' },
  
  // Group C
  { id: 'bra', name: 'ברזיל', flag: '🇧🇷', iso: 'br', group: 'C' },
  { id: 'mar', name: 'מרוקו', flag: '🇲🇦', iso: 'ma', group: 'C' },
  { id: 'hai', name: 'האיטי', flag: '🇭🇹', iso: 'ht', group: 'C' },
  { id: 'sco', name: 'סקוטלנד', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', iso: 'gb-sct', group: 'C' },
  
  // Group D
  { id: 'usa', name: 'ארה"ב', flag: '🇺🇸', iso: 'us', group: 'D' },
  { id: 'par', name: 'פרגוואי', flag: '🇵🇾', iso: 'py', group: 'D' },
  { id: 'aus', name: 'אוסטרליה', flag: '🇦🇺', iso: 'au', group: 'D' },
  { id: 'tur', name: 'טורקיה', flag: '🇹🇷', iso: 'tr', group: 'D' },
  
  // Group E
  { id: 'ger', name: 'גרמניה', flag: '🇩🇪', iso: 'de', group: 'E' },
  { id: 'cur', name: 'קוראסאו', flag: '🇨🇼', iso: 'cw', group: 'E' },
  { id: 'civ', name: 'חוף השנהב', flag: '🇨🇮', iso: 'ci', group: 'E' },
  { id: 'ecu', name: 'אקוודור', flag: '🇪🇨', iso: 'ec', group: 'E' },
  
  // Group F
  { id: 'ned', name: 'הולנד', flag: '🇳🇱', iso: 'nl', group: 'F' },
  { id: 'jpn', name: 'יפן', flag: '🇯🇵', iso: 'jp', group: 'F' },
  { id: 'swe', name: 'שוודיה', flag: '🇸🇪', iso: 'se', group: 'F' },
  { id: 'tun', name: 'תוניסיה', flag: '🇹🇳', iso: 'tn', group: 'F' },
  
  // Group G
  { id: 'bel', name: 'בלגיה', flag: '🇧🇪', iso: 'be', group: 'G' },
  { id: 'egy', name: 'מצרים', flag: '🇪🇬', iso: 'eg', group: 'G' },
  { id: 'irn', name: 'איראן', flag: '🇮🇷', iso: 'ir', group: 'G' },
  { id: 'nzl', name: 'ניו זילנד', flag: '🇳🇿', iso: 'nz', group: 'G' },
  
  // Group H
  { id: 'esp', name: 'ספרד', flag: '🇪🇸', iso: 'es', group: 'H' },
  { id: 'cpv', name: 'כף ורדה', flag: '🇨🇻', iso: 'cv', group: 'H' },
  { id: 'ksa', name: 'ערב הסעודית', flag: '🇸🇦', iso: 'sa', group: 'H' },
  { id: 'uru', name: 'אורוגוואי', flag: '🇺🇾', iso: 'uy', group: 'H' },
  
  // Group I
  { id: 'fra', name: 'צרפת', flag: '🇫🇷', iso: 'fr', group: 'I' },
  { id: 'sen', name: 'סנגל', flag: '🇸🇳', iso: 'sn', group: 'I' },
  { id: 'irq', name: 'עיראק', flag: '🇮🇶', iso: 'iq', group: 'I' },
  { id: 'nor', name: 'נורווגיה', flag: '🇳🇴', iso: 'no', group: 'I' },
  
  // Group J
  { id: 'arg', name: 'ארגנטינה', flag: '🇦🇷', iso: 'ar', group: 'J' },
  { id: 'alg', name: 'אלג\'יריה', flag: '🇩🇿', iso: 'dz', group: 'J' },
  { id: 'aut', name: 'אוסטריה', flag: '🇦🇹', iso: 'at', group: 'J' },
  { id: 'jor', name: 'ירדן', flag: '🇯🇴', iso: 'jo', group: 'J' },
  
  // Group K
  { id: 'por', name: 'פורטוגל', flag: '🇵🇹', iso: 'pt', group: 'K' },
  { id: 'cod', name: 'קונגו הדמוקרטית', flag: '🇨🇩', iso: 'cd', group: 'K' },
  { id: 'uzb', name: 'אוזבקיסטן', flag: '🇺🇿', iso: 'uz', group: 'K' },
  { id: 'col', name: 'קולומביה', flag: '🇨🇴', iso: 'co', group: 'K' },
  
  // Group L
  { id: 'eng', name: 'אנגליה', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', iso: 'gb-eng', group: 'L' },
  { id: 'cro', name: 'קרואטיה', flag: '🇭🇷', iso: 'hr', group: 'L' },
  { id: 'gha', name: 'גאנה', flag: '🇬🇭', iso: 'gh', group: 'L' },
  { id: 'pan', name: 'פנמה', flag: '🇵🇦', iso: 'pa', group: 'L' }
];

export const TOP_SCORERS: Player[] = [
  { 
    id: 'mbappe', 
    name: 'קיליאן אמבפה', 
    team: 'צרפת', 
    flag: '🇫🇷', 
    iso: 'fr',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/66/Picture_with_Mbapp%C3%A9_%28cropped_and_rotated%29.jpg' 
  },
  { 
    id: 'kane', 
    name: 'הארי קיין', 
    team: 'אנגליה', 
    flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', 
    iso: 'gb-eng',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Harry_Kane_on_October_10%2C_2023.jpg' 
  },
  { 
    id: 'haaland', 
    name: 'ארלינג האלנד', 
    team: 'נורווגיה', 
    flag: '🇳🇴', 
    iso: 'no',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/71/Erling_Haaland_June_2025.jpg' 
  },
  { 
    id: 'messi', 
    name: 'ליונל מסי', 
    team: 'ארגנטינה', 
    flag: '🇦🇷', 
    iso: 'ar',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Lionel_Messi_White_House_2026_%283x4_cropped%29.jpg' 
  },
  { 
    id: 'yamal', 
    name: 'לאמין ימאל', 
    team: 'ספרד', 
    flag: '🇪🇸', 
    iso: 'es',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Lamine_Yamal_in_2025.jpg' 
  },
  { 
    id: 'vinicius', 
    name: 'ויניסיוס ג\'וניור', 
    team: 'ברזיל', 
    flag: '🇧🇷', 
    iso: 'br',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c6/2023_05_06_Final_de_la_Copa_del_Rey_-_52879242230_%28cropped%29.jpg' 
  },
  { 
    id: 'lautaro', 
    name: 'לאוטרו מרטינז', 
    team: 'ארגנטינה', 
    flag: '🇦🇷', 
    iso: 'ar',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Lautaro_Martinez_ARGENTINA_VS_VENEZUELA_2017.jpg' 
  },
  { 
    id: 'ronaldo', 
    name: 'כריסטיאנו רונאלדו', 
    team: 'פורטוגל', 
    flag: '🇵🇹', 
    iso: 'pt',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/President_Donald_Trump_meets_with_Cristiano_Ronaldo_in_the_Oval_Office_%2854933344262%29_%28cropped_and_rotated%29.jpg' 
  },
  { 
    id: 'lewandowski', 
    name: 'רוברט לבנדובסקי', 
    team: 'פולין', 
    flag: '🇵🇱', 
    iso: 'pl',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/26/2019147183134_2019-05-27_Fussball_1.FC_Kaiserslautern_vs_FC_Bayern_M%C3%BCnchen_-_Sven_-_1D_X_MK_II_-_0228_-_B70I8527_%28cropped%29.jpg' 
  },
  { 
    id: 'morata', 
    name: 'אלברו מוראטה', 
    team: 'ספרד', 
    flag: '🇪🇸', 
    iso: 'es',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/62/%C3%81lvaro_Morata_in_2025.jpg' 
  },
  { 
    id: 'alvarez', 
    name: 'חוליאן אלברז', 
    team: 'ארגנטינה', 
    flag: '🇦🇷', 
    iso: 'ar',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Argentina_national_football_team_-_2_-_2022_%28Juli%C3%A1n_%C3%81lvarez%29.jpg' 
  },
  { 
    id: 'osimhen', 
    name: 'ויקטור אוסימהן', 
    team: 'ניגריה', 
    flag: '🇳🇬', 
    iso: 'ng',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/34/Victor-osimhen-nigeria-2024-3-4.jpg' 
  },
  { 
    id: 'bellingham', 
    name: 'ג\'וד בלינגהאם', 
    team: 'אנגליה', 
    flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', 
    iso: 'gb-eng',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/25th_Laureus_World_Sports_Awards_-_Red_Carpet_-_Jude_Bellingham_-_240422_190551-2_%28cropped%29.jpg' 
  },
  { 
    id: 'saka', 
    name: 'בוקאיו סאקה', 
    team: 'אנגליה', 
    flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', 
    iso: 'gb-eng',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/1_bukayo_saka_arsenal_2025_%28cropped%29.jpg' 
  },
  { 
    id: 'foden', 
    name: 'פיל פודן', 
    team: 'אנגליה', 
    flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', 
    iso: 'gb-eng',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/53/2023-10-04_Fu%C3%9Fball%2C_M%C3%A4nner%2C_UEFA_Champions_League%2C_RB_Leipzig_-_Manchester_City_FC_1DX_2613%2C_Phil_Foden.jpg' 
  },
  { 
    id: 'son', 
    name: 'סון יונג-מין', 
    team: 'דרום קוריאה', 
    flag: '🇰🇷', 
    iso: 'kr',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b0/BFA_2023_-2_Heung-Min_Son_%28cropped%29.jpg' 
  }
];

export interface Match {
  id: string;
  sport?: 'football' | 'tennis' | 'ucl';
  home: Team;
  away: Team;
  group?: string;
  stage?: string;
  status?: 'upcoming' | 'live' | 'finished';
  dateStr: string;     // Hebrew date, e.g. "יום חמישי, 11/06/2026"
  timeStr: string;     // Israel time, e.g. "19:00"
  channel: string;     // Israeli channel, e.g. "כאן 11"
  timestamp: number;   // Epoch timestamp for easy chronological sorting
  bestOf?: 3 | 5;      // Tennis sets rules
  actualHomeScore?: number;
  actualAwayScore?: number;

  // Champions League specific fields
  league?: string;
  team_a?: string;
  team_a_logo?: string;
  team_b?: string;
  team_b_logo?: string;
  match_time?: string;
}

// Deterministic helper to retrieve the official Israel Hayom World Cup 2026 schedule info
const OFFICIAL_SCHEDULE: Record<string, { dateStr: string, timeStr: string, channel: string, timestamp: number }> = {
  // Group A
  'A-1': { dateStr: 'יום חמישי, 11/06/2026', timeStr: '22:00', channel: 'כאן 11', timestamp: new Date('2026-06-11T22:00:00+03:00').getTime() },
  'A-2': { dateStr: 'יום שישי, 12/06/2026', timeStr: '05:00', channel: 'ספורט 1', timestamp: new Date('2026-06-12T05:00:00+03:00').getTime() },
  'A-3': { dateStr: 'יום חמישי, 25/06/2026', timeStr: '04:00', channel: 'כאן 11', timestamp: new Date('2026-06-25T04:00:00+03:00').getTime() },
  'A-4': { dateStr: 'יום חמישי, 25/06/2026', timeStr: '04:00', channel: 'ספורט 1', timestamp: new Date('2026-06-25T04:00:00+03:00').getTime() },
  'A-5': { dateStr: 'יום שישי, 19/06/2026', timeStr: '04:00', channel: 'כאן 11', timestamp: new Date('2026-06-19T04:00:00+03:00').getTime() },
  'A-6': { dateStr: 'יום חמישי, 18/06/2026', timeStr: '19:00', channel: 'ספורט 1', timestamp: new Date('2026-06-18T19:00:00+03:00').getTime() },

  // Group B
  'B-1': { dateStr: 'יום שישי, 12/06/2026', timeStr: '22:00', channel: 'כאן 11', timestamp: new Date('2026-06-12T22:00:00+03:00').getTime() },
  'B-2': { dateStr: 'יום שבת, 13/06/2026', timeStr: '22:00', channel: 'ספורט 1', timestamp: new Date('2026-06-13T22:00:00+03:00').getTime() },
  'B-3': { dateStr: 'יום רביעי, 24/06/2026', timeStr: '22:00', channel: 'כאן 11', timestamp: new Date('2026-06-24T22:00:00+03:00').getTime() },
  'B-4': { dateStr: 'יום רביעי, 24/06/2026', timeStr: '22:00', channel: 'ספורט 1', timestamp: new Date('2026-06-24T22:00:00+03:00').getTime() },
  'B-5': { dateStr: 'יום שישי, 19/06/2026', timeStr: '01:00', channel: 'כאן 11', timestamp: new Date('2026-06-19T01:00:00+03:00').getTime() },
  'B-6': { dateStr: 'יום חמישי, 18/06/2026', timeStr: '22:00', channel: 'ספורט 1', timestamp: new Date('2026-06-18T22:00:00+03:00').getTime() },

  // Group C
  'C-1': { dateStr: 'יום ראשון, 14/06/2026', timeStr: '01:00', channel: 'כאן 11', timestamp: new Date('2026-06-14T01:00:00+03:00').getTime() },
  'C-2': { dateStr: 'יום ראשון, 14/06/2026', timeStr: '04:00', channel: 'ספורט 1', timestamp: new Date('2026-06-14T04:00:00+03:00').getTime() },
  'C-3': { dateStr: 'יום חמישי, 25/06/2026', timeStr: '01:00', channel: 'כאן 11', timestamp: new Date('2026-06-25T01:00:00+03:00').getTime() },
  'C-4': { dateStr: 'יום חמישי, 25/06/2026', timeStr: '01:00', channel: 'ספורט 1', timestamp: new Date('2026-06-25T01:00:00+03:00').getTime() },
  'C-5': { dateStr: 'יום שבת, 20/06/2026', timeStr: '04:00', channel: 'כאן 11', timestamp: new Date('2026-06-20T04:00:00+03:00').getTime() },
  'C-6': { dateStr: 'יום שבת, 20/06/2026', timeStr: '01:00', channel: 'ספורט 1', timestamp: new Date('2026-06-20T01:00:00+03:00').getTime() },

  // Group D
  'D-1': { dateStr: 'יום שבת, 13/06/2026', timeStr: '04:00', channel: 'כאן 11', timestamp: new Date('2026-06-13T04:00:00+03:00').getTime() },
  'D-2': { dateStr: 'יום ראשון, 14/06/2026', timeStr: '07:00', channel: 'ספורט 1', timestamp: new Date('2026-06-14T07:00:00+03:00').getTime() },
  'D-3': { dateStr: 'יום שישי, 26/06/2026', timeStr: '05:00', channel: 'כאן 11', timestamp: new Date('2026-06-26T05:00:00+03:00').getTime() },
  'D-4': { dateStr: 'יום שישי, 26/06/2026', timeStr: '05:00', channel: 'ספורט 1', timestamp: new Date('2026-06-26T05:00:00+03:00').getTime() },
  'D-5': { dateStr: 'יום שישי, 19/06/2026', timeStr: '22:00', channel: 'כאן 11', timestamp: new Date('2026-06-19T22:00:00+03:00').getTime() },
  'D-6': { dateStr: 'יום שבת, 20/06/2026', timeStr: '07:00', channel: 'ספורט 1', timestamp: new Date('2026-06-20T07:00:00+03:00').getTime() },

  // Group E
  'E-1': { dateStr: 'יום ראשון, 14/06/2026', timeStr: '20:00', channel: 'כאן 11', timestamp: new Date('2026-06-14T20:00:00+03:00').getTime() },
  'E-2': { dateStr: 'יום שני, 15/06/2026', timeStr: '02:00', channel: 'ספורט 1', timestamp: new Date('2026-06-15T02:00:00+03:00').getTime() },
  'E-3': { dateStr: 'יום חמישי, 25/06/2026', timeStr: '23:00', channel: 'כאן 11', timestamp: new Date('2026-06-25T23:00:00+03:00').getTime() },
  'E-4': { dateStr: 'יום חמישי, 25/06/2026', timeStr: '23:00', channel: 'ספורט 1', timestamp: new Date('2026-06-25T23:00:00+03:00').getTime() },
  'E-5': { dateStr: 'יום שבת, 20/06/2026', timeStr: '23:00', channel: 'כאן 11', timestamp: new Date('2026-06-20T23:00:00+03:00').getTime() },
  'E-6': { dateStr: 'יום ראשון, 21/06/2026', timeStr: '03:00', channel: 'ספורט 1', timestamp: new Date('2026-06-21T03:00:00+03:00').getTime() },

  // Group F
  'F-1': { dateStr: 'יום ראשון, 14/06/2026', timeStr: '23:00', channel: 'כאן 11', timestamp: new Date('2026-06-14T23:00:00+03:00').getTime() },
  'F-2': { dateStr: 'יום שני, 15/06/2026', timeStr: '05:00', channel: 'ספורט 1', timestamp: new Date('2026-06-15T05:00:00+03:00').getTime() },
  'F-3': { dateStr: 'יום שישי, 26/06/2026', timeStr: '02:00', channel: 'כאן 11', timestamp: new Date('2026-06-26T02:00:00+03:00').getTime() },
  'F-4': { dateStr: 'יום שישי, 26/06/2026', timeStr: '02:00', channel: 'ספורט 1', timestamp: new Date('2026-06-26T02:00:00+03:00').getTime() },
  'F-5': { dateStr: 'יום שבת, 20/06/2026', timeStr: '20:00', channel: 'כאן 11', timestamp: new Date('2026-06-20T20:00:00+03:00').getTime() },
  'F-6': { dateStr: 'יום ראשון, 21/06/2026', timeStr: '07:00', channel: 'ספורט 1', timestamp: new Date('2026-06-21T07:00:00+03:00').getTime() },

  // Group G
  'G-1': { dateStr: 'יום שני, 15/06/2026', timeStr: '22:00', channel: 'כאן 11', timestamp: new Date('2026-06-15T22:00:00+03:00').getTime() },
  'G-2': { dateStr: 'יום שלישי, 16/06/2026', timeStr: '04:00', channel: 'ספורט 1', timestamp: new Date('2026-06-16T04:00:00+03:00').getTime() },
  'G-3': { dateStr: 'יום שבת, 27/06/2026', timeStr: '06:00', channel: 'כאן 11', timestamp: new Date('2026-06-27T06:00:00+03:00').getTime() },
  'G-4': { dateStr: 'יום שבת, 27/06/2026', timeStr: '06:00', channel: 'ספורט 1', timestamp: new Date('2026-06-27T06:00:00+03:00').getTime() },
  'G-5': { dateStr: 'יום ראשון, 21/06/2026', timeStr: '22:00', channel: 'כאן 11', timestamp: new Date('2026-06-21T22:00:00+03:00').getTime() },
  'G-6': { dateStr: 'יום שני, 22/06/2026', timeStr: '04:00', channel: 'ספורט 1', timestamp: new Date('2026-06-22T04:00:00+03:00').getTime() },

  // Group H
  'H-1': { dateStr: 'יום שני, 15/06/2026', timeStr: '19:00', channel: 'כאן 11', timestamp: new Date('2026-06-15T19:00:00+03:00').getTime() },
  'H-2': { dateStr: 'יום שלישי, 16/06/2026', timeStr: '01:00', channel: 'ספורט 1', timestamp: new Date('2026-06-16T01:00:00+03:00').getTime() },
  'H-3': { dateStr: 'יום שבת, 27/06/2026', timeStr: '03:00', channel: 'כאן 11', timestamp: new Date('2026-06-27T03:00:00+03:00').getTime() },
  'H-4': { dateStr: 'יום שבת, 27/06/2026', timeStr: '03:00', channel: 'ספורט 1', timestamp: new Date('2026-06-27T03:00:00+03:00').getTime() },
  'H-5': { dateStr: 'יום ראשון, 21/06/2026', timeStr: '19:00', channel: 'כאן 11', timestamp: new Date('2026-06-21T19:00:00+03:00').getTime() },
  'H-6': { dateStr: 'יום שני, 22/06/2026', timeStr: '01:00', channel: 'ספורט 1', timestamp: new Date('2026-06-22T01:00:00+03:00').getTime() },

  // Group I
  'I-1': { dateStr: 'יום שלישי, 16/06/2026', timeStr: '22:00', channel: 'כאן 11', timestamp: new Date('2026-06-16T22:00:00+03:00').getTime() },
  'I-2': { dateStr: 'יום רביעי, 17/06/2026', timeStr: '01:00', channel: 'ספורט 1', timestamp: new Date('2026-06-17T01:00:00+03:00').getTime() },
  'I-3': { dateStr: 'יום שישי, 26/06/2026', timeStr: '22:00', channel: 'כאן 11', timestamp: new Date('2026-06-26T22:00:00+03:00').getTime() },
  'I-4': { dateStr: 'יום שישי, 26/06/2026', timeStr: '22:00', channel: 'ספורט 1', timestamp: new Date('2026-06-26T22:00:00+03:00').getTime() },
  'I-5': { dateStr: 'יום שלישי, 23/06/2026', timeStr: '00:00', channel: 'כאן 11', timestamp: new Date('2026-06-23T00:00:00+03:00').getTime() },
  'I-6': { dateStr: 'יום שלישי, 23/06/2026', timeStr: '03:00', channel: 'ספורט 1', timestamp: new Date('2026-06-23T03:00:00+03:00').getTime() },

  // Group J
  'J-1': { dateStr: 'יום רביעי, 17/06/2026', timeStr: '04:00', channel: 'כאן 11', timestamp: new Date('2026-06-17T04:00:00+03:00').getTime() },
  'J-2': { dateStr: 'יום רביעי, 17/06/2026', timeStr: '07:00', channel: 'ספורט 1', timestamp: new Date('2026-06-17T07:00:00+03:00').getTime() },
  'J-3': { dateStr: 'יום ראשון, 28/06/2026', timeStr: '05:00', channel: 'כאן 11', timestamp: new Date('2026-06-28T05:00:00+03:00').getTime() },
  'J-4': { dateStr: 'יום ראשון, 28/06/2026', timeStr: '05:00', channel: 'ספורט 1', timestamp: new Date('2026-06-28T05:00:00+03:00').getTime() },
  'J-5': { dateStr: 'יום שני, 22/06/2026', timeStr: '20:00', channel: 'כאן 11', timestamp: new Date('2026-06-22T20:00:00+03:00').getTime() },
  'J-6': { dateStr: 'יום שלישי, 23/06/2026', timeStr: '06:00', channel: 'ספורט 1', timestamp: new Date('2026-06-23T06:00:00+03:00').getTime() },

  // Group K
  'K-1': { dateStr: 'יום רביעי, 17/06/2026', timeStr: '20:00', channel: 'כאן 11', timestamp: new Date('2026-06-17T20:00:00+03:00').getTime() },
  'K-2': { dateStr: 'יום חמישי, 18/06/2026', timeStr: '05:00', channel: 'ספורט 1', timestamp: new Date('2026-06-18T05:00:00+03:00').getTime() },
  'K-3': { dateStr: 'יום ראשון, 28/06/2026', timeStr: '02:30', channel: 'כאן 11', timestamp: new Date('2026-06-28T02:30:00+03:00').getTime() },
  'K-4': { dateStr: 'יום ראשון, 28/06/2026', timeStr: '02:30', channel: 'ספורט 1', timestamp: new Date('2026-06-28T02:30:00+03:00').getTime() },
  'K-5': { dateStr: 'יום שלישי, 23/06/2026', timeStr: '20:00', channel: 'כאן 11', timestamp: new Date('2026-06-23T20:00:00+03:00').getTime() },
  'K-6': { dateStr: 'יום רביעי, 24/06/2026', timeStr: '05:00', channel: 'ספורט 1', timestamp: new Date('2026-06-24T05:00:00+03:00').getTime() },

  // Group L
  'L-1': { dateStr: 'יום רביעי, 17/06/2026', timeStr: '23:00', channel: 'כאן 11', timestamp: new Date('2026-06-17T23:00:00+03:00').getTime() },
  'L-2': { dateStr: 'יום חמישי, 18/06/2026', timeStr: '02:00', channel: 'ספורט 1', timestamp: new Date('2026-06-18T02:00:00+03:00').getTime() },
  'L-3': { dateStr: 'יום ראשון, 28/06/2026', timeStr: '00:00', channel: 'כאן 11', timestamp: new Date('2026-06-28T00:00:00+03:00').getTime() },
  'L-4': { dateStr: 'יום ראשון, 28/06/2026', timeStr: '00:00', channel: 'ספורט 1', timestamp: new Date('2026-06-28T00:00:00+03:00').getTime() },
  'L-5': { dateStr: 'יום שלישי, 23/06/2026', timeStr: '23:00', channel: 'כאן 11', timestamp: new Date('2026-06-23T23:00:00+03:00').getTime() },
  'L-6': { dateStr: 'יום רביעי, 24/06/2026', timeStr: '02:00', channel: 'ספורט 1', timestamp: new Date('2026-06-24T02:00:00+03:00').getTime() }
};

const getMatchScheduleInfo = (group: string, matchIdx: number) => {
  const key = `${group}-${matchIdx}`;
  return OFFICIAL_SCHEDULE[key] || {
    dateStr: 'יום חמישי, 11/06/2026',
    timeStr: '22:00',
    channel: 'כאן 11',
    timestamp: new Date('2026-06-11T22:00:00+03:00').getTime()
  };
};

// Standard round-robin matches for a group
export const getGroupMatches = (group: string, teams: Team[]): Match[] => {
  const groupTeams = teams.filter(t => t.group === group);
  if (groupTeams.length < 4) return [];

  const basicMatches = [
    { idx: 1, home: groupTeams[0], away: groupTeams[1] },
    { idx: 2, home: groupTeams[2], away: groupTeams[3] },
    { idx: 3, home: groupTeams[0], away: groupTeams[3] },
    { idx: 4, home: groupTeams[1], away: groupTeams[2] },
    { idx: 5, home: groupTeams[0], away: groupTeams[2] },
    { idx: 6, home: groupTeams[1], away: groupTeams[3] },
  ];

  return basicMatches.map(({ idx, home, away }) => {
    const id = `${group}-${idx}`;
    const info = getMatchScheduleInfo(group, idx);
    return {
      id,
      home,
      away,
      group,
      ...info
    };
  });
};

// --- Tennis Sandbox Data ---

export const TENNIS_MATCHES: Match[] = [
  {
    id: 'rg_2026_3r_01',
    sport: 'tennis',
    home: { id: 'borges', name: 'נונו בורחס', flag: '🇵🇹', iso: 'pt' },
    away: { id: 'rublev', name: 'אנדריי רובלב', flag: '🏳️', iso: 'un' },
    stage: 'סיבוב 3',
    status: 'finished',
    dateStr: 'יום שישי, 29/05/2026',
    timeStr: '11:00',
    channel: 'ספורט 5',
    timestamp: new Date('2026-05-29T11:00:00+03:00').getTime(),
    bestOf: 5,
    actualHomeScore: 0,
    actualAwayScore: 3
  },
  {
    id: 'rg_2026_3r_02',
    sport: 'tennis',
    home: { id: 'tirante', name: 'טיאגו טיראנטה', flag: '🇦🇷', iso: 'ar' },
    away: { id: 'carreno', name: 'פבלו קרניו', flag: '🇪🇸', iso: 'es' },
    stage: 'סיבוב 3',
    status: 'finished',
    dateStr: 'יום שישי, 29/05/2026',
    timeStr: '11:00',
    channel: 'ספורט 5 פלוס',
    timestamp: new Date('2026-05-29T11:00:00+03:00').getTime(),
    bestOf: 5,
    actualHomeScore: 1,
    actualAwayScore: 3
  },
  {
    id: 'rg_2026_3r_03',
    sport: 'tennis',
    home: { id: 'michelsen', name: 'אלכס מיכלסן', flag: '🇺🇸', iso: 'us' },
    away: { id: 'jodar', name: 'רפאל ג\'ודאר', flag: '🇪🇸', iso: 'es' },
    stage: 'סיבוב 3',
    status: 'upcoming',
    dateStr: 'יום שישי, 29/05/2026',
    timeStr: '13:10',
    channel: 'ספורט 5',
    timestamp: new Date('2026-05-29T13:10:00+03:00').getTime(),
    bestOf: 5
  },
  {
    id: 'rg_2026_3r_04',
    sport: 'tennis',
    home: { id: 'khachanov', name: 'קארן חצ\'אנוב', flag: '🏳️', iso: 'un' },
    away: { id: 'dejong', name: 'יספר דה יונג', flag: '🇳🇱', iso: 'nl' },
    stage: 'סיבוב 3',
    status: 'upcoming',
    dateStr: 'יום שישי, 29/05/2026',
    timeStr: '14:50',
    channel: 'ספורט 5 לייב',
    timestamp: new Date('2026-05-29T14:50:00+03:00').getTime(),
    bestOf: 5
  },
  {
    id: 'rg_2026_3r_05',
    sport: 'tennis',
    home: { id: 'deminaur', name: 'אלכס דה מינור', flag: '🇦🇺', iso: 'au' },
    away: { id: 'mensik', name: 'יאקוב מנשיק', flag: '🇨🇿', iso: 'cz' },
    stage: 'סיבוב 3',
    status: 'upcoming',
    dateStr: 'יום שישי, 29/05/2026',
    timeStr: '14:50',
    channel: 'ספורט 5 פלוס',
    timestamp: new Date('2026-05-29T14:50:00+03:00').getTime(),
    bestOf: 5
  },
  {
    id: 'rg_2026_3r_06',
    sport: 'tennis',
    home: { id: 'ruud', name: 'קספר רוד', flag: '🇳🇴', iso: 'no' },
    away: { id: 'paul', name: 'טומי פול', flag: '🇺🇸', iso: 'us' },
    stage: 'סיבוב 3',
    status: 'upcoming',
    dateStr: 'יום שישי, 29/05/2026',
    timeStr: '16:20',
    channel: 'ספורט 5',
    timestamp: new Date('2026-05-29T16:20:00+03:00').getTime(),
    bestOf: 5
  },
  {
    id: 'rg_2026_3r_07',
    sport: 'tennis',
    home: { id: 'fonseca', name: 'ז\'ואאו פונסקה', flag: '🇧🇷', iso: 'br' },
    away: { id: 'djokovic', name: 'נובאק ג\'וקוביץ\'', flag: '🇷🇸', iso: 'rs' },
    stage: 'סיבוב 3',
    status: 'upcoming',
    dateStr: 'יום שישי, 29/05/2026',
    timeStr: '16:30',
    channel: 'ספורט 5 לייב',
    timestamp: new Date('2026-05-29T16:30:00+03:00').getTime(),
    bestOf: 5
  },
  {
    id: 'rg_2026_3r_08',
    sport: 'tennis',
    home: { id: 'halys', name: 'קוונטין אליס', flag: '🇫🇷', iso: 'fr' },
    away: { id: 'zverev', name: 'אלכסנדר זברב', flag: '🇩🇪', iso: 'de' },
    stage: 'סיבוב 3',
    status: 'upcoming',
    dateStr: 'יום שישי, 29/05/2026',
    timeStr: '21:15',
    channel: 'ספורט 5',
    timestamp: new Date('2026-05-29T21:15:00+03:00').getTime(),
    bestOf: 5
  },
  {
    id: 'rg_2026_4r_01',
    sport: 'tennis',
    home: { id: 'alcaraz', name: 'קרלוס אלקראס', flag: '🇪🇸', iso: 'es' },
    away: { id: 'sinner', name: 'יאניק סינר', flag: '🇮🇹', iso: 'it' },
    stage: 'שמינית גמר',
    status: 'upcoming',
    dateStr: 'יום ראשון, 31/05/2026',
    timeStr: '15:00',
    channel: 'ספורט 5',
    timestamp: new Date('2026-05-31T15:00:00+03:00').getTime(),
    bestOf: 5
  },
  {
    id: 'rg_2026_4r_02',
    sport: 'tennis',
    home: { id: 'zverev_4r', name: 'אלכסנדר זברב', flag: '🇩🇪', iso: 'de' },
    away: { id: 'rune_4r', name: 'הולגר רונה', flag: '🇩🇰', iso: 'dk' },
    stage: 'שמינית גמר',
    status: 'upcoming',
    dateStr: 'יום שני, 01/06/2026',
    timeStr: '12:00',
    channel: 'ספורט 5 לייב',
    timestamp: new Date('2026-06-01T12:00:00+03:00').getTime(),
    bestOf: 5
  },
  {
    id: 'rg_2026_qf_01',
    sport: 'tennis',
    home: { id: 'medvedev', name: 'דניאיל מדבדב', flag: '🏳️', iso: 'un' },
    away: { id: 'tsitsipas', name: 'סטפנוס ציציפס', flag: '🇬🇷', iso: 'gr' },
    stage: 'רבע גמר',
    status: 'upcoming',
    dateStr: 'יום שלישי, 02/06/2026',
    timeStr: '16:00',
    channel: 'ספורט 5 פלוס',
    timestamp: new Date('2026-06-02T16:00:00+03:00').getTime(),
    bestOf: 5
  },
  {
    id: 'rg_2026_qf_02',
    sport: 'tennis',
    home: { id: 'djokovic_qf', name: 'נובאק ג\'וקוביץ\'', flag: '🇷🇸', iso: 'rs' },
    away: { id: 'ruud_qf', name: 'קספר רוד', flag: '🇳🇴', iso: 'no' },
    stage: 'רבע גמר',
    status: 'upcoming',
    dateStr: 'יום רביעי, 03/06/2026',
    timeStr: '14:30',
    channel: 'ספורט 5',
    timestamp: new Date('2026-06-03T14:30:00+03:00').getTime(),
    bestOf: 5
  },
  {
    id: 'rg_2026_sf_01',
    sport: 'tennis',
    home: { id: 'tbd_sf1_h', name: 'מנצח רבע גמר 1', flag: '❓', iso: 'un' },
    away: { id: 'tbd_sf1_a', name: 'מנצח רבע גמר 2', flag: '❓', iso: 'un' },
    stage: 'חצי גמר',
    status: 'upcoming',
    dateStr: 'יום שישי, 05/06/2026',
    timeStr: '15:30',
    channel: 'ספורט 5',
    timestamp: new Date('2026-06-05T15:30:00+03:00').getTime(),
    bestOf: 5
  },
  {
    id: 'rg_2026_sf_02',
    sport: 'tennis',
    home: { id: 'tbd_sf2_h', name: 'מנצח רבע גמר 3', flag: '❓', iso: 'un' },
    away: { id: 'tbd_sf2_a', name: 'מנצח רבע גמר 4', flag: '❓', iso: 'un' },
    stage: 'חצי גמר',
    status: 'upcoming',
    dateStr: 'יום שישי, 05/06/2026',
    timeStr: '19:00',
    channel: 'ספורט 5 פלוס',
    timestamp: new Date('2026-06-05T19:00:00+03:00').getTime(),
    bestOf: 5
  },
  {
    id: 'rg_2026_f_01',
    sport: 'tennis',
    home: { id: 'tbd_f_h', name: 'מנצח חצי גמר 1', flag: '🏆', iso: 'un' },
    away: { id: 'tbd_f_a', name: 'מנצח חצי גמר 2', flag: '🏆', iso: 'un' },
    stage: 'גמר',
    status: 'upcoming',
    dateStr: 'יום ראשון, 07/06/2026',
    timeStr: '16:00',
    channel: 'ספורט 5',
    timestamp: new Date('2026-06-07T16:00:00+03:00').getTime(),
    bestOf: 5
  }
];

export const ALL_TENNIS_MATCHES = TENNIS_MATCHES.sort((a, b) => a.timestamp - b.timestamp);

// --- UCL Sandbox Data ---
export const UCL_MATCHES: Match[] = [
  {
    id: 'ucl_2026_final',
    sport: 'ucl',
    league: 'champions_league',
    team_a: 'Paris Saint-Germain',
    team_a_logo: 'https://crests.football-data.org/524.svg',
    team_b: 'Arsenal',
    team_b_logo: 'https://crests.football-data.org/57.svg',
    stage: 'Final',
    status: 'upcoming',
    match_time: '19:00 IDT',
    
    // Existing fields for frontend compatibility
    home: { id: 'psg', name: 'Paris Saint-Germain', flag: '🇫🇷', iso: 'fr', logo: 'https://crests.football-data.org/524.svg' },
    away: { id: 'ars', name: 'Arsenal', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', iso: 'gb-eng', logo: 'https://crests.football-data.org/57.svg' },
    dateStr: 'יום שבת, 30/05/2026',
    timeStr: '19:00 IDT',
    channel: 'ספורט 5',
    timestamp: new Date('2026-05-30T19:00:00+03:00').getTime()
  }
];

// --- Helpers ---

export const generateTennisScore = (bestOf: 3 | 5): { home: number, away: number } => {
  const isHomeWinner = Math.random() > 0.5;
  if (bestOf === 3) {
    const loserSets = Math.random() > 0.5 ? 1 : 0;
    return {
      home: isHomeWinner ? 2 : loserSets,
      away: isHomeWinner ? loserSets : 2
    };
  } else {
    const rand = Math.random();
    const loserSets = rand > 0.66 ? 2 : rand > 0.33 ? 1 : 0;
    return {
      home: isHomeWinner ? 3 : loserSets,
      away: isHomeWinner ? loserSets : 3
    };
  }
};

export function calculateMatchPoints(
  sport: 'football' | 'tennis' | 'ucl',
  predictedHome: number | '',
  predictedAway: number | '',
  actualHome: number | '',
  actualAway: number | ''
): number {
  if (predictedHome === '' || predictedAway === '' || actualHome === '' || actualAway === '') {
    return 0;
  }

  const pHome = Number(predictedHome);
  const pAway = Number(predictedAway);
  const aHome = Number(actualHome);
  const aAway = Number(actualAway);

  if (sport === 'ucl') {
    // UCL Specific Rules
    if (pHome === aHome && pAway === aAway) return 10;
    const predictedWinner = pHome > pAway ? 'home' : pHome < pAway ? 'away' : 'draw';
    const actualWinner = aHome > aAway ? 'home' : aHome < aAway ? 'away' : 'draw';
    if (predictedWinner === actualWinner) return 5;
    return 0;
  } else if (sport === 'football') {
    // Exact Score
    if (pHome === aHome && pAway === aAway) return 3;
    // Outcome Match
    const predictedWinner = pHome > pAway ? 'home' : pHome < pAway ? 'away' : 'draw';
    const actualWinner = aHome > aAway ? 'home' : aHome < aAway ? 'away' : 'draw';
    if (predictedWinner === actualWinner) return 1;
    return 0;
  } else {
    // Tennis
    // Exact Set Score Match
    if (pHome === aHome && pAway === aAway) return 3;
    // Correct Winner Match (draws impossible)
    const predictedWinner = pHome > pAway ? 'home' : 'away';
    const actualWinner = aHome > aAway ? 'home' : 'away';
    if (predictedWinner === actualWinner) return 1;
    return 0;
  }
}
