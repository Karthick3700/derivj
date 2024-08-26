import { toast } from "react-toastify";

export const handleSuccess = (resp) => {
  return resp?.data?.message;
};

export const handleError = (err) => {
  const resMessage =
    err?.response?.meta?.message || err?.message || err.toString();
  return resMessage;
};

export const showSuccessMsg = (msg) => {
  return toast.success(msg, { autoClose: 3000 });
};

export const showErrorMsg = (msg) => {
  return toast.error(msg, { autoClose: 3000 });
};
// const MAX_FILE_SIZE = 102400; //100KB
export const fileSize = () => 2048000;

export const imageFilevalidation = (file) => {
  const validFileExtensions = ["jpg", "gif", "png", "jpeg", "svg", "webp"];

  if (file) {
    const fileExtension = file.name.split(".").pop().toLowerCase();

    return validFileExtensions.includes(fileExtension);
  }
  return false;
};

// SVG ICONS

export const LogoutIcon = (width, height, className) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    width={width}
    height={height}
    fill="currentColor"
    className={className}
  >
    <path d="M51.92 34a19.92 19.92 0 1 1-27.41-18.41 2 2 0 0 1 1.5 3.7 15.92 15.92 0 1 0 12 0 2 2 0 1 1 1.5-3.7A19.8 19.8 0 0 1 51.92 34ZM32 32.7a2 2 0 0 0 2-2V12a2 2 0 0 0-4 0v18.7a2 2 0 0 0 2 2Z" />
  </svg>
);

export const menubtn = (width, height) => {
  return (
    <svg
      viewBox="0 0 26 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className="dark:fill-white"
    >
      <path
        d="M2 2h22M2 10h22M2 18h22"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      ></path>
    </svg>
  );
};

export const theme = (width, height) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
};

export const closeicon = (width, height) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </svg>
  );
};

export const eyeslashIcon = (width, height, className) => {
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
    >
      <title>Hide Password</title>
      <path
        fill="currentColor"
        d="M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z"
      />
    </svg>
  );
};

export const eyeIcon = (width, height, className) => {
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <title>View Password</title>
      <path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" />
    </svg>
  );
};
export const DashboardIcon = (width, height) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="text-gray-800 dark:text-gray-200"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    width={width}
    height={height}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M3 3h18v6H3z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M3 12h9v9H3z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 12h9v9h-9z"
    />
  </svg>
);

export const ProfileIcon = (width, height) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className=" text-gray-800 dark:text-gray-200"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    width={width}
    height={height}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM6 21v-1a4 4 0 014-4h4a4 4 0 014 4v1H6z"
    />
  </svg>
);

export const KYCIcon = (width, height) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className=" text-gray-800 dark:text-gray-200"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    width={width}
    height={height}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 4.25a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM12 7v3m0 0v3m0-3H9m3 0h3M4 7h16m-8 6a6.5 6.5 0 110 13h-8a2 2 0 01-2-2v-2.5a4.5 4.5 0 011.5-3.5 4.5 4.5 0 015.5-.5M12 14.5c1.5 0 3 .5 4 1.5m4-1v-2a2 2 0 00-2-2H6m0 5h.5"
    />
  </svg>
);

export const AddressIcon = (width, height) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className=" text-gray-800 dark:text-gray-200"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    width={width}
    height={height}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 11c0-2.21-1.79-4-4-4s-4 1.79-4 4c0 2.22 1.79 4 4 4s4-1.78 4-4zM20 13v2a1 1 0 01-1 1h-4v-3h4m0 6v2a1 1 0 01-1 1h-4v-3h4m-4-9h6V4a1 1 0 00-1-1H8a1 1 0 00-1 1v1m-3 4V7H4a1 1 0 00-1 1v1"
    />
  </svg>
);

export const BankIcon = (width, height) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className=" text-gray-800 dark:text-gray-200"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    width={width}
    height={height}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M3 10h18M3 6l9-4 9 4M4 10h16v10a1 1 0 01-1 1h-14a1 1 0 01-1-1V10zM8 20v2h8v-2"
    />
  </svg>
);
export const SubscribeIcon = (width, height) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="text-gray-800 dark:text-gray-200"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    width={width}
    height={height}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M8 6H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2h-4m-6 4V4m0 0a2 2 0 00-2 2m2-2a2 2 0 012 2m-6 2v12m12-12v12m-6-6H6"
    />
  </svg>
);
export const DepositIcon = (width, height) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="text-gray-800 dark:text-gray-200"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    width={width}
    height={height}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 3v12m6-6l-6 6-6-6m12 3v6h-2v-4H8v4H6v-6M4 4h16v2H4z"
    />
  </svg>
);
export const WithdrawIcon = (width, height) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="text-gray-800 dark:text-gray-200"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    width={width}
    height={height}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 21V9m-6 6l6-6 6 6m-12 3v6h2v-4h8v4h2v-6m-8-8v2m-4 4v12m16-12v12"
    />
  </svg>
);
export const ChangePwdIcon = (width, height) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="text-gray-800 dark:text-gray-200"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    width={width}
    height={height}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 11V7a4 4 0 00-8 0v4H2a1 1 0 00-1 1v9a1 1 0 001 1h20a1 1 0 001-1v-9a1 1 0 00-1-1h-2v-4a4 4 0 00-8 0v4h-2z"
    />
  </svg>
);

export const logoutsvg = (width, height) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="text-gray-800 dark:text-gray-200"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    width={width}
    height={height}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h6a2 2 0 012 2v1"
    />
  </svg>
);
