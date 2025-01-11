const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
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
            {text: "\nwrite a script to generate 30 seconds video on topic: Interesting Historical story along with ai image prompt in Realistic format for each scene and give me result in json format with ImagePrompt and ContentText as field"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "[\n  {\n    \"ImagePrompt\": \"Realistic painting of a bustling 1920s speakeasy, smoky atmosphere, jazz music, flapper dresses, hidden entrance, shadowy figures\",\n    \"ContentText\": \"The year is 1923. Prohibition is in full swing, but in the hidden corners of New York City, a different kind of party rages on.  Speakeasies, illegal bars, were the heart of the Roaring Twenties...\"\n  },\n  {\n    \"ImagePrompt\": \"Realistic portrait of Al Capone, sharp suit, scar, intense gaze, dimly lit background, cigarette in hand\",\n    \"ContentText\": \"...and Al Capone, a notorious gangster, ruled the underworld. His empire of bootlegged liquor and violence shaped the city's fate.\"\n  },\n  {\n    \"ImagePrompt\": \"Realistic depiction of a tense police raid on a speakeasy, officers bursting through the door, patrons scattering, chaos ensuing\",\n    \"ContentText\": \"But the law was always on his heels.  Raids were frequent, and the thrill of evading capture added to the allure of this hidden world.\"\n  },\n  {\n    \"ImagePrompt\": \"Realistic image of a news headline announcing Eliot Ness's crackdown on organized crime, black and white newspaper, dramatic font\",\n    \"ContentText\": \"Then came Eliot Ness and his 'Untouchables,' determined to bring Capone down.  Their relentless pursuit marked a turning point...\"\n  },\n  {\n    \"ImagePrompt\": \"Realistic courtroom sketch of Al Capone's trial, judge on the bench, Capone looking defiant, intense courtroom atmosphere\",\n    \"ContentText\": \"...culminating in Capone's conviction for tax evasion. This seemingly minor charge finally brought down the notorious gangster.\"\n  },\n  {\n    \"ImagePrompt\": \"Realistic image of Al Capone in prison, aged, weary, behind bars, a solitary figure\",\n    \"ContentText\": \"His reign of terror was over.  Imprisoned, Al Capone's health deteriorated, a testament to the eventual fall of even the most powerful.\"\n  },\n  {\n    \"ImagePrompt\": \"Realistic image of a newspaper clipping detailing Capone's death, somber tone, black and white photo of a much older Capone\",\n    \"ContentText\": \"Al Capone died in 1947, his legacy forever etched in the annals of American history, a chilling reminder of the consequences of unchecked power.\"\n  }\n]"},
          ],
        },
      ],
    });
  
