import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { Courses } from "./components/Courses";
import { Pricing } from "./components/Pricing";
import { About } from "./components/About";
import { Footer } from "./components/Footer";
import { ThemeProvider } from "./components/ThemeProvider";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <div className="min-h-screen">
        <Navigation />
        <main>
          <Hero />
          <Features />
          <Courses />
          <Pricing />
          <About />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
