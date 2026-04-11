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
    "email": "candidate@email.com",
    "phone": "(555) 000-0000",
    "location": "City, State"
  },
  "summary": "",
  "experience": [
    {
      "title": "",
      "company": "",
      "period": "2022 – Present",
      "bullets": ["", "", ""]
    }
  ],
  "skills": [],
  "education": {
    "degree": "",
    "institution": "",
    "year": ""
  },
  "atsScore": 85,
  "keywordsFound": 10,
  "insights": [
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
- contact should use placeholder data (candidate@email.com, (555) 000-0000, City, State)
- Summary must be 2-3 impactful lines tailored to the target role
- Each experience entry must have a "period" field (e.g. "2020 – 2023")
- Experience must have exactly 3 bullet points with quantified achievements
- Use strong action verbs (Led, Engineered, Optimized, Delivered, etc.)
- education must include "institution" (infer from input or use a reasonable one)
- atsScore must be a realistic number between 70-95
- keywordsFound must be a count of matched industry keywords
- insights must have exactly 3 items: 2 "positive" and 1 "tip"
- Do NOT leave any field empty or null`;

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