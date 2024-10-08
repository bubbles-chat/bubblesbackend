import User from "../../models/User.model";
import { Request, Response } from "express";

export const addUser = async (req: Request, res: Response): Promise<void> => {
    const { email, displayName, photoURL } = req.body
    const user = await User.create({ email, displayName, photoURL })

    res.status(201).json({ message: 'User created successfully!', user })
}

export const getUserByEmail = async (req: Request, res: Response): Promise<void> => {
    const { email } = req.params
    const user = await User.findOne({ email })

    if (!user) {
        res.status(404).json({ message: 'User not found' })
        return
    }

    res.status(200).json({ message: 'User found', user })
}

export const getUserByUsername = async (req: Request, res: Response): Promise<void> => {
    const { username } = req.params;
    const { limit = 10, skip = 0 } = req.query;

    if (!username) {
        res.status(400).json({ message: 'Username is required' });
        return;
    }

    const users = await User.find({ displayName: username })
        .skip(Number(skip))
        .limit(Number(limit));

    res.status(200).json({ message: 'Found users', users });
};

export const updateUserInfo = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    const { displayName, photoURL }: { displayName: string, photoURL: string } = req.body

    if (displayName.length < 1) {
        res.status(404).json({ message: 'Invalid name' })
        return
    }

    const updatedUser = await User.findByIdAndUpdate(id, {
        displayName, photoURL
    }, { new: true })

    if (!updatedUser) {
        res.status(404).json({ message: 'User not found' })
        return
    }

    res.status(200).json({ message: 'User updated successfully!', user: updatedUser })
}

export const deleteUserByEmail = async (req: Request, res: Response): Promise<void> => {
    const { email } = req.params
    const deletedUser = await User.deleteOne({ email })

    if (deletedUser.deletedCount === 0) {
        res.status(404).json({ message: 'User not found' })
        return
    }

    res.status(200).json({ message: 'User deleted successfully', user: deletedUser })
}
