// import redis from "../../../shared/redis/redis.js";
// import graph from "../graph/roadmap.graph.js";
// import Roadmap from "../models/roadmap.model.js";



// export const generateRoadmap =async (req,res)=> {
//     try {
//         const {
//             role,
//       targetPackage,
//       useResume = false,
//       resume,} = req.body;

//       const userId = req.headers["x-user-id"]

//       if(!role || !targetPackage){
//         return res.status(400).json({
//         success: false,
//         message: "Role and Target Package are required.",
//       });}

//       if(useResume && !resume){
//          return res.status(400).json({
//         success: false,
//         message: "Resume data is required.",
//       });
//       }

//       const result = await graph.invoke({
//         role,
//       targetPackage,
//       useResume,
//       resume,
//       })

//       const roadmap = await Roadmap.create({
//         userId,
//         ...result.roadmap
//       })

//       await redis.set(`roadmap:${roadmap._id}`,JSON.stringify(roadmap),"EX", 60*60)

//       await redis.del(`userRoadmaps:${userId}`)

//       return res.status(201).json({
//       success: true,
//       message: "Roadmap generated successfully.",
//       data: roadmap,
//     });


//     } catch (error) {
//         console.log(error);

//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//     }
// }


// export const getAllRoadmap = async (req,res) => {
//     try {
//         const userId = req.headers["x-user-id"]
//         const cache = await redis.get(`userRoadmaps:${userId}`)

//         if(cache){
//             return res.status(200).json({
//         success: true,
//         data: JSON.parse(cache),
//       })
//         }

//         const roadmaps = await Roadmap.find({userId}).sort({createdAt: -1})

//         await redis.set(`userRoadmaps:${userId}`,JSON.stringify(roadmaps),"EX",60*60)

//     return res.json({
//       success: true,
//       data: roadmaps,
//     });
//     } catch (error) {
//        console.log(error);

//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//     }
// }

// export const getRoadmapbyId = async (req,res) => {
//     try {
//         const {id} = req.params;
//         const userId = req.headers["x-user-id"];

//         const cache = await redis.get(`roadmap:${id}`)
//         if(cache){
//             return res.json({
//                 success: true,
//                 fromCache: true,
//                 data: JSON.parse(cache)
//             });

//         }

//         const roadmap = await Roadmap.findOne({
//              _id: id,
//             userId:userId
//         })

//         if(!roadmap){
//             return res.status(404).json({
//                 success: false,
//                 message: "Roadmap not found"
//             });
//         }

//         await redis.set(`roadmap:${id}`,JSON.stringify(roadmap),"EX", 60*60)

//         return res.json({
//             success: true,
//             fromCache: false,
//             data: roadmap
//         });
//     } catch (error) {
//       console.log(error);

//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//     }  
    
// }



//chatgpt code 😄😄😄😄😄


import redis from "../../../shared/redis/redis.js";
import graph from "../graph/roadmap.graph.js";
import Roadmap from "../models/roadmap.model.js";

export const generateRoadmap = async (req, res) => {
    try {
        const {
            role,
            targetPackage,
            useResume = false,
            resume
        } = req.body;

        const userId = req.headers["x-user-id"];

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated."
            });
        }

        if (!role || !targetPackage) {
            return res.status(400).json({
                success: false,
                message: "Role and Target Package are required."
            });
        }

        if (useResume && !resume) {
            return res.status(400).json({
                success: false,
                message: "Resume data is required."
            });
        }

        const result = await graph.invoke({
            role,
            targetPackage,
            useResume,
            resume
        });

        const roadmap = await Roadmap.create({
            userId,
            ...result.roadmap
        });

        await redis.set(
            `roadmap:${roadmap._id}`,
            JSON.stringify(roadmap),
            "EX",
            60 * 60
        );

        await redis.del(`userRoadmaps:${userId}`);

        return res.status(201).json({
            success: true,
            message: "Roadmap generated successfully.",
            data: roadmap
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const getAllRoadmap = async (req, res) => {
    try {
        const userId = req.headers["x-user-id"];

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated."
            });
        }

        const cache = await redis.get(`userRoadmaps:${userId}`);

        if (cache) {
            return res.status(200).json({
                success: true,
                data: JSON.parse(cache)
            });
        }

        const roadmaps = await Roadmap.find({ userId })
            .sort({ createdAt: -1 });

        await redis.set(
            `userRoadmaps:${userId}`,
            JSON.stringify(roadmaps),
            "EX",
            60 * 60
        );

        return res.status(200).json({
            success: true,
            data: roadmaps
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const getRoadmapbyId = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.headers["x-user-id"];

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated."
            });
        }

        const cache = await redis.get(`roadmap:${id}`);

        if (cache) {
            const cachedRoadmap = JSON.parse(cache);

            // Check ownership before returning cached data
            if (String(cachedRoadmap.userId) !== String(userId)) {
                return res.status(404).json({
                    success: false,
                    message: "Roadmap not found."
                });
            }

            return res.status(200).json({
                success: true,
                fromCache: true,
                data: cachedRoadmap
            });
        }

        const roadmap = await Roadmap.findOne({
            _id: id,
            userId: userId
        });

        if (!roadmap) {
            return res.status(404).json({
                success: false,
                message: "Roadmap not found."
            });
        }

        await redis.set(
            `roadmap:${id}`,
            JSON.stringify(roadmap),
            "EX",
            60 * 60
        );

        return res.status(200).json({
            success: true,
            fromCache: false,
            data: roadmap
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// DELETE INDIVIDUAL ROADMAP
export const deleteRoadmap = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.headers["x-user-id"];

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated."
            });
        }

        // Delete only the roadmap belonging to this user
        const roadmap = await Roadmap.findOneAndDelete({
            _id: id,
            userId: userId
        });

        if (!roadmap) {
            return res.status(404).json({
                success: false,
                message: "Roadmap not found."
            });
        }

        // Clear Redis caches
        await redis.del(`roadmap:${id}`);
        await redis.del(`userRoadmaps:${userId}`);

        return res.status(200).json({
            success: true,
            message: "Roadmap deleted successfully."
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
