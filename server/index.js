import express from 'express';
const app = express();
import cookieParser from 'cookie-parser';
import cors from 'cors';
const port = process.env.port || 5000;
const hostname = 'http://127.0.0.1:'
import dotenv from 'dotenv'
import connectdb from './utils/db.js';



dotenv.config({})

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,

}
app.use(cors(corsOptions));


import path from 'path';
app.use('/dashboard/showallclass/uploads', express.static(path.resolve('uploads')));



app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.use(express.static('public'));

//api
import userRouter from './router/user/user.router.js'
import courseRouter from './router/course/course.route.js'
import classandassigmentRouter from './router/classandassigment/classandassigment.route.js'
import certificateRouter from './model/certificate/Certificate.route.js'

//route
app.use("/user", userRouter)
app.use("/course", courseRouter)
app.use("/api", classandassigmentRouter)
app.use("/api/certificate", certificateRouter)


app.listen(port, () => {
    connectdb()
    console.log(`${hostname}${port}`)
})

// const express = require("express");
// const { JsonDB, Config } = require("node-json-db");

// const app = express();
// app.use(express.json());

// // Initialize JSON databases
// const votersDB = new JsonDB(new Config("voters", true, false, "/"));
// const candidatesDB = new JsonDB(new Config("candidates", true, false, "/"));
// const votesDB = new JsonDB(new Config("votes", true, false, "/"));

// // Initialize empty arrays if they don't exist
// try {
//   votersDB.getData("/voters");
// } catch (error) {
//   votersDB.push("/voters", []);
// }

// try {
//   candidatesDB.getData("/candidates");
// } catch (error) {
//   candidatesDB.push("/candidates", []);
// }

// try {
//   votesDB.getData("/votes");
// } catch (error) {
//   votesDB.push("/votes", []);
// }

// // Helper function to find voter by ID
// const findVoterById = (voterId) => {
//   try {
//     const voters = votersDB.getData("/voters");
//     return voters.find((voter) => voter.voter_id === parseInt(voterId));
//   } catch (error) {
//     return null;
//   }
// };

// // Helper function to find candidate by ID
// const findCandidateById = (candidateId) => {
//   try {
//     const candidates = candidatesDB.getData("/candidates");
//     return candidates.find(
//       (candidate) => candidate.candidate_id === parseInt(candidateId)
//     );
//   } catch (error) {
//     return null;
//   }
// };

// // Helper function to find vote by ID
// const findVoteById = (voteId) => {
//   try {
//     const votes = votesDB.getData("/votes");
//     return votes.find((vote) => vote.vote_id === parseInt(voteId));
//   } catch (error) {
//     return null;
//   }
// };

// // Helper function to check if voter has voted
// const hasVoterVoted = (voterId) => {
//   try {
//     const votes = votesDB.getData("/votes");
//     return votes.some((vote) => vote.voter_id === parseInt(voterId));
//   } catch (error) {
//     return false;
//   }
// };

// // API 1: Create Voter
// app.post("/api/voters", (req, res) => {
//   try {
//     const { voter_id, name, age } = req.body;

//     // Validation
//     if (!voter_id || !name || !age) {
//       return res
//         .status(400)
//         .json({ message: "Missing required fields: voter_id, name, age" });
//     }

//     if (age < 18) {
//       return res
//         .status(422)
//         .json({ message: `invalid age: ${age}, must be 18 or older` });
//     }

//     // Check if voter already exists
//     const existingVoter = findVoterById(voter_id);
//     if (existingVoter) {
//       return res
//         .status(409)
//         .json({ message: `voter with id: ${voter_id} already exists` });
//     }

//     // Create new voter
//     const newVoter = {
//       voter_id: parseInt(voter_id),
//       name,
//       age: parseInt(age),
//       has_voted: false,
//     };

//     const voters = votersDB.getData("/voters");
//     voters.push(newVoter);
//     votersDB.push("/voters", voters);

//     res.status(218).json(newVoter);
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // API 2: Get Voter Info
// app.get("/api/voters/:voter_id", (req, res) => {
//   try {
//     const { voter_id } = req.params;
//     const voter = findVoterById(voter_id);

//     if (!voter) {
//       return res
//         .status(417)
//         .json({ message: `voter with id: ${voter_id} was not found` });
//     }

//     res.status(222).json(voter);
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // API 3: List All Voters
// app.get("/api/voters", (req, res) => {
//   try {
//     const voters = votersDB.getData("/voters");

//     // Return only basic info (without has_voted status)
//     const votersList = voters.map((voter) => ({
//       voter_id: voter.voter_id,
//       name: voter.name,
//       age: voter.age,
//     }));

