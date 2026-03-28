import type { Request, Response } from "express";

const registerUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  
  
};

export { registerUser };
