const PHASE_ONE_URL = "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne";
const PHASE_TWO_URL = "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo";

export async function submitPhaseOne(name: string, location: string) {
  const response = await fetch(PHASE_ONE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, location }),
  });

  if (!response.ok) {
    throw new Error(`Server returned status ${response.status}`);
  }

  return response.json();
}

export async function submitPhaseTwo(base64Image: string) {
  // Strip out data URL header prefix if present (e.g., "data:image/jpeg;base64,")
  const cleanBase64 = base64Image.includes(",") 
    ? base64Image.split(",")[1] 
    : base64Image;

  try {
    const response = await fetch(PHASE_TWO_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: cleanBase64 }),
    });

    if (!response.ok) {
      throw new Error(`Server returned status ${response.status}`);
    }

    const data = await response.json();
    return data; // Returns { message: "...", data: { race: {...}, age: {...} } }
  } catch (err: any) {
    console.warn("Phase 2 API offline or failed, using mock data:", err);
    
    // Exact schema fallback matching the Level 2 API specification
    return {
      message: "Fallback Mock Data",
      data: {
        race: {
          "black": 0.1195,
          "white": 0.1280,
          "southeast asian": 0.0629,
          "south asian": 0.1425,
          "latino hispanic": 0.0619,
          "east asian": 0.2525,
          "middle eastern": 0.2322,
        },
        age: {
          "20-29": 0.0316,
          "30-39": 0.1495,
          "40-49": 0.2142,
          "10-19": 0.0608,
          "50-59": 0.1418,
          "3-9": 0.1175,
          "60-69": 0.0640,
          "70+": 0.1001,
          "0-2": 0.1201,
        },
        gender: {
          "male": 0.824,
          "female": 0.176,
        }
      },
    };
  }
}