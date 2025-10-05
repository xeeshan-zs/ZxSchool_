import { Github, Twitter, Linkedin, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-primary text-primary-foreground px-3 py-1.5 rounded-md">
                <span>Zx</span>
              </div>
              <span className="tracking-tight">School</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Empowering the next generation of developers with quality education.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>

            </div>
          </div>
          
          <div>
            <h4 className="mb-4">Courses</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">C++ Programming</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Java Programming</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">SQL & Databases</a></li>

            </ul>
          </div>
          
          <div>
            <h4 className="mb-4">Resources</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Free Tutorials</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Community Forum</a></li>

            </ul>
          </div>
          
          <div>
            <h4 className="mb-4">Company</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border text-center text-muted-foreground">
          <p>© 2025 ZxSchool. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
