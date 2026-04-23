// Middleware to check if the user is an admin
export const isAdmin = (req, res, next) => {
    // Assuming req.user is populated from isAuthenticated middleware
    if (req.user && req.user.role === 'admin') {
      return next();  // Proceed if user is admin
    } else {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }
  };
  


  export const isTeacher = (req, res, next) => {
    // Assuming req.user is populated from isAuthenticated middleware
    if (req.user && req.user.role === 'instructor') {
      return next();  // Proceed if user is teacher
    } else {
      return res.status(403).json({ message: "Access denied: Teachers only" });
    }
  };


   export const isStudent = (req, res, next) => {
    // Assuming req.user is populated from isAuthenticated middleware
    if (req.user && req.user.role === 'student') {
      return next();  // Proceed if user is student
    } else {
      return res.status(403).json({ message: "Access denied: Students only" });
    }
  };
  