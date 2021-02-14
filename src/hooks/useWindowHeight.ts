import { useLayoutEffect, useState } from 'react';

export default function useWindowHeight(): number {
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    const updateHeight = (): void => {
      setHeight(window.innerHeight);
    };
    window.addEventListener('resize', updateHeight);
    updateHeight();
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return height;
}
