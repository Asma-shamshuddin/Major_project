

// // pdf  ---->  pdf Storage  ---> text ---> llm ---> agent ---> promt ---> data ---> save mongoDb ---> redis -->pdf delete ---> resume data ( score , missing skills , recommen.)

// import redis from "../../../shared/redis/redis.js";
// import { resumeAgent } from "../agents/resume.agent.js";
// import extractText from "../config/pdf.js";
// import Resume from "../models/resume.model.js";
// import fs from "fs"


// export const uploadResume = async (req,res) => {
//     try {
//         const file = req.file;
//         if(!file){
//             return res.status(400).json({
//                 success:false,
//                 message:"Resume PDF is required"
//             })
//         }
//         const userId = req.headers["x-user-id"];

//           if(!userId){
//             return res.status(400).json({
//                 success:false,
//                 message:"UserId is required"
//             })
//         }

//         const resumeText = await extractText(file.path)

//         const aiResponse = await resumeAgent(resumeText)

//         const resumeData = JSON.parse(aiResponse)

//         let resume = await Resume.findOne({userId})

//         if(resume){
//             Object.assign(resume,{
//                 ...resumeData,
//                 extractedText:resumeText

//             }    
//             )
//             await resume.save()
//         }else{
//             resume = await Resume.create({
//                 userId,
//                 extractedText:resumeText,
//                 ...resumeData
//             })
//         }

//         await redis.set(`resume:${userId}`,JSON.stringify(resume));

//         await fs.unlinkSync(file.path);

//         return res.status(200).json({
//             success:true,
//             message:"Resume analyzed successfully",
//             data:resume
//         })

        
//     } catch (error) {
//         console.log(error)

//         if(file){
//             await fs.unlinkSync(file.path);
//         }
//         return res.status(500).json({
//             success:false,
//             message:error.message,
//         })
        
//     }
// }


// export const getResume = async (req,res) => {
//     try {
//         const userId = req.headers["x-user-id"];

//     const cache = await redis.get(`resume:${userId}`)

//     if(cache){
//         return res.status(200).json({
//             success:true,
//             source:"redis",
//             data:JSON.parse(cache)
//         })
//     }
//     const resume = await Resume.findOne({userId})

//     if(!resume){
//         return res.status(404).json({
//             success:false,
//             message:"resume not found"
//         })
//     }

//     await redis.set(`resume:${userId}`,JSON.stringify(resume));
   

//      return res.status(200).json({
//             success:true,
//             source:"mongoDb",
//             data:resume
//         })
        
//     } catch (error) {
//         console.log(error)
//          return res.status(500).json({
//             success:false,
//             message:error.message,
//         })
//     }
    


// }

//chatgpt code


import redis from "../../../shared/redis/redis.js";
import { resumeAgent } from "../agents/resume.agent.js";
import extractText from "../config/pdf.js";
import Resume from "../models/resume.model.js";
import fs from "fs";

// ========================================
// UPLOAD AND ANALYZE RESUME
// ========================================

