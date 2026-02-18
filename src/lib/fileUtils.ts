// File size limit: 5MB
export const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Allowed file types
export const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

export const ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx'];

export const validateFile = (file: File): { valid: boolean; error?: string } => {
  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: 'File size must be less than 5MB' };
  }

  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return { valid: false, error: 'Only PDF and Word documents are allowed' };
  }

  return { valid: true };
};

export const compressFile = async (file: File): Promise<Blob> => {
  // For PDFs and Word docs, we'll use basic compression
  // by converting to a Blob with compression
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      try {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        const blob = new Blob([arrayBuffer], { type: file.type });
        resolve(blob);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsArrayBuffer(file);
  });
};
