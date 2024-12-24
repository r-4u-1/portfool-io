import React, { useState, useEffect } from 'react';
import './Portfolio.css';
import ProjectCard from '../ProjectCard/ProjectCard';

interface Project {
    id: number;
    name: string;
    description: string;
    image: string;
    link: string;
}

const Portfolio: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('https://api.github.com/users/r-4u-1/repos');
                const data = await response.json();
                const formattedProjects: Project[] = data.map((repo: any) => ({
                    id: repo.id,
                    name: repo.name,
                    description: repo.description,
                    image: 'https://via.placeholder.com/150',
                    link: repo.html_url
                }));
                setProjects(formattedProjects);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects();
    }, []);

    return (
        <>
            {projects && projects.length > 0 && (
                <div className="portfolio-container">
                    {projects.map(project => (
                        <ProjectCard key={project.id} name={project.name} description={project.description} url={project.link} />
                    ))}
                </div>
            )}
        </>
    );
};

export default Portfolio;
