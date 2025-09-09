import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {

  useEffect(() => {
    const externalElement = document.querySelector('#root');
    externalElement.style.padding = 0;
  }, [])

  return (
    <div className="bg-gray-100 min-h-screen min-w-[98vw] overflow-x-hidden">
      {/* Hero Section */}
      <section className="py-20 bg-blue-900 text-white w-full">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to CodeSmash</h1>
            <p className="text-lg md:text-xl mb-8">Challenge yourself, solve problems, and level up your coding skills.</p>
            <Link to="/problemSet" className="bg-white text-blue-900 hover:bg-gray-200 hover:text-blue-900 py-3 px-6 rounded-lg font-semibold transition duration-300">Get Started</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Features</h2>
            <p className="text-lg text-gray-600">Discover what makes our platform unique.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Feature Card 1 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2">Wide Range of Problems</h3>
              <p className="text-gray-700">Explore a diverse collection of coding challenges across various difficulty levels and topics.</p>
            </div>
            {/* Feature Card 2 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2">Real-time Feedback</h3>
              <p className="text-gray-700">Get instant feedback on your submissions with detailed test case results.</p>
            </div>
            {/* Feature Card 3 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2">Community & Rankings</h3>
              <p className="text-gray-700">Compete with others, track your progress, and climb the leaderboard.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Footer Column 1 */}
            <div>
              <h3 className="text-xl font-semibold mb-4">About Us</h3>
              <p className="text-gray-400">An Online Judge platform which allows users to test their coding abilities by solving DSA problems</p>
            </div>
            {/* Footer Column 2 */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul>
                <li><Link to="/" className="text-gray-400 hover:text-white transition duration-300">Home</Link></li>
                <li><Link to="/problemSet" className="text-gray-400 hover:text-white transition duration-300">Problems</Link></li>
              </ul>
            </div>
            {/* Footer Column 3 */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-400">Email: harshsaw2607@gmail.com</p>
              <p className="text-gray-400">Phone: +917481856319</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <p>&copy; 2024 CodeSmash. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
