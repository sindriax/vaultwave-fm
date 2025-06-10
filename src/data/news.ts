export interface NewsItem {
  id: number;
  message: string;
  priority: "low" | "normal" | "high" | "emergency";
  category: "system" | "security" | "environmental" | "operational" | "social";
  timestamp?: string;
}

export const newsItems: string[] = [
  "VAULT-TEC SYSTEMS OPERATIONAL... ALL GREEN",
  "RADIATION LEVELS NOMINAL IN SECTOR 7",
  "WATER PURIFICATION SYSTEM: 98% EFFICIENCY",
  "TEMPERATURE CONTROLS FUNCTIONING NORMALLY",
  "BROTHERHOOD PATROL SPOTTED NEAR SECTOR 12",
  "SUPPLY DROP SCHEDULED FOR 1400 HOURS",
  "PERIMETER DEFENSES ACTIVE AND MONITORING",
  "POWER GRID OPERATING AT OPTIMAL CAPACITY",
  "AIR FILTRATION SYSTEMS: STATUS NOMINAL",
  "MEDICAL BAY REPORTING ALL CLEAR",
  "FOOD STORES: 847 DAYS REMAINING",
  "REACTOR CORE TEMPERATURE: STABLE",
  "COMMUNICATIONS ARRAY: OPERATIONAL",
  "MAINTENANCE CREW DEPLOYED TO LEVEL 3",
  "SECURITY CHECKPOINT ALPHA: ALL CLEAR",
];

export const emergencyNews: string[] = [
  "⚠ RADIATION SPIKE DETECTED IN SECTOR 12",
  "⚠ CONTAINMENT BREACH - LEVEL 2 LOCKDOWN",
  "⚠ POWER FLUCTUATION - BACKUP SYSTEMS ACTIVE",
  "⚠ HULL BREACH DETECTED - EMERGENCY PROTOCOLS",
  "⚠ MUTANT ACTIVITY NEAR PERIMETER",
  "⚠ WATER CONTAMINATION - PURIFICATION OFFLINE",
];

export const specialAnnouncements: string[] = [
  "🎵 NOW PLAYING ON VAULTWAVE FM...",
  "📻 TUNE IN FOR THE LATEST WASTELAND HITS",
  "🔊 THIS IS VAULTWAVE FM, YOUR ATOMIC COMPANION",
  "⚡ BROADCASTING FROM VAULT 111",
  "🎶 KEEPING THE WASTELAND ENTERTAINED",
  "📡 SIGNAL STRENGTH: EXCELLENT",
];

export const getRandomNews = (): string => {
  const randomIndex = Math.floor(Math.random() * newsItems.length);
  return newsItems[randomIndex];
};

export const getEmergencyNews = (): string => {
  const randomIndex = Math.floor(Math.random() * emergencyNews.length);
  return emergencyNews[randomIndex];
};

export const getSpecialAnnouncement = (): string => {
  const randomIndex = Math.floor(Math.random() * specialAnnouncements.length);
  return specialAnnouncements[randomIndex];
};

export const newsConfig = {
  rotationInterval: 5000,
  emergencyChance: 0.1, // 10% chance of emergency news
  specialAnnouncementChance: 0.15, // 15% chance of special announcement
};
