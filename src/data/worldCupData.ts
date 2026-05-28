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

export const TEAMS: Team[] = [
  // Group A
  { id: 'usa', name: 'ארה"ב', flag: '🇺🇸', iso: 'us', group: 'A' },
  { id: 'ita', name: 'איטליה', flag: '🇮🇹', iso: 'it', group: 'A' },
  { id: 'mar', name: 'מרוקו', flag: '🇲🇦', iso: 'ma', group: 'A' },
  { id: 'jpn', name: 'יפן', flag: '🇯🇵', iso: 'jp', group: 'A' },
  
  // Group B
  { id: 'mex', name: 'מקסיקו', flag: '🇲🇽', iso: 'mx', group: 'B' },
  { id: 'swe', name: 'שוודיה', flag: '🇸🇪', iso: 'se', group: 'B' },
  { id: 'egy', name: 'מצרים', flag: '🇪🇬', iso: 'eg', group: 'B' },
  { id: 'kor', name: 'דרום קוריאה', flag: '🇰🇷', iso: 'kr', group: 'B' },
  
  // Group C
  { id: 'can', name: 'קנדה', flag: '🇨🇦', iso: 'ca', group: 'C' },
  { id: 'cro', name: 'קרואטיה', flag: '🇭🇷', iso: 'hr', group: 'C' },
  { id: 'sen', name: 'סנגל', flag: '🇸🇳', iso: 'sn', group: 'C' },
  { id: 'irn', name: 'איראן', flag: '🇮🇷', iso: 'ir', group: 'C' },
  
  // Group D
  { id: 'fra', name: 'צרפת', flag: '🇫🇷', iso: 'fr', group: 'D' },
  { id: 'ecu', name: 'אקוודור', flag: '🇪🇨', iso: 'ec', group: 'D' },
  { id: 'ksa', name: 'ערב הסעודית', flag: '🇸🇦', iso: 'sa', group: 'D' },
  { id: 'aut', name: 'אוסטריה', flag: '🇦🇹', iso: 'at', group: 'D' },
  
  // Group E
  { id: 'arg', name: 'ארגנטינה', flag: '🇦🇷', iso: 'ar', group: 'E' },
  { id: 'den', name: 'דנמרק', flag: '🇩🇰', iso: 'dk', group: 'E' },
  { id: 'alg', name: 'אלג\'יריה', flag: '🇩🇿', iso: 'dz', group: 'E' },
  { id: 'uzb', name: 'אוזבקיסטן', flag: '🇺🇿', iso: 'uz', group: 'E' },
  
  // Group F
  { id: 'bra', name: 'ברזיל', flag: '🇧🇷', iso: 'br', group: 'F' },
  { id: 'sui', name: 'שוויץ', flag: '🇨🇭', iso: 'ch', group: 'F' },
  { id: 'nga', name: 'ניגריה', flag: '🇳🇬', iso: 'ng', group: 'F' },
  { id: 'irq', name: 'עיראק', flag: '🇮🇶', iso: 'iq', group: 'F' },
  
  // Group G
  { id: 'eng', name: 'אנגליה', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', iso: 'gb-eng', group: 'G' },
  { id: 'col', name: 'קולומביה', flag: '🇨🇴', iso: 'co', group: 'G' },
  { id: 'tun', name: 'תוניסיה', flag: '🇹🇳', iso: 'tun', group: 'G' }, // Note: tn or tun (tun matches standard or flagcdn. Let's make sure it is tn as flagcdn uses tn!)
  
  // Wait, let's fix Tunisia to tn to match standard flagcdn!
  { id: 'nzl', name: 'ניו זילנד', flag: '🇳🇿', iso: 'nz', group: 'G' },
  
  // Group H
  { id: 'esp', name: 'ספרד', flag: '🇪🇸', iso: 'es', group: 'H' },
  { id: 'ven', name: 'ונצואלה', flag: '🇻🇪', iso: 've', group: 'H' },
  { id: 'civ', name: 'חוף השנהב', flag: '🇨🇮', iso: 'ci', group: 'H' },
  { id: 'aus', name: 'אוסטרליה', flag: '🇦🇺', iso: 'au', group: 'H' },
  
  // Group I
  { id: 'ger', name: 'גרמניה', flag: '🇩🇪', iso: 'de', group: 'I' },
  { id: 'uru', name: 'אורוגוואי', flag: '🇺🇾', iso: 'uy', group: 'I' },
  { id: 'cmr', name: 'קמרון', flag: '🇨🇲', iso: 'cm', group: 'I' },
  { id: 'pan', name: 'פנמה', flag: '🇵🇦', iso: 'pa', group: 'I' },
  
  // Group J
  { id: 'por', name: 'פורטוגל', flag: '🇵🇹', iso: 'pt', group: 'J' },
  { id: 'bel', name: 'בלגיה', flag: '🇧🇪', iso: 'be', group: 'J' },
  { id: 'mli', name: 'מאלי', flag: '🇲🇱', iso: 'ml', group: 'J' },
  { id: 'crc', name: 'קוסטה ריקה', flag: '🇨🇷', iso: 'cr', group: 'J' },
  
  // Group K
  { id: 'ned', name: 'הולנד', flag: '🇳🇱', iso: 'nl', group: 'K' },
  { id: 'srb', name: 'סרביה', flag: '🇷🇸', iso: 'rs', group: 'K' },
  { id: 'jam', name: 'ג\'מייקה', flag: '🇯🇲', iso: 'jm', group: 'K' },
  { id: 'per', name: 'פרו', flag: '🇵🇪', iso: 'pe', group: 'K' },
  
  // Group L
  { id: 'pol', name: 'פולין', flag: '🇵🇱', iso: 'pl', group: 'L' },
  { id: 'sco', name: 'סקוטלנד', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', iso: 'gb-sct', group: 'L' },
  { id: 'qat', name: 'קטר', flag: '🇶🇦', iso: 'qa', group: 'L' },
  { id: 'chi', name: 'צ\'ילה', flag: '🇨🇱', iso: 'cl', group: 'L' }
];

// Let's modify the G/Tunisia line to use 'tn' for the flag to match flagcdn perfectly.
TEAMS.find(t => t.id === 'tun')!.iso = 'tn';

export const TOP_SCORERS: Player[] = [
  { 
    id: 'mbappe', 
    name: 'קיליאן אמבפה', 
    team: 'צרפת', 
    flag: '🇫🇷', 
    iso: 'fr',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Kylian_Mbapp%C3%A9_2020.jpg/240px-Kylian_Mbapp%C3%A9_2020.jpg' 
  },
  { 
    id: 'kane', 
    name: 'הארי קיין', 
    team: 'אנגליה', 
    flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', 
    iso: 'gb-eng',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Harry_Kane_2018.jpg/240px-Harry_Kane_2018.jpg' 
  },
  { 
    id: 'haaland', 
    name: 'ארלינג האלנד', 
    team: 'נורווגיה', 
    flag: '🇳🇴', 
    iso: 'no',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Erling_Haaland_2023_%28cropped%29.jpg/240px-Erling_Haaland_2023_%28cropped%29.jpg' 
  },
  { 
    id: 'messi', 
    name: 'ליונל מסי', 
    team: 'ארגנטינה', 
    flag: '🇦🇷', 
    iso: 'ar',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Lionel_Messi_2018.jpg/240px-Lionel_Messi_2018.jpg' 
  },
  { 
    id: 'yamal', 
    name: 'לאמין ימאל', 
    team: 'ספרד', 
    flag: '🇪🇸', 
    iso: 'es',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Lamine_Yamal_Euro_2024_%28cropped%29.jpg/240px-Lamine_Yamal_Euro_2024_%28cropped%29.jpg' 
  },
  { 
    id: 'vinicius', 
    name: 'ויניסיוס ג\'וניור', 
    team: 'ברזיל', 
    flag: '🇧🇷', 
    iso: 'br',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Vinicius_Jr_2021.jpg/240px-Vinicius_Jr_2021.jpg' 
  },
  { 
    id: 'lautaro', 
    name: 'לאוטרו מרטינז', 
    team: 'ארגנטינה', 
    flag: '🇦🇷', 
    iso: 'ar',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Lautaro_Mart%C3%ADnez_Argentina_2022.jpg/240px-Lautaro_Mart%C3%ADnez_Argentina_2022.jpg' 
  },
  { 
    id: 'ronaldo', 
    name: 'כריסטיאנו רונאלדו', 
    team: 'פורטוגל', 
    flag: '🇵🇹', 
    iso: 'pt',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis_FC%2C_September_2023_%28cropped%29.jpg/240px-Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis_FC%2C_September_2023_%28cropped%29.jpg' 
  },
  { 
    id: 'lewandowski', 
    name: 'רוברט לבנדובסקי', 
    team: 'פולין', 
    flag: '🇵🇱', 
    iso: 'pl',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Robert_Lewandowski%2C_Poland-de_2023_%28cropped%29.jpg/240px-Robert_Lewandowski%2C_Poland-de_2023_%28cropped%29.jpg' 
  },
  { 
    id: 'morata', 
    name: 'אלברו מוראטה', 
    team: 'ספרד', 
    flag: '🇪🇸', 
    iso: 'es',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/%C3%81lvaro_Morata_Euro_2024_%28cropped%29.jpg/240px-%C3%81lvaro_Morata_Euro_2024_%28cropped%29.jpg' 
  },
  { 
    id: 'alvarez', 
    name: 'חוליאן אלברז', 
    team: 'ארגנטינה', 
    flag: '🇦🇷', 
    iso: 'ar',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Juli%C3%A1n_%C3%81lvarez_2022.jpg/240px-Juli%C3%A1n_%C3%81lvarez_2022.jpg' 
  },
  { 
    id: 'osimhen', 
    name: 'ויקטור אוסימהן', 
    team: 'ניגריה', 
    flag: '🇳🇬', 
    iso: 'ng',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Victor_Osimhen_2021_%28cropped%29.jpg/240px-Victor_Osimhen_2021_%28cropped%29.jpg' 
  },
  { 
    id: 'bellingham', 
    name: 'ג\'וד בלינגהאם', 
    team: 'אנגליה', 
    flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', 
    iso: 'gb-eng',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Jude_Bellingham_2023_%28cropped%29.jpg/240px-Jude_Bellingham_2023_%28cropped%29.jpg' 
  },
  { 
    id: 'saka', 
    name: 'בוקאיו סאקה', 
    team: 'אנגליה', 
    flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', 
    iso: 'gb-eng',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Bukayo_Saka_2022.jpg/240px-Bukayo_Saka_2022.jpg' 
  },
  { 
    id: 'foden', 
    name: 'פיל פודן', 
    team: 'אנגליה', 
    flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', 
    iso: 'gb-eng',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Phil_Foden_2022.jpg/240px-Phil_Foden_2022.jpg' 
  },
  { 
    id: 'son', 
    name: 'סון יונג-מין', 
    team: 'דרום קוריאה', 
    flag: '🇰🇷', 
    iso: 'kr',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Son_Heung-min_2022.jpg/240px-Son_Heung-min_2022.jpg' 
  }
].sort((a, b) => a.name.localeCompare(b.name, 'he'));
