import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (email !== process.env.ADMIN_EMAIL) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
  const ok = await bcrypt.compare(password, hash);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ role: "admin", email }, process.env.JWT_SECRET, {
    expiresIn: "12h",
  });

  res.json({ token });
};
