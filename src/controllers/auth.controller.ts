import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { HTTPSTATUS } from "../utils/http_codes";
import { loginSchema, registerSchema } from "../validators/auth.validator";
import { loginService, registerService } from "../services/auth.service";


export const registerController = asyncHandler(
    async (req: Request, res: Response) => {
      const body = registerSchema.parse(req.body);
  
       const result = await registerService(body);
  
      return res.status(HTTPSTATUS.CREATED).json({
        message: "User registered successfully",
        data: result,
      });
    }
  );

  export const loginController = asyncHandler(
    async (req: Request, res: Response) => {
      const body = loginSchema.parse({
        ...req.body,
      });
      const { user, accessToken, expiresAt, reportSetting } =
        await loginService(body);
  
      return res.status(HTTPSTATUS.OK).json({
        message: "User logged in successfully",
        user,
        accessToken,
        expiresAt,
        reportSetting,
      });
    }
  );