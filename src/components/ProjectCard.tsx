
import React, { useState } from 'react';
import { ExternalLink, Github, Edit, Check } from 'lucide-react';
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
  onUpdate?: (index: number, updatedProject: ProjectData) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onUpdate }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProject, setEditedProject] = useState<ProjectData>({ ...project });
  
  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      if (onUpdate) {
        onUpdate(index, editedProject);
      }
    }
    setIsEditing(!isEditing);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedProject(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagString = e.target.value;
    const tags = tagString.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    setEditedProject(prev => ({
      ...prev,
      tags
    }));
  };
  
  return (
    <div 
      className="relative rounded-lg overflow-hidden card-hover shadow-subtle h-full flex flex-col"
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
      
      <div className="p-6 flex-1 flex flex-col">
        {isEditing ? (
          <div className="flex-1 flex flex-col gap-3">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Title</label>
              <input
                type="text"
                name="title"
                value={editedProject.title}
                onChange={handleInputChange}
                className="w-full p-2 rounded border bg-background text-xl font-semibold"
              />
            </div>
            
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Tags (comma-separated)</label>
              <input
                type="text"
                name="tags"
                value={editedProject.tags.join(', ')}
                onChange={handleTagChange}
                className="w-full p-2 rounded border bg-background text-sm"
              />
            </div>
            
            <div className="flex-1">
              <label className="text-xs text-muted-foreground mb-1 block">Description</label>
              <textarea
                name="description"
                value={editedProject.description}
                onChange={handleInputChange}
                className="w-full p-2 rounded border bg-background text-sm h-24 resize-none"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Demo URL</label>
                <input
                  type="url"
                  name="demoUrl"
                  value={editedProject.demoUrl}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded border bg-background text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">GitHub URL</label>
                <input
                  type="url"
                  name="githubUrl"
                  value={editedProject.githubUrl}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded border bg-background text-sm"
                />
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex gap-2 mb-3 flex-wrap">
              {project.tags.map((tag, i) => (
                <span key={i} className="tag">
                  {tag}
                </span>
              ))}
            </div>
            
            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
            <p className="text-muted-foreground mb-4 flex-1">{project.description}</p>
            
            <div className="flex items-center space-x-3 mt-auto">
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
          </>
        )}
      </div>
      
      {/* Edit button */}
      <button 
        onClick={handleEditToggle}
        className="absolute top-2 right-2 p-2 bg-background/80 backdrop-blur-sm rounded-full shadow-md z-10 hover:bg-primary/10 transition-colors"
      >
        {isEditing ? <Check size={16} /> : <Edit size={16} />}
      </button>
      
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
