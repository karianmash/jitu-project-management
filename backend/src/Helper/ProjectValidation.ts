import Joi from "joi";

export const ProjectSchema = Joi.object({
  user_id: Joi.string().required(),
  title: Joi.string().required(),
  date: Joi.string().required(),
  description: Joi.string().required(),
});
