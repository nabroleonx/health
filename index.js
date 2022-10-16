import express from "express";
import cors from "cors";
import cohere from "cohere-ai";
const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

cohere.init("JaUFx31cyDTKfLTvtapbB7MKeFtG2fyM16NoOIQI");
app.get("/api", async (req, res) => {
  const response = await cohere.generate({
    model: "32a01e69-759e-4235-b235-a1fdfef1d148-ft",
    prompt: `This program will generate disease names based on symptoms.\n--\nSymptoms: continuous sneezing, chills, fatigue, cough, high fever, headache, swelled lymph nodes, malaise, phlegm, throat irritation, redness of eyes, sinus pressure, runny nose, congestion, chest pain, loss of smell, muscle pain\nDisease: Common cold\n--\nSymptoms: chills, vomiting, high fever, sweating, headache, nausea, diarrhea, muscle pain\nDisease: Malaria\n--\nSymptoms: ${req.query.prompt}\nDisease: `,
    max_tokens: 30,
    temperature: 0.9,
    k: 0,
    p: 0.75,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop_sequences: ["--"],
    return_likelihoods: "NONE",
  });

  res.json({
    data: response.body.generations[0].text,
    disclaimer:
      "DISCLAIMER: This might be totally wrong as it is guessed by a NLP program, we always recommend to consult to a doctor before going on any medication",
  });
  console.log(`Prediction: ${response.body.generations[0].text}`);
});
