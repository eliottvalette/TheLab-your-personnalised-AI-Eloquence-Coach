export const mistralModels = ['mistral-small-4', 'mistral-large-3', 'mistral-medium-3.5'];

export function resolveMistralModel(index) {
  const model = mistralModels[index];

  if (!model) {
    throw new Error("Modele Mistral invalide.");
  }

  return model;
}
