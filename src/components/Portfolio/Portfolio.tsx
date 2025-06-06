import React, { useState, useEffect, useRef } from 'react';
import './Portfolio.css';
import ProjectCard from '../ProjectCard/ProjectCard';

interface Project {
    id: number;
    name: string;
    description: string;
    image: string;
    link: string;
}

interface Repo {
    id: number;
    name: string;
    description: string;
    html_url: string;
}

const GITHUB_API = 'https://api.github.com/users/r-4u-1/repos';

const Portfolio: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const abortController = useRef<AbortController | null>(null);

    useEffect(() => {
        abortController.current = new AbortController();
        const fetchProjects = async () => {
            setLoading(true);
            setError(null);
            try {
                const signal = abortController.current ? abortController.current.signal : undefined;
                const response = await fetch(GITHUB_API, { signal });
                if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
                const data: Repo[] = await response.json();
                const formattedProjects: Project[] = data.map((repo: Repo) => ({
                    id: repo.id,
                    name: repo.name,
                    description: repo.description || 'No description provided.',
                    image: 'https://via.placeholder.com/150', // TODO: Replace with real image if available
                    link: repo.html_url
                }));
                setProjects(formattedProjects);
            } catch (err: unknown) {
                if (err && typeof err === 'object' && 'name' in err && (err as { name?: string }).name !== 'AbortError') {
                    setError((err as Error).message || 'Unknown error');
                }
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
        return () => {
            abortController.current?.abort();
        };
    }, []);

    if (loading) {
        return (
            <div className="portfolio-status" role="status" aria-live="polite">
                Loading projects...
            </div>
        );
    }

    if (error) {
        return (
            <div className="portfolio-status portfolio-error" role="alert" aria-live="assertive">
                Error loading projects: {error}
            </div>
        );
    }

    if (!projects.length) {
        return (
            <div className="portfolio-status portfolio-empty" role="status" aria-live="polite">
                No projects found.
            </div>
        );
    }

    return (
        <section className="portfolio-container" aria-label="Project portfolio">
            {projects.map(project => (
                <ProjectCard
                    key={project.id}
                    name={project.name}
                    description={project.description}
                    url={project.link}
                    // Optionally pass image if ProjectCard supports it
                />
            ))}
        </section>
    );
};

export default Portfolio;
