import { AuthController } from "../../controllers/authController";
import { UserFactory } from "../../factories/implementation/UserFactory";
import { UserMapper } from "../../mapper/implementation/UserMapper";
import { UserRepository } from "../../repositories/implementation/UserRepository";
import { AuthService } from "../../services/implementations/AuthService";

const userEntityFactory = new UserFactory();
const userRepository = new UserRepository(userEntityFactory);
const userMapper = new UserMapper();
const authService = new AuthService(userRepository,userMapper);
export const authController = new AuthController(authService);