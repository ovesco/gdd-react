import React, { useEffect, useState } from 'react';

export default (ref: React.RefObject<SVGElement>) => {

  const [dim, setDim] = useState([0, 0]);
  useEffect(() => {
    if (ref.current) {
      // @ts-ignore
      const { width, height } = ref.current.getBBox();
      setDim([width, height]);
    }
  }, [ref.current]);
  return dim;
};