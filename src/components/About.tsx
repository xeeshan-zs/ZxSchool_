import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Code2, GraduationCap, Award, BookOpen } from "lucide-react";
// @ts-ignore
import zee from "../assests/zee.jpg";

const skills = [
  { name: "C++", level: "Expert" },
  { name: "Java", level: "Expert" },
  { name: "SQL", level: "Advanced" },
  { name: "HTML", level: "Expert" },
  { name: "CSS", level: "Expert" },
  { name: "JavaScript", level: "Expert" }
];

export function About() {
  return (
    <section id="about" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl mb-4">
            Meet Your Instructor
          </h2>
          <p className="text-lg text-muted-foreground">
            Learn from an experienced developer passionate about teaching
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          <div className="space-y-6">
            <Card className="p-8">
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-blue-600 to-purple-600">
                  <ImageWithFallback
                    src={zee}
                    alt="Zeeshan Sarfraz"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1">Zeeshan Sarfraz</h3>
                  <p className="text-muted-foreground mb-4">
                    Programming Instructor & Software Developer
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Educator</Badge>
                    <Badge variant="secondary">Full Stack Developer</Badge>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <h4>About Me</h4>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                I'm passionate about making programming simple, engaging, and accessible to everyone.
                As a CS major myself, I enjoy sharing my knowledge with others and helping them strengthen their foundations.
                My goal is to guide students in developing practical skills and confidence that prepare them for real-world challenges.
              </p>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-primary" />
                </div>
                <h4>Teaching Approach</h4>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                My teaching methodology emphasizes hands-on practice and project-based learning. 
                I believe in creating a supportive environment where students feel comfortable 
                asking questions and making mistakes as they learn.
              </p>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-primary" />
                </div>
                <h4>Technical Skills</h4>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {skills.map((skill, index) => (
                  <div key={index} className="p-4 bg-accent/50 rounded-lg hover:bg-accent transition-colors">
                    <div className="mb-2">{skill.name}</div>
                    <Badge variant="outline" className="text-xs">
                      {skill.level}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-primary" />
                </div>
                <h4>What You'll Learn</h4>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <span className="text-muted-foreground">
                    Core programming concepts and problem-solving techniques
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <span className="text-muted-foreground">
                    Object-oriented programming with C++ and Java
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <span className="text-muted-foreground">
                    Database management and SQL queries
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <span className="text-muted-foreground">
                    Web development with HTML, CSS, and JavaScript
                  </span>
                </li>
                {/*<li className="flex items-start gap-3">*/}
                {/*  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>*/}
                {/*  <span className="text-muted-foreground">*/}
                {/*    Best practices and industry-standard coding conventions*/}
                {/*  </span>*/}
                {/*</li>*/}
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
