import AuthService from "../services/auth.service.js";

class AuthController {
   // login
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  // refresh access token
  static async refreshToken(req, res, next) {
    try {
      const { refreshToken } = req.body;
      const result = await AuthService.refreshToken(refreshToken);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  // logout
  static async logout(req, res, next) {
    try {
      const userId = req.user?.sub; 
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const result = await AuthService.logout(userId);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
}

export default AuthController;
