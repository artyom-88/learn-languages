import type { JSX } from 'react';

import PageLayout from 'common/components/PageLayout';

interface ErrorPageProps {
  readonly error: string;
}

const ErrorPage = ({ error }: ErrorPageProps): JSX.Element => <PageLayout>{error}</PageLayout>;

export default ErrorPage;
