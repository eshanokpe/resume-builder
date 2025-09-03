import { useState } from "react";
import { auth } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";



// Landing Page Component
export function AuthScreen({ onLogin }: { onLogin: () => void }) {
  const [showAuth, setShowAuth] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    // Redirect to dashboard or resume builder
  };

  if (showAuth) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <i className="fas fa-file-alt text-white text-xl"></i>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">ResumeBuilder<span className="text-indigo-600">Pro</span></h1>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-600 hover:text-indigo-600">Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-indigo-600">How It Works</a>
            <a href="#testimonials" className="text-gray-600 hover:text-indigo-600">Testimonials</a>
            <a href="#pricing" className="text-gray-600 hover:text-indigo-600">Pricing</a>
          </nav>
          
          <div className="flex space-x-4">
            <button 
              onClick={() => setShowAuth(true)}
              className="px-4 py-2 text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50"
            >
              Login
            </button>
            <button 
              onClick={() => setShowAuth(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Create <span className="text-indigo-600">ATS-Friendly</span> Resumes with AI
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Our NLP-powered resume builder helps you create professional, optimized resumes that pass applicant tracking systems and impress recruiters.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button 
                onClick={() => setShowAuth(true)}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium"
              >
                Get Started Free
              </button>
              <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">
                View Demo
              </button>
            </div>
            
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex items-center">
                <i className="fas fa-check-circle text-green-500 mr-2"></i>
                <span className="text-sm">NLP Optimization</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-check-circle text-green-500 mr-2"></i>
                <span className="text-sm">ATS Compatible</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-check-circle text-green-500 mr-2"></i>
                <span className="text-sm">Real-time Feedback</span>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-semibold text-gray-800">Resume Preview</h3>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-indigo-700">John Doe</h4>
                    <p className="text-sm text-gray-600">Software Developer</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Experience</h4>
                    <div className="pl-4 border-l-2 border-indigo-200">
                      <p className="text-sm font-medium">Senior Developer at TechCorp</p>
                      <p className="text-xs text-gray-500">2020 - Present</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded">React</span>
                      <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded">Node.js</span>
                      <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded">Python</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between">
                  <button className="text-xs text-indigo-600 font-medium">Edit Template</button>
                  <button className="text-xs bg-indigo-600 text-white px-3 py-1 rounded">Download PDF</button>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-indigo-600 text-white text-xs py-1 px-2 rounded-lg shadow">
                AI Powered
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Powerful Features</h2>
            <p className="text-gray-600">Our AI-powered resume builder uses advanced Natural Language Processing to optimize your resume for success</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-robot text-indigo-600 text-xl"></i>
              </div>
              <h3 className="font-semibold text-lg mb-2">NLP Optimization</h3>
              <p className="text-gray-600">Advanced algorithms analyze and enhance your resume content with industry-specific keywords.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-check-double text-indigo-600 text-xl"></i>
              </div>
              <h3 className="font-semibold text-lg mb-2">ATS Compatibility</h3>
              <p className="text-gray-600">Ensure your resume passes through Applicant Tracking Systems with proper formatting.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-bolt text-indigo-600 text-xl"></i>
              </div>
              <h3 className="font-semibold text-lg mb-2">Real-time Feedback</h3>
              <p className="text-gray-600">Get instant suggestions on improving your resume's content, grammar, and structure.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-file-alt text-indigo-600 text-xl"></i>
              </div>
              <h3 className="font-semibold text-lg mb-2">Professional Templates</h3>
              <p className="text-gray-600">Choose from a variety of industry-specific templates designed to showcase your skills.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-download text-indigo-600 text-xl"></i>
              </div>
              <h3 className="font-semibold text-lg mb-2">Multi-format Export</h3>
              <p className="text-gray-600">Download your resume in PDF or DOCX format with consistent formatting.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-lock text-indigo-600 text-xl"></i>
              </div>
              <h3 className="font-semibold text-lg mb-2">Secure & Private</h3>
              <p className="text-gray-600">Your data is encrypted and stored securely. We never share your information.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">How It Works</h2>
            <p className="text-gray-600">Creating an optimized resume has never been easier with our simple 4-step process</p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center relative">
            <div className="flex flex-col items-center mb-10 md:mb-0 md:w-1/4">
              <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
              <h3 className="font-semibold text-lg mb-2">Sign Up</h3>
              <p className="text-gray-600 text-center">Create your free account in seconds</p>
            </div>
            
            <div className="hidden md:block absolute top-8 left-1/4 right-1/4 h-0.5 bg-indigo-200"></div>
            
            <div className="flex flex-col items-center mb-10 md:mb-0 md:w-1/4">
              <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
              <h3 className="font-semibold text-lg mb-2">Input Your Details</h3>
              <p className="text-gray-600 text-center">Fill in your education, experience, and skills</p>
            </div>
            
            <div className="hidden md:block absolute top-8 left-2/4 right-1/4 h-0.5 bg-indigo-200"></div>
            
            <div className="flex flex-col items-center mb-10 md:mb-0 md:w-1/4">
              <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
              <h3 className="font-semibold text-lg mb-2">AI Optimization</h3>
              <p className="text-gray-600 text-center">Our NLP algorithms enhance your content</p>
            </div>
            
            <div className="hidden md:block absolute top-8 left-3/4 right-0 h-0.5 bg-indigo-200"></div>
            
            <div className="flex flex-col items-center md:w-1/4">
              <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">4</div>
              <h3 className="font-semibold text-lg mb-2">Download & Apply</h3>
              <p className="text-gray-600 text-center">Export your resume and start applying</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Success Stories</h2>
            <p className="text-gray-600">Hear from our users who landed their dream jobs with our resume builder</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="text-indigo-400 text-4xl mb-4">"</div>
              <p className="text-gray-600 italic mb-6">
                "After using ResumeBuilder Pro, I got 3x more interview calls. The NLP optimization really makes a difference in how recruiters perceive your experience."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center font-bold text-indigo-600 mr-4">SJ</div>
                <div>
                  <h4 className="font-semibold">Sarah Johnson</h4>
                  <p className="text-sm text-gray-500">Software Developer at TechCorp</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="text-indigo-400 text-4xl mb-4">"</div>
              <p className="text-gray-600 italic mb-6">
                "As a recent graduate, I was struggling to create a professional resume. This tool helped me highlight my skills effectively and I landed my first job within weeks!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center font-bold text-indigo-600 mr-4">MD</div>
                <div>
                  <h4 className="font-semibold">Michael Davis</h4>
                  <p className="text-sm text-gray-500">Marketing Specialist</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="text-indigo-400 text-4xl mb-4">"</div>
              <p className="text-gray-600 italic mb-6">
                "The real-time feedback and ATS optimization features are game-changers. My resume now gets past automated systems and actually gets seen by human recruiters."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center font-bold text-indigo-600 mr-4">AJ</div>
                <div>
                  <h4 className="font-semibold">Amanda Jones</h4>
                  <p className="text-sm text-gray-500">Project Manager</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-indigo-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Land Your Dream Job?</h2>
          <p className="text-indigo-100 max-w-2xl mx-auto mb-8">
            Join thousands of users who have transformed their resumes and accelerated their careers with our AI-powered tool.
          </p>
          <button 
            onClick={() => setShowAuth(true)}
            className="px-8 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Get Started Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-indigo-600 p-2 rounded-lg">
                  <i className="fas fa-file-alt text-white"></i>
                </div>
                <h3 className="text-xl font-bold">ResumeBuilder<span className="text-indigo-400">Pro</span></h3>
              </div>
              <p className="text-gray-400 mb-4">
                The ultimate AI-powered resume builder that helps you create ATS-friendly resumes.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-twitter"></i></a>
                <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-linkedin"></i></a>
                <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-facebook"></i></a>
                <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-instagram"></i></a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Templates</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Testimonials</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Resume Tips</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Career Advice</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 ResumeBuilder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}