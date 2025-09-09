import { AbrigoAnimais } from "./abrigo-animais";

describe('Abrigo de Animais', () => {

  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
      expect(resultado.lista[0]).toBe('Fofo - abrigo');
      expect(resultado.lista[1]).toBe('Rex - pessoa 1');
      expect(resultado.lista.length).toBe(2);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER',
      'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola');

      expect(resultado.lista[0]).toBe('Bola - abrigo');
      expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
      expect(resultado.lista[2]).toBe('Mimi - abrigo');
      expect(resultado.lista[3]).toBe('Rex - abrigo');
      expect(resultado.lista.length).toBe(4);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve rejeitar brinquedo duplicado na mesma pessoa', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,RATO', 'BOLA,LASER', 'Rex'
    );
    expect(resultado.erro).toBe('Brinquedo inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Loco deve ficar no abrigo se não houver companhia', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'SKATE,RATO', 'BOLA,LASER', 'Loco'
    );
    expect(resultado.lista[0]).toBe('Loco - abrigo');
  });

  test('Loco pode ser adotado se houver outro animal junto', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'SKATE,RATO', 'RATO,BOLA', 'Loco,Rex'
    );
    expect(resultado.lista).toContain('Loco - pessoa 1');
    expect(resultado.lista).toContain('Rex - pessoa 1');
  });

  test('Pessoa não pode adotar mais que 3 animais', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA,LASER', 'BOLA,NOVELO', 'Rex,Fofo,Bebe,Zero,Mimi'
    );
    expect(resultado.lista.filter(l => l.includes('pessoa 1')).length).toBeLessThanOrEqual(3);
  });

  test('Dois candidatos válidos para mesmo gato -> fica no abrigo', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'BOLA,LASER', 'BOLA,LASER', 'Mimi'
    );
    expect(resultado.lista[0]).toBe('Mimi - abrigo');
  });

  test('Erro quando animal aparece repetido na lista', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'BOLA,LASER', 'Rex,Rex'
    );
    expect(resultado.erro).toBe('Animal inválido');
  });

});
