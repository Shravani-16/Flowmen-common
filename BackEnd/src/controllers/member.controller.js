import bcrypt from 'bcrypt';
import {Member} from '../models/members.model.js';
import {User} from '../models/User.model.js';

export const getMembers = async (req, res) => {
    try {
        const members = await Member.find();

        if (members.length > 0) {
            const membersData = await Promise.all(members.map(async (member,index) => {
                const _id = member.workingUnder
                const supervisor = await User.findOne({_id});
                // console.log(supervisor)
                return {
                    _id: index+1,  // Add this line to include the id property
                    name: member.name,
                    email:member.email,
                    role: member.role,
                    createdAt: member.createdAt,
                    updatedAt: member.updatedAt,
                    workingUnder: supervisor ? supervisor.username : 'Not Found'
                };
            }));
            // console.log(membersData);

            return res.status(200).json({ ok: 1, members: membersData });
        }
        return res.status(404).json({ ok: 0, message: "Data not found" });

    } catch (error) {
        res.status(500).json({ ok: 0, message: "Server Error" });
    }
};
