import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Check, Clock, Calendar } from "lucide-react";

export function Pricing() {
  return (
    <section id="pricing" className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground">
            Get personalized programming instruction with flexible scheduling
          </p>
        </div>
        
        <div className="max-w-lg mx-auto">
          <Card className="p-8 border-2 border-primary/20 hover:border-primary/40 transition-all hover:shadow-2xl">
            <div className="text-center mb-6">
              <div className="inline-block px-4 py-1 bg-primary/10 rounded-full mb-4">
                <span className="text-primary">Most Popular</span>
              </div>
              <h3 className="mb-2">Monthly Subscription</h3>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-4xl">Rs. 2,500</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3 p-3 bg-accent/50 rounded-lg">
                <Calendar className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-muted-foreground">
                    <span className="text-foreground">3 classes per week</span> - Consistent learning schedule
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-accent/50 rounded-lg">
                <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-muted-foreground">
                    <span className="text-foreground">40 minutes per class</span> - Focused learning sessions
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-primary flex-shrink-0" />
                <span>One-on-one personalized instruction</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-primary flex-shrink-0" />
                <span>Flexible timing options</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-primary flex-shrink-0" />
                <span>Real-time doubt clarification</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-primary flex-shrink-0" />
                <span>Practical coding assignments</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-primary flex-shrink-0" />
                <span>Progress tracking & feedback</span>
              </div>
            </div>
            
            <Button className="w-full" size="lg"  onClick={() => window.location.href = "https://forms.gle/zQmeXmnwN5J9ekX77"} >
              Enroll Now
            </Button>
            
            <p className="text-center text-sm text-muted-foreground mt-4">
              Cancel anytime. No long-term commitment required.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
