import React from 'react';
import { useMemo } from 'reactn';
import { BiCheckShield } from 'react-icons/bi';

type Props = {
  title: string;
};

const EventList: React.FunctionComponent<Props> = ({ children, title }) => {
  const empty = useMemo(() => {
    if (children === undefined) return true;
    if (Array.isArray(children) && children.length === 0) return true;
    return false;
  }, [children]);

  return (
    <div className="flex flex-col rounded shadow bg-white w-full">
      <h1 className="text-lg text-center text-gray-800 p-3">{title}</h1>
      {!empty && children}
      {empty && (
        <div className="flex flex-col justify-center items-center ml-3 mr-3 mb-3 pt-3 pb-3 border-gray-200 border-dashed border-2">
          <BiCheckShield className="text-gray-500 text-3xl" />
          <div className="text-sm text-gray-500">No events here</div>
        </div>
      )}
    </div>
  );
};

export default EventList;