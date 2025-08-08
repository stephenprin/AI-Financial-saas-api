import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { createTransactionSchema } from "../validators/transaction.validator";
import { createTransactionService } from "../services/transaction.service";
import { HTTPSTATUS } from "../utils/http_codes";


export const createTransactionController = asyncHandler(
  async (req: Request, res: Response) => {
    const body = createTransactionSchema.parse(req.body);
    const userId = req.user?._id;

    const transaction = await createTransactionService(body, userId);

    return res.status(HTTPSTATUS.CREATED).json({
      message: "Transacton created successfully",
      transaction,
    });
  }
);