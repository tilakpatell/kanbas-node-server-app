import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function CourseRoutes(app) {
  // Course Routes
  app.post("/api/courses", async (req, res) => {
    const course = await dao.createCourse(req.body);
    const currentUser = req.session["currentUser"];
    if (currentUser) {
      await enrollmentsDao.enrollUserInCourse(currentUser._id, course._id);
    } 
    res.json(course);
  });

  app.get("/api/courses", async (req, res) => {
    const courses = await dao.findAllCourses();
    res.json(courses);
  });

  app.delete("/api/courses/:courseId", async (req, res) => {
    try {
      const { courseId } = req.params;
      // Find all modules for this course and delete them
      const modules = await modulesDao.findModulesForCourse(courseId);
      for (const module of modules) {
        await modulesDao.deleteModule(module._id);
      }
      const status = await dao.deleteCourse(courseId);
      res.json(status);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.put("/api/courses/:courseId", async (req, res) => {
    const { courseId } = req.params;
    const status = await dao.updateCourse(courseId, req.body);
    res.json(status);
  });

  // Module Routes
  app.get("/api/courses/:courseId/modules", async (req, res) => {
    try {
      const { courseId } = req.params;
      console.log("1. API Route - Received courseId:", courseId);
      const modules = await modulesDao.findModulesForCourse(courseId);
      console.log("4. API Route - Returning modules:", modules);
      res.json(modules);
    } catch (error) {
      console.error("API Route Error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/courses/:courseId/modules", async (req, res) => {
    const { courseId } = req.params;
    const module = { ...req.body, course: courseId };
    const newModule = await modulesDao.createModule(module);
    res.json(newModule);
  });

  app.put("/api/modules/:moduleId", async (req, res) => {
    const { moduleId } = req.params;
    const status = await modulesDao.updateModule(moduleId, req.body);
    res.json(status);
  });

  app.delete("/api/modules/:moduleId", async (req, res) => {
    const { moduleId } = req.params;
    const status = await modulesDao.deleteModule(moduleId);
    res.json(status);
  });

  // Users for Course Route
  app.get("/api/courses/:courseId/users", async (req, res) => {
    const { courseId } = req.params;
    const users = await enrollmentsDao.findUsersForCourse(courseId);
    res.json(users);
  });
}
