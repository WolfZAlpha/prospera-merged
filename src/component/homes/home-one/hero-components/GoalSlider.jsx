import React from 'react';
import GoalSvg from './GoalSvg';

const GoalSlider = ({ current }) => {
  const goalNumber = 2723000000; // Static goal value
  const currentNumber = Number(current);
  const widthPercentage = (currentNumber / goalNumber) * 100;

  return (
    <div className="relative px-px mt-6 max-md:mr-2 max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <GoalSvg current={current} goal={goalNumber} widthPercentage={widthPercentage} />
      </div>
    </div>
  );
};

export default GoalSlider;