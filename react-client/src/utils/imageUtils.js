export const getImageUrl = (imagePath) => {
  const baseUrl =
    import.meta.env.VITE_API_BASE_URL || "http://52.76.95.241:8000/api";
  return `${baseUrl.replace("/api", "")}/storage/${imagePath}`;
};
