import epxress from "express";
import jwt from "jsonwebtoken";
const router = epxress.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password, "in here");
  try {
    if (email === process.env.EMAIL && password === process.env.PASSWORD) {
      const token = jwt.sign({ email }, process.env.JWT_TOKEN!, {
        expiresIn: "7d",
      });

      res.status(201).json({
        token: token,
        token_type: "Bearer",
      });
      return;
    }
    res.status(401).json({ error: "Invalid credentials" });
  } catch (error) {
    res.status(500).json({
      message: "Authentication failed",
    });
  }
});

export default router;
