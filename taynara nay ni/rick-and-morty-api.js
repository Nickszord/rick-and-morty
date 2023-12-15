const fillCharacterCard = (card, character) => {
    card.querySelector(".character-img").setAttribute("src", character.image);
    card.querySelector(".character-img").setAttribute("data-id", character.id);
    card.querySelector(".character-name").textContent = character.name;
    card.querySelector(".character-status").textContent = `Status: ${character.status}`;
    card.querySelector(".character-species").textContent = `Species: ${character.species}`;
  };
  
  const createCharacterCard = (character) => {
    const template = document.getElementById("character-card-template");
    const card = template.content.cloneNode(true);
    fillCharacterCard(card, character);
  
    const containerCharacters = document.querySelector(".container-characters");
    containerCharacters.appendChild(card);
  };
  
  const getCharacters = async (pageSize = 20) => {
    try {
      const res = await fetch(`https://rickandmortyapi.com/api/character?page=1&count=${pageSize}`);
      const data = await res.json();
  
      if (!res.ok) {
        console.log(data.error);
        return;
      }
  
      const characters = data.results;
  
      characters.forEach((character) => {
        createCharacterCard(character);
      });
    } catch (error) {
      console.log(`Erro - ${error}`);
    }
  };
  
  window.addEventListener("load", () => {
    getCharacters(20);
  });
  
  const deleteCharacterCard = (id) => {
    const cardElement = document.querySelector(`[data-id="${id}"]`);
    if (cardElement) {
      cardElement.parentNode.remove();
      console.log(`Card ${id} excluído com sucesso.`);
    } else {
      console.log(`Card ${id} não encontrado.`);
    }
  };
  
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("character-img")) {
      const characterId = event.target.dataset.id;
  
      if (characterId) {
        deleteCharacterCard(characterId);
      }
    }
  });
  