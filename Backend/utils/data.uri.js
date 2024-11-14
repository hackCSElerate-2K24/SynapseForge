import DataURIParser from "datauri/parser.js"; // Import DataURIParser
import path from "path"; // Import path module

const getDataUri = (file) => {
  const parser = new DataURIParser(); // Initialize the DataURIParser
  const ext = path.extname(file.originalname).toString(); // Get the file extension from the original filename

  // Format the data URI using the extension and the file buffer
  return parser.format(ext, file.buffer); 
};

export default getDataUri; // Export the function
