import mongoose from "mongoose";
import schema from "./schema.js";

console.log("Initializing Module model with schema:", schema);
const model = mongoose.model("ModuleModel", schema);
console.log("Module model initialized");
export default model;
