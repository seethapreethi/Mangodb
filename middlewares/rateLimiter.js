const rateLimit = require("express-rate-limit");

module.exports  = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 10,
  message: {
    status: 429, 
    error: "Rate limit exceeded. Please wait 3 minutes before adding more items.",
  },
  standardHeaders: true,    
  legacyHeaders: false, 
});
