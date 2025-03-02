
import React from 'react';
import { cn } from '@/lib/utils';

export interface SkillData {
  name: string;
  icon: string;
  level: number; // 1-100
  category: 'frontend' | 'backend' | 'tools' | 'other';
}

interface SkillCardProps {
  skill: SkillData;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
  const categoryColors: Record<string, string> = {
    frontend: 'bg-blue-50 border-blue-100 text-blue-600',
    backend: 'bg-green-50 border-green-100 text-green-600',
    tools: 'bg-violet-50 border-violet-100 text-violet-600',
    other: 'bg-amber-50 border-amber-100 text-amber-600',
  };

  const colorClass = categoryColors[skill.category] || categoryColors.other;
  
  return (
    <div className="flex flex-col items-center p-5 rounded-lg bg-white dark:bg-secondary border border-border transition-all duration-300 hover:shadow-subtle">
      <div className={cn("w-16 h-16 flex items-center justify-center rounded-full mb-4", colorClass)}>
        <img src={skill.icon} alt={skill.name} className="w-8 h-8" />
      </div>
      
      <h3 className="text-lg font-medium mb-2">{skill.name}</h3>
      
      <div className="w-full bg-secondary rounded-full h-1.5 mb-2">
        <div 
          className="bg-primary h-1.5 rounded-full transition-all duration-1000 ease-in-out-expo" 
          style={{ width: `${skill.level}%` }}
        />
      </div>
      
      <p className="text-xs text-muted-foreground">
        {skill.level < 30 && 'Beginner'}
        {skill.level >= 30 && skill.level < 70 && 'Intermediate'}
        {skill.level >= 70 && 'Advanced'}
      </p>
    </div>
  );
};

export default SkillCard;
