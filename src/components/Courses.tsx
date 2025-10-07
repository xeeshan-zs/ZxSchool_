import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Clock, Users, Star } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const courses = [
  {
    title: "C++ For Beginners",
    level: "Beginner",
    duration: "-",
    students: "20+",
    rating: "4.8",
    image: "https://www.educative.io/v2api/editorpage/5393602882568192/image/6038586442907648",
    description: "Master the fundamentals of C++ programming, from basic syntax to object-oriented concepts."
  },
  {
    title: "Java Programming",
    level: "Intermediate",
    duration: "-",
    students: "30+",
    rating: "4.7",
    image: "https://appmaster.io/api/_files/hRaLG2N4DVjRZJQzCpN2zJ/download/",
    description: "Become proficient in Java with this comprehensive course, covering core concepts and advanced topics."
  },
  {
    title: "SQL Database Fundamentals",
    level: "Beginner",
    duration: "-",
    students: "15+",
    rating: "4.6",
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhYmFzZSUyMGNvZGluZ3xlbnwxfHx8fDE3NTk2ODg0Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Learn to design, query, and manage databases using SQL, an essential skill for any developer."
  },
];

export function Courses() {
  return (
    <section id="courses" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl mb-4">
            Popular Courses
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose from our most popular courses and start learning today
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-4 right-4 bg-background/90">
                  {course.level}
                </Badge>
              </div>
              
              <div className="p-6 space-y-4">
                <h3>{course.title}</h3>
                <p className="text-muted-foreground">
                  {course.description}
                </p>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{course.students}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    <span>{course.rating}</span>
                  </div>
                </div>
                
                <Button className="w-full" onClick={() => window.location.href = "https://forms.gle/zQmeXmnwN5J9ekX77"
}>Enroll Now</Button>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Courses
          </Button>
        </div>
      </div>
    </section>
  );
}
