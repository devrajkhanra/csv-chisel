'use client';
import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
          <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-xl shadow-lg p-8 text-center space-y-6">
            <div className="flex justify-center">
              <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-full">
                <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                Something went wrong
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                We encountered an unexpected error. Please try refreshing the page.
              </p>
            </div>

            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh Page
            </button>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="text-left mt-4">
                <summary className="cursor-pointer text-sm text-slate-500 dark:text-slate-400">
                  Error Details
                </summary>
                <pre className="mt-2 text-xs bg-slate-100 dark:bg-slate-800 p-2 rounded overflow-auto">
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}