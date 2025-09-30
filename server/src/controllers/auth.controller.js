// controllers/auth.controller.js
import AuthService from "../services/auth.service.js";

class AuthController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
      res.json(result);
    } catch (err) {
      next(err); 
    }
  }
}

export default AuthController;
