import React from 'react';

interface ProjectCardProps {
  year: string;
  name: string;
  tags: string[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({ year, name, tags }) => {
  return (
    <div className="project-card mb-4">
      <div className="flex justify-between items-center">
        <div>
          <div className="text-sm text-purple-dark mb-1">{year}</div>
          <div className="text-xl font-medium">{name}</div>
        </div>
        <div className="flex gap-2">
          {tags.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

const BirdMascot: React.FC = () => {
  return (
    <div className="flex justify-center my-8">
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="30" fill="#EEEAFF" stroke="#6D5BDC" strokeWidth="2"/>
        <circle cx="32" cy="32" r="4" fill="#6D5BDC"/>
        <path d="M32 45C32 45 28 36 32 32C36 28 42 35 42 35" stroke="#6D5BDC" strokeWidth="2"/>
        <path d="M32 24C32 24 28 18 35 18" stroke="#6D5BDC" strokeWidth="2"/>
        <path d="M32 24C32 24 36 18 29 18" stroke="#6D5BDC" strokeWidth="2"/>
      </svg>
    </div>
  );
};

const ProjectsSection: React.FC = () => {
  return (
    <div className="container mx-auto max-w-4xl px-4">
      <BirdMascot />
      
      <div className="mb-12">
        <h2 className="section-title text-lg font-medium">Selected Works</h2>
        
        <ProjectCard 
          year="2024" 
          name="iğma.im" 
          tags={["UI/UX", "Development"]} 
        />
        
        <ProjectCard 
          year="2023" 
          name="Kryptex Pool" 
          tags={["UI/UX", "Development"]} 
        />
        
        <ProjectCard 
          year="2022" 
          name="Quarks" 
          tags={["UI/UX", "Motion"]} 
        />
        
        <ProjectCard 
          year="2022" 
          name="Otskok" 
          tags={["Identity", "Illustration"]} 
        />
        
        <ProjectCard 
          year="🎨👾" 
          name="Illustrandom" 
          tags={["Illustration", "3D"]} 
        />
      </div>
      
      <div className="mb-12">
        <h2 className="section-title text-lg font-medium">Archive</h2>
        
        <ProjectCard 
          year="2018" 
          name="Talkwave" 
          tags={["UI/UX"]} 
        />
        
        <ProjectCard 
          year="2018" 
          name="Mantel" 
          tags={["Identity", "Illustration"]} 
        />
        
        <ProjectCard 
          year="2018" 
          name="Firebridge" 
          tags={["UI/UX"]} 
        />
        
        <ProjectCard 
          year="2018" 
          name="Lobods" 
          tags={["UI/UX"]} 
        />
        
        <ProjectCard 
          year="2018" 
          name="Meteora" 
          tags={["UI/UX"]} 
        />
      </div>
    </div>
  );
};

export default ProjectsSection;