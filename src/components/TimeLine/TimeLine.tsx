import React, {useState, forwardRef, useEffect} from "react";
import "./TimeLine.css";
import TimeLineItem from "../TimeLineItem/TimeLineItem";
import { getServices, GetServicesResult } from "./utils/timeLineUtils";
// import { jobs } from "../../data/jobs";

export interface Job {
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

// interface IJobs {
//   [job: number]: Job[];
// }

export const TimeLine = forwardRef<HTMLDivElement, TimeLineProps>((_, ref) => {
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [jobs, setJobs] = useState<Job[] | null>(null);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    (async () => {
      const fetchData: GetServicesResult = await getServices(setError);
      if ("jobs" in fetchData && Array.isArray(fetchData.jobs)) {
        setJobs(fetchData.jobs);
      } else {
        setError("Failed to fetch jobs data.");
      }
    })();
  }, []);

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
  
  const isLast = jobs && jobs.length - 1;

   if (error) return <div>Failed to load personal data.</div>;
  if (!jobs) return <div>Loading…</div>;

  return (
    <div className="timeline" ref={ref}>
      {jobs && jobs.map((job: Job, index: number) => (
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
