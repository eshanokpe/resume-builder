import { useState } from "react";
import { auth } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

// Auth Modal Component
export function AuthModal({ onClose, onLogin }: { onClose: () => void; onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
 
  const handleAuth = async () => {
    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      onLogin();
      onClose();
    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm relative">
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        
        <h2 className="text-xl font-bold mb-4 text-center text-indigo-600">
          {isSignUp ? "Sign Up" : "Login"}
        </h2>

        <input
          type="email"
          className="w-full p-2 mb-3 border rounded focus:ring-2 focus:ring-indigo-300"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-2 mb-3 border rounded focus:ring-2 focus:ring-indigo-300"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <div className="text-red-500 text-xs mb-3 p-2 bg-red-50 rounded">{error}</div>}

        <button
          onClick={handleAuth}
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition disabled:opacity-50"
        >
          {loading ? "Loading..." : isSignUp ? "Sign Up" : "Login"}
        </button>

        <p className="text-center mt-3 text-xs text-gray-600">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-indigo-600 hover:underline font-medium"
          >
            {isSignUp ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}

// Landing Page Component
export default function AuthScreen() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} onLogin={handleLogin} />}
      
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-l font-bold text-gray-800">Development of a Web Application for Generating Optimized Resume Based
            on User Input Using Natural Language Processing (NLP)</h1>
          
          <div className="flex space-x-3">
            {isLoggedIn ? (
              <button className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm">
                Dashboard
              </button>
            ) : (
              <>
                <button 
                  onClick={() => setShowAuthModal(true)}
                  className="px-3 py-1 text-indigo-600 border border-indigo-600 rounded hover:bg-indigo-50 text-sm"
                >
                  Login
                </button>
                <button 
                  onClick={() => setShowAuthModal(true)}
                  className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Create <span className="text-indigo-600">ATS-Friendly</span> Resumes
          </h1>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Build professional, optimized resumes that pass applicant tracking systems.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button 
              onClick={() => setShowAuthModal(true)}
              className="px-5 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 font-medium"
            >
              Get Started
            </button>
            {/* <button className="px-5 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 font-medium">
              View Demo
            </button> */}
          </div>
          
          <div className="mt-10 bg-white p-5 rounded-xl shadow-md w-full max-w-sm mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-800">Resume Preview</h3>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
            </div>
            
            <div className="space-y-3 text-left">
              <div className="bg-blue-50 p-3 rounded">
                <h4 className="font-medium text-indigo-700 text-sm">John Doe</h4>
                <p className="text-xs text-gray-600">Software Developer</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-700 text-xs mb-1">Skills</h4>
                <div className="flex flex-wrap gap-1">
                  <span className="px-1.5 py-0.5 bg-indigo-100 text-indigo-700 text-xs rounded">React</span>
                  <span className="px-1.5 py-0.5 bg-indigo-100 text-indigo-700 text-xs rounded">Node.js</span>
                  <span className="px-1.5 py-0.5 bg-indigo-100 text-indigo-700 text-xs rounded">Python</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-3 border-t border-gray-200 flex justify-between">
              <button className="text-xs text-indigo-600 font-medium">Edit</button>
              <button className="text-xs bg-indigo-600 text-white px-2 py-1 rounded">Download</button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <div className="bg-gray-50 p-4 rounded">
              <h3 className="font-semibold text-lg mb-1">NLP Optimization</h3>
              <p className="text-gray-600 text-sm">Advanced algorithms enhance your resume with industry keywords.</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded">
              <h3 className="font-semibold text-lg mb-1">ATS Compatibility</h3>
              <p className="text-gray-600 text-sm">Ensure your resume passes through Applicant Tracking Systems.</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded">
              <h3 className="font-semibold text-lg mb-1">Real-time Feedback</h3>
              <p className="text-gray-600 text-sm">Get instant suggestions on improving your resume.</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded">
              <h3 className="font-semibold text-lg mb-1">Professional Templates</h3>
              <p className="text-gray-600 text-sm">Choose from industry-specific templates.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-indigo-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Land Your Dream Job?</h2>
          <button 
            onClick={() => setShowAuthModal(true)}
            className="px-6 py-2 bg-white text-indigo-600 rounded font-semibold hover:bg-gray-100 transition"
          >
            Get Started Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">
            &copy; 2025 Development of a Web Application for Generating Optimized Resume
            On User Input Using Natural Language Processing (NLP). All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}