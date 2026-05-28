export interface Team {
  id: string;
  name: string;
  flag: string;
  iso: string;
  group: string;
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
