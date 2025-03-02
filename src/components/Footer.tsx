
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-10 bg-background border-t border-border">
      <div className="container max-w-6xl px-6 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a href="#home" className="text-xl font-bold tracking-tight">
              Portfolio
            </a>
            <p className="text-muted-foreground text-sm mt-2">
              Crafting digital experiences with precision and care.
            </p>
          </div>
          
          <div className="flex flex-col text-center md:text-right">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} All Rights Reserved
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Designed & Built with ❤️
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
