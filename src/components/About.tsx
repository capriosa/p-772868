
import React, { useRef, useEffect, useState } from 'react';
import TransitionEffect from './TransitionEffect';

const About = () => {
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
    <section id="about" ref={sectionRef} className="py-20 md:py-32">
      <div className="container-section">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <TransitionEffect 
            className={isVisible ? 'animate-slide-in' : ''}
            delay={100}
          >
            <div className="rounded-lg overflow-hidden">
              <div className="relative aspect-square">
                <div 
                  className="w-full h-full bg-cover bg-center rounded-lg"
                  style={{ 
                    backgroundImage: `url(https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60)`,
                  }}
                />
                <div className="absolute inset-0 bg-primary/10 rounded-lg" />
              </div>
            </div>
          </TransitionEffect>
          
          <TransitionEffect 
            className={isVisible ? 'animate-slide-in' : ''}
            delay={300}
          >
            <div>
              <div className="inline-block mb-4 px-3 py-1 bg-secondary rounded-full text-sm font-medium tracking-wider">
                ABOUT ME
              </div>
              <h2 className="section-heading">Creative Developer & Problem Solver</h2>
              <p className="text-muted-foreground mb-6">
                I'm a full-stack developer with a passion for creating elegant, user-centered digital experiences. 
                My approach combines technical expertise with an eye for design to build applications that are both 
                functional and beautiful.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-1">
                    <div className="h-2 w-2 bg-primary rounded-full" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Problem Solver</h3>
                    <p className="text-muted-foreground text-sm">
                      I enjoy tackling complex problems and finding elegant solutions.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-1">
                    <div className="h-2 w-2 bg-primary rounded-full" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Detail Oriented</h3>
                    <p className="text-muted-foreground text-sm">
                      I believe that the small details make a big difference in the user experience.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-1">
                    <div className="h-2 w-2 bg-primary rounded-full" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Continuous Learner</h3>
                    <p className="text-muted-foreground text-sm">
                      I'm always exploring new technologies and approaches to stay at the forefront of web development.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <a 
                  href="#contact" 
                  className="btn-primary"
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
                <a 
                  href="#projects" 
                  className="btn-secondary"
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById('projects');
                    if (element) {
                      window.scrollTo({
                        top: element.offsetTop - 80,
                        behavior: 'smooth'
                      });
                    }
                  }}
                >
                  View Projects
                </a>
              </div>
            </div>
          </TransitionEffect>
        </div>
      </div>
    </section>
  );
};

export default About;
