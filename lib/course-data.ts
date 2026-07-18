export interface Unit {
  id: string
  number: number
  title: string
  subtitle: string
  color: string
  colorDim: string
  icon: string
  topics: Topic[]
  description: string
}

export interface Topic {
  id: string
  title: string
  description: string
  codeExample?: string
  lang?: string
}

export const COURSE: { code: string; name: string; semester: string; credits: number } = {
  code: 'TOO115-2016',
  name: 'Tecnologías Orientadas a Objetos',
  semester: '2025-2',
  credits: 4,
}

export const UNITS: Unit[] = [
  {
    id: 'fundamentos-oop',
    number: 1,
    title: 'Fundamentos de OOP',
    subtitle: 'Clases, objetos y paradigmas',
    color: 'oklch(0.72 0.19 198)',
    colorDim: 'oklch(0.72 0.19 198 / 0.12)',
    icon: 'Box',
    description:
      'Introducción a los pilares de la Programación Orientada a Objetos: encapsulamiento, herencia, polimorfismo y abstracción.',
    topics: [
      {
        id: 'clases-objetos',
        title: 'Clases y Objetos',
        description: 'Definición de clases, constructores, atributos y métodos en TypeScript.',
        lang: 'typescript',
        codeExample: `class Animal {
  private nombre: string;
  protected sonido: string;

  constructor(nombre: string, sonido: string) {
    this.nombre = nombre;
    this.sonido = sonido;
  }

  hablar(): string {
    return \`\${this.nombre} dice: \${this.sonido}\`;
  }
}

class Perro extends Animal {
  constructor(nombre: string) {
    super(nombre, "¡Guau!");
  }

  buscarPelota(): void {
    console.log("¡Encontré la pelota!");
  }
}

const miPerro = new Perro("Rex");
console.log(miPerro.hablar()); // Rex dice: ¡Guau!`,
      },
      {
        id: 'herencia',
        title: 'Herencia y Polimorfismo',
        description: 'Reutilización de código y comportamiento dinámico mediante la herencia.',
        lang: 'typescript',
        codeExample: `abstract class Figura {
  abstract area(): number;
  abstract perimetro(): number;

  describir(): string {
    return \`Área: \${this.area().toFixed(2)}, Perímetro: \${this.perimetro().toFixed(2)}\`;
  }
}

class Circulo extends Figura {
  constructor(private radio: number) { super(); }
  area() { return Math.PI * this.radio ** 2; }
  perimetro() { return 2 * Math.PI * this.radio; }
}

class Rectangulo extends Figura {
  constructor(private w: number, private h: number) { super(); }
  area() { return this.w * this.h; }
  perimetro() { return 2 * (this.w + this.h); }
}

const figuras: Figura[] = [new Circulo(5), new Rectangulo(4, 6)];
figuras.forEach(f => console.log(f.describir()));`,
      },
      {
        id: 'interfaces',
        title: 'Interfaces y Contratos',
        description: 'Definición de contratos mediante interfaces para un código más robusto.',
        lang: 'typescript',
        codeExample: `interface Serializable {
  serialize(): string;
  deserialize(data: string): void;
}

interface Comparable<T> {
  compareTo(other: T): number;
}

class Punto implements Serializable, Comparable<Punto> {
  constructor(public x: number, public y: number) {}

  serialize(): string {
    return JSON.stringify({ x: this.x, y: this.y });
  }

  deserialize(data: string): void {
    const obj = JSON.parse(data);
    this.x = obj.x; this.y = obj.y;
  }

  compareTo(other: Punto): number {
    const distA = Math.sqrt(this.x ** 2 + this.y ** 2);
    const distB = Math.sqrt(other.x ** 2 + other.y ** 2);
    return distA - distB;
  }
}`,
      },
    ],
  },
  {
    id: 'estructuras-lineales',
    number: 2,
    title: 'Estructuras Lineales',
    subtitle: 'Pilas, colas y listas enlazadas',
    color: 'oklch(0.78 0.18 75)',
    colorDim: 'oklch(0.78 0.18 75 / 0.12)',
    icon: 'Layers',
    description:
      'Implementación y análisis de estructuras de datos lineales: pilas (LIFO), colas (FIFO) y listas enlazadas simples y dobles.',
    topics: [
      {
        id: 'pila',
        title: 'Pila (Stack) — LIFO',
        description: 'Estructura LIFO con operaciones push, pop y peek. Aplicaciones: undo/redo, evaluación de expresiones.',
        lang: 'typescript',
        codeExample: `class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  get size(): number {
    return this.items.length;
  }
}

// Verificar paréntesis balanceados
function balanceado(expr: string): boolean {
  const stack = new Stack<string>();
  const pares: Record<string, string> = { ')': '(', ']': '[', '}': '{' };

  for (const ch of expr) {
    if ('([{'.includes(ch)) stack.push(ch);
    else if (')]}'.includes(ch)) {
      if (stack.pop() !== pares[ch]) return false;
    }
  }
  return stack.isEmpty();
}`,
      },
      {
        id: 'cola',
        title: 'Cola (Queue) — FIFO',
        description: 'Estructura FIFO con operaciones enqueue y dequeue. Aplicaciones: impresión, BFS.',
        lang: 'typescript',
        codeExample: `class Queue<T> {
  private items: T[] = [];
  private head = 0;

  enqueue(item: T): void {
    this.items.push(item);
  }

  dequeue(): T | undefined {
    if (this.isEmpty()) return undefined;
    const item = this.items[this.head];
    this.head++;
    // Limpieza periódica para evitar memory leaks
    if (this.head > this.items.length / 2) {
      this.items = this.items.slice(this.head);
      this.head = 0;
    }
    return item;
  }

  front(): T | undefined {
    return this.items[this.head];
  }

  isEmpty(): boolean {
    return this.head >= this.items.length;
  }

  get size(): number {
    return this.items.length - this.head;
  }
}`,
      },
      {
        id: 'lista-enlazada',
        title: 'Lista Enlazada',
        description: 'Nodos con punteros next. Inserción O(1) al inicio, búsqueda O(n).',
        lang: 'typescript',
        codeExample: `class Nodo<T> {
  constructor(
    public valor: T,
    public siguiente: Nodo<T> | null = null
  ) {}
}

class ListaEnlazada<T> {
  private cabeza: Nodo<T> | null = null;
  private _longitud = 0;

  insertarAlInicio(valor: T): void {
    const nodo = new Nodo(valor, this.cabeza);
    this.cabeza = nodo;
    this._longitud++;
  }

  insertarAlFinal(valor: T): void {
    const nodo = new Nodo(valor);
    if (!this.cabeza) { this.cabeza = nodo; }
    else {
      let actual = this.cabeza;
      while (actual.siguiente) actual = actual.siguiente;
      actual.siguiente = nodo;
    }
    this._longitud++;
  }

  toArray(): T[] {
    const res: T[] = [];
    let actual = this.cabeza;
    while (actual) { res.push(actual.valor); actual = actual.siguiente; }
    return res;
  }

  get longitud() { return this._longitud; }
}`,
      },
    ],
  },
  {
    id: 'arboles',
    number: 3,
    title: 'Árboles y Grafos',
    subtitle: 'Estructuras jerárquicas y de red',
    color: 'oklch(0.72 0.18 150)',
    colorDim: 'oklch(0.72 0.18 150 / 0.12)',
    icon: 'GitBranch',
    description:
      'Árboles binarios de búsqueda, recorridos (inorder, preorder, postorder) y grafos dirigidos con BFS y DFS.',
    topics: [
      {
        id: 'bst',
        title: 'Árbol Binario de Búsqueda',
        description: 'Inserción, búsqueda y eliminación en un BST. Propiedad: izq < raíz < der.',
        lang: 'typescript',
        codeExample: `class NodoArbol<T> {
  izq: NodoArbol<T> | null = null;
  der: NodoArbol<T> | null = null;
  constructor(public valor: T) {}
}

class BST<T extends number> {
  private raiz: NodoArbol<T> | null = null;

  insertar(valor: T): void {
    this.raiz = this._insertar(this.raiz, valor);
  }

  private _insertar(nodo: NodoArbol<T> | null, valor: T): NodoArbol<T> {
    if (!nodo) return new NodoArbol(valor);
    if (valor < nodo.valor) nodo.izq = this._insertar(nodo.izq, valor);
    else if (valor > nodo.valor) nodo.der = this._insertar(nodo.der, valor);
    return nodo;
  }

  inorder(): T[] {
    const res: T[] = [];
    const traverse = (n: NodoArbol<T> | null) => {
      if (!n) return;
      traverse(n.izq);
      res.push(n.valor);
      traverse(n.der);
    };
    traverse(this.raiz);
    return res;
  }
}

const bst = new BST<number>();
[5, 3, 7, 1, 4].forEach(v => bst.insertar(v));
console.log(bst.inorder()); // [1, 3, 4, 5, 7]`,
      },
      {
        id: 'grafos',
        title: 'Grafos — BFS y DFS',
        description: 'Lista de adyacencia. BFS usa cola; DFS usa pila o recursión.',
        lang: 'typescript',
        codeExample: `class Grafo {
  private adyacencia = new Map<number, number[]>();

  agregarVertice(v: number): void {
    if (!this.adyacencia.has(v)) this.adyacencia.set(v, []);
  }

  agregarArista(v: number, u: number): void {
    this.adyacencia.get(v)?.push(u);
    this.adyacencia.get(u)?.push(v); // no dirigido
  }

  bfs(inicio: number): number[] {
    const visitado = new Set<number>();
    const cola = [inicio];
    const resultado: number[] = [];
    visitado.add(inicio);
    while (cola.length) {
      const v = cola.shift()!;
      resultado.push(v);
      for (const vecino of this.adyacencia.get(v) ?? []) {
        if (!visitado.has(vecino)) {
          visitado.add(vecino);
          cola.push(vecino);
        }
      }
    }
    return resultado;
  }

  dfs(inicio: number): number[] {
    const visitado = new Set<number>();
    const resultado: number[] = [];
    const recurrir = (v: number) => {
      visitado.add(v); resultado.push(v);
      for (const u of this.adyacencia.get(v) ?? [])
        if (!visitado.has(u)) recurrir(u);
    };
    recurrir(inicio);
    return resultado;
  }
}`,
      },
    ],
  },
  {
    id: 'algoritmos',
    number: 4,
    title: 'Algoritmos de Ordenamiento',
    subtitle: 'Análisis de complejidad y comparación',
    color: 'oklch(0.68 0.22 280)',
    colorDim: 'oklch(0.68 0.22 280 / 0.12)',
    icon: 'BarChart2',
    description:
      'Bubble Sort, Merge Sort, Quick Sort y Heap Sort. Análisis de complejidad temporal y espacial con notación Big O.',
    topics: [
      {
        id: 'bubble-sort',
        title: 'Bubble Sort — O(n²)',
        description: 'Intercambia elementos adyacentes. Simple pero ineficiente para grandes conjuntos.',
        lang: 'typescript',
        codeExample: `function bubbleSort(arr: number[]): number[] {
  const a = [...arr];
  const n = a.length;

  for (let i = 0; i < n - 1; i++) {
    let intercambiado = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]]; // desestructuración ES6
        intercambiado = true;
      }
    }
    // Optimización: salir si ya está ordenado
    if (!intercambiado) break;
  }
  return a;
}

console.log(bubbleSort([64, 34, 25, 12, 22, 11, 90]));
// [11, 12, 22, 25, 34, 64, 90]`,
      },
      {
        id: 'merge-sort',
        title: 'Merge Sort — O(n log n)',
        description: 'Divide y conquista. Estable y consistente. Requiere O(n) espacio adicional.',
        lang: 'typescript',
        codeExample: `function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const izq = mergeSort(arr.slice(0, mid));
  const der = mergeSort(arr.slice(mid));

  return merge(izq, der);
}

function merge(izq: number[], der: number[]): number[] {
  const resultado: number[] = [];
  let i = 0, j = 0;

  while (i < izq.length && j < der.length) {
    if (izq[i] <= der[j]) resultado.push(izq[i++]);
    else resultado.push(der[j++]);
  }

  return [...resultado, ...izq.slice(i), ...der.slice(j)];
}

const datos = [38, 27, 43, 3, 9, 82, 10];
console.log(mergeSort(datos));
// [3, 9, 10, 27, 38, 43, 82]`,
      },
      {
        id: 'quick-sort',
        title: 'Quick Sort — O(n log n) promedio',
        description: 'In-place, muy rápido en la práctica. Peor caso O(n²) con pivote malo.',
        lang: 'typescript',
        codeExample: `function quickSort(arr: number[], lo = 0, hi = arr.length - 1): number[] {
  if (lo < hi) {
    const pi = particion(arr, lo, hi);
    quickSort(arr, lo, pi - 1);
    quickSort(arr, pi + 1, hi);
  }
  return arr;
}

function particion(arr: number[], lo: number, hi: number): number {
  // Pivote mediana de tres para mejor rendimiento
  const mid = Math.floor((lo + hi) / 2);
  if (arr[mid] < arr[lo]) [arr[lo], arr[mid]] = [arr[mid], arr[lo]];
  if (arr[hi] < arr[lo]) [arr[lo], arr[hi]] = [arr[hi], arr[lo]];
  if (arr[mid] < arr[hi]) [arr[mid], arr[hi]] = [arr[hi], arr[mid]];

  const pivote = arr[hi];
  let i = lo - 1;

  for (let j = lo; j < hi; j++) {
    if (arr[j] <= pivote) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[hi]] = [arr[hi], arr[i + 1]];
  return i + 1;
}`,
      },
    ],
  },
  {
    id: 'patrones-diseno',
    number: 5,
    title: 'Patrones de Diseño',
    subtitle: 'GoF y arquitectura de software',
    color: 'oklch(0.65 0.24 27)',
    colorDim: 'oklch(0.65 0.24 27 / 0.12)',
    icon: 'Puzzle',
    description:
      'Patrones creacionales (Singleton, Factory), estructurales (Decorator, Adapter) y de comportamiento (Observer, Strategy).',
    topics: [
      {
        id: 'singleton',
        title: 'Singleton',
        description: 'Garantiza una única instancia de una clase en toda la aplicación.',
        lang: 'typescript',
        codeExample: `class ConfiguracionApp {
  private static instancia: ConfiguracionApp | null = null;
  private config: Map<string, string> = new Map();

  private constructor() {
    // Constructor privado impide instanciación directa
    this.config.set('tema', 'oscuro');
    this.config.set('idioma', 'es');
  }

  static obtenerInstancia(): ConfiguracionApp {
    if (!ConfiguracionApp.instancia) {
      ConfiguracionApp.instancia = new ConfiguracionApp();
    }
    return ConfiguracionApp.instancia;
  }

  obtener(clave: string): string | undefined {
    return this.config.get(clave);
  }

  establecer(clave: string, valor: string): void {
    this.config.set(clave, valor);
  }
}

const cfg1 = ConfiguracionApp.obtenerInstancia();
const cfg2 = ConfiguracionApp.obtenerInstancia();
console.log(cfg1 === cfg2); // true — misma instancia`,
      },
      {
        id: 'observer',
        title: 'Observer',
        description: 'Notificación automática a múltiples suscriptores ante cambios de estado.',
        lang: 'typescript',
        codeExample: `interface Observador {
  actualizar(evento: string, datos: unknown): void;
}

class Sujeto {
  private observadores = new Map<string, Set<Observador>>();

  suscribir(evento: string, obs: Observador): void {
    if (!this.observadores.has(evento))
      this.observadores.set(evento, new Set());
    this.observadores.get(evento)!.add(obs);
  }

  desuscribir(evento: string, obs: Observador): void {
    this.observadores.get(evento)?.delete(obs);
  }

  notificar(evento: string, datos: unknown): void {
    this.observadores.get(evento)?.forEach(o => o.actualizar(evento, datos));
  }
}

class Logger implements Observador {
  actualizar(evento: string, datos: unknown): void {
    console.log(\`[\${new Date().toISOString()}] \${evento}:\`, datos);
  }
}`,
      },
    ],
  },
]
