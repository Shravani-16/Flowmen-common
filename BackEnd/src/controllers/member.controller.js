const bcrypt = require('bcrypt');
const Member = require('../models/members.model.js');
const User = require('../models/User.model.js');

exports.getMembers = async (req, res) => {
    try {
        const members = await Member.find();

        if (!members.length) {
            return res.status(404).json({ ok: 0, message: "Data not found" });
        }

        // Get all unique supervisor IDs
        const supervisorIds = [...new Set(members.map(member => member.workingUnder).filter(Boolean))];

        // Fetch all supervisors in one query
        const supervisors = await User.find({ _id: { $in: supervisorIds } }).select('username');

        // Convert supervisors array into a Map for quick lookup
        const supervisorMap = new Map(supervisors.map(user => [user._id.toString(), user.username]));

        // Format the response data
        const membersData = members.map(member => ({
            _id: member._id,  // Keep original MongoDB _id
            name: member.name,
            email: member.email,
            role: member.role,
            createdAt: member.createdAt,
            updatedAt: member.updatedAt,
            workingUnder: supervisorMap.get(member.workingUnder.toString()) || 'Not Found'
        }));

        return res.status(200).json({ ok: 1, members: membersData });

    } catch (error) {
        console.error("Error fetching members:", error);
        res.status(500).json({ ok: 0, message: "Server Error" });
    }
};