//     res.status(223).json({ voters: votersList });
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // API 4: Update Voter Info
// app.put("/api/voters/:voter_id", (req, res) => {
//   try {
//     const { voter_id } = req.params;
//     const { name, age } = req.body;

//     // Validation
//     if (age && age < 18) {
//       return res
//         .status(422)
//         .json({ message: `invalid age: ${age}, must be 18 or older` });
//     }

//     const voters = votersDB.getData("/voters");
//     const voterIndex = voters.findIndex(
//       (voter) => voter.voter_id === parseInt(voter_id)
//     );

//     if (voterIndex === -1) {
//       return res
//         .status(417)
//         .json({ message: `voter with id: ${voter_id} was not found` });
//     }

//     // Update voter info
//     if (name) voters[voterIndex].name = name;
//     if (age) voters[voterIndex].age = parseInt(age);

//     votersDB.push("/voters", voters);

//     res.status(200).json({ message: "Voter updated successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // API 5: Delete Voter
// app.delete("/api/voters/:voter_id", (req, res) => {
//   try {
//     const { voter_id } = req.params;
//     const voters = votersDB.getData("/voters");
//     const voterIndex = voters.findIndex(
//       (voter) => voter.voter_id === parseInt(voter_id)
//     );

//     if (voterIndex === -1) {
//       return res
//         .status(417)
//         .json({ message: `voter with id: ${voter_id} was not found` });
//     }

//     // Prevent deletion if voter has voted
//     if (hasVoterVoted(voter_id)) {
//       return res.status(426).json({
//         message: `voter with id: ${voter_id} has voted and cannot be deleted`,
//       });
//     }

//     voters.splice(voterIndex, 1);
//     votersDB.push("/voters", voters);

//     res
//       .status(225)
//       .json({ message: `voter with id: ${voter_id} deleted successfully` });
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // API 6: Register Candidate
// app.post("/api/candidates", (req, res) => {
//   try {
//     const { candidate_id, name, party } = req.body;

//     // Validation
//     if (!candidate_id || !name || !party) {
//       return res.status(400).json({
//         message: "Missing required fields: candidate_id, name, party",
//       });
//     }

//     // Check if candidate already exists
//     const existingCandidate = findCandidateById(candidate_id);
//     if (existingCandidate) {
//       return res
//         .status(409)
//         .json({ message: `candidate with id: ${candidate_id} already exists` });
//     }

//     // Create new candidate
//     const newCandidate = {
//       candidate_id: parseInt(candidate_id),
//       name,
//       party,
//       votes: 0,
//     };

//     const candidates = candidatesDB.getData("/candidates");
//     candidates.push(newCandidate);
//     candidatesDB.push("/candidates", candidates);

//     res.status(226).json(newCandidate);
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // API 7: List Candidates
// app.get("/api/candidates", (req, res) => {
//   try {
//     const { party } = req.query;
//     let candidates = candidatesDB.getData("/candidates");

//     // Filter by party if provided (for API 10 compatibility)
//     if (party) {
//       candidates = candidates.filter(
//         (candidate) => candidate.party.toLowerCase() === party.toLowerCase()
//       );

//       // Return filtered candidates with status 230 (API 10)
//       const candidatesList = candidates.map((candidate) => ({
//         candidate_id: candidate.candidate_id,
//         name: candidate.name,
//         party: candidate.party,
//       }));

//       return res.status(230).json({ candidates: candidatesList });
//     }

//     // Return all candidates without votes count (API 7)
//     const candidatesList = candidates.map((candidate) => ({
//       candidate_id: candidate.candidate_id,
//       name: candidate.name,
//       party: candidate.party,
//     }));

//     res.status(227).json({ candidates: candidatesList });
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // API 8: Cast Vote
// app.post("/api/votes", (req, res) => {
//   try {
//     const { voter_id, candidate_id } = req.body;

//     // Validation
//     if (!voter_id || !candidate_id) {
//       return res
//         .status(400)
//         .json({ message: "Missing required fields: voter_id, candidate_id" });
//     }

//     // Check if voter exists
//     const voter = findVoterById(voter_id);
//     if (!voter) {
//       return res
//         .status(417)
//         .json({ message: `voter with id: ${voter_id} was not found` });
//     }

//     // Check if candidate exists
//     const candidate = findCandidateById(candidate_id);
//     if (!candidate) {
//       return res
//         .status(417)
//         .json({ message: `candidate with id: ${candidate_id} was not found` });
//     }

//     // Check if voter has already voted
//     if (hasVoterVoted(voter_id)) {
//       return res
//         .status(423)
//         .json({ message: `voter with id: ${voter_id} has already voted` });
//     }

