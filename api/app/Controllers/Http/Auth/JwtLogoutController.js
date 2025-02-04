"use strict";

const Redis = use("Redis");

class JwtLogoutController {
  async logout({ auth, response }) {
    const user = auth.user;
    const token = auth.getAuthHeader();

    try {
      Redis.lpush("blacklist", token);
    } catch (e) {
      return response
        .status(400)
        .json({ message: "error on trying to logout: " + e.message });
    }

    /** returns the logged out user info and a message */
    return response.status(200).json({
      user: { email: user.email, name: user.name, is_active: user.is_active },
      message: "user logged out sucessfully"
    });
  }
}

module.exports = JwtLogoutController;
