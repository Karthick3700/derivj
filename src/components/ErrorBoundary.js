import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log("Errorboundary caught an error::", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col justify-center items-center w-full min-h-screen bg-gray-100 dark:bg-gray-800 text-center p-8">
          <h1 className="text-4xl font-bold text-red-600 mb-4">
            Oops! Something went wrong.
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            We apologize for the inconvenience. Our team has been notified.
          </p>
          <p className="text-md text-gray-600 dark:text-gray-400 mb-2">
            For immediate assistance, please contact support:
          </p>
          <p className="text-lg text-blue-500 dark:text-blue-400">
            Email: <a href="mailto:support@example.com">support@example.com</a>
          </p>
          <p className="text-lg text-blue-500 dark:text-blue-400">
            Chat: <a href="tel:+1234567890">+1234567890</a>
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-8 px-6 py-3 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 focus:outline-none"
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
