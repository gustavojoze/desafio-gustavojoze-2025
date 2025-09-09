class AbrigoAnimais {
  constructor() {
    this.animais = {
      "Rex": { tipo: "cão", brinquedos: ["RATO", "BOLA"] },
      "Mimi": { tipo: "gato", brinquedos: ["BOLA", "LASER"] },
      "Fofo": { tipo: "gato", brinquedos: ["BOLA", "RATO", "LASER"] },
      "Zero": { tipo: "gato", brinquedos: ["RATO", "BOLA"] },
      "Bola": { tipo: "cão", brinquedos: ["CAIXA", "NOVELO"] },
      "Bebe": { tipo: "cão", brinquedos: ["LASER", "RATO", "BOLA"] },
      "Loco": { tipo: "jabuti", brinquedos: ["SKATE", "RATO"] }
    };
  }

  encontraPessoas(p1, p2, listaAnimais) {
    try {
      let pessoa1 = p1.split(",").map(x => x.trim());
      let pessoa2 = p2.split(",").map(x => x.trim());
      let animais = listaAnimais.split(",").map(x => x.trim());

      
      if (new Set(animais).size != animais.length) return { erro: "Animal inválido" };
      if (new Set(pessoa1).size != pessoa1.length ||
          new Set(pessoa2).size != pessoa2.length) return { erro: "Brinquedo inválido" };

      let resultado = [];
      let ad1 = 0;
      let ad2 = 0;

      for (let animal of animais) {
        if (!this.animais[animal]) return { erro: "Animal inválido" };

        let dados = this.animais[animal];
        let brinquedosAnimal = dados.brinquedos;

        if (animal === "Loco") {
          if (resultado.length === 0) {
            resultado.push(animal + " - abrigo");
          } else if (ad1 > 0 && ad1 < 3) {
            resultado.push(animal + " - pessoa 1");
            ad1++;
          } else if (ad2 > 0 && ad2 < 3) {
            resultado.push(animal + " - pessoa 2");
            ad2++;
          } else {
            resultado.push(animal + " - abrigo");
          }
          continue;
        }

        let p1ok = this.temOrdem(pessoa1, brinquedosAnimal);
        let p2ok = this.temOrdem(pessoa2, brinquedosAnimal);

        if (p1ok && p2ok) {
          resultado.push(animal + " - abrigo");
        } else if (p1ok && ad1 < 3) {
          resultado.push(animal + " - pessoa 1");
          ad1++;
        } else if (p2ok && ad2 < 3) {
          resultado.push(animal + " - pessoa 2");
          ad2++;
        } else {
          resultado.push(animal + " - abrigo");
        }
      }

      return { lista: resultado.sort() };

    } catch (err) {
      return { erro: err.message };
    }
  }

  temOrdem(listaPessoa, listaAnimal) {
    let i = 0;
    for (let item of listaPessoa) {
      if (item === listaAnimal[i]) {
        i++;
        if (i === listaAnimal.length) return true;
      }
    }
    return i === listaAnimal.length;
  }
}

export { AbrigoAnimais as AbrigoAnimais };
