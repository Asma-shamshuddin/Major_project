// import dotenv from "dotenv"
// dotenv.config()
// import axios from "axios"


// const BASE_URL = "https://www.googleapis.com/youtube/v3/search"


// const searchVideo = async (topic) => {
//   try {
//     let query = `Virtual Code ${topic}`
//     let { data } = await axios.get(BASE_URL, {
//       params: {
//         key: process.env.YOUTUBE_API_KEY,
//         part: "snippet",
//         q: query,
//         maxResults: 1,
//         type: "video",
//       },
//     })

//     if (data.items.length > 0) {
//       const video = data.items[0];

//       if (
//         video.snippet.channelTitle
//           .toLowerCase()
//           .includes("virtual code")
//       ) {
//         return {
//           title: video.snippet.title,
//           channel: video.snippet.channelTitle,
//           url: `https://www.youtube.com/watch?v=${video.id.videoId}`,
//         };
//       }
//     }


//      query = `${topic} tutorial`;

//      ({ data } = await axios.get(BASE_URL, {
//       params: {
//         key: process.env.YOUTUBE_API_KEY,
//         part: "snippet",
//         q: query,
//         maxResults: 1,
//         type: "video",
//       },
//     }))

//     if (data.items.length > 0) {
//       const video = data.items[0];

//         return {
//           title: video.snippet.title,
//           channel: video.snippet.channelTitle,
//           url: `https://www.youtube.com/watch?v=${video.id.videoId}`,
//         };
//       }
    
//       return null

//   } catch (error) {


//     console.log(error)
//     return null;

//   }
// }

// export default searchVideo



//chatgpt


import dotenv from "dotenv";
dotenv.config();

import axios from "axios";

const BASE_URL = "https://www.googleapis.com/youtube/v3/search";

const searchVideo = async (topic) => {
  const apiKey = process.env.YOUTUBE_API_KEY;

  console.log("YouTube API key loaded:", Boolean(apiKey));
  console.log("Searching YouTube for:", topic);

  if (!apiKey) {
    console.log("ERROR: YOUTUBE_API_KEY is missing");
    return null;
  }

  try {
    const query = `${topic} tutorial`;

    const { data } = await axios.get(BASE_URL, {
      params: {
        key: apiKey,
        part: "snippet",
        q: query,
        maxResults: 3,
        type: "video",
      },
    });

    console.log("YouTube videos found:", data.items?.length || 0);

    if (data.items?.length > 0) {
      const video = data.items[0];

      return {
        title: video.snippet.title,
        channel: video.snippet.channelTitle,
        url: `https://www.youtube.com/watch?v=${video.id.videoId}`,
      };
    }

    console.log("No YouTube videos found for:", topic);
    return null;

  } catch (error) {
    console.log(
      "YouTube API ERROR:",
      error.response?.data || error.message
    );

    return null;
  }
};

export default searchVideo;
