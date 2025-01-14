const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
//   const model = genAI.getGenerativeModel({
//     model: "gemini-1.5-flash",
//   });
  
//   const generationConfig = {
//     temperature: 1,
//     topP: 0.95,
//     topK: 40,
//     maxOutputTokens: 8192,
//     responseMimeType: "text/plain",
//   };
  
// export  const chatSession = model.startChat({
//       generationConfig,
//       history: [
//         {
//           role: "user",
//           parts: [
//             {text: "\nwrite a script to generate 30 seconds video on topic: Interesting Historical story along with ai image prompt in Realistic format for each scene and give me result in json format with ImagePrompt and ContentText as field"},
//           ],
//         },
//         {
//           role: "model",
//           parts: [
//             {text: "[\n  {\n    \"ImagePrompt\": \"Realistic painting of a bustling 1920s speakeasy, smoky atmosphere, jazz music, flapper dresses, hidden entrance, shadowy figures\",\n    \"ContentText\": \"The year is 1923. Prohibition is in full swing, but in the hidden corners of New York City, a different kind of party rages on.  Speakeasies, illegal bars, were the heart of the Roaring Twenties...\"\n  },\n  {\n    \"ImagePrompt\": \"Realistic portrait of Al Capone, sharp suit, scar, intense gaze, dimly lit background, cigarette in hand\",\n    \"ContentText\": \"...and Al Capone, a notorious gangster, ruled the underworld. His empire of bootlegged liquor and violence shaped the city's fate.\"\n  },\n  {\n    \"ImagePrompt\": \"Realistic depiction of a tense police raid on a speakeasy, officers bursting through the door, patrons scattering, chaos ensuing\",\n    \"ContentText\": \"But the law was always on his heels.  Raids were frequent, and the thrill of evading capture added to the allure of this hidden world.\"\n  },\n  {\n    \"ImagePrompt\": \"Realistic image of a news headline announcing Eliot Ness's crackdown on organized crime, black and white newspaper, dramatic font\",\n    \"ContentText\": \"Then came Eliot Ness and his 'Untouchables,' determined to bring Capone down.  Their relentless pursuit marked a turning point...\"\n  },\n  {\n    \"ImagePrompt\": \"Realistic courtroom sketch of Al Capone's trial, judge on the bench, Capone looking defiant, intense courtroom atmosphere\",\n    \"ContentText\": \"...culminating in Capone's conviction for tax evasion. This seemingly minor charge finally brought down the notorious gangster.\"\n  },\n  {\n    \"ImagePrompt\": \"Realistic image of Al Capone in prison, aged, weary, behind bars, a solitary figure\",\n    \"ContentText\": \"His reign of terror was over.  Imprisoned, Al Capone's health deteriorated, a testament to the eventual fall of even the most powerful.\"\n  },\n  {\n    \"ImagePrompt\": \"Realistic image of a newspaper clipping detailing Capone's death, somber tone, black and white photo of a much older Capone\",\n    \"ContentText\": \"Al Capone died in 1947, his legacy forever etched in the annals of American history, a chilling reminder of the consequences of unchecked power.\"\n  }\n]"},
//           ],
//         },
//       ],
//     });
  

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "write a script to generate 30 seconds video on topic: Interesting Historical story along with  image prompt that will be used for pixels api to fetch images\n in Realistic format for each scene and give me result in json format with ImagePrompt and ContentText as field"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```json\n[\n  {\n    \"ImagePrompt\": \"Ancient Egyptian scribe carefully writing on papyrus with a reed pen, sunlight streaming through a window, realistic\",\n    \"ContentText\": \"Did you know that the ancient Egyptians invented a form of paper? Called papyrus, it was made from reeds and allowed them to record everything from religious texts to everyday life.\"\n  },\n   {\n    \"ImagePrompt\": \"Close up of a medieval printing press in operation, ink on metal type, realistic, dimly lit workshop\",\n    \"ContentText\": \"Fast forward, and imagine the revolution brought by the printing press. Suddenly, information wasn’t limited to handwritten manuscripts, but could be shared across vast distances.\"\n  },\n  {\n    \"ImagePrompt\": \"A busy street in Victorian London, with horse-drawn carriages and people in period clothing, realistic, overcast sky\",\n    \"ContentText\": \"In Victorian London, the pneumatic tube system transported not only letters but also even small parcels between offices, a fascinating pre-internet communication method.\"\n  },\n   {\n    \"ImagePrompt\": \"A group of codebreakers at Bletchley Park during World War II, working with complex machines, realistic, slightly tense atmosphere\",\n    \"ContentText\": \"During World War II, codebreakers at Bletchley Park secretly broke the German Enigma code. Their efforts were crucial to the Allied victory and were kept secret for decades.\"\n  },\n  {\n      \"ImagePrompt\": \"A group of people gathered around a computer showing the early internet interface, realistic, retro-futuristic style\",\n      \"ContentText\":\"The first message was sent on ARPANET, a precursor to the internet, changing how we communicate and access information forever.\"\n  },\n   {\n    \"ImagePrompt\": \"A diverse group of people around the world communicating using modern smartphones, vibrant and colorful, realistic\",\n    \"ContentText\": \"Today, we carry more knowledge in our pockets than all the kings and queens before us. Technology continues to shape our world and the stories we tell.\"\n  }\n]\n```\n"},
        ],
      },
    ],
  });