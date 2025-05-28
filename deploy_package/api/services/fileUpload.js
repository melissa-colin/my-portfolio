const path = require('path');
const fs = require('fs').promises;

/**
 * Service for handling file uploads
 */
class FileUploadService {
  /**
   * Upload a file to the server
   * @param {Object} file - File object from express-fileupload
   * @param {string} directory - Subdirectory within uploads
   * @returns {Promise<string>} - Path to the uploaded file
   */
  async uploadFile(file, directory) {
    const uploadDir = path.join(__dirname, '..', 'uploads', directory);
    
    // Create directory if it doesn't exist
    try {
      await fs.mkdir(uploadDir, { recursive: true });
    } catch (err) {
      if (err.code !== 'EEXIST') throw err;
    }
    
    // Generate unique filename to prevent collisions
    const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileName = uniquePrefix + '-' + file.name.replace(/\s+/g, '-').toLowerCase();
    const filePath = path.join(uploadDir, fileName);
    
    // Move file to destination
    await file.mv(filePath);
    
    // Return relative path for storage in database
    return `uploads/${directory}/${fileName}`;
  }

  /**
   * Delete a file from the server
   * @param {string} filePath - Path to the file to delete
   * @returns {Promise<boolean>} - Whether deletion was successful
   */
  async deleteFile(filePath) {
    try {
      // Ensure path is within uploads directory for security
      if (!filePath.startsWith('uploads/')) {
        return false;
      }
      
      const fullPath = path.join(__dirname, '..', filePath);
      await fs.unlink(fullPath);
      return true;
    } catch (error) {
      console.error('Error deleting file:', error);
      return false;
    }
  }

  /**
   * Get the URL for a file
   * @param {string} fileName - Name of the file
   * @param {string} directory - Directory where file is stored
   * @returns {string} - URL to access the file
   */
  getFileUrl(fileName, directory) {
    // In production, this might include the domain name
    return `/uploads/${directory}/${fileName}`;
  }
}

module.exports = new FileUploadService();
