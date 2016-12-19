import Mongoose from 'mongoose';

Mongoose.connect('mongodb://127.0.0.1:7011/meteor');

const ConversationSchema = Mongoose.Schema({
  _id: String,
  content: String,
});

const AttachmentSchema = Mongoose.Schema({
  url: String,
  name: String,
  size: Number,
  type: String,
});

const MessageSchema = Mongoose.Schema({
  _id: String,
  conversationId: String,
  content: String,
  attachments: [AttachmentSchema],
  createdAt: Date,
});

const Conversations = Mongoose.model('conversations', ConversationSchema);
const Messages = Mongoose.model('conversation_messages', MessageSchema);

export { Conversations, Messages };
