import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="calculator">
      <h2>Kalkulator Matematyczny</h2>
      <div class="input-group">
        <label for="numerator">Licznik:</label>
        <input type="number" id="numerator" [(ngModel)]="numerator">
      </div>
      <div class="input-group">
        <label for="denominator">Mianownik:</label>
        <input type="number" id="denominator" [(ngModel)]="denominator">
      </div>
      <button (click)="calculateGCD()">Oblicz NWD</button>
      <div class="result">
        <p>Wspólny dzielnik: <span>{{ gcd }}</span></p>
        <p>Skrócony ułamek: <span>{{ simplifiedFraction }}</span></p>
      </div>
    </div>

    <div class="calculator">
      <h2>Kalkulator Fizyczny</h2>
      <div class="input-group">
        <label for="unitType">Wybierz jednostkę:</label>
        <select id="unitType" [(ngModel)]="unitType">
          <option value="length">Długość</option>
        </select>
      </div>
      <div class="input-group">
        <label for="inputValue">Wartość:</label>
        <input type="number" id="inputValue" [(ngModel)]="inputValue">
      </div>
      <div class="input-group">
        <label for="inputUnit">Jednostka wejściowa:</label>
        <select id="inputUnit" [(ngModel)]="inputUnit">
          <option *ngIf="unitType === 'length'" value="m">metry (m)</option>
          <option *ngIf="unitType === 'length'" value="cm">centymetry (cm)</option>
          <option *ngIf="unitType === 'length'" value="mm">milimetry (mm)</option>
        </select>
      </div>
      <div class="input-group">
        <label for="outputUnit">Jednostka wyjściowa:</label>
        <select id="outputUnit" [(ngModel)]="outputUnit">
          <option *ngIf="unitType === 'length'" value="m">metry (m)</option>
          <option *ngIf="unitType === 'length'" value="cm">centymetry (cm)</option>
          <option *ngIf="unitType === 'length'" value="mm">milimetry (mm)</option>
        </select>
      </div>
      <button (click)="convertUnits()">Przelicz</button>
      <div class="result">
        <p>Wynik: <span>{{ outputValue }}</span></p>
      </div>
    </div>
  `,
  styles: [`
    .calculator {
      border: 1px solid #ccc;
      padding: 20px;
      margin-bottom: 20px;
      border-radius: 5px;
      box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    }

    .input-group {
      margin-bottom: 10px;
    }

    label {
      display: block;
      margin-bottom: 5px;
    }

    input[type="number"],
    select {
      width: 100%;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 3px;
      box-sizing: border-box;
    }

    button {
      background-color: #4CAF50;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 3px;
      cursor: pointer;
    }

    button:hover {
      background-color: #45a049;
    }

    .result {
      margin-top: 10px;
      font-weight: bold;
    }
  `]
})
export class AppComponent {
  // Kalkulator matematyczny
  numerator = 5;
  denominator = 7;
  gcd: number | null = null;
  simplifiedFraction: string | null = null;

  // Kalkulator fizyczny
  unitType = 'length';
  inputValue = 0;
  inputUnit = 'm';
  outputUnit = 'cm';
  outputValue = 0;

  // Funkcje logiki
  findGCD(a: number, b: number): number {
    return b === 0 ? a : this.findGCD(b, a % b);
  }

  simplifyFraction(numerator: number, denominator: number, gcd: number): string {
    return `${numerator / gcd}/${denominator / gcd}`;
  }

  convertLength(value: number, fromUnit: string, toUnit: string): number {
    const units = {
      m: 1,
      cm: 0.01,
      mm: 0.001,
    };
    return value * units[fromUnit] / units[toUnit];
  }

  // Funkcje obsługi zdarzeń
  calculateGCD() {
    this.gcd = this.findGCD(this.numerator, this.denominator);
    this.simplifiedFraction = this.simplifyFraction(this.numerator, this.denominator, this.gcd);
  }

  convertUnits() {
    if (this.unitType === 'length') {
      this.outputValue = this.convertLength(this.inputValue, this.inputUnit, this.outputUnit);
    }
    // Dodaj obsługę innych typów jednostek
  }
}
