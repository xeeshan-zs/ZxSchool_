import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Play, ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-block px-4 py-2 bg-accent rounded-full">
              <span className="text-accent-foreground">🚀 Start Your Coding Journey</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight">
              Learn Programming with{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ZxSchool
              </span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-xl">
              Master coding from scratch with our interactive courses, real-world projects, 
              and expert mentorship. Build your future in tech today.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="gap-2" onClick={() => window.location.href = "https://forms.gle/zQmeXmnwN5J9ekX77"}>
                Start Learning Free
                <ArrowRight className="w-4 h-4" />
              </Button>
              {/*<Button size="lg" variant="outline" className="gap-2">*/}
              {/*  <Play className="w-4 h-4" />*/}
              {/*  Watch Demo*/}
              {/*</Button>*/}
            </div>
            
            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl">50+</span>
                </div>
                <p className="text-muted-foreground">Students</p>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl">70+</span>
                </div>
                <p className="text-muted-foreground">Reviews</p>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl">4.9</span>
                  <span className="text-yellow-500">★</span>
                </div>
                <p className="text-muted-foreground">Rating</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 rounded-3xl blur-3xl"></div>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1753715613434-9c7cb58876b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb2RpbmclMjBzZXR1cHxlbnwxfHx8fDE3NTk2ODg5NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Coding workspace"
              className="relative rounded-3xl shadow-2xl w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