//     // Generate vote ID and timestamp
//     const votes = votesDB.getData("/votes");
//     const vote_id =
//       votes.length > 0 ? Math.max(...votes.map((v) => v.vote_id)) + 1 : 101;
//     const timestamp = new Date().toISOString();

//     // Create vote record
//     const newVote = {
//       vote_id,
//       voter_id: parseInt(voter_id),
//       candidate_id: parseInt(candidate_id),
//       timestamp,
//     };

//     votes.push(newVote);
//     votesDB.push("/votes", votes);

//     // Update voter's has_voted status
//     const voters = votersDB.getData("/voters");
//     const voterIndex = voters.findIndex(
//       (v) => v.voter_id === parseInt(voter_id)
//     );
//     voters[voterIndex].has_voted = true;
//     votersDB.push("/voters", voters);

//     // Update candidate's vote count
//     const candidates = candidatesDB.getData("/candidates");
//     const candidateIndex = candidates.findIndex(
//       (c) => c.candidate_id === parseInt(candidate_id)
//     );
//     candidates[candidateIndex].votes += 1;
//     candidatesDB.push("/candidates", candidates);

//     res.status(228).json(newVote);
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // API 9: Get Candidate Votes
// app.get("/api/candidates/:candidate_id/votes", (req, res) => {
//   try {
//     const { candidate_id } = req.params;
//     const candidate = findCandidateById(candidate_id);

//     if (!candidate) {
//       return res
//         .status(417)
//         .json({ message: `candidate with id: ${candidate_id} was not found` });
//     }

//     res.status(229).json({
//       candidate_id: parseInt(candidate_id),
//       votes: candidate.votes,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // API 10: Filter Candidates by Party (handled in API 7 with query parameter)
// // This endpoint is implemented as part of GET /api/candidates?party={party_name}

// // --- Start of New APIs (11-20) ---

// // API 11: Get All Votes
// app.get("/api/votes", (req, res) => {
//   try {
//     const votes = votesDB.getData("/votes");
//     res.status(231).json({ votes });
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // API 12: Get Vote Details by ID
// app.get("/api/votes/:vote_id", (req, res) => {
//   try {
//     const { vote_id } = req.params;
//     const vote = findVoteById(vote_id);

//     if (!vote) {
//       return res
//         .status(417)
//         .json({ message: `vote with id: ${vote_id} was not found` });
//     }

//     res.status(232).json(vote);
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // API 13: Get Voter's Vote
// app.get("/api/voters/:voter_id/vote", (req, res) => {
//   try {
//     const { voter_id } = req.params;
//     const voter = findVoterById(voter_id);

//     if (!voter) {
//       return res
//         .status(417)
//         .json({ message: `voter with id: ${voter_id} was not found` });
//     }

//     if (!voter.has_voted) {
//       return res
//         .status(424)
//         .json({ message: `voter with id: ${voter_id} has not cast a vote` });
//     }

//     const votes = votesDB.getData("/votes");
//     const voterVote = votes.find(
//       (vote) => vote.voter_id === parseInt(voter_id)
//     );

//     res.status(233).json(voterVote);
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // API 14: Get Election Results (Overall)
// app.get("/api/results", (req, res) => {
//   try {
//     const candidates = candidatesDB.getData("/candidates");

//     // Sort candidates by votes in descending order
//     const results = candidates
//       .sort((a, b) => b.votes - a.votes)
//       .map((candidate) => ({
//         candidate_id: candidate.candidate_id,
//         name: candidate.name,
//         party: candidate.party,
//         votes: candidate.votes,
//       }));

//     res.status(234).json({ results });
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // API 15: Get Election Results by Party
// app.get("/api/results/party", (req, res) => {
//   try {
//     const candidates = candidatesDB.getData("/candidates");
//     const partyResults = {};

//     candidates.forEach((candidate) => {
//       if (!partyResults[candidate.party]) {
//         partyResults[candidate.party] = { total_votes: 0, candidates: [] };
//       }
//       partyResults[candidate.party].total_votes += candidate.votes;
//       partyResults[candidate.party].candidates.push({
//         candidate_id: candidate.candidate_id,
//         name: candidate.name,
//         votes: candidate.votes,
//       });
//     });

//     // Convert to array for consistent output, sort by total_votes
//     const resultsArray = Object.keys(partyResults)
//       .map((partyName) => ({
//         party: partyName,
//         total_votes: partyResults[partyName].total_votes,
//         candidates: partyResults[partyName].candidates.sort(
//           (a, b) => b.votes - a.votes
//         ),
//       }))
//       .sort((a, b) => b.total_votes - a.total_votes);

