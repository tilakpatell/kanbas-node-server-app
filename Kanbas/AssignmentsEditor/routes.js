import * as assignmentsEditorDao from "./dao.js";

export default function AssignmentsEditorRoutes(app) {
  app.put("/api/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    const status = assignmentsEditorDao.updateAssignment(
      assignmentId,
      req.body
    );
    res.json(status);
  });

  app.delete("/api/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    const status = assignmentsEditorDao.deleteAssignment(assignmentId);
    res.json(status);
  });
}
