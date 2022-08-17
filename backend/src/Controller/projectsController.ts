import { Response } from "express";
import mssql from "mssql";
import { v4 as uid } from "uuid";
import { sqlConfig } from "../Config/db";
import { ProjectSchema } from "../Helper/ProjectValidation";
import { ProjectRequest } from "../Interfaces/ExtendedRequest";


/*
  -----------------------------------------------------------------------------
  *Controller that hanles project creation
  -----------------------------------------------------------------------------
*/
export async function createProject(req: ProjectRequest, res: Response) {
  try {
    const pool = await mssql.connect(sqlConfig);

    const id = uid();

    const { error, value } = ProjectSchema.validate(req.body);
    if (error) {
      return res.json({ error: error.details[0].message });
    }
    
    await pool
      .request()
      .input("project_id", mssql.VarChar, id)
      .input("project_name", mssql.VarChar, value.title)
      .input("project_description", mssql.VarChar, value.description)
      .input("project_ended_at", mssql.VarChar, value.date)
      .input("project_status", mssql.VarChar, "In progress")
      .execute("createProject");

    res.status(200).json({ message: "Project added successful!" });
  } catch (error) {
    res.json({ error });
  }
}


/*
  -----------------------------------------------------------------------------
  *Controller that hanles project assignment
  -----------------------------------------------------------------------------
*/
export async function deleteProject(req: Request, res: Response) {
  try {
    const pool = await mssql.connect(sqlConfig);
    const { project_id } = req.body;
    if (error) {
      return res.json({ error: error.details[0].message });
    }

    await pool
      .request()
      .input("project_id", mssql.VarChar, project_id)
      .execute("deleteProject");

    res.json({ message: "Deleted project..." });
  } catch (error) {
    res.json({ error });
  }
}


// /*
//   -----------------------------------------------------------------------------
//   *Controller that hanles projects fetching
//   -----------------------------------------------------------------------------
// */
// export async function getProjects(req: ProjectRequest, res: Response) {
//   try {
//     const pool = await mssql.connect(sqlConfig);
    
//     await pool
//       .request()
//       .input("project_id", mssql.VarChar, id)
//       .input("project_name", mssql.VarChar, value.title)
//       .input("project_description", mssql.VarChar, value.description)
//       .input("project_ended_at", mssql.VarChar, value.date)
//       .input("project_status", mssql.VarChar, "In progress")
//       .execute("createProject");

//     res.status(200).json({ message: "Project added successful!" });
//   } catch (error) {
//     res.json({ error });
//   }
// }


// /*
//   -----------------------------------------------------------------------------
//   *Controller that hanles project deletion
//   -----------------------------------------------------------------------------
// */
// export async function deleteProject(req: ProjectRequest, res: Response) {
//   try {
//     const pool = await mssql.connect(sqlConfig);

//     const id = uid();

//     const { error, value } = ProjectSchema.validate(req.body);
//     if (error) {
//       return res.json({ error: error.details[0].message });
//     }
    
//     await pool
//       .request()
//       .input("project_id", mssql.VarChar, id)
//       .input("project_name", mssql.VarChar, value.title)
//       .input("project_description", mssql.VarChar, value.description)
//       .input("project_ended_at", mssql.VarChar, value.date)
//       .input("project_status", mssql.VarChar, "In progress")
//       .execute("createProject");

//     res.status(200).json({ message: "Project added successful!" });
//   } catch (error) {
//     res.json({ error });
//   }
// }