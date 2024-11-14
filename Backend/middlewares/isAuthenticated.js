import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    // Check if token exists
    if (!token) {
      return res.status(401).json({ message: "Please login first", success: false });
    }

    // Verify token
    const decode = await jwt.verify(token, process.env.SECRET_KEY);
    if (!decode) {
      return res.status(401).json({ message: "Invalid token", success: false });
    }

    // Attach user ID to the request object
    req.id = decode.userId;  // Ensure the token was signed with userId, not just id
    next();

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error during authentication", success: false });
  }
};

export default isAuthenticated;
