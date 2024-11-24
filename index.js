import express from 'express'
import Hello from './Hello.js';
import Lab5 from './Lab5/index.js';
import session from "express-session";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import "dotenv/config";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import UserRoutes from "./Kanbas/Users/routes.js";
import cors from "cors";
import AssignmentRoutes from './Kanbas/Assignments/routes.js';
import AssignmentsEditorRoutes from './Kanbas/AssignmentsEditor/routes.js';
import EnrollmentRoutes from './Kanbas/Enrollments/routes.js';

const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.NETLIFY_URL || "http://localhost:3000",
  })
 ); 
app.use(express.json());
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kanbas",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  };
}
app.use(session(sessionOptions));

UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
AssignmentsEditorRoutes(app);
EnrollmentRoutes(app);
Lab5(app);
Hello(app);
app.listen(process.env.PORT || 4000)
