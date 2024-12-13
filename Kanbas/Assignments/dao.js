import model from "./model.js";

export const findAssignmentsForCourse = async (courseId) => {
  return model.find({ course: courseId });
};

export const createAssignment = async (assignment) => {
  return model.create(assignment);
};

export const deleteAssignment = async (assignmentId) => {
  return model.deleteOne({ _id: assignmentId });
};

export const updateAssignment = async (assignmentId, assignment) => {
  return model.findByIdAndUpdate(assignmentId, assignment, { new: true });
};
