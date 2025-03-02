import React, { useRef, useEffect, useState } from 'react';
import ProjectCard, { ProjectData } from './ProjectCard';
import TransitionEffect from './TransitionEffect';

const projectsData: ProjectData[] = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-featured online store with payment processing and inventory management.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNvZGluZ3xlbnwwfHwwfHx8&auto=format&fit=crop&w=800&q=60',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    title: 'Task Management App',
    description: 'A collaborative task manager with real-time updates and project organization.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNvZGluZ3xlbnwwfHwwfHx8&auto=format&fit=crop&w=800&q=60',
    tags: ['Vue.js', 'Firebase', 'Tailwind CSS'],
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    title: 'Weather Dashboard',
    description: 'A beautiful weather visualization tool with forecasts and historical data.',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNvZGluZ3xlbnwwfHwwfHx8&auto=format&fit=crop&w=800&q=60',
    tags: ['JavaScript', 'Chart.js', 'Weather API', 'CSS Grid'],
    demoUrl: '#',
    githubUrl: '#'
  },
];

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-16 md:py-24">
      <div className="container-section">
        <TransitionEffect className={isVisible ? 'animate-slide-in' : ''}>
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-3 py-1 bg-secondary rounded-full text-sm font-medium tracking-wider">
              MY WORK
            </div>
            <h2 className="section-heading">Featured Projects</h2>
            <p className="section-subheading mx-auto">
              A selection of my recent development work
            </p>
          </div>
        </TransitionEffect>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <TransitionEffect 
              key={index} 
              delay={index * 100}
              className={isVisible ? 'animate-slide-in' : ''}
            >
              <ProjectCard project={project} index={index} />
            </TransitionEffect>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
