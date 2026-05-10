import { Request, Response } from "express";
import { generateAcessToken } from "../utils/generateTokens";

import {

  createBusinessService,
  getBusinessByUserService,
} from "../services/authServices";
import User from "../models/User";
import { ZodError } from "zod";




// ------------ Business USER ----------------

//  le flow logique ( au moment du login on envoie au cookies le token (via le back end))
// par la suite le authMidlleware reacuprer le token et retrive le user pour utiliser le ID

export const createBusinessController = async (req: any, res: any) => {
  try {
    // on recuper le user via le token a travers le autMiddlware
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        message: "User not authenticated",
      });
    }

    const business = await createBusinessService({
      ...req.body,  // tout le reste du data
      user: userId, // le ID du user
    });

    const getUser = await User.findById(userId)

    if (getUser) {
      getUser.hasCompletedOnboarding = true;
      await getUser.save();
    }

    return res.status(201).json({
      message: "Business created successfully",
      data: business,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// get Busines

export const getBusinessByUserController = async (req: any, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const business = await getBusinessByUserService(userId);

    return res.status(200).json(business);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

