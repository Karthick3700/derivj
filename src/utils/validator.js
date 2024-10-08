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

export const profileSchema = Yup.object().shape({
  // imageId: Yup.string().label(CONST.MSG.REQ_IMAGE).trim().required(),
  dateOfBirth: Yup.string().label(CONST.MSG.REQ_DOB).required(),
  phoneNumber: Yup.string().label(CONST.MSG.REQ_MOBILE).required(),
  nominee: Yup.object().shape({
    name: Yup.string()
      .label(CONST.MSG.REQ_NAME)
      .trim("Space not allowed")
      .matches(CONST.MSG.NAME_REGEX, CONST.MSG.INVALID_NAME)
      .required(),
    email: Yup.string()
      .email(CONST.MSG.INVALID_EMAIL)
      .label(CONST.MSG.REQ_EMAIL)
      .required(),
    relation: Yup.string().label(CONST.MSG.REQ_RELATION).required(),
    dateOfBirth: Yup.string().label(CONST.MSG.REQ_DOB).required(),
    documentType: Yup.string().label(CONST.MSG.REQ_DOC_TYPE).required(),
    documentTypeVal: Yup.string().label("documentTypeVal").oneOf(["10", "20"]),
    documentNo: Yup.string()
      .when("documentTypeVal", ([documentTypeVal], schema) => {
        if (documentTypeVal === "10") {
          return schema
            .label(CONST.MSG.REQ_AADHAR)
            .max(12, CONST.MSG.MAXIMUM_AADHAR)
            .required();
        }
        if (documentTypeVal === "20") {
          return schema
            .label(CONST.MSG.REQ_PAN_NUM)
            .matches(CONST.MSG.PAN_REGEX, CONST.MSG.INVALID_PAN)
            .max(10, CONST.MSG.MAXIMUM_PAN)
            .required();
        }
      })
      .label(CONST.MSG.REQ_DOC_NUM)
      .required(),
  }),
});

export const KYCSchema = Yup.object().shape({
  // documentId: Yup.string().label(CONST.MSG.REQ_KYC_IMAGE).required(),
  documentNo: Yup.string()
    .label(CONST.MSG.REQ_PAN_NUM)
    .required()
    .matches(CONST.MSG.PAN_REGEX, CONST.MSG.INVALID_PAN)
    .max(10, CONST.MSG.MAXIMUM_PAN),
  reDocumentNo: Yup.string()
    .oneOf([Yup.ref("documentNo")], CONST.MSG.REQ_RE_ENETER_PAN_NOT_MATCH)
    .label(CONST.MSG.REQ_PAN_NUM)
    .max(10, CONST.MSG.MAXIMUM_PAN)
    .required(),
});

export const addressSchema = Yup.object().shape({
  // documentFrontId: Yup.string()
  //   .label(CONST.MSG.REQ_FRONT_AADHAR_IMG)
  //   .required(),
  // documentBackId: Yup.string().label(CONST.MSG.REQ_BACK_AADHAR_IMG).required(),
  documentNo: Yup.string()
    .label(CONST.MSG.REQ_AADHAR)
    .required()
    .min(12, CONST.MSG.MIN_AADHAR),
  reEnterDocumentNo: Yup.string()
    .oneOf([Yup.ref("documentNo")], CONST.MSG.RE_ENTER_AADHAR_NOT_MATCH)
    .label(CONST.MSG.REQ_AADHAR)
    .min(12, CONST.MSG.MIN_AADHAR)
    .required(),
  flotNo: Yup.string().label(CONST.MSG.REQ_DOOR_NO).required(),
  street: Yup.string().label(CONST.MSG.REQ_STREET).required(),
  city: Yup.string().label(CONST.MSG.REQ_CITY).required(),
  state: Yup.string().label(CONST.MSG.REQ_STATE).required(),
  pincode: Yup.string().label(CONST.MSG.REQ_PINCODE).required().max(10),
});

export const bankSchema = Yup.object().shape({
  // proofId: Yup.string().label(CONST.MSG.REQ_BANK_PROOF).required(),
  name: Yup.string().label(CONST.MSG.REQ_BANK_NAME).required(),
  holder: Yup.string().label(CONST.MSG.REQ_ACCOUNT_HOLDER_NAME).required(),
  accountNumber: Yup.string().label(CONST.MSG.REQ_ACCOUNT_NO).required(),
  reaccountNumber: Yup.string()
    .oneOf([Yup.ref("accountNumber")], CONST.MSG.ACCOUNT_NUMBER_MATCH)
    .required(),
  ifscCode: Yup.string()
    .label(CONST.MSG.IFSC_REQ_MSG)
    .required()
    .max(11)
    .matches(CONST.MSG.IFSC_REGEX, CONST.MSG.IFSC_REGEX_MSG),
  upiId: Yup.string(),
});

export const changepwdSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .label(CONST.MSG.REQ_OLD_PASSWORD)
    .required()
    .matches(CONST.MSG.PASSWORD_REGEX_EXP, CONST.MSG.PASSWORD_REGEX_MSG),
  newPassword: Yup.string()
    .label(CONST.MSG.REQ_NEW_PASSWORD)
    .required()
    .test("newPassword", CONST.MSG.REQ_NEW_PASSWORD_MATCH, function (val) {
      return this.parent.oldPassword !== val;
    })
    .matches(CONST.MSG.PASSWORD_REGEX_EXP, CONST.MSG.PASSWORD_REGEX_MSG),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], CONST.MSG.REQ_PASSWORD_NOT_MATCH)
    .label(CONST.MSG.REQ_CONFIRM_PASSWORD)
    .required(),
});

export const transanctionSchema = Yup.object().shape({
  transactionId: Yup.string()
    .required("Transaction ID is required")
    .matches(
      /^[A-Za-z0-9_-]+$/,
      "Transaction ID must contain only letters, numbers, underscores, and dashes"
    )
    .min(6, "Transaction ID must be at least 6 characters")
    .max(20, "Transaction ID must be at most 20 characters"),
  transactionProofId: Yup.string().label("Transanction proof").required(),
});
