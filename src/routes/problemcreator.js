const express=require('express');
const problemrouter=express.Router();
const mongoose = require('mongoose');
const Contest = require('../models/contest.js');
const Problem = require('../models/problem.js');
const user = require('../models/user.js');
const adminMiddleware=require('../middleware/adminmiddleware');
const userMiddleware=require('../middleware/usermiddleware');
const {createProblem,updateprobem,deleteproblem,getproblembyid,getallproblem,solvedallproblem,submittedproblems,getAllContests,getLiveContests,getContestById,createContest,getUserContests}=require("../controllers/userproblem");
problemrouter.get("/test", (req, res) => {
    res.send("Problem route works!");
});
console.log(" problemcreator.js file loaded"); 

problemrouter.get('/contests/user/:userId', async (req, res) => {
  const { userId } = req.params;
  console.log("Fetching contests for user:", userId);

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid userId' });
  }

  try {
    const contests = await Contest.find({ participants: userId })
      .select('_id title startTime endTime');
    res.json(contests);
  } catch (err) {
    console.error('Error fetching user contests:', err);
    res.status(500).json({ message: 'Server error' });
  }
});
problemrouter.post("/create",adminMiddleware,createProblem);
problemrouter.post("/createcontest",adminMiddleware,createContest); 
problemrouter.get("/getallcontests",userMiddleware,getAllContests);
problemrouter.get("/getlivecontests",userMiddleware,getLiveContests);
problemrouter.get("/contestbyid/:id",userMiddleware,getContestById); 
problemrouter.patch("/update/:id",adminMiddleware,updateprobem);
problemrouter.delete("/delete/:id",deleteproblem);
problemrouter.get("/usercontests", userMiddleware, getUserContests);

problemrouter.get("/problembyid/:id",userMiddleware,getproblembyid);
problemrouter.get("/getallproblem",userMiddleware,getallproblem);
problemrouter.get("/problemsolvedbyuser",userMiddleware,solvedallproblem); 
problemrouter.get("/submittedproblems/:pid",userMiddleware,submittedproblems);
module.exports=problemrouter;