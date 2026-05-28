export interface Team {
  id: string;
  name: string;
  flag: string;
  iso: string;
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
  // Hosts
  { id: 'usa', name: 'ארה"ב', flag: '🇺🇸', iso: 'us' },
  { id: 'mex', name: 'מקסיקו', flag: '🇲🇽', iso: 'mx' },
  { id: 'can', name: 'קנדה', flag: '🇨🇦', iso: 'ca' },
  
  // UEFA (Europe)
  { id: 'fra', name: 'צרפת', flag: '🇫🇷', iso: 'fr' },
  { id: 'eng', name: 'אנגליה', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', iso: 'gb-eng' },
  { id: 'esp', name: 'ספרד', flag: '🇪🇸', iso: 'es' },
  { id: 'ger', name: 'גרמניה', flag: '🇩🇪', iso: 'de' },
  { id: 'por', name: 'פורטוגל', flag: '🇵🇹', iso: 'pt' },
  { id: 'ned', name: 'הולנד', flag: '🇳🇱', iso: 'nl' },
  { id: 'ita', name: 'איטליה', flag: '🇮🇹', iso: 'it' },
  { id: 'bel', name: 'בלגיה', flag: '🇧🇪', iso: 'be' },
  { id: 'cro', name: 'קרואטיה', flag: '🇭🇷', iso: 'hr' },
  { id: 'sui', name: 'שוויץ', flag: '🇨🇭', iso: 'ch' },
  { id: 'den', name: 'דנמרק', flag: '🇩🇰', iso: 'dk' },
  { id: 'aut', name: 'אוסטריה', flag: '🇦🇹', iso: 'at' },
  { id: 'swe', name: 'שוודיה', flag: '🇸🇪', iso: 'se' },
  { id: 'srb', name: 'סרביה', flag: '🇷🇸', iso: 'rs' },
  { id: 'sco', name: 'סקוטלנד', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', iso: 'gb-sct' },
  { id: 'pol', name: 'פולין', flag: '🇵🇱', iso: 'pl' },
  
  // CONMEBOL (South America)
  { id: 'arg', name: 'ארגנטינה', flag: '🇦🇷', iso: 'ar' },
  { id: 'bra', name: 'ברזיל', flag: '🇧🇷', iso: 'br' },
  { id: 'uru', name: 'אורוגוואי', flag: '🇺🇾', iso: 'uy' },
  { id: 'col', name: 'קולומביה', flag: '🇨🇴', iso: 'co' },
  { id: 'ecu', name: 'אקוודור', flag: '🇪🇨', iso: 'ec' },
  { id: 'ven', name: 'ונצואלה', flag: '🇻🇪', iso: 've' },
  
  // CONCACAF (North/Central America & Caribbean)
  { id: 'pan', name: 'פנמה', flag: '🇵🇦', iso: 'pa' },
  { id: 'crc', name: 'קוסטה ריקה', flag: '🇨🇷', iso: 'cr' },
  { id: 'jam', name: 'ג\'מייקה', flag: '🇯🇲', iso: 'jm' },
  
  // CAF (Africa)
  { id: 'mar', name: 'מרוקו', flag: '🇲🇦', iso: 'ma' },
  { id: 'sen', name: 'סנגל', flag: '🇸🇳', iso: 'sn' },
  { id: 'egy', name: 'מצרים', flag: '🇪🇬', iso: 'eg' },
  { id: 'nga', name: 'ניגריה', flag: '🇳🇬', iso: 'ng' },
  { id: 'civ', name: 'חוף השנהב', flag: '🇨🇮', iso: 'ci' },
  { id: 'alg', name: 'אלג\'יריה', flag: '🇩🇿', iso: 'dz' },
  { id: 'cmr', name: 'קמרון', flag: '🇨🇲', iso: 'cm' },
  { id: 'mli', name: 'מאלי', flag: '🇲🇱', iso: 'ml' },
  { id: 'tun', name: 'תוניסיה', flag: '🇹🇳', iso: 'tn' },
  
  // AFC (Asia)
  { id: 'jpn', name: 'יפן', flag: '🇯🇵', iso: 'jp' },
  { id: 'kor', name: 'דרום קוריאה', flag: '🇰🇷', iso: 'kr' },
  { id: 'irn', name: 'איראן', flag: '🇮🇷', iso: 'ir' },
  { id: 'aus', name: 'אוסטרליה', flag: '🇦🇺', iso: 'au' },
  { id: 'ksa', name: 'ערב הסעודית', flag: '🇸🇦', iso: 'sa' },
  { id: 'qat', name: 'קטר', flag: '🇶🇦', iso: 'qa' },
  { id: 'irq', name: 'עיראק', flag: '🇮🇶', iso: 'iq' },
  { id: 'uzb', name: 'אוזבקיסטן', flag: '🇺🇿', iso: 'uz' },
  
  // OFC (Oceania)
  { id: 'nzl', name: 'ניו זילנד', flag: '🇳🇿', iso: 'nz' },
  
  // Playoff / Borderline potentials to complete 48
  { id: 'per', name: 'פרו', flag: '🇵🇪', iso: 'pe' },
  { id: 'chi', name: 'צ\'ילה', flag: '🇨🇱', iso: 'cl' }
].sort((a, b) => a.name.localeCompare(b.name, 'he')); // Sort alphabetically in Hebrew

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
