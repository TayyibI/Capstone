import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import supabase from '../../CONFIG/supabaseClient'; // Assuming you've exported supabase instance correctly

export default function SendProposal() {
  const [projectName, setProjectName] = useState('');
  const [projectDomain, setProjectDomain] = useState('');
  const [teamLeadName, setTeamLeadName] = useState('');
  const [teamLeadRollNumber, setTeamLeadRollNumber] = useState('');
  const [teamLeadEmail, setTeamLeadEmail] = useState('');
  const [reason, setReason] = useState('');
  const [proposal, setProposal] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Insert the proposal into the database
      const { data, error } = await supabase.from('proposals').insert([
        {
          project_name: projectName,
          project_domain: projectDomain,
          team_lead_email: teamLeadEmail,
          team_lead_name: teamLeadName,
          team_lead_Id: teamLeadRollNumber,
          reason: reason,
          proposal: proposal
        },
      ]);
      if (error) {
        throw error;
      }
      // Handle successful submission (e.g., show a success message)
      console.log('Proposal submitted successfully:', data);
    } catch (error) {
      console.error('Error submitting proposal:', error.message);
    }
  };

  return (
    <>
      <NavBar />

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body" style={{ backgroundColor: "#f8f9fa" }}>
                <form onSubmit={handleSubmit}>

                <h2 className="mb-4 text-center text-primary">SEND PROPOSAL</h2>

                  {/* Input for Project Name */}
                  <h4 className="mb-4">Project Details</h4>
                  <input type="text" className="form-control mb-3" placeholder="Enter project name" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
                  <input type="text" className="form-control mb-3" placeholder="Enter project domain" value={projectDomain} onChange={(e) => setProjectDomain(e.target.value)} />

                  {/* Input for Team Leader's Details */}
                  <h4 className="mb-4">Team Leader Details</h4>
                  <input type="text" className="form-control mb-3" placeholder="Enter team leader's name" value={teamLeadName} onChange={(e) => setTeamLeadName(e.target.value)} />
                  <input type="text" className="form-control mb-3" placeholder="Enter team leader's roll number" value={teamLeadRollNumber} onChange={(e) => setTeamLeadRollNumber(e.target.value)} />
                  <input type="email" className="form-control mb-3" placeholder="Enter team leader's email" value={teamLeadEmail} onChange={(e) => setTeamLeadEmail(e.target.value)} />

                  {/* Input for Reason */}
                  <h4 className="mt-4 mb-4">Why You Want Me as Your Supervisor</h4>
                  <textarea rows="4" className="form-control mb-3" placeholder="Enter your reason for choosing this supervisor" value={reason} onChange={(e) => setReason(e.target.value)} />

                  {/* Input for Proposal */}
                  <h4 className="mt-4 mb-4">Write your Proposal</h4>
                  <textarea rows="4" className="form-control mb-3" placeholder="Enter your Project proposal" value={proposal} onChange={(e) => setProposal(e.target.value)} />

                  {/* Submit Button */}
                  <button type="submit" className="btn btn-danger" style={{ width: "100%" }}>Send Proposal</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
