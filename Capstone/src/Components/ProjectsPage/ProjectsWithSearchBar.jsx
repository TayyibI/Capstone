import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import supabase from '../../CONFIG/supabaseClient'; // Assuming you've exported supabase instance correctly
import SearchBar from '../SearchBar/searchbar'; // Import the SearchBar component
import "./Projects.css";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState(null);
  const projectsPerPage = 80;

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase.from('projects').select('*');
      if (error) {
        console.error('Error fetching projects:', error.message);
      } else {
        setProjects(data);
      }
    }
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleOpen = (project) => {
    setSelectedProject(project);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page when search term changes
  };

  const handleClose = () => {
    setSelectedProject(null);
  };
  return (
    <>
      <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} /> {/* Use the SearchBar component */}
      <div className="card_container">
        {currentProjects.map(project => (
          <Card key={project.ProjectID} border="info" style={{ width: "18rem", height: "22rem", marginBottom: "20px" }}>
            <Card.Body>
              <Card.Title>{project.title}</Card.Title>
              <Card.Text>
                {project.domain}
              </Card.Text>
              <Button variant="primary" onClick={() => handleOpen(project)}>Open</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredProjects.length / projectsPerPage) }, (_, i) => (
          <Button
            key={i}
            variant="outline-primary"
            className={currentPage === i + 1 ? "active" : ""}
            onClick={() => paginate(i + 1)}
          >
            {i + 1}
          </Button>
        ))}
      </div>
      <Modal show={selectedProject !== null} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedProject && selectedProject.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProject && (
            <div>
              <p><strong>Domain:</strong> {selectedProject.domain}</p>
              <p><strong>Summary:</strong> {selectedProject.summary}</p>
              <p><strong>Tag:</strong> {selectedProject.tag}</p>
              <p><strong>Authors:</strong> {selectedProject.authors}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Projects;
