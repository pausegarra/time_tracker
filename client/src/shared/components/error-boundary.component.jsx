import React from 'react';
import ErrorFallback from './error-fallback.component';

class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
    error: '',
  };

  static getDerivedStateFromError (error) {
    return { hasError: true, error: error };
  }

  render () {
    const { hasError, error } = this.state;
    if (hasError) {
      return <ErrorFallback message={error.message} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
