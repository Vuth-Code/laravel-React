export const getImageUrl = (imagePath) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';
  return `${baseUrl.replace('/api', '')}/storage/${imagePath}`;
};