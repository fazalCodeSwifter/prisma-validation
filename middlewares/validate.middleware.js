import { validationResult } from "express-validator";

export function validate(rules) {
  return [
    ...rules,
    (req, res, next) => {
      const errors = validationResult(req);
      console.log("inner--rules ERROR & REQ", errors, req.body);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array().map((err) => ({
            field: err.param,
            message: err.msg,
          })),
        });
      }
      next();
    },
  ];
}
