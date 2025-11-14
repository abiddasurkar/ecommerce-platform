// components/Projects.jsx
import React from 'react';
import { FiExternalLink, FiGithub, FiShoppingCart, FiCreditCard, FiDatabase, FiUsers } from 'react-icons/fi';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      date: "2024-01-10",
      description: "Full-stack e-commerce solution with secure payments, inventory, and admin management.",
      features: [
        "Shopping cart functionality",
        "Payment processing integration",
        "User authentication",
        "Product inventory management",
        "Admin dashboard",
        "Order tracking system",
        "Real-time API integration",
        "Responsive design"
      ],
      technologies: ["React", "Node.js", "MongoDB", "Stripe API", "Redux", "Express", "JWT", "Tailwind CSS"],
      liveUrl: "#",
      githubUrl: "#",
      apiEndpoints: [
        "GET/POST/PUT/DELETE /products",
        "GET/POST/PUT/DELETE /carts", 
        "GET/POST/PUT/DELETE /users",
        "POST /auth/login"
      ]
    }
  ];

  return (
    <section id="projects" className="py-20 bg-bg-light dark:bg-bg-dark">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Featured <span className="bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">Project</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          A complete e-commerce solution built with modern technologies and best practices
        </p>

        {projects.map((project) => (
          <div key={project.id} className="max-w-6xl mx-auto bg-surface-light dark:bg-surface-dark rounded-xl shadow-2xl border border-border-light dark:border-border-dark overflow-hidden">
            <div className="p-8">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">{project.date}</p>
                </div>
                <div className="flex gap-4 mb-4 lg:mb-0">
                  <a href={project.liveUrl} className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors">
                    <FiExternalLink />
                    Live Demo
                  </a>
                  <a href={project.githubUrl} className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <FiGithub />
                    Source Code
                  </a>
                </div>
              </div>

              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                {project.description}
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Features */}
                <div>
                  <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <FiShoppingCart className="text-cyan-500" />
                    Key Features
                  </h4>
                  <ul className="space-y-2">
                    {project.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <FiDatabase className="text-purple-500" />
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* API Endpoints */}
                  <h4 className="text-xl font-semibold mt-6 mb-4 flex items-center gap-2">
                    <FiUsers className="text-green-500" />
                    API Integration
                  </h4>
                  <div className="space-y-2">
                    {project.apiEndpoints.map((endpoint, index) => (
                      <div key={index} className="flex items-center gap-3 text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">{endpoint}</code>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;