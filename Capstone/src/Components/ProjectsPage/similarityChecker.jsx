import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import axios from "axios";
import "./SimilarityChecker.css";
import Footer from "../Footer/footer";

const SimilarityChecker = () => {
  const [summary, setSummary] = useState("");
  const [similarityData, setSimilarityData] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setSummary(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/check-similarity", {
        user_summary: summary
      });

      const { most_similar_project, similarity_percentage } = response.data;
      setSimilarityData({ most_similar_project, similarity_percentage });

      if (similarity_percentage > 0.20) {
        setMessage("Your project summary is quite similar to an existing project. Consider changing your project.");
      } 
      else {
        setMessage("");
      }
    } catch (error) {
      console.error('Error checking similarity:', error.message);
    }
  };

  return (
    <div className="similarity-container">
      <NavBar />
      <div className="content-container">
        <h1 className="header">Similarity Checker</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="summary" className="label">Enter Your Project Summary:</label>
            <textarea
              className="summary-textarea"
              id="summary"
              name="summary"
              value={summary}
              onChange={handleChange}
              rows="10"
              cols="50"
            ></textarea>
          </div>
          <button type="submit" className="check-btn">
            Check Similarity
          </button>
        </form>
        
        {similarityData && (
  <div className="result-container">
    {similarityData.similarity_percentage * 100 >= 10 ? ( // Check if similarity is greater than or equal to 10 percent
      <>
          <h2 className="result-header">Most Similar Project:</h2>

        <h3 className="project-title">Title: {similarityData.most_similar_project.title}</h3>
        <p className="project-summary">Summary: {similarityData.most_similar_project.summary}</p>
      </>
    ) : (
      <>
      <h2 className="result-header">Most Similar Project: None</h2>

      <p className="project-unique">Congratulations!!! your project is very unique </p>

      </>
    )}
    <h3 className="percentage">Similarity Percentage: {(similarityData.similarity_percentage * 100).toFixed(2)}%</h3>
    <p className="message">{message}</p>
  </div>
)}

      </div>
      <Footer/>
    </div>
  );
};

export default SimilarityChecker;
