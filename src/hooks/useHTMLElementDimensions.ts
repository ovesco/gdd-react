import React, { useState, useEffect } from 'react';

const useDimensions = (ref: React.RefObject<HTMLElement>) => {
  const [dimensions, setDimensions] = useState<[number, number]>([0, 0]);
  useEffect(() => {
    if (ref.current) {
      setDimensions([ref.current.clientWidth, ref.current.clientHeight]);
    }
  }, [ref.current]);

  return dimensions;
};

export default useDimensions;