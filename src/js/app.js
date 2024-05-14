//Div 1 - Número antigo
const previousOperationText = document.querySelector("#previous-operation");
//Div 2 - Número adicionado
const currentOperationText = document.querySelector("#current-operation");
//Buttons - comandos das calculadoras
const buttons = document.querySelectorAll(".buttons .button-option button");
// console.log(buttons)

//Criando a classe com as funções e métodos
class Calculator {
  //Iniciando Valores padrão
  //Instanciar valores diferentes
  constructor(previousOperationText, currentOperationText) {
    //Igualando os valores aos da variável, e que são mostrados na tela
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;
    //Valor para saber o que o usuário tá digitando agora
    this.currentOperation = "";
  }

  //add digit to calculator screen
  addDigit(digit) {
    //check if current operation already has a dot
    if (digit === "." && this.currentOperationText.innerText.includes(".")) {
      return;
    }
    //saber quando alguém clica, e a operação
    this.currentOperation = digit;
    //responsável por atualizar a tela
    this.updateScreen();
  }

  //Process all calculaor operations
  processOperation(operation) {
    //check if current is empty, para não calcular com o 0
    if (this.currentOperationText.innerText === "" && operation !== "C") {
      //change operation
      if (this.previousOperationText.innerText !== "") {
        this.changeOperation(operation);
      }
      return;
    }

    //Get current and previus value
    let operationValue;
    //convertendo em número
    //Pegar o valor apenas [0]value [1]" " [2]operation
    const previous = +this.previousOperationText.innerText.split(" ")[0];
    const current = +this.currentOperationText.innerText;

    switch (operation) {
      case "+":
        operationValue = previous + current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "-":
        operationValue = previous - current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "/":
        operationValue = previous / current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "x":
        operationValue = previous * current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "Del":
        this.processDelOperator();
        return;
      case "Ce":
        this.processClearCurrentOperation();
        return;
      case "C":
        this.processClearAllOperation();
        return;
      case "=":
        this.processEqualOperator();
        return;
      default:
        return;
    }
  }

  //Change values of the calculator screen
  updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null
  ) {
    if (operationValue === null) {
      this.currentOperationText.innerText += this.currentOperation;
    } else {
      //check if value is zero, if it is just add current value
      if (previous === 0) {
        operationValue = current;
      }
      //add current value to previous
      this.previousOperationText.innerText = `${operationValue} ${operation}`;
      //Zerar o valor na tela
      this.currentOperationText.innerText = "";
    }
  }

  //Change math operations
  changeOperation(operation) {
    const mathOperations = [
      "+",
      "-",
      "x",
      "/",
      "%",
      "1/x",
      "x^2",
      "raiz",
      "+/-",
    ];
    //Se não tiver nas operações matemáticas
    if (!mathOperations.includes(operation)) {
      return;
    }
    //Tirando  valor da operação e adicionando a nova operação
    this.previousOperationText.innerText =
      this.previousOperationText.innerText.slice(0, -1) + operation;
  }

  //Delete the last digit
  processDelOperator() {
    this.currentOperationText.innerText =
      this.currentOperationText.innerText.slice(0, -1);
  }

  //Clear current Operation
  processClearCurrentOperation() {
    this.currentOperationText.innerText = "";
  }

  //Clear All Operation
  processClearAllOperation() {
    this.currentOperationText.innerText = "";
    this.previousOperationText.innerText = "";
  }

  // Process Equal Operation
  processEqualOperator() {
    const operation = previousOperationText.innerText.split(" ")[1];

    this.processOperation(operation);
  }
}

//criou uma instancia calculator
const calc = new Calculator(previousOperationText, currentOperationText);

//Eventos que iremos utilizar
buttons.forEach((btn) => {
  //evento para cada botão clicado
  btn.addEventListener("click", (e) => {
    //irá se guiar pelo texto do botão clicado
    const value = e.target.innerText;

    //Irá verificar se é um número ou não
    //o + antes da variável, tenta transformar o valor em número
    if (+value >= 0 || value == ".") {
      //Se for número ou .
      calc.addDigit(value);
    } else {
      //se for operação
      calc.processOperation(value);
    }
  });
});
