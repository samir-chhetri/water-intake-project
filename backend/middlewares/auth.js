import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Unauthorized: Bearer token missing" });
    }

    const token = authHeader.split(" ")[1];

    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Attach the decoded token payload to the request object
    req.user = decodedToken;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};
