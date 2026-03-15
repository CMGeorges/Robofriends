export const getJson = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Unable to load robot profiles right now.");
  }

  return response.json();
};
