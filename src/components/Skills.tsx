import React, { useRef, useEffect, useState } from 'react';
import SkillCard, { SkillData } from './SkillCard';
import TransitionEffect from './TransitionEffect';
import { cn } from '@/lib/utils';

const skillsData: SkillData[] = [
  {
    name: 'React',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    level: 90,
    category: 'frontend'
  },
  {
    name: 'JavaScript',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    level: 85,
    category: 'frontend'
  },
  {
    name: 'TypeScript',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    level: 80,
    category: 'frontend'
  },
  {
    name: 'Node.js',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    level: 75,
    category: 'backend'
  },
  {
    name: 'MongoDB',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    level: 70,
    category: 'backend'
  },
  {
    name: 'PostgreSQL',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    level: 65,
    category: 'backend'
  },
  {
    name: 'Git',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    level: 85,
    category: 'tools'
  },
  {
    name: 'Docker',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    level: 60,
    category: 'tools'
  },
];

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  
  const filters = [
    { id: 'all', label: 'All Skills' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'tools', label: 'Tools' }
  ];

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

  const filteredSkills = activeFilter === 'all' 
    ? skillsData 
    : skillsData.filter(skill => skill.category === activeFilter);

  return (
    <section id="skills" ref={sectionRef} className="py-16 md:py-24 bg-secondary/50">
      <div className="container-section">
        <TransitionEffect className={isVisible ? 'animate-slide-in' : ''}>
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-3 py-1 bg-background rounded-full text-sm font-medium tracking-wider">
              MY EXPERTISE
            </div>
            <h2 className="section-heading">Technical Skills</h2>
            <p className="section-subheading mx-auto">
              The technologies and tools I work with to bring ideas to life
            </p>
          </div>
        </TransitionEffect>

        <TransitionEffect delay={200} className={isVisible ? 'animate-slide-in' : ''}>
          <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
            {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm transition-all",
                  activeFilter === filter.id 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-background text-muted-foreground hover:text-foreground"
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </TransitionEffect>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredSkills.map((skill, index) => (
            <TransitionEffect 
              key={index} 
              delay={index * 100}
              className={isVisible ? 'animate-slide-in' : ''}
            >
              <SkillCard skill={skill} />
            </TransitionEffect>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
