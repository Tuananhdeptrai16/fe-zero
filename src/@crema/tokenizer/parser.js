export default class Parser {
  constructor(lexer) {
    this.lexer = lexer;
    this.currentToken = this.lexer.getNextToken();
  }

  eat(tokenType) {
    if (this.currentToken.type === tokenType) {
      this.currentToken = this.lexer.getNextToken();
    } else {
      throw new Error(
        `Unexpected token: ${this.currentToken.type}, expected: ${tokenType}`,
      );
    }
  }

  factorVariable(variables, id) {
    const value = variables[id];
    if (typeof value === 'undefined') {
      throw new Error(`Variable ${id} not found`);
    }
    return value;
  }

  factor(variables) {
    let token = this.currentToken;

    if (token.type === 'NUMBER') {
      this.eat('NUMBER');
      return token.value;
    } else if (token.type === 'STRING') {
      this.eat('STRING');
      return token.value;
    } else if (token.type === 'LPAREN') {
      this.eat('LPAREN');
      let result = this.expression(variables);
      this.eat('RPAREN');
      return result;
    } else if (token.type === 'FUNCTION') {
      let funcName = token.value;
      this.eat('FUNCTION');
      this.eat('LPAREN');
      let arg = this.expression(variables);
      this.eat('RPAREN');
      if (funcName === 'sqrt') {
        return Math.sqrt(arg);
      }
      throw new Error('Unsupported function');
    } else if (token.type === 'IDENTIFIER') {
      let id = token.value;
      this.eat('IDENTIFIER');
      if (this.currentToken.type === 'DOT') {
        this.eat('DOT');
        const property = this.currentToken.value;
        this.eat('IDENTIFIER');
        this.eat('DOT');
        let prop = this.currentToken.value;
        if (property === 'str') {
          this.eat('FUNCTION');
          let arg = this.expression(variables);
          if (prop === 'contains') {
            return ((str) => str.includes(arg))(
              this.factorVariable(variables, id),
            );
          } else if (prop === 'startswith') {
            return ((str) => str.startsWith(arg))(
              this.factorVariable(variables, id),
            );
          } else if (prop === 'endswith') {
            return ((str) => str.endsWith(arg))(
              this.factorVariable(variables, id),
            );
          }
        } else if (property === 'dt') {
          this.eat('IDENTIFIER');
          if (prop === 'year') {
            return ((date) => new Date(date).getFullYear())(
              this.factorVariable(variables, id),
            );
          } else if (prop === 'month') {
            return ((date) => new Date(date).getMonth() + 1)(
              this.factorVariable(variables, id),
            );
          } else if (prop === 'day') {
            return ((date) => new Date(date).getDate())(
              this.factorVariable(variables, id),
            );
          }
        }
        throw new Error('Unsupported property');
      } else {
        // Variable handling
        return this.factorVariable(variables, id);
      }
    }
    throw new Error('Unexpected token in factor');
  }

  term(variables) {
    let result = this.factor(variables);
    while (['MULTIPLY', 'DIVIDE'].includes(this.currentToken.type)) {
      let token = this.currentToken;
      if (token.type === 'MULTIPLY') {
        this.eat('MULTIPLY');
        result *= this.factor(variables);
      } else if (token.type === 'DIVIDE') {
        this.eat('DIVIDE');
        result /= this.factor(variables);
      }
    }
    return result;
  }

  expression(variables) {
    let result = this.term(variables);
    while (['PLUS', 'MINUS'].includes(this.currentToken.type)) {
      let token = this.currentToken;
      if (token.type === 'PLUS') {
        this.eat('PLUS');
        result += this.term(variables);
      } else if (token.type === 'MINUS') {
        this.eat('MINUS');
        result -= this.term(variables);
      }
    }
    return result;
  }

  comparison(variables) {
    let left = this.expression(variables);
    let token = this.currentToken;
    if (['GT', 'GTE', 'LT', 'LTE', 'EQ', 'NEQ'].includes(token.type)) {
      this.eat(token.type);
      let right = this.expression(variables);
      switch (token.type) {
        case 'GT':
          return left > right;
        case 'GTE':
          return left >= right;
        case 'LT':
          return left < right;
        case 'LTE':
          return left <= right;
        case 'EQ':
          return left === right;
        case 'NEQ':
          return left !== right;
      }
    }
    return left;
  }

  logical(variables) {
    let result = this.comparison(variables);
    while (['AND', 'OR'].includes(this.currentToken.type)) {
      let token = this.currentToken;
      if (token.type === 'AND') {
        this.eat('AND');
        result = result && this.comparison(variables);
      } else if (token.type === 'OR') {
        this.eat('OR');
        result = result || this.comparison(variables);
      }
    }
    return result;
  }

  parse(variables) {
    return this.logical(variables);
  }
}
