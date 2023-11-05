import type { ErrorInfo, PropsWithChildren } from 'react';
import { Component } from 'react';

import ErrorPage from 'common/components/ErrorPage';

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<PropsWithChildren, ErrorBoundaryState> {
  constructor(props: PropsWithChildren) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error, errorInfo);
    this.setState({ hasError: true });
  }

  render() {
    return this.state.hasError ? <ErrorPage error='Something went wrong' /> : this.props.children;
  }
}
