
// Logique métier (hash, DB, emails, tokens…
import User from "../models/User"
import bcrypt from "bcrypt";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail";
import Business, { CreateBusinessDTO } from "../models/Business";
import mongoose from "mongoose";









export const createBusinessService = async (data: CreateBusinessDTO) => {

  const existing = await Business.findOne({ user: data.user });

  if (existing) {
    throw new Error("Un compte business existe déjà pour cet utilisateur.");
  }

  const business = await Business.create(data);

  return business;
};


export const getBusinessByUserService =
  async (userId: string) => {

    const business = await Business.findOne({
      user: new mongoose.Types.ObjectId(userId),
    });

    if (!business) {
      throw new Error("Business not found")
    }

    return business;
  }

