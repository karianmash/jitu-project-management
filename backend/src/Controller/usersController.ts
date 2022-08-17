import { Response } from "express";
import mssql from "mssql";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { v4 as uid } from "uuid";
import { sqlConfig } from "../Config/db";
import { UserLoginSchema, UserRegisterSchema } from "../Helper/userValidation";
import {
  UserLoginRequest,
  UserRegisterRequest,
} from "../Interfaces/ExtendedRequest";
import { User } from "../Interfaces/User";

export async function createUser(req: UserRegisterRequest, res: Response) {
  try {
    const pool = await mssql.connect(sqlConfig);

    const id = uid();

    const { error, value } = UserRegisterSchema.validate(req.body);
    if (error) {
      return res.json({ error: error.details[0].message });
    }
    // console.log(id)

    const hashedpassword = await bcrypt.hash(value.password, 10);

    await pool
      .request()
      .input("user_id", mssql.VarChar, id)
      .input("user_role", mssql.VarChar, "user")
      .input("user_first_name", mssql.VarChar, value.first_name)
      .input("user_last_name", mssql.VarChar, value.last_name)
      .input("user_email", mssql.VarChar, value.email)
      .input("user_password", mssql.VarChar, hashedpassword)
      .input("assigned_project", mssql.VarChar, null)
      .execute("createUser");

    console.log(value);

    res.status(200).json({ message: "Registration successful!" });
  } catch (error) {
    // console.log(error);
    res.json({ error });
  }
}

/*
  -----------------------------------------------------------------------------
  This a route to handle user login
  -----------------------------------------------------------------------------
*/
export async function loginUser(req: UserLoginRequest, res: Response) {
  try {
    const pool = await mssql.connect(sqlConfig);

    const { error, value } = UserLoginSchema.validate(req.body);
    if (error) {
      return res.json({ error: error.details[0].message });
    }

    const user: User[] = (
      await pool
        .request()
        .input("user_email", mssql.VarChar, value.email)
        .execute("fetchUser")
    ).recordset;

    if (!user[0]) {
      return res.status(404).json({ message: "User Not Found" });
    }

    bcrypt.compare(value.password, user[0].user_password, (error, result) => {
      if (error) {
        return res.status(401).json({
          message: "Auth failed!",
        });
      }

      if (result) {
        const payload = user.map((item) => {
          const { user_password, user_last_name, ...rest } = item;
          return rest;
        });
        const token = jwt.sign(payload[0], process.env.JWT_KEY as string, {
          expiresIn: "1h",
        });

        res.status(200).json({
          message: "Auth successful!",
          user: payload[0],
          token,
        });
      } else {
        res.status(401).json({
          message: "Auth failed!",
        });
      }
    });
  } catch (error) {
    res.json({ error });
  }
}

// Get all users
export async function getUsers(req: UserLoginRequest, res: Response) {
  try {
    const pool = await mssql.connect(sqlConfig);
    const allusers = (await pool.request().execute("getAllUsers")).recordset;
    console.log(allusers);

    res.json(allusers);
  } catch (error) {
    console.log(error);
  }
}

/*
  -----------------------------------------------------------------------------
  This a route to handle user login
  -----------------------------------------------------------------------------
*/
// export async function getProject(req: UserRequest, res: Response) {
//   try {
//     const pool = await mssql.connect(sqlConfig);

//     const { error, value } = UserLoginSchema.validate(req.body);
//     if (error) {
//       return res.json({ error: error.details[0].message });
//     }

//     const user: User[] = (
//       await pool
//         .request()
//         .input("user_email", mssql.VarChar, value.email)
//         .execute("fetchUser")
//     ).recordset;

//     if (!user[0]) {
//       return res.status(404).json({ message: "User Not Found" });
//     }

//     bcrypt.compare(value.password, user[0].user_password, (error, result) => {
//       if (error) {
//         return res.status(401).json({
//           message: "Auth failed!",
//         });
//       }

//       if (result) {
//         const payload = user.map((item) => {
//           const { user_password, ...rest } = item;
//           return rest;
//         });
//         const token = jwt.sign(payload[0], process.env.JWT_KEY as string, {
//           expiresIn: "1h",
//         });
//         res.status(200).json({
//           message: "Auth successful!",
//           token,
//         });
//       }
//     });
//   } catch (error) {
//     res.json({ error });
//   }
// }
