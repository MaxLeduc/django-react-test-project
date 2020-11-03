import React from 'react'

interface TabListProps {
  viewCompleted: boolean
  setViewCompleted: (viewCompleted: boolean) => void
}

export const TabList = ({viewCompleted, setViewCompleted}: TabListProps) => {
  const displayCompleted = (status: boolean) => {
    if (status) {
      return setViewCompleted(true);
    }

    return setViewCompleted(false)
  };

  return (
    <div className="my-5 tab-list">
      <span
        onClick={() => displayCompleted(true)}
        className={viewCompleted ? "active" : ""}
      >
        complete
      </span>
      <span
        onClick={() => displayCompleted(false)}
        className={viewCompleted ? "" : "active"}
      >
        Incomplete
      </span>
    </div>
  );
};