export const uploadResume = async (req, res) => {
    const file = req.file;

    console.log("\n========== RESUME UPLOAD STARTED ==========");

    try {
        // Step 1: Check uploaded file
        console.log("Step 1: Checking uploaded file");

        if (!file) {
            console.log("ERROR: No PDF file received");

            return res.status(400).json({
                success: false,
                message: "Resume PDF is required"
            });
        }

        console.log("File name:", file.originalname);
        console.log("File path:", file.path);

        // Step 2: Check user ID
        console.log("Step 2: Checking user ID");

        const userId = req.headers["x-user-id"];

        if (!userId) {
            console.log("ERROR: User ID missing");

            return res.status(400).json({
                success: false,
                message: "UserId is required"
            });
        }

        console.log("User ID:", userId);

        // Step 3: Extract PDF text
        console.log("Step 3: Extracting PDF text");

        const resumeText = await extractText(file.path);

        if (!resumeText || !resumeText.trim()) {
            throw new Error("No text could be extracted from the PDF");
        }

        console.log("PDF text extracted successfully");
        console.log("Extracted text length:", resumeText.length);

        // Step 4: Analyze resume using AI
        console.log("Step 4: Starting AI resume analysis");

        const aiResponse = await resumeAgent(resumeText);

        console.log("AI response received");

        // Step 5: Parse AI response
        console.log("Step 5: Parsing AI response");

        let resumeData;

        if (typeof aiResponse === "string") {
            const cleanedResponse = aiResponse
                .replace(/```json/gi, "")
                .replace(/```/g, "")
                .trim();

            resumeData = JSON.parse(cleanedResponse);

        } else if (typeof aiResponse?.content === "string") {
            const cleanedResponse = aiResponse.content
                .replace(/```json/gi, "")
                .replace(/```/g, "")
                .trim();

            resumeData = JSON.parse(cleanedResponse);

        } else if (
            typeof aiResponse === "object" &&
            aiResponse !== null
        ) {
            resumeData = aiResponse;

        } else {
            throw new Error("Invalid response received from AI agent");
        }

        console.log("AI response parsed successfully");
        console.log("Resume score:", resumeData.score);

        // Step 6: Save resume in MongoDB
        console.log("Step 6: Saving resume in MongoDB");

        let resume = await Resume.findOne({ userId });

        if (resume) {
            Object.assign(resume, {
                ...resumeData,
                extractedText: resumeText
            });

            await resume.save();

            console.log("Existing resume updated");

        } else {
            resume = await Resume.create({
                userId,
                extractedText: resumeText,
                ...resumeData
            });

            console.log("New resume created");
        }

        // Step 7: Save resume in Redis
        console.log("Step 7: Saving resume in Redis");

        try {
            await redis.set(
                `resume:${userId}`,
                JSON.stringify(resume)
            );

            console.log("Resume saved in Redis");

        } catch (redisError) {
            console.error("Redis cache error:", redisError.message);
        }

        // Step 8: Send response
        console.log("Step 8: Sending successful response");
        console.log("========== RESUME UPLOAD SUCCESS ==========\n");

        return res.status(200).json({
            success: true,
            message: "Resume analyzed successfully",
            data: resume
        });

    } catch (error) {
        console.error("\n========== RESUME UPLOAD FAILED ==========");
        console.error("Error name:", error.name);
        console.error("Error message:", error.message);
        console.error("Full error:", error);
        console.error("===========================================\n");

        return res.status(500).json({
            success: false,
            message: error.message || "Resume upload failed"
        });

    } finally {
        // Step 9: Delete temporary PDF
        if (file?.path) {
            try {
                await fs.promises.unlink(file.path);
                console.log("Temporary PDF deleted");

            } catch (deleteError) {
                console.error(
                    "PDF deletion error:",
                    deleteError.message
                );
            }
        }
    }
};


// ========================================
// GET PREVIOUSLY ANALYZED RESUME
// ========================================

export const getResume = async (req, res) => {
    try {
        console.log("Getting resume data");

        const userId = req.headers["x-user-id"];

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "UserId is required"
            });
        }

        // Check Redis first
        try {
            const cache = await redis.get(`resume:${userId}`);

            if (cache) {
                console.log("Resume fetched from Redis");

                return res.status(200).json({
                    success: true,
                    source: "redis",
                    data: JSON.parse(cache)
                });
            }

        } catch (redisError) {
            console.error("Redis read error:", redisError.message);
        }

        // Fetch from MongoDB
        const resume = await Resume.findOne({ userId });

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found"
            });
        }

        // Update Redis cache
        try {
            await redis.set(
                `resume:${userId}`,
                JSON.stringify(resume)
            );
        } catch (redisError) {
            console.error("Redis write error:", redisError.message);
        }

        console.log("Resume fetched from MongoDB");

        return res.status(200).json({
            success: true,
            source: "mongoDb",
            data: resume
        });

    } catch (error) {
        console.error("Get Resume Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Failed to get resume"
        });
    }
};
