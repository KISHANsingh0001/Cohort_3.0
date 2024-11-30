import mongoose, { Schema, Types, model } from "mongoose";

const contentTypes = ["image", "video", "article", "audio"]; // Extend as needed

// This is the  User Schema
const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

// This is the Tag Schema
const tagSchema = new Schema({
  title: { type: String, required: true, unique: true },
});

// This is the Content Schema
const contentSchema = new Schema({
  link: { type: String, required: true },
  type: { type: String, enum: contentTypes, required: true },
  title: { type: String, required: true },
  tags: [{ type: Types.ObjectId, ref: "Tag" }],
  userId: { type: Types.ObjectId, ref: "User", required: true },
});

// This is the Link Schema
const linkSchema = new Schema({
  hash: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

// Here are Models of our Schemas
const User = model("User", userSchema);
const Tag = model("Tag", tagSchema);
const Content = model("Content", contentSchema);
const Link = model("Link", linkSchema);

export { User, Tag, Content, Link };