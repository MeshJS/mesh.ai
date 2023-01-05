import { openai } from "../openai";

const samples = [
  {
    prompt: "What is Cardano?",
    completion:
      "Cardano blockchain, a first-of-its-kind decentralised network based completely on scientific and mathematical principles and designed by experts in cryptography and engineering.",
  },
  // {
  //   prompt: "Cardano blockchain architecture?",
  //   completion:
  //     "The Cardano blockchain consists of two core components: The Cardano Settlement Layer (CSL) and Cardano Computational Layer (CCL). The Cardano open-source code is written using Haskell, a universally recognised and secure programming language.",
  // },
  // {
  //   prompt: "Who created Cardano?",
  //   completion:
  //     "In the early days of Ethereum, one of its co-founders, Charles Hoskinson, saw the need for a more standardised, and scalable blockchain. With his mathematics background, Hoskinson began thinking about more scientific ways to build a blockchain. During this time, Hoskinson connected with a former co-worker at Ethereum, Jeremy Wood, who was looking to create a better blockchain and smart contracts platform. The two began to create Cardano as it exists today.",
  // },
  {
    prompt: "Who created Mesh? When was it started?",
    completion:
      "Jingles and Abdelkrim started Mesh development in July 2022. First version was released on 22 Sept 2022.",
  },
  {
    prompt: "What is Mesh?",
    completion:
      "Mesh is an open-source library providing numerous tools to easily build dApps on the Cardano blockchain.",
  },
  {
    prompt: "Developer tool for Cardano?",
    completion:
      "Get started building blockchain applications with enterprise-ready, well engineered, and professionally designed SDK, Mesh.",
  },
];

export async function createCompletion(prompt) {
  let thisPrompt = `I am a highly intelligent question answering bot. You can ask me anything about Cardano. If you ask me a question that is rooted in truth, I will give you the answer. If you ask me a question that is nonsense, trickery, or has no clear answer, I will try to respond your question in Cardano context.\n\n`; // If you ask me a question that is nonsense, trickery, or has no clear answer, I will respond with "Unknown".

  let startPrompt = `Human: `;
  let endPrompt = `\n###\n`;
  let startCompletion = `Bot: `;
  let endCompletion = `###`;

  for (let i in samples) {
    let sample = samples[i];
    thisPrompt += `${startPrompt}${sample.prompt}${endPrompt}`;
    thisPrompt += `${startCompletion}${sample.completion}${endCompletion}\n\n`;
  }
  thisPrompt += `${startPrompt}${prompt}${endPrompt}`;
  thisPrompt += `${startCompletion}`;

  const response = await openai.createCompletion({
    temperature: 0.5,
    max_tokens: 256,
    model: "text-davinci-003",
    prompt: thisPrompt,
    stop: endCompletion,
  });

  return response.data;
}
