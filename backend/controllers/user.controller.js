import User from '../model/user.model.js';  //get controller bana diya yaha pe user ko get kar liya hai user ke id through le liya hai
export const getCurrentUser = async (req, res) => {
  try {
    let user = await User.findById(req.userId).select("-password");
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  }
  catch (error) {
    res.status(500).json({ message: `getCurrentUser error`})
  }
}