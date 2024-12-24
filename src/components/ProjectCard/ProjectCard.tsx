import React from "react";
import "./ProjectCard.css";

interface ProjectCardProps {
  name: string;
  description?: string;
  url: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ name, description, url }) => {
  return (
    <div className="card-container">
      <div className="card">
        <div className="front-content">
          <p>{name}</p>
          <div className="btn"></div>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024" className="icon"></svg>
          <p>
            {description || "Lorem ipsum dolor sit amet, consectetur adipii voluptas ten mollitia pariatur odit, ab minus ratione adipisci accusamus vel est excepturi laboriosam magnam necessitatibus dignissimos molestias."}
          </p>
          
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
