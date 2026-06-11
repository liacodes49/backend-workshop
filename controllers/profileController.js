const User = require('../models/User');

// Update profile controller
const updateProfile = async (req, res) => {
  try {
    const { name, rollNumber, class: className, department, teacher, phoneNumber } = req.body;
    const updates = { name, rollNumber, class: className, department, teacher, phoneNumber };
    // Remove undefined fields
    Object.keys(updates).forEach(key => updates[key] === undefined && delete updates[key]);
    const updatedProfile = await User.findOneAndUpdate(
      { _id: req.user.id },
      updates,
      { new: true }
    );
    if (!updatedProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(updatedProfile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { updateProfile };
