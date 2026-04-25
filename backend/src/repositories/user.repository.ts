import { User } from "../models/user.model.js";

class UserRepository {
  public async findByEmail(emaiId: string) {
    return await User.findOne({ emaiId });
  }
  public async findById(id: string) {
    return await User.findById(id);
  }
  public async create({
    displayName,
    email,
    password,
  }: {
    displayName: string;
    email: string;
    password: string;
  }) {
    const user = new User({ displayName, email, password });
    user.save();
    return user;
  }
}

export { UserRepository };
