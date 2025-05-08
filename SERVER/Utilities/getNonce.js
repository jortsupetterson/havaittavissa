export default function getNonce(size = 16) {
    // Alusta kertymä tyhjään merkkijonoon (muuten s on undefined!)
    let s = '';
  
    for (let i = 0; i < size; i++) {
      // Math.random() on nopea JS:n sisäinen funktio, O(1) per kutsu
      const hex = Math.floor(Math.random() * 256)
        .toString(16)
        .padStart(2, '0');
      s += hex; 
      // Jokainen += allokoi uuden merkkijonon, mutta size on pieni
    }
  
    return s;
  }
  