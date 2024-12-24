import React from "react";
import "./TimeLine.css";
import TimeLineItem from "../TimeLineItem/TimeLineItem";
import { jobs } from "../../data/jobs";

interface Job {
  date: string;
  heading: string;
  content: string;
}


export function TimeLine() {
  const isLast = jobs.length - 1;

  return (
    <div className="timeline">
      {jobs.map((job: Job, index: number) => (
        <TimeLineItem
          key={index}
          date={job.date}
          heading={job.heading}
          content={job.content}
          componentClass={`timeline__component ${
            index === isLast ? "timeline__component--bottom" : ""
          }`}
          datePositionRight={index % 2 === 0}
          isLast={index === isLast}
        />
      ))}
    </div>
  );
}
