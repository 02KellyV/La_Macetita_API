const { Users } = require("../models");

class ProductsService {
  constructor() {}

  async signin({ email, password }) {
    const user = await Users.findOne({ email });
    if (!user) {
      return { error: "Email incorrect" };
    }
    const valid = await user.validPassword(password);
    if (valid) {
      return { 
        token: await user.generateJWT(),
        email: user.email,
        id: user._id
      };
    } else {
      return { error: "Password incorrect" };
    }
    return null;
  }

  async signup({ name, email, password }) {
    const user = await Users.create({ email, name });
    await user.setPassword(password);
    user.save();

    return { 
      token: await user.generateJWT(),
      name: user.name,
      email: user.email,
      id: user._id
    };
  }
}

module.exports = ProductsService;
