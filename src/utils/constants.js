export const Routes = {
  MAIN: "/",
  LOGIN: "/auth-login",
  SIGN_UP: "/auth-register",
  PROFILE: "/profile",
};

export const MSG = {
  LOGIN_SUCCESS: "Login successfully",
  LOGOUT_SUCCESS: "Logout successfully",

  REQ_IMAGE: "Profile Image",
  REQ_KYC_IMAGE: "Document Image",
  REQ_FRONT_IMAGE: "Document Front Image",
  REQ_BACK_IMAGE: "Document Back Image",
  REQ_EMAIL: "Email",
  INVALID_EMAIL: "Invalid email",
  REQ_PWD: "Password",
  REQ_OLD_PASSWORD: "Old Password",
  REQ_NEW_PASSWORD_MATCH: "Old password and new password is equal",

  PHONE_REGEX:
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
  AADHAR_REGEX: /^[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}$/gm,
  DRIVING_LICENCE_REGEX:
    /^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$/,
  REQ_OTP: "OTP",
  REQ_TFA: "Authentication code",
  TERMS_AND_COND: "",
  REQ_CODE: "Verificatoin code",

  // BANK
  REQ_NAME: "Name",
  REQ_TITLE: "Bank title",
  REQ_ACCOUNT_NO: "Account number",
  REQ_RE_ACCOUNT_NO: "Re-enter account number",
  ACCOUNT_NUMBER_MATCH: "Account number does not match",
  REQ_ACCOUNT_HOLDER_NAME: "Account holder name",
  REQ_BANK_NAME: "Bank name",
  IFSC_REGEX: /^[A-Z]{4}0[A-Z0-9]{6}$/,
  IFSC_REGEX_MSG: "Invalid IFSC code",
  IFSC_REQ_MSG: "IFSC code",
  REQ_ACCOUNT_TYPE: "Account type",
  // NOMINEE
  REQ_RELATION: "Relation",
  REQ_MOBILE: "Mobile number",
  REQ_DOB: "Date of birth",
  REQ_CRCLID: "CRCLID",
  INVALID_CRCLID: "CRCLID is invalid",
  REQ_ADDRESS: "Address",
  REQ_CITY: "City",
  REQ_STATE: "State",
  REQ_DOC_TYPE: "Document type",
  REQ_PINCODE: "Pincode",
  REQ_MIN_PINCODE: "Six digit pincode is required",
  REQ_DOC_NUM: "Document number",
  REQ_PAN_NUM: "Pan number",
  REQ_MIN_NUM: "Minimum pan number",
  REQ_RE_PAN_NUM: "Re-enter pan number",
  PAN_REGEX: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
  RE_ENTER_PAN: "Re-enter your pan number",
  INVALID_PAN: "Invalid pan number",
  INVALID_DL: "Invalid driving license number",
  MAX_ALLOW_FILE: "Maximum file size 2MB allowed",
  PAN_DOESNOT_MATCH: "Pan number does not match",
  REQ_PAN_IMG: "Pancard proof is required field",
  AADHAR_REGEX: /^[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}$/,
  REQ_AADHAR: "Aadhar number",
  RE_ENTER_AADHAR_NOT_MATCH: "Aadhar number does not match",
  REQ__RE_ENTER_AADHAR: "Re-enter aadhar number",
  INVALID_AADHAR: "Invalid aadhar number",
  REQ_PASSPORT: "Passport number",
  MIN_PASSPORT: "Minimum passport number required",
  REQ_RE_ENETER_PASSPORT: "Re-enter passport number",
  REQ_RE_ENETER_PAN: "Re-enter pan number",
  REQ_RE_ENETER_PASSPORT_NOT_MATCH: "Passport number does not match",
  REQ_RE_ENETER_PAN_NOT_MATCH: "Pan number does not match",
  REQ_PASSPORT_FRONT: "Passport proof is required field",
  REQ_PAN_FRONT: "PAN proof is required field",
  REQ_DL_FRONT: "License front proof is required field",
  REQ_DL_BACK: "License back proof is required field",
  INVALID_AADHAR: "Invalid aadhar number",
  REQ_DL_NUM: "License number",
  REQ_RE_ENTER_DL_NUM: "Re-enter your License number",
  REQ_RE_ENTER_DL_NUM_NOT_MATCH: "License number does not match",
  MIN_PHONE: "Please enter a valid phone number",
  MIN_AADHAR: "Minimum aadhar number required",
  MAXIMUM_PAN: "Maximum pan number exceed",
  MIN_DL: "Minimum driving license number required",
  AADHAR_DOESNOT_MATCH: "Aadhar number does not match",
  REQ_IMAGE_PROOF: "Profile image is required field",
  REQ_TRANS_PROOF_ID: "Transaction proof is required field",
  REQ_TRANS_ID: "Transaction ID",
  REQ_FRONT_AADHAR_IMG: "Aadhar front proof",
  REQ_BACK_AADHAR_IMG: "Aadhar back proof",
  REQ_AADHAR_ADDRESS: "Aadhar address is required field",
  REQ_CURRENCY_PREFERENCE: "Currency preference",

  REQ_MOD: "Payment mode",
  REQ_TRANSACTION_DATE: "Date",
  REQ_AMOUNT: "Amount",
  REQ_TRANSACTION_NUM: "UTR/Transaction ID",
  REQ_PAYMENT_PROOF: "Payment proof is required field",

  REQ_WITHDRAW_ADDRESS: "Address",
  REQ_NETWORK: "Network",
  REQ_DOOR_NO: "Flat no",
  REQ_STREET: "Street",
  REQ_REMARKS: "Remarks",

  // REGISTER
  REQ_NAME: "Name",
  NAME_REGEX: /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
  INVALID_NAME: "Name can only contain letters",
  MIN_CHAR: "Minimum 3 characters required",
  INVALID_EMAIL: "Invalid email",

  // LOGIN
  PASSWORD_REGEX_EXP:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
  PASSWORD_REGEX_MSG:
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character",
  PASSWORD_REGEX_MSG_2: "Invalid Password",

  // RESET-PASSWORD
  REQ_NEW_PASSWORD: "New password",
  REQ_CONFIRM_PASSWORD: "Confirm password",
  REQ_PASSWORD_NOT_MATCH: "Passwords does not match",
  REQ_BANK_PROOF: "Please upload your payment attachment",
  REQ_IS_PAYMENE_CHECK: "Please confirm your Successful Payment",
  AMOUNT_CHECK_ISSUE: "Amount issue",
  UPLOAD_AMOUNT_ISSUE: "Please upload the amount issue",

  REQ_SUBJECT: "Subject",
  REQ_CONTENT: "Content",
};

export const status = {
  SUCCESS: 200,
  SUCCESSCODE: 201,
  UNAUTHORIZED: 401,
};
export const KYC_VERIFY = {
  VERIFY: 1,
  UN_VERIFY: 3,
  REJECTED: 0,
  PROCESSING: 2,

  BASIC_VERIFY: 10,
  PAN_VERIFY: 20,
  AADHAR_VERIFY: 30,
};
export const USER_STATUS = {
  PROCESS: 0,
  ACTIVE: 1,
  DE_ACTIVE: 2,
};
export const DEFAULT_STEP = 0;
export const STEP = 1;
export const VERIFY_KYC_STEPS = {
  IDENTIFICATION_DETAILS: 10,
  PAN_DETAILS: 20,
  AADHAR_DETAILS: 30,

  KYC_DETAILS: 10,
  ADDRESS_DETAILS: 20,
  BANK_DETAILS: 30,
};
