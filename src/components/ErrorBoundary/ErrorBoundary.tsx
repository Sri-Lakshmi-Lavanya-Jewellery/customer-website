import React from 'react';

interface Props {
  children: React.ReactNode;
}
interface State {
  hasError: boolean;
}

/**
 * Catches render-time errors anywhere below it so a single bad component (or an
 * unexpected API shape) shows a friendly fallback instead of white-screening the
 * whole site. Wraps the routes in App.tsx.
 */
export default class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: unknown) {
    // eslint-disable-next-line no-console
    console.error('Render error caught by ErrorBoundary:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container mx-auto py-20 px-4 text-center">
          <h1 className="font-display text-3xl text-charcoal mb-3">Something went wrong</h1>
          <p className="text-charcoal-muted font-modern mb-6">
            We hit an unexpected problem displaying this page.
          </p>
          <button
            onClick={() => window.location.assign('/')}
            className="inline-block bg-gold-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gold-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
