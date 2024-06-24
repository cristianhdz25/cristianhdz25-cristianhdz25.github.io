// mm1.js

class MM1Queue {
  constructor(lambda, mu) {
    this.lambda = lambda;
    this.mu = mu;
  }

  // Utilización (ρ)
  utilization() {
    return this.lambda / this.mu;
  }

  // Número promedio de clientes en el sistema (L)
  averageNumberInSystem() {
    return this.lambda / (this.mu - this.lambda);
  }

  // Número promedio de clientes en la cola (Lq)
  averageNumberInQueue() {
    return (this.lambda * this.lambda) / (this.mu * (this.mu - this.lambda));
  }

  // Tiempo promedio en el sistema (W)
  averageTimeInSystem() {
    return 1 / (this.mu - this.lambda);
  }

  // Tiempo promedio en la cola (Wq)
  averageTimeInQueue() {
    return this.lambda / (this.mu * (this.mu - this.lambda));
  }

  // Probabilidad de no tener clientes en el sistema (P0)
  probabilityOfZero() {
    return 1 - this.utilization();
  }

}


class MMMQueue {
    constructor(lambda, mu, m) {
        this.lambda = lambda;
        this.mu = mu;
        this.m = m;
    }

    // Utilización (ρ)
    utilization() {
        return this.lambda / (this.m * this.mu);
    }

    // Factorial function
    factorial(n) {
        return (n <= 1) ? 1 : n * this.factorial(n - 1);
    }

    // Probabilidad de no tener clientes en el sistema (P0)
    probabilityOfZero() {
        let sum = 0;
        for (let k = 0; k < this.m; k++) {
            sum += Math.pow(this.lambda / this.mu, k) / this.factorial(k);
        }
        const term = Math.pow(this.lambda / this.mu, this.m) / (this.factorial(this.m) * (1 - this.utilization()));
        return 1 / (sum + term);
    }

    // Número promedio de clientes en la cola (Lq)
    averageNumberInQueue() {
        const rho = this.utilization();
        const P0 = this.probabilityOfZero();
        return Math.pow(this.lambda / this.mu, this.m) * rho / (this.factorial(this.m) * Math.pow(1 - rho, 2)) * P0;
    }

    // Número promedio de clientes en el sistema (L)
    averageNumberInSystem() {
        return this.averageNumberInQueue() + this.lambda / this.mu;
    }

    // Tiempo promedio en la cola (Wq)
    averageTimeInQueue() {
        return this.averageNumberInQueue() / this.lambda;
    }

    // Tiempo promedio en el sistema (W)
    averageTimeInSystem() {
        return this.averageTimeInQueue() + 1 / this.mu;
    }

}


class MM1FiniteSourceQueue {
  constructor(lambda, mu, N) {
      this.lambda = lambda;
      this.mu = mu;
      this.N = N;
  }

  // Factorial function
  factorial(n) {
      return (n <= 1) ? 1 : n * this.factorial(n - 1);
  }

  // Probabilidad de tener n clientes en el sistema (Pn)
  probabilityOfN(n) {
      const rho = this.lambda / this.mu;
      const numerator = Math.pow(rho, n) * this.factorial(this.N) / this.factorial(this.N - n);
      let denominator = 0;
      for (let k = 0; k <= this.N; k++) {
          denominator += Math.pow(rho, k) * this.factorial(this.N) / this.factorial(this.N - k);
      }
      return numerator / denominator;
  }

  // Probabilidad de no tener clientes en el sistema (P0)
  probabilityOfZero() {
      return this.probabilityOfN(0);
  }

  // Número promedio de clientes en el sistema (L)
  averageNumberInSystem() {
      let L = 0;
      for (let n = 0; n <= this.N; n++) {
          L += n * this.probabilityOfN(n);
      }
      return L;
  }

  // Tasa efectiva de llegada (λe)
  effectiveArrivalRate() {
      const L = this.averageNumberInSystem();
      return this.lambda * (this.N - L) / this.N;
  }

  // Número promedio de clientes en la cola (Lq)
  averageNumberInQueue() {
      const L = this.averageNumberInSystem();
      const P0 = this.probabilityOfZero();
      return L - (1 - P0);
  }

  // Tiempo promedio en el sistema (W)
  averageTimeInSystem() {
    const Wq = this.averageTimeInQueue();
    return Wq + (1 / this.mu);
  }

  // Tiempo promedio en la cola (Wq)
  averageTimeInQueue() {
    const Lq = this.averageNumberInQueue();
    const L = this.averageNumberInSystem();
    return Lq / ( this.N - L ) * this.lambda;
  }

}


class MD1Queue {
  constructor(lambda, mu) {
    this.lambda = lambda;   // Tasa de llegada (λ)
    this.mu = mu;           // Tasa de servicio (μ)
  }

  // Probabilidad de no tener clientes en el sistema (P0)
  probabilityOfZero() {
    const rho = this.lambda / this.mu;
    return 1 - rho;
  }

  // Número promedio de clientes en el sistema (L)
  averageNumberInSystem() {
    const Lq = this.averageNumberInQueue();
    return Lq + (this.lambda / this.mu);

  }

  // Tiempo promedio en el sistema (W)
  averageTimeInSystem() {
    const Wq = this.averageTimeInQueue();
    return Wq + (1 / this.mu);
  }

  // Tiempo promedio de espera en la cola (Wq)
  averageTimeInQueue() {
    return this.lambda / ((this.mu*2) * (this.mu - this.lambda));
  }

  // Número promedio de clientes en la cola (Lq)
  averageNumberInQueue() {
    const rho = this.lambda / this.mu;
    return Math.pow(this.lambda, 2) / ((this.mu * 2) * (this.mu - this.lambda));
  }
}

