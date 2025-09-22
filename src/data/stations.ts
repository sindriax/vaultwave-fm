export interface RadioStation {
  id: number;
  name: string;
  frequency: string;
  genre: string;
  audioUrl: string;
  description?: string;
  fallbackUrl?: string;
}

export const radioStations: RadioStation[] = [
  // {
  //   id: 8,
  //   name: "VAULT-TEC RADIO",
  //   frequency: "101.5",
  //   genre: "Classical/Orchestral",
  //   audioUrl: "https://www.internet-radio.com/station/megatoncafe/",
  //   description: "Vault-Tec approved classical music for enhanced productivity",
  //   fallbackUrl: "https://www.internet-radio.com/station/megatoncafe/", // Backup stream
  // },
  {
    id: 1,
    name: "MEGATON CAFE RADIO",
    frequency: "100.9",
    genre: "Swing/Jazz/Blues/Big Band/Oldies",
    audioUrl: "/api/stream?url=" + encodeURIComponent("http://us2.internet-radio.com:8443/;stream"),
    description:
      "A Blast... From the Past! Playing original recordings from the 1920s to 1950s",
    fallbackUrl: "/api/stream?url=" + encodeURIComponent("http://us2.internet-radio.com:8443/;"),
  },
  //   {
  //     id: 2,
  //     name: "DIAMOND CITY RADIO",
  //     frequency: "102.1",
  //     genre: "Jazz & Swing",
  //     audioUrl: "https://stream.zeno.fm/f3wvbbqmdg8uv",
  //     description: "Smooth jazz from the Commonwealth's premier settlement",
  //     fallbackUrl: "https://stream.zeno.fm/jazz-backup",
  //   },
  //   {
  //     id: 3,
  //     name: "RADIO NEW VEGAS",
  //     frequency: "103.7",
  //     genre: "50s Oldies",
  //     audioUrl: "https://stream.zeno.fm/eq8kp7rfag8uv",
  //     description: "Pre-war hits from the Mojave Wasteland",
  //     fallbackUrl: "https://stream.zeno.fm/oldies-backup",
  //   },
  //   {
  //     id: 4,
  //     name: "WASTELAND WAVES",
  //     frequency: "104.3",
  //     genre: "Lo-Fi Ambient",
  //     audioUrl: "https://stream.zeno.fm/fyn8eh61f5zuv",
  //     description: "Atmospheric sounds for wasteland wandering",
  //     fallbackUrl: "https://stream.zeno.fm/lofi-backup",
  //   },
  //   {
  //     id: 5,
  //     name: "ATOMIC RADIO",
  //     frequency: "105.9",
  //     genre: "Post-War Blues",
  //     audioUrl: "https://stream.zeno.fm/0wupkqm1ag8uv",
  //     description: "Blues for the nuclear age",
  //     fallbackUrl: "https://stream.zeno.fm/blues-backup",
  //   },
];

// export const alternativeStations: RadioStation[] = [
//   {
//     id: 6,
//     name: "ENCLAVE RADIO",
//     frequency: "106.5",
//     genre: "Patriotic/Military",
//     audioUrl: "https://stream.zeno.fm/patriotic-stream",
//     description: "America's finest military marches and anthems",
//   },
//   {
//     id: 7,
//     name: "GALAXY NEWS RADIO",
//     frequency: "107.1",
//     genre: "Talk Radio",
//     audioUrl: "https://stream.zeno.fm/talk-radio",
//     description: "Fighting the good fight with music and news",
//   },
// ];

// export const emergencyStation: RadioStation = {
//   id: 0,
//   name: "EMERGENCY BROADCAST",
//   frequency: "000.0",
//   genre: "Emergency",
//   audioUrl: "",
//   description: "Emergency Broadcast System - Please Stand By",
// };

export const getStationById = (id: number): RadioStation | undefined => {
  return radioStations.find((station) => station.id === id);
};

export const getStationByFrequency = (
  frequency: string
): RadioStation | undefined => {
  return radioStations.find((station) => station.frequency === frequency);
};

export const getRandomStation = (): RadioStation => {
  const randomIndex = Math.floor(Math.random() * radioStations.length);
  return radioStations[randomIndex];
};
