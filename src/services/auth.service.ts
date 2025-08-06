import mongoose from "mongoose";
import { RegisterSchemaType } from "../validators/auth.validator";
import UserModel from "../models/user.model";
import { UnauthorizedException } from "../utils/app-error";
import ReportSettingModel, { ReportFrequencyEnum } from "../models/report-setting.model";
import { calulateNextReportDate } from "../utils/helper";


export const registerService = async (body: RegisterSchemaType) => {
    const { email } = body;
  
    const session = await mongoose.startSession();
  
    try {
      await session.withTransaction(async () => {
        const existingUser = await UserModel.findOne({ email }).session(session);
        if (existingUser) throw new UnauthorizedException("User already exists");
  
        const newUser = new UserModel({
          ...body,
        });
  
        await newUser.save({ session });
  
        const reportSetting = new ReportSettingModel({
          userId: newUser._id,
          frequency: ReportFrequencyEnum.MONTHLY,
          isEnabled: true,
          nextReportDate: calulateNextReportDate(),
          lastSentDate: null,
        });
        await reportSetting.save({ session });
  
        return { user: newUser.omitPassword() };
      });
    } catch (error) {
      throw error;
    } finally {
      await session.endSession();
    }
  };
  