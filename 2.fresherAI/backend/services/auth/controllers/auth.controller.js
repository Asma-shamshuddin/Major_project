import crypto from "crypto";

import { getAuth } from "firebase-admin/auth";


import { app } from "../configs/firebase.js";
import User from "../model/user.model.js";
import  redis from "../../../shared/redis/redis.js";



export const login = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Firebase token is required",
      });
    }

    const decoded = await getAuth(app).verifyIdToken(token);

    let user = await User.findOne({
      firebaseUid: decoded.uid,
    });

    if (!user) {
      // Check whether the email already exists
      user = await User.findOne({
        email: decoded.email,
      });

      if (user) {
        // Link the existing account to Firebase
        user.firebaseUid = decoded.uid;

        if (!user.name && decoded.name) {
          user.name = decoded.name;
        }

        await user.save();
      } else {
        // Create a new user only if the email doesn't exist
        user = await User.create({
          firebaseUid: decoded.uid,
          email: decoded.email,
          name: decoded.name,
        });
      }
    }

    const sessionId = crypto.randomUUID();

    await redis.set(
      `session:${sessionId}`,
      JSON.stringify({
        userId: user._id,
        name: user.name,
        email: user.email,
        interviewCoin: user.interviewCoin,
      }),
      "EX",
      60 * 60 * 24 * 7
    );

    res.cookie("session", sessionId, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return res.json({
      success: true,
      user,
    });

  } catch (error) {
    console.error("Login Error:", error);

    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};


export const logout = async (req, res) => {
  try {

    const sessionId = req.cookies?.session;

    if (sessionId) {
      await redis.del(`session:${sessionId}`);
    }

    res.clearCookie("session", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return res.json({
      success: true,
      message: "Logged out successfully",
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
export const useInterviewCoins = async (req, res) => {
    try {
        // Get session ID
        const sessionId = req.cookies?.session;

        if (!sessionId) {
            return res.status(401).json({
                success: false,
                message: "Session not found. Please login again."
            });
        }

        // Get session from Redis
        const session = await redis.get(`session:${sessionId}`);

        if (!session) {
            return res.status(401).json({
                success: false,
                message: "Session expired. Please login again."
            });
        }

        const sessionData = JSON.parse(session);

        const { coins, action } = req.body;

        if (!coins || !Number.isFinite(Number(coins)) || Number(coins) <= 0) {
            return res.status(400).json({
                success: false,
                message: "Valid coins are required"
            });
        }

        const user = await User.findById(sessionData.userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (user.interviewCoin < Number(coins)) {
            return res.status(403).json({
                success: false,
                message: "Not enough interview coins",
                interviewCoin: user.interviewCoin
            });
        }

        // Deduct coins
        user.interviewCoin -= Number(coins);

        await user.save();

        // Update Redis session
        await redis.set(
            `session:${sessionId}`,
            JSON.stringify({
                userId: user._id,
                name: user.name,
                email: user.email,
                interviewCoin: user.interviewCoin
            }),
            "EX",
            60 * 60 * 24 * 7
        );

        return res.status(200).json({
            success: true,
            message: "Interview coins updated successfully",
            action,
            interviewCoin: user.interviewCoin
        });

    } catch (error) {
        console.error("Use Interview Coins Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



export const addCoins = async (req, res) => {
  try {
    const sessionId = req.cookies?.session;

    const session = await redis.get(`session:${sessionId}`);

    if (!session) {
      return res.status(401).json({
        success: false,
        message: "Session expired",
      });
    }

    const sessionData = JSON.parse(session);

    const { coins } = req.body;

    if (!coins || coins <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid coins are required",
      });
    }

    const user = await User.findById(sessionData.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.interviewCoin += Number(coins);

    await user.save();

    // Update Redis Session
    await redis.set(
      `session:${sessionId}`,
      JSON.stringify({
        userId: user._id,
        name: user.name,
        email: user.email,
        interviewCoin: user.interviewCoin,
      }),
      "EX",
      60 * 60 * 24 * 7
    );

    return res.status(200).json({
      success: true,
      message: "Coins added successfully",
      interviewCoin: user.interviewCoin,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};