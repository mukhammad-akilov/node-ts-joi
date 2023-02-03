import * as Joi from 'joi';

export const addSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().alphanum().min(8).max(30).required(),
  age: Joi.number().integer().min(4).max(130).required(),
});

export const updateSchema = Joi.object({
  id: Joi.string().required(),
  login: Joi.string().required(),
  password: Joi.string().alphanum().min(8).max(30).required(),
  age: Joi.number().integer().min(4).max(130).required(),
});
