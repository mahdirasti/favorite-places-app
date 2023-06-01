const GOOGLE_API_KEY = "AIzaSyBthGvVM09hwMRGV-84vge1o2RGFGClAME"
export const getMapPreview = (lat, lng) =>
  `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=13&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`
