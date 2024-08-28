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

  if (file && file.name) {
    const fileExtension = file.name.split(".").pop().toLowerCase();

    return validFileExtensions.includes(fileExtension);
  }
  return false;
};

export const formatDate = (date) => {
  return date
    ? `${date.getDate()}/${date.toLocaleString("default", {
        month: "short",
      })}/${date.getFullYear()}`
    : "";
};

// SVG ICONS

export const Logo = () => (
  <svg
    className="md:w-12 md:h-12 w-10 h-10"
    viewBox="0 0 100 120"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g transform="matrix(1.0096,0,0,1.0096,5.5341,15.4612)" fill="#ffb400">
      <path d="M5.52,60.48a4.64,4.64,0,0,1-4.62-4A49.21,49.21,0,0,1,9.86,21,49.71,49.71,0,0,1,78,9.13l2.09-2.89a1.5,1.5,0,0,1,2.62.34l5.52,14.33a1.5,1.5,0,0,1-1.47,2l-15.33-.75a1.5,1.5,0,0,1-1.14-2.38L72.36,17A40,40,0,0,0,17.7,26.64a39.57,39.57,0,0,0-3,4.93h12.5A.91.91,0,0,1,28,32.93a7.11,7.11,0,0,0-.64,5.4,6.32,6.32,0,0,0,3.85,3.8A11.78,11.78,0,0,0,41,41.39l9.4-5.26a.65.65,0,0,1,.82.15l19.65,24,2.43,2.93a4,4,0,0,1-.89,6,4.06,4.06,0,0,1-4.93-.61l-.33-.32a.09.09,0,0,0-.14.08,4,4,0,0,1-1.72,4.08,4.1,4.1,0,0,1-5.07-.58l-.3-.29a.09.09,0,0,0-.14.08,4,4,0,0,1-1.72,4.08A4.1,4.1,0,0,1,53,75.17l-.3-.29a.09.09,0,0,0-.14.08,4,4,0,0,1-6.2,4l.38-.67a7.22,7.22,0,0,0-1-8.7,7,7,0,0,0-3.83-1.93,6.93,6.93,0,0,0-4.05-3.16A6.94,6.94,0,0,0,33,59.71a6.9,6.9,0,0,0-2.76-3.87,7.33,7.33,0,0,0-9.49,1.54l-2.54,3.11H5.52Zm22.55-1.82a3.48,3.48,0,0,0-4.43.89L21,62.79a3.34,3.34,0,0,0,.53,4.75l.4.32a3.34,3.34,0,0,0,3.74.26.16.16,0,0,1,.24.17,3.35,3.35,0,0,0,1.22,3.28l.33.26a3.36,3.36,0,0,0,3.61.35.17.17,0,0,1,.25.17,3.37,3.37,0,0,0,1.27,3l.23.18a3.39,3.39,0,0,0,3.65.34.19.19,0,0,1,.29.14A3.38,3.38,0,0,0,38,78.14l.14.11a3.42,3.42,0,0,0,5.08-1l.49-.87A3.53,3.53,0,0,0,43.12,72a3.4,3.4,0,0,0-3.7-.58.1.1,0,0,1-.14-.1A3.36,3.36,0,0,0,34.69,68c-.5.09-.39-.35-.39-.35a3.36,3.36,0,0,0-4.73-4.22c-.38.05-.33-.29-.33-.29A3.34,3.34,0,0,0,28.07,58.66ZM97.43,35.79l-.32-1v0a4.67,4.67,0,0,0-4.43-3.18h-11a11.85,11.85,0,0,1-4.22-.78L56.77,22.9a12.91,12.91,0,0,0-12.42,1.79l-13,9.87A2.47,2.47,0,0,0,32,38.64a8.15,8.15,0,0,0,7.23-.36l11.06-6.19a2,2,0,0,1,2.49.47l24.11,29.3a.61.61,0,0,0,.86.09l1-.83a2.82,2.82,0,0,1,1.78-.63h7.83A39.84,39.84,0,0,1,25.84,81.74L28.05,79a1.5,1.5,0,0,0-1-2.44L11.78,75a1.5,1.5,0,0,0-1.58,2l4.71,14.61A1.5,1.5,0,0,0,17.5,92l2.24-2.77A49.53,49.53,0,0,0,97.43,35.79Z"></path>
    </g>
  </svg>
);

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
