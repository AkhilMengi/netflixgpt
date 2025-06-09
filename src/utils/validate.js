// validate.js
export const checkValidateData = (
    email,
    password,
    confirmPassword = null,
    firstName = null,
    lastName = null
  ) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const nameRegex = /^[a-zA-Z]+(?:[' -]?[a-zA-Z]+)*$/;
  
    if (!emailRegex.test(email)) {
      return "Invalid email format";
    }
  
    if (!passwordRegex.test(password)) {
      return "Password must be at least 8 characters and include uppercase, lowercase, number, and special character";
    }
  
    if (confirmPassword !== null && password !== confirmPassword) {
      return "Passwords do not match";
    }
  
    if (firstName !== null && !nameRegex.test(firstName)) {
      return "Invalid first name";
    }
  
    if (lastName !== null && !nameRegex.test(lastName)) {
      return "Invalid last name";
    }
  
    return null; 
  };
  