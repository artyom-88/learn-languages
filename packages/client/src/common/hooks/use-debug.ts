import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

export const useDebug = (name: string): void => {
  const { pathname } = useLocation();
  const params = useParams<Record<string, string>>();

  useEffect(() => {
    console.log(`${name} mount`);
    return () => {
      console.log(`${name} unmount`);
    };
  }, [name]);

  useEffect(() => {
    console.log('pathname:', pathname);
  }, [pathname]);

  useEffect(() => {
    console.log('params:', JSON.stringify(params));
  }, [params]);
};
