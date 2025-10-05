import { Code2, Users, Trophy, Zap, BookOpen, Headphones } from "lucide-react";
import { Card } from "./ui/card";

const features = [
  {
    icon: Code2,
    title: "Interactive Coding",
    description: "Learn by doing with our interactive code editor and instant feedback system."
  },
  {
    icon: BookOpen,
    title: "Comprehensive Curriculum",
    description: "From basics to advanced topics, structured learning paths for all levels."
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Join thousands of learners and get help from our active community."
  },
  {
    icon: Trophy,
    title: "Certifications",
    description: "Earn recognized certificates to showcase your programming skills."
  },
  {
    icon: Zap,
    title: "Real Projects",
    description: "Build real-world applications and create your developer portfolio."
  },
  {
    icon: Headphones,
    title: "Expert Mentorship",
    description: "Get guidance from industry professionals and experienced developers."
  }
];

export function Features() {
  return (
    <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-lg text-muted-foreground">
            Our platform provides all the tools and resources you need to become a professional developer
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
