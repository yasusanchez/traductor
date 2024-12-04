import { dictionary } from "./dictionary.js";

document.addEventListener("DOMContentLoaded", () => {
  // Referencias a los elementos del DOM
  const wordInput = document.getElementById("word");
  const translateBtn = document.getElementById("translate-btn");
  const responseDiv = document.getElementById("response");
  const categoryRadios = document.querySelectorAll('input[name="category"]');
  const newWordBtn = document.getElementById("new-word");

  // Función para traducir una palabra
  const translateWord = (word, language) => {
    const lowerWord = word.toLowerCase();
    for (const category in dictionary.categories) {
      const words = dictionary.categories[category];
      for (const item of words) {
        if (language === "english" && item.english.toLowerCase() === lowerWord) {
          return { translation: item.spanish, example: item.example };
        }
        if (language === "spanish" && item.spanish.toLowerCase() === lowerWord) {
          return { translation: item.english, example: item.example };
        }
      }
    }
    return { translation: "Palabra no encontrada", example: "" };
  };

  // Función para mostrar las palabras de una categoría
  const listWordsByCategory = (category) => {
    const categoryData = dictionary.categories[category];
    if (!categoryData) {
      responseDiv.textContent = "Categoría no encontrada.";
      return;
    }
    const wordsList = categoryData
      .map((item) => `${item.english} (${item.spanish})`)
      .join(", ");
    responseDiv.innerHTML = `<strong>${category}</strong>:<br>${wordsList}`;
  };

  // Evento: Traducción de palabras
  translateBtn.addEventListener("click", () => {
    const word = wordInput.value.trim();
    const language = document.querySelector('input[name="language"]:checked').value;

    if (!word) {
      responseDiv.textContent = "Por favor, escribe una palabra.";
      return;
    }

    const { translation, example } = translateWord(word, language);
    responseDiv.innerHTML = `
      <p><strong>Traducción:</strong> ${translation}</p>
      <p><strong>Ejemplo:</strong> ${example || "No disponible"}</p>
    `;
  });

  // Evento: Mostrar palabras por categoría
  categoryRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      listWordsByCategory(radio.value);
    });
  });

  // Evento: Limpiar entrada y respuesta
  newWordBtn.addEventListener("click", () => {
    wordInput.value = "";
    responseDiv.textContent = "Aquí aparecerá la respuesta";
  });
});
