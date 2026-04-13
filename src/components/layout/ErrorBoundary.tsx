import React, { type ReactNode, type ErrorInfo } from "react";

type Props = {
    children?: React.ReactNode;
  };

type State = {
  hasError: boolean;
  error: Error | null;
};

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  handleReload = (): void => {
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-emerald-900 via-emerald-800 to-emerald-950 text-white px-4">
          <div className="text-center max-w-lg">
            <div className="absolute inset-0 flex justify-center items-center -z-10">
              <div className="w-72 h-72 bg-emerald-500 opacity-20 rounded-full blur-3xl"></div>
            </div>

            <div className="text-6xl mb-4">⚠️</div>

            <h1 className="text-3xl font-bold text-emerald-400">
              Something went wrong
            </h1>

            <p className="text-emerald-200 mt-3">
              An unexpected error occurred. Please try refreshing the page.
            </p>

            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={this.handleReload}
                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 rounded-lg shadow-lg transition"
              >
                Reload Page
              </button>

              <a href="/">
                <button className="px-6 py-3 border border-emerald-400 hover:bg-emerald-700 rounded-lg transition">
                  Go Home
                </button>
              </a>
            </div>

            {import.meta.env.DEV && this.state.error && (
              <pre className="mt-6 text-left text-xs text-red-300 bg-black/40 p-3 rounded overflow-auto">
                {this.state.error.toString()}
              </pre>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;