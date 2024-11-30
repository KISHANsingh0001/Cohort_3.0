"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Link = exports.Content = exports.Tag = exports.User = void 0;
const mongoose_1 = require("mongoose");
const contentTypes = ["image", "video", "article", "audio"]; // Extend as needed
// This is the  User Schema
const userSchema = new mongoose_1.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
});
// This is the Tag Schema
const tagSchema = new mongoose_1.Schema({
    title: { type: String, required: true, unique: true },
});
// This is the Content Schema
const contentSchema = new mongoose_1.Schema({
    link: { type: String, required: true },
    type: { type: String, enum: contentTypes, required: true },
    title: { type: String, required: true },
    tags: [{ type: mongoose_1.Types.ObjectId, ref: "Tag" }],
    userId: { type: mongoose_1.Types.ObjectId, ref: "User", required: true },
});
// This is the Link Schema
const linkSchema = new mongoose_1.Schema({
    hash: { type: String, required: true },
    userId: { type: mongoose_1.Types.ObjectId, ref: "User", required: true },
});
// Here are Models of our Schemas
const User = (0, mongoose_1.model)("User", userSchema);
exports.User = User;
const Tag = (0, mongoose_1.model)("Tag", tagSchema);
exports.Tag = Tag;
const Content = (0, mongoose_1.model)("Content", contentSchema);
exports.Content = Content;
const Link = (0, mongoose_1.model)("Link", linkSchema);
exports.Link = Link;
