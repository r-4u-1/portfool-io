import React from 'react';

interface TimeLineItemProps {
  date: string;
  heading: string;
  content: string;
  componentClass: string;
  datePositionRight: boolean;
  isLast: boolean;
}

const TimeLineItem: React.FC<TimeLineItemProps> = ({ date, heading, content, componentClass, datePositionRight, isLast }) => {
  const leftSideTimeComponent = () => {
    return (
      <div className="timeline__component timeline__component--left">{date}</div>
    );
  };

  const rightSideTimeComponent = () => {
    return (
      <div className="timeline__component timeline__component--right">{date}</div>
    );
  };

  const leftSideContentComponent = () => {
    return (
      <div className="timeline__component timeline__component--bg">
        <div className="timeline__component timeline__component-fill">
          <h2 className="timeline__title">{heading}</h2>
          <p className="timeline__content">{content}</p>
        </div>
      </div>
    );
  };

  const rightSideContentComponent = () => {
    return (
      <div className="timeline__component timeline__component--bg">
        <h2 className="timeline__title">{heading}</h2>
        <p className="timeline__content">{content}</p>
      </div>
    );
  };

  return (
    <>
      <div className={componentClass}>
        {datePositionRight ? rightSideTimeComponent() : rightSideContentComponent()}
      </div>
      <div className="timeline__middle">
        <div className="timeline__point"></div>
        {isLast && <div className="timeline__point timeline__point--bottom"></div>}
      </div>
      {datePositionRight ? leftSideContentComponent() : leftSideTimeComponent()}
    </>
  );
};

export default TimeLineItem;