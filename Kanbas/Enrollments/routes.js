// src/Kanbas/Enrollments/routes.js
import * as dao from "./dao.js";

export default function EnrollmentRoutes(app) {
  app.get("/api/enrollments", (req, res) => {
    const enrollments = dao.findAllEnrollments();
    res.json(enrollments);
  });

  app.get("/api/users/:userId/enrollments", (req, res) => {
    const { userId } = req.params;
    const enrollments = dao.findUserEnrollments(userId);
    res.json(enrollments);
  });

  app.post("/api/enrollments", (req, res) => {
    const enrollment = dao.enrollUserInCourse(req.body);
    res.json(enrollment);
  });
  
  app.delete("/api/enrollments/:userId/:courseId", (req, res) => {
    const { userId, courseId } = req.params;
    const status = dao.unenrollUserFromCourse(userId, courseId);
    res.json(status);
  });
}
