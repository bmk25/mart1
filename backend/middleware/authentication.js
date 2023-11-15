import jwt from "jsonwebtoken";

// Custom middleware to check the user's role
export const checkUserRole = (req, res, next) => {
  // Check if the user is authenticated (you can modify this based on your cookie setup)
  if (req.cookies && req.cookies.userRole) {
    const userRole = req.cookies.userRole;

    // Check if the user has the "admin" role
    if (userRole === "admin") {
      // If the user is an admin, allow them to continue to the next middleware or route
      
      next();
    } else {
      // If the user is not an admin, return a 403 Forbidden response
      res
        .status(403)
        .json({
          error: "Access denied. You must be an admin to perform this action.",
        });
    }
  } else {
    // If the user is not authenticated, return a 401 Unauthorized response or handle it based on your authentication logic
    res.status(401).json({ error: "Unauthorized access." });
  }
};

//

// Custom middleware to check the user's token
export const checkUserToken = (req, res, next) => {
  // Check if the user's token is present in the request (you can modify this based on your cookie setup)
  if (req.cookies && req.cookies.accessToken) {
    const userToken = req.cookies.accessToken;

    // You can use JWT verification here to validate the token
    // For example, using the 'jsonwebtoken' library
    jwt.verify(userToken, "secretkey", (err, decoded) => {
      if (err) {
        // Token is invalid or expired, return a 401 Unauthorized response
        res
          .status(401)
          .json({ error: "Unauthorized access. Token is invalid or expired." });
      } else {
        // Token is valid, you can optionally decode and store user information from 'decoded' if needed
        // For example: req.user = decoded;
        req.userId = decoded.id;
        // req.userId = decoded.id; req.user = decoded;
        // console.log(req.userId);
        next();
      }
    });
  } else {
    // If the user's token is not present, return a 401 Unauthorized response or handle it based on your authentication logic
    res.status(401).json({ error: "Unauthorized access. Token is missing." });
  }
};
