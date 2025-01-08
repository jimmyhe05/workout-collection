export const google = async (req, res) => {
  const { name, email, googlePhotoURL } = req.body;

  if (!name || !email || !googlePhotoURL) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required." });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const token = jwt.sign(
        { email: existingUser.email, id: existingUser._id },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = existingUser._doc;
      return res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json(rest);
    }

    const generatedPassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(generatedPassword, 10);

    const newUser = new User({
      username:
        name.toLowerCase().replace(/\s+/g, "") +
        Math.random().toString(9).slice(-4),
      email,
      password: hashedPassword,
      profilePicture: googlePhotoURL,
    });

    await newUser.save();

    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SECRET
    );

    const { password, ...rest } = newUser._doc;

    res
      .status(201)
      .cookie("access_token", token, { httpOnly: true })
      .json(rest);
  } catch (error) {
    console.error("Error during Google OAuth:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Something went wrong. Please try again.",
      });
  }
};
