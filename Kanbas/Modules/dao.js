import Database from "../Database/index.js";
import model from "./model.js";
import mongoose from "mongoose";


export function createModule(module) {
 delete module._id
 return model.create(module);
}

export async function findModulesForCourse(courseId) {
  try {
    console.log("1. Attempting to find modules for courseId:", courseId);
    
    // Check courseId format
    const objectId = new mongoose.Types.ObjectId(courseId);
    console.log("2. Converted to ObjectId:", objectId);

    // Try finding ALL modules first to verify connection
    const allModules = await model.find({});
    console.log("3. All modules in collection:", allModules);

    // Then try the specific query
    const modules = await model.find({ course: objectId });
    console.log("4. Found modules for this course:", modules);
    
    return modules;
  } catch (error) {
    console.error("Error in findModulesForCourse:", error);
    throw error;
  }
}


export function deleteModule(moduleId) {
  const { modules } = Database;
  Database.modules = modules.filter((module) => module._id !== moduleId);
 }


 export function updateModule(moduleId, moduleUpdates) {
  const { modules } = Database;
  console.log(moduleId)
  const module = modules.find((module) => module._id === moduleId);
  Object.assign(module, moduleUpdates);
  return module;
}
