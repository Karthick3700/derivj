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
        <div className="flex justify-center items-center w-full min-h-screen">
          <h1>Oops! Something went wrong.</h1>
          <p>
            Try refreshing the page or contact support if the issue persists.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