//     res.status(235).json({ party_results: resultsArray });
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // API 16: Update Candidate Info
// app.put("/api/candidates/:candidate_id", (req, res) => {
//   try {
//     const { candidate_id } = req.params;
//     const { name, party } = req.body;

//     const candidates = candidatesDB.getData("/candidates");
//     const candidateIndex = candidates.findIndex(
//       (candidate) => candidate.candidate_id === parseInt(candidate_id)
//     );

//     if (candidateIndex === -1) {
//       return res
//         .status(417)
//         .json({ message: `candidate with id: ${candidate_id} was not found` });
//     }

//     // Update candidate info
//     if (name) candidates[candidateIndex].name = name;
//     if (party) candidates[candidateIndex].party = party;

//     candidatesDB.push("/candidates", candidates);

//     res.status(200).json({ message: "Candidate updated successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // API 17: Delete Candidate
// app.delete("/api/candidates/:candidate_id", (req, res) => {
//   try {
//     const { candidate_id } = req.params;
//     const candidates = candidatesDB.getData("/candidates");
//     const candidateIndex = candidates.findIndex(
//       (candidate) => candidate.candidate_id === parseInt(candidate_id)
//     );

//     if (candidateIndex === -1) {
//       return res
//         .status(417)
//         .json({ message: `candidate with id: ${candidate_id} was not found` });
//     }

//     // Prevent deletion if candidate has received votes
//     if (candidates[candidateIndex].votes > 0) {
//       return res.status(425).json({
//         message: `candidate with id: ${candidate_id} has received votes and cannot be deleted`,
//       });
//     }

//     candidates.splice(candidateIndex, 1);
//     candidatesDB.push("/candidates", candidates);

//     res.status(236).json({
//       message: `candidate with id: ${candidate_id} deleted successfully`,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // API 18: Reset Voter's Vote (Admin Functionality)
// app.put("/api/voters/:voter_id/reset-vote", (req, res) => {
//   try {
//     const { voter_id } = req.params;

//     const voters = votersDB.getData("/voters");
//     const voterIndex = voters.findIndex(
//       (voter) => voter.voter_id === parseInt(voter_id)
//     );

//     if (voterIndex === -1) {
//       return res
//         .status(417)
//         .json({ message: `voter with id: ${voter_id} was not found` });
//     }

//     if (!voters[voterIndex].has_voted) {
//       return res.status(424).json({
//         message: `voter with id: ${voter_id} has not cast a vote to reset`,
//       });
//     }

//     const votes = votesDB.getData("/votes");
//     const voteIndex = votes.findIndex(
//       (vote) => vote.voter_id === parseInt(voter_id)
//     );

//     if (voteIndex === -1) {
//       // This case should ideally not happen if has_voted is true, but good for robustness
//       voters[voterIndex].has_voted = false;
//       votersDB.push("/voters", voters);
//       return res.status(237).json({
//         message: `voter with id: ${voter_id} has_voted status reset, no vote record found.`,
//       });
//     }

//     const candidateIdOfVote = votes[voteIndex].candidate_id;

//     // Remove the vote
//     votes.splice(voteIndex, 1);
//     votesDB.push("/votes", votes);

//     // Reset voter's has_voted status
//     voters[voterIndex].has_voted = false;
//     votersDB.push("/voters", voters);

//     // Decrement candidate's vote count
//     const candidates = candidatesDB.getData("/candidates");
//     const candidateIndex = candidates.findIndex(
//       (c) => c.candidate_id === candidateIdOfVote
//     );
//     if (candidateIndex !== -1 && candidates[candidateIndex].votes > 0) {
//       candidates[candidateIndex].votes -= 1;
//       candidatesDB.push("/candidates", candidates);
//     }

//     res.status(237).json({
//       message: `voter with id: ${voter_id}'s vote has been reset successfully`,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // API 19: Get Total Registered Voters
// app.get("/api/stats/voters/total", (req, res) => {
//   try {
//     const voters = votersDB.getData("/voters");
//     res.status(238).json({ total_registered_voters: voters.length });
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // API 20: Get Total Cast Votes
// app.get("/api/stats/votes/total", (req, res) => {
//   try {
//     const votes = votesDB.getData("/votes");
//     res.status(239).json({ total_cast_votes: votes.length });
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // --- End of New APIs (11-20) ---

// // Error handler middleware
// app.use((error, req, res, next) => {
//   console.error("Error:", error);
//   res.status(500).json({ message: "Internal server error" });
// });

// // 404 handler
// app.use((req, res) => {
//   res.status(404).json({ message: "Endpoint not found" });
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`HackTheAI API server running on port ${PORT}`);
//   console.log(`First 20 endpoints are ready!`);
// });

// module.exports = app;