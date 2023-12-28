import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./Projects.css";

function Projects() {
  return (
    <>
      <div className="card_container">
        <Card border="info" style={{ width: "18rem" ,height: "22rem"}}>
          <Card.Img variant="top" style={{ height: "150px", maxWidth: "auto", objectFit: "cover" }} src="./src/assets/Capstone.png" />
          <Card.Body>
            <Card.Title>Project Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="primary">Open</Button>
          </Card.Body>
        </Card>

         <Card border="info" style={{ width: "18rem" ,height: "22rem"}}>
          <Card.Img variant="top" style={{ height: "150px", maxWidth: "auto", objectFit: "cover" }} src="./src/assets/Capstone.png" />
          <Card.Body>
            <Card.Title>Project Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="primary">Open</Button>
          </Card.Body>
        </Card>

         <Card border="info" style={{ width: "18rem" ,height: "22rem"}}>
          <Card.Img variant="top" style={{ height: "150px", maxWidth: "auto", objectFit: "cover" }} src="./src/assets/Capstone.png" />
          <Card.Body>
            <Card.Title>Project Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="primary">Open</Button>
          </Card.Body>
        </Card>

         <Card border="info" style={{ width: "18rem" ,height: "22rem"}}>
          <Card.Img variant="top" style={{ height: "150px", maxWidth: "auto", objectFit: "cover" }} src="./src/assets/Capstone.png" />
          <Card.Body>
            <Card.Title>Project Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="primary">Open</Button>
          </Card.Body>
        </Card>

         <Card border="info" style={{ width: "18rem" ,height: "22rem"}}>
          <Card.Img variant="top" style={{ height: "150px", maxWidth: "auto", objectFit: "cover" }} src="./src/assets/Capstone.png" />
          <Card.Body>
            <Card.Title>Project Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="primary">Open</Button>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default Projects;
