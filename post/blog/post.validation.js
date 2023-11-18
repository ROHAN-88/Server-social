import Joi from "joi";

export const postValidation = Joi.object({
  text: Joi.string().required().min(5).max(1000),
  imageUrl: Joi.string().allow(null, ""),
});
