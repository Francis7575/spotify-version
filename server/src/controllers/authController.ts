import { User } from "../models/userModel";
import { Request, Response, NextFunction } from "express";

export const authCallback = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id, firstName, lastName, imageUrl } = req.body;

		// check if user already exists
		const user = await User.findOne({ clerkId: id });

		if (!user) {
			// signup
			await User.create({
				clerkId: id,
				fullName: `${firstName} ${lastName}`,
				imageUrl,
			});
		}
		res.status(200).json({ success: true });
	} catch (error) {
		console.log("Error in auth callback", error);
		next(error);
	}
};