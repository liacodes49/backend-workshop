const express = require("express");
const router = express.Router();
const User = require("../models/User");

// DELETE USER
router.delete("/delete-user/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({
            message: "User deleted successfully",
            user: deletedUser,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;