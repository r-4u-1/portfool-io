import React, {useState, forwardRef} from "react";
import "./TimeLine.css";
import TimeLineItem from "../TimeLineItem/TimeLineItem";
import { jobs } from "../../data/jobs";

interface Job {
  date: string;
  heading: string;
  content: string;
}

// interface TimeLineProps {
//   width: number;
// }

interface TimeLineProps {
    ref: React.RefObject<HTMLDivElement>;
}

export const TimeLine = forwardRef<HTMLDivElement, TimeLineProps>((_, ref) => {
  const [windowWidth, setWindowWidth] = useState<number>(0);
      React.useEffect(() => {
        const handleResize = () => {
          const width = window.innerWidth;
          setWindowWidth(width);

          // Automatically close the mobile menu if width exceeds threshold
          if (width > 1200) {
            setWindowWidth(width); // Close menu when view is not mobile
          }
        };

        window.addEventListener("resize", handleResize);

        // Initial check
        handleResize();

        return () => {
          window.removeEventListener("resize", handleResize); // Cleanup on component unmount
        };
      }, []);
  
  const isLast = jobs.length - 1;

  return (
    <div className="timeline" ref={ref}>
      {jobs.map((job: Job, index: number) => (
        <TimeLineItem
          key={index}
          date={job.date}
          heading={job.heading}
          content={job.content}
          componentClass={`timeline__component ${
            index === isLast ? "timeline__component--bottom" : ""
          }`}
          datePositionRight={windowWidth > 1200 ? (index % 2 === 0) : false}
          isLast={index === isLast}
        />
      ))}
    </div>
  );
});
