import userModel from './../../../../DB/models/User.model.js';
import messageModel from './../../../../DB/models/Message.model.js';
import { asyncHandler } from './../../../utils/errorHandling.js';

export const getMessageModule = asyncHandler(async (req, res, next) => {
  const messageList = await messageModel.find({receiverID: req.user._id})
  return res.json({message: "Done", messageList})
})

export const sendMessage = asyncHandler(async (req, res, next)=> {
  const {receiverID } = req.params;
  const {message} = req.body;

  console.log({receiverID, message});

  const user = await userModel.findById(receiverID)

  if(!user) return next(new Error("Invalid account ID", {cause: 404}))

  const createMessage = await messageModel.create({receiverID: user._id, message})

  return res.status(201).json({message: "Done", createMessage})
})

export const deleteMessage = asyncHandler(async (req, res, next) => {
  const {id} = req.params;

  const message = await messageModel.deleteOne({_id: id, receiverID: req.user._id})

  return message.deletedCount ? res.status(200).json({message: "Done"}) : next(new Error("Invalid message/user ID", {cause: 400}))
})