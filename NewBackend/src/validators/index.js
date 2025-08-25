import { body } from "express-validator";

const userRegistValidator = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),

    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username is required")
      .isLowercase()
      .withMessage("Username must be in lower case")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long"),

    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required"),

    body("fullName") // ✅ spelling fix: tumne "fullNmae" likha tha
      .optional()
      .trim(),
  ];
};


const  userLoginValidator = () => {
      return [
            body("email")
            .optional()
            .isEmail()
            .withMessage("Email is invalied"),
            body("password")
            .notEmpty()
            .withMessage("password is requried"),
      ]
}

export { userRegistValidator , userLoginValidator};
