import Joi from "joi";

export const UserRegisterSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});

export const UserLoginSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});