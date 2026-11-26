// import api from "../utils/axios"


// export const startInterview = async (data) => {
//     try {
//         const response = await api.post("/api/interview/start" , data)
//         return response.data
//     } catch (error) {
//         console.log(error)
//         return null
//     }
// }

// export const getInterview = async (id) => {
//     try {
//         const response = await api.get(`/api/interview/${id}`)
//         console.log(response.data)
//         return response.data
//     } catch (error) {
//         console.log(error)
//         return null
//     }
// }


// export const submitAnswer = async (data) => {
//      try {
//         const response = await api.post(`/api/interview/answer` , data)
       
//         return response.data
//     } catch (error) {
//         console.log(error)
//         return null
//     }
// }

// export const getAllInterviews = async () => {
//      try {
//         const response = await api.get(`/api/interview/all`)
//         console.log(response.data)
//         return response.data
//     } catch (error) {
//         console.log(error)
//         return null
//     }
// }


// //chatgpt code 😄😄😄😄😄😄😄😄


import api from "../utils/axios";

export const startInterview = async (data) => {
  try {
    const response = await api.post("/api/interview/start", data);
    return response.data;
  } catch (error) {
    console.log("Start interview error:", error);
    return null;
  }
};

export const getInterview = async (id) => {
  try {
    const response = await api.get(`/api/interview/${id}`);
    return response.data;
  } catch (error) {
    console.log("Get interview error:", error);
    return null;
  }
};

export const submitAnswer = async (data) => {
  try {
    const response = await api.post("/api/interview/answer", data);
    return response.data;
  } catch (error) {
    console.log("Submit answer error:", error);
    return null;
  }
};

export const getAllInterviews = async () => {
  try {
    const response = await api.get("/api/interview/all");
    return response.data;
  } catch (error) {
    console.log("Get all interviews error:", error);
    return null;
  }
};

// End interview
export const endInterview = async (interviewId, endReason) => {
    try {
        const response = await api.post("/api/interview/end", {
            interviewId,
            endReason,
        });

        return response.data;

    } catch (error) {
        console.error("Status:", error.response?.status);
        console.error("Backend message:", error.response?.data);
        console.error("Request data:", {
            interviewId,
            endReason,
        });

        throw error;
    }
};