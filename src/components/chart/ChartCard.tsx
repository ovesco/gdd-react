import React from 'react';

type Props = {
  loading: boolean;
};

const ChartCard: React.FunctionComponent<Props> = ({ loading, children }) => {
  return (
    <div className="bg-white rounded shadow m-3">
      {loading && (
        <div>Loading</div>
      )}
      {!loading && children}
    </div>
  );
};

export default ChartCard;