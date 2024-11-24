// src/Kanbas/Enrollments/dao.js
import Database from "../Database/index.js";

export function findAllEnrollments() {
  return Database.enrollments;
}

export function findUserEnrollments(userId) {
  const { enrollments } = Database;
  return enrollments.filter(
    enrollment => enrollment.user === userId
  );
}

export function enrollUserInCourse(enrollment) {
  const newEnrollment = { 
    ...enrollment,
    _id: Date.now().toString()
  };
  Database.enrollments = [...Database.enrollments, newEnrollment];
  return newEnrollment;
}

export function unenrollUserFromCourse(userId, courseId) {
  const { enrollments } = Database;
  Database.enrollments = enrollments.filter(
    (enrollment) => !(
      enrollment.user === userId && 
      enrollment.course === courseId
    )
  );
  return { status: "OK" };
}
