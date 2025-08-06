import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { HTTPSTATUS } from "../utils/http_codes";
import { registerSchema } from "../validators/auth.validator";
import { registerService } from "../services/auth.service";


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