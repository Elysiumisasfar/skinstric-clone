export async function submitPhaseOne(name: string, location: string) {
  // Strict String Validation
  const stringRegex = /^[a-zA-Z\s]+$/;
  if (!stringRegex.test(name) || !stringRegex.test(location)) {
    throw new Error("Name and location must only contain letters and spaces.");
  }

  const res = await fetch(
    "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseOne",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, location }),
    }
  );

  const data = await res.json();
  localStorage.setItem("skinstric_user", JSON.stringify({ name, location }));
  return data;
}