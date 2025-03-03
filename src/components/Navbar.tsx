import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const navLinks = [{
    title: 'Home',
    id: 'home'
  }, {
    title: 'Projects',
    id: 'projects'
  }, {
    title: 'Skills',
    id: 'skills'
  }, {
    title: 'About',
    id: 'about'
  }, {
    title: 'Contact',
    id: 'contact'
  }];
  const handleScroll = () => {
    // Add shadow on scroll
    const scrollPosition = window.scrollY;
    setScrolled(scrollPosition > 10);

    // Update active section based on scroll position
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
      const sectionTop = (section as HTMLElement).offsetTop - 100;
      const sectionHeight = (section as HTMLElement).offsetHeight;
      const sectionId = section.getAttribute('id') || '';
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        setActiveSection(sectionId);
      }
    });
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };
  return <nav className={cn('fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-8 transition-all duration-300', scrolled ? 'bg-background/80 backdrop-blur-lg shadow-subtle' : 'bg-transparent')}>
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <a href="#home" className="text-xl font-bold tracking-tight" onClick={e => {
          e.preventDefault();
          scrollToSection('home');
        }}>mdwp</a>
        </div>
        
        <div className="hidden md:flex items-center space-x-2">
          {navLinks.map(link => <a key={link.id} href={`#${link.id}`} className={cn('nav-link', activeSection === link.id && 'active')} onClick={e => {
          e.preventDefault();
          scrollToSection(link.id);
        }}>
              {link.title}
            </a>)}
        </div>
        
        <div className="md:hidden">
          {/* Mobile menu could be implemented here */}
        </div>
      </div>
    </nav>;
};
export default Navbar;