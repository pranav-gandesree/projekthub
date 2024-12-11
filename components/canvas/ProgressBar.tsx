'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import NProgress from 'nprogress';

const ProgressBar = () => {
  const pathname = usePathname(); 
  const [previousPath, setPreviousPath] = useState<string | null>(null);

  useEffect(() => {
    if (previousPath !== pathname) {
      NProgress.start(); 
      setTimeout(() => NProgress.done(), 700);
      setPreviousPath(pathname); 
    }
  }, [pathname, previousPath]);

  return null;
};

export default ProgressBar;
