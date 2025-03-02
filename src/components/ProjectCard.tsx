
import React, { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ProjectData {
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl: string;
  githubUrl: string;
}

interface ProjectCardProps {
  project: ProjectData;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="relative rounded-lg overflow-hidden card-hover shadow-subtle"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-video w-full overflow-hidden">
        <div 
          className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-in-out-expo"
          style={{ 
            backgroundImage: `url(${project.image})`,
            transform: isHovered ? 'scale(1.05)' : 'scale(1)'
          }}
        />
      </div>
      
      <div className="p-6">
        <div className="flex gap-2 mb-3 flex-wrap">
          {project.tags.map((tag, i) => (
            <span key={i} className="tag">
              {tag}
            </span>
          ))}
        </div>
        
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <p className="text-muted-foreground mb-4">{project.description}</p>
        
        <div className="flex items-center space-x-3">
          <a 
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-medium"
          >
            <ExternalLink size={18} className="mr-1" />
            Live Demo
          </a>
          <a 
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-medium"
          >
            <Github size={18} className="mr-1" />
            GitHub
          </a>
        </div>
      </div>
      
      {/* Border animation on hover */}
      <div 
        className={cn(
          "absolute inset-0 border-2 border-transparent rounded-lg transition-all duration-300 pointer-events-none",
          isHovered && "border-primary/20"
        )}
      />
    </div>
  );
};

export default ProjectCard;
