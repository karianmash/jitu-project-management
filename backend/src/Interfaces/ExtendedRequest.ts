import { Request } from "express";

export interface UserRegisterRequest extends Request {
  body: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
  };
}

export interface UserLoginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

export interface ProjectRequest extends Request {
  body: {
    user_id: string;
    project_id: string;
    title: string;
    date: string;
    description: string;
  };
}