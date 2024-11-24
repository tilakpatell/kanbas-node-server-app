import Database from "../Database/index.js";

export function findAssignmentsForCourse(courseId) {
  const { assignments } = Database;
  return assignments.filter((assignment) => assignment.course === courseId);
}

export function createAssignment(assignment) {
  const newAssignment = { ...assignment, _id: new Date().getTime().toString() };
  Database.assignments = [...Database.assignments, newAssignment];
  return newAssignment;
}

export function findAllAssignments() {
  return Database.assignments;
}
