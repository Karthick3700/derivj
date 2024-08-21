import * as Yup from "yup";
import { CONST } from ".";

export const registerSchema = Yup.object().shape({
  name: Yup.string()
    .required()
    .min(3, CONST.MSG.MIN_CHAR)
    .trim("")
    .matches(CONST.MSG.NAME_REGEX, CONST.MSG.INVALID_NAME)
    .label(CONST.MSG.REQ_NAME),
  email: Yup.string()
    .email(CONST.MSG.INVALID_EMAIL)
    .label(CONST.MSG.REQ_EMAIL)
    .required(),
  password: Yup.string()
    .label(CONST.MSG.REQ_PWD)
    .required()
    .matches(CONST.MSG.PASSWORD_REGEX_EXP, CONST.MSG.PASSWORD_REGEX_MSG),
  confirmpassword: Yup.string()
    .label(CONST.MSG.REQ_CONFIRM_PASSWORD)
    .required()
    .oneOf([Yup.ref("password")], CONST.MSG.REQ_PASSWORD_NOT_MATCH),
});


export const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email(CONST.MSG.INVALID_EMAIL)
      .label(CONST.MSG.REQ_EMAIL)
      .required(),
    password: Yup.string()
      .label(CONST.MSG.REQ_PWD)
      .required()
      .matches(CONST.MSG.PASSWORD_REGEX_EXP, CONST.MSG.PASSWORD_REGEX_MSG),
  });