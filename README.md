🎬 CineAwards - Cinematic Voting Platform

Welcome to CineAwards, a full-stack cinematic-themed voting platform where users can vote for their favorite nominees across various film categories. 
Built with a beautiful frontend and a powerful backend, this project brings award-season excitement to life — online!

---
 🌟 Features

✅ **User & Admin Roles**  
- Users can register, vote, and view results  
- Admins can add/edit categories, nominees, and manage winners

✅ **Hierarchical Category Structure**  
- Categories grouped into: 🎭 Acting, 🎬 Directing, 🎞️ Technical, ✍️ Writing  
- Example: *Acting → Best Actor*, *Writing → Best Original Screenplay*

✅ **Dynamic Voting Flow**  
- Categories and nominees load based on group and category selection  
- Voting period defined with `startDate` and `endDate`

✅ **Secure Authentication**  
- JWT-based login system with hashed passwords using `bcryptjs`  
- Aadhar validation + auto-generated unique Voter IDs  

✅ **Results Announcement System**  
- Winners are announced only after the voting ends  
- Results page shows a cinematic summary per category

✅ **Responsive UI**  
- Fully styled with cinematic themes, hover animations, and custom grid layouts  
- Mobile-friendly and accessible

---

🛠️ Tech Stack

### 🔹 Frontend
- HTML, CSS, JavaScript
- Custom animations and modern UI design

### 🔹 Backend
- Node.js `v22.15.1`
- Express.js
- MongoDB + Mongoose
- JWT for authentication
- RESTful APIs

