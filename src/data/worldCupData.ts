export const TEAMS = [
  // Hosts
  { id: 'usa', name: 'ארה"ב', flag: '🇺🇸' },
  { id: 'mex', name: 'מקסיקו', flag: '🇲🇽' },
  { id: 'can', name: 'קנדה', flag: '🇨🇦' },
  
  // UEFA (Europe)
  { id: 'fra', name: 'צרפת', flag: '🇫🇷' },
  { id: 'eng', name: 'אנגליה', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { id: 'esp', name: 'ספרד', flag: '🇪🇸' },
  { id: 'ger', name: 'גרמניה', flag: '🇩🇪' },
  { id: 'por', name: 'פורטוגל', flag: '🇵🇹' },
  { id: 'ned', name: 'הולנד', flag: '🇳🇱' },
  { id: 'ita', name: 'איטליה', flag: '🇮🇹' },
  { id: 'bel', name: 'בלגיה', flag: '🇧🇪' },
  { id: 'cro', name: 'קרואטיה', flag: '🇭🇷' },
  { id: 'sui', name: 'שוויץ', flag: '🇨🇭' },
  { id: 'den', name: 'דנמרק', flag: '🇩🇰' },
  { id: 'aut', name: 'אוסטריה', flag: '🇦🇹' },
  { id: 'swe', name: 'שוודיה', flag: '🇸🇪' },
  { id: 'srb', name: 'סרביה', flag: '🇷🇸' },
  { id: 'sco', name: 'סקוטלנד', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
  { id: 'pol', name: 'פולין', flag: '🇵🇱' },
  
  // CONMEBOL (South America)
  { id: 'arg', name: 'ארגנטינה', flag: '🇦🇷' },
  { id: 'bra', name: 'ברזיל', flag: '🇧🇷' },
  { id: 'uru', name: 'אורוגוואי', flag: '🇺🇾' },
  { id: 'col', name: 'קולומביה', flag: '🇨🇴' },
  { id: 'ecu', name: 'אקוודור', flag: '🇪🇨' },
  { id: 'ven', name: 'ונצואלה', flag: '🇻🇪' },
  
  // CONCACAF (North/Central America & Caribbean)
  { id: 'pan', name: 'פנמה', flag: '🇵🇦' },
  { id: 'crc', name: 'קוסטה ריקה', flag: '🇨🇷' },
  { id: 'jam', name: 'ג\'מייקה', flag: '🇯🇲' },
  
  // CAF (Africa)
  { id: 'mar', name: 'מרוקו', flag: '🇲🇦' },
  { id: 'sen', name: 'סנגל', flag: '🇸🇳' },
  { id: 'egy', name: 'מצרים', flag: '🇪🇬' },
  { id: 'nga', name: 'ניגריה', flag: '🇳🇬' },
  { id: 'civ', name: 'חוף השנהב', flag: '🇨🇮' },
  { id: 'alg', name: 'אלג\'יריה', flag: '🇩🇿' },
  { id: 'cmr', name: 'קמרון', flag: '🇨🇲' },
  { id: 'mli', name: 'מאלי', flag: '🇲🇱' },
  { id: 'tun', name: 'תוניסיה', flag: '🇹🇳' },
  
  // AFC (Asia)
  { id: 'jpn', name: 'יפן', flag: '🇯🇵' },
  { id: 'kor', name: 'דרום קוריאה', flag: '🇰🇷' },
  { id: 'irn', name: 'איראן', flag: '🇮🇷' },
  { id: 'aus', name: 'אוסטרליה', flag: '🇦🇺' },
  { id: 'ksa', name: 'ערב הסעודית', flag: '🇸🇦' },
  { id: 'qat', name: 'קטר', flag: '🇶🇦' },
  { id: 'irq', name: 'עיראק', flag: '🇮🇶' },
  { id: 'uzb', name: 'אוזבקיסטן', flag: '🇺🇿' },
  
  // OFC (Oceania)
  { id: 'nzl', name: 'ניו זילנד', flag: '🇳🇿' },
  
  // Playoff / Borderline potentials to complete 48
  { id: 'per', name: 'פרו', flag: '🇵🇪' },
  { id: 'chi', name: 'צ\'ילה', flag: '🇨🇱' }
].sort((a, b) => a.name.localeCompare(b.name, 'he')); // Sort alphabetically in Hebrew

export const TOP_SCORERS = [
  { id: 'mbappe', name: 'קיליאן אמבפה', team: 'צרפת', flag: '🇫🇷' },
  { id: 'kane', name: 'הארי קיין', team: 'אנגליה', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { id: 'haaland', name: 'ארלינג האלנד', team: 'נורווגיה', flag: '🇳🇴' },
  { id: 'messi', name: 'ליונל מסי', team: 'ארגנטינה', flag: '🇦🇷' },
  { id: 'yamal', name: 'לאמין ימאל', team: 'ספרד', flag: '🇪🇸' },
  { id: 'vinicius', name: 'ויניסיוס ג\'וניור', team: 'ברזיל', flag: '🇧🇷' },
  { id: 'lautaro', name: 'לאוטרו מרטינז', team: 'ארגנטינה', flag: '🇦🇷' },
  { id: 'ronaldo', name: 'כריסטיאנו רונאלדו', team: 'פורטוגל', flag: '🇵🇹' },
  { id: 'lewandowski', name: 'רוברט לבנדובסקי', team: 'פולין', flag: '🇵🇱' },
  { id: 'morata', name: 'אלברו מוראטה', team: 'ספרד', flag: '🇪🇸' },
  { id: 'alvarez', name: 'חוליאן אלברז', team: 'ארגנטינה', flag: '🇦🇷' },
  { id: 'osimhen', name: 'ויקטור אוסימהן', team: 'ניגריה', flag: '🇳🇬' },
  { id: 'bellingham', name: 'ג\'וד בלינגהאם', team: 'אנגליה', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { id: 'saka', name: 'בוקאיו סאקה', team: 'אנגליה', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { id: 'foden', name: 'פיל פודן', team: 'אנגליה', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { id: 'son', name: 'סון יונג-מין', team: 'דרום קוריאה', flag: '🇰🇷' },
].sort((a, b) => a.name.localeCompare(b.name, 'he'));
