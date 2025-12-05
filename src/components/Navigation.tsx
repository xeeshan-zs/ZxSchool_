import { Button } from "./ui/button";
import { Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { auth, db } from "../firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useAuth } from "../providers/UserProvider";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function Navigation() {
  const { theme, toggleTheme } = useTheme();
  const { user, loading } = useAuth();

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          createdAt: new Date(),
        });
        console.log("New user added to Firestore");
      } else {
        console.log("User already exists in Firestore");
      }

      console.log("Logged in with Google:", user.displayName);
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass-nav"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground px-3 py-1.5 rounded-md">
              <Link to="/">Zx</Link>
            </div>
            <span className="tracking-tight">School</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="/#courses" className="text-foreground/80 hover:text-foreground transition-colors">
              Courses
            </a>
            <a href="/#features" className="text-foreground/80 hover:text-foreground transition-colors">
              Features
            </a>
            <a href="/#pricing" className="text-foreground/80 hover:text-foreground transition-colors">
              Pricing
            </a>
            <a href="/#about" className="text-foreground/80 hover:text-foreground transition-colors">
              About
            </a>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </Button>
            {!loading && (
              <>
                {user ? (
                  <>
                    <Button variant="ghost" asChild>
                      <Link to="/dashboard">Me</Link>
                    </Button>
                    <Button variant="outline" onClick={handleLogout}>Logout</Button>
                  </>
                ) : (
                  <Button variant="outline" onClick={handleLogin}>Login with Google</Button>
                )}
              </>
            )}
            <Button variant="glass" onClick={() => window.location.href = "https://forms.gle/zQmeXmnwN5J9ekX77"} >Get Started</Button>
          </div>
          
          <div className="md:hidden flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </Button>
            <button className="p-2">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
