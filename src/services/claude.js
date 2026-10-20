export async function generateResume(formData) {
  const { name, jobTitle, skills, experience, education } = formData;

  const prompt = `You are a professional resume writer.

Generate a COMPLETE ATS-friendly resume in STRICT JSON format.

Return ONLY JSON. No explanation, no markdown, no code fences.

Format:
{
  "name": "",
  "jobTitle": "",
  "contact": {
    "email": "",
    "phone": "",
    "location": ""
  },
  "summary": "",
  "experience": [],
  "skills": [],
  "education": {
    "degree": "",
    "institution": "",
    "year": ""
  },
  "atsScore": 0,
  "keywordsFound": 0,
  "insights": [
    { "type": "positive", "text": "" },
    { "type": "positive", "text": "" },
    { "type": "tip", "text": "" }
  ]
}

Candidate:
Name: ${name}
Target Job Title: ${jobTitle}
Skills: ${skills.join(", ")}
Experience: ${experience}
Education: ${education}

Rules:
- jobTitle must be the target role verbatim
- contact fields must include only details explicitly supplied by the candidate; use empty strings for missing values and never invent an email, phone number, or location
- Summary must be 2-3 impactful lines tailored to the target role
- Each experience entry must have a "period" field (e.g. "2020 – 2023")
- For each experience item provided, write up to 3 strong bullet points. Never invent employers, titles, dates, duties, or metrics. Use quantified achievements only when the candidate supplied the numbers; otherwise write a factual qualitative bullet based only on their input
- Use strong action verbs (Led, Engineered, Optimized, Delivered, etc.)
- education must include "institution", but never guess or invent a school, degree, or graduation year; use an empty string for information the candidate did not provide
- atsScore must be a heuristic estimate from 0 to 100 based only on the supplied content; do not imply it came from a real external ATS scan
- keywordsFound must count only relevant terms explicitly supported by the supplied skills and target role; do not invent job-description matches
- insights must have exactly 3 items: 2 "positive" and 1 "tip"
- Never fabricate candidate details to fill a field. Use empty strings or empty arrays when information is missing. If no work experience was supplied, return an empty experience array. Insights must be grounded in the supplied facts and may ask the candidate to add missing information`;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": window.location.origin,
      "X-Title": "AI Resume Builder"
    },
    body: JSON.stringify({
      model: "openai/gpt-3.5-turbo",
      messages: [
        { role: "user", content: prompt }
      ]
    })
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => "");
    if (response.status === 401) {
      throw new Error("Invalid API key. Check your VITE_OPENROUTER_API_KEY in .env");
    } else if (response.status === 429) {
      throw new Error("Rate limited. Please wait a moment and try again.");
    } else {
      throw new Error(`API error (${response.status}): ${errorBody || response.statusText}`);
    }
  }

  const data = await response.json();

  if (!data.choices || !data.choices.length) {
    console.error("Full API response:", data);
    throw new Error("No response from AI. The model may be temporarily unavailable.");
  }

  let raw = data.choices[0].message.content;

  raw = raw.replace(/```json/g, "").replace(/```/g, "").trim();

  try {
    return JSON.parse(raw);
  } catch (err) {
    console.error("Invalid JSON from AI:", raw);
    throw new Error("AI returned an invalid response. Please try again.");
  }
}