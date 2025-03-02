
import React from 'react';
import TransitionEffect from './TransitionEffect';

const Hero = () => {
  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center pt-16 pb-16 relative">
      <div className="container-section flex flex-col items-center justify-center text-center">
        <TransitionEffect delay={100}>
          <div className="inline-block mb-6 px-3 py-1 bg-secondary rounded-full text-sm font-medium tracking-wider">
            FULL STACK DEVELOPER
          </div>
        </TransitionEffect>
        
        <TransitionEffect delay={300}>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 max-w-3xl">
            Creating elegant digital experiences
          </h1>
        </TransitionEffect>
        
        <TransitionEffect delay={500}>
          <p className="text-xl text-muted-foreground max-w-xl mb-10">
            I build modern web applications with a focus on clean code, 
            intuitive interfaces, and exceptional user experiences.
          </p>
        </TransitionEffect>
        
        <TransitionEffect delay={700}>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button 
              onClick={scrollToProjects}
              className="btn-primary animate-breathe"
            >
              View Projects
            </button>
            <a 
              href="#contact" 
              className="btn-secondary"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('contact');
                if (element) {
                  window.scrollTo({
                    top: element.offsetTop - 80,
                    behavior: 'smooth'
                  });
                }
              }}
            >
              Get in Touch
            </a>
          </div>
        </TransitionEffect>
        
        {/* Abstract background elements */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl -z-10 animate-float"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl -z-10 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
    </section>
  );
};

export default Hero;
