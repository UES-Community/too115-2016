# TOO115-2016 · Tecnologías Orientadas a Objetos

> Plataforma interactiva para la materia **Tecnologías Orientadas a Objetos** (TOO115-2016).  
> Explora programación orientada a objetos, estructuras de datos y algoritmos con visualizaciones animadas y un editor de código en el navegador.

[![CI](https://github.com/UES-Community/too115-2016/actions/workflows/ci.yml/badge.svg)](https://github.com/UES-Community/too115-2016/actions/workflows/ci.yml)
[![Pages](https://github.com/UES-Community/too115-2016/actions/workflows/deploy.yml/badge.svg)](https://github.com/UES-Community/too115-2016/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)

**Sitio en vivo:** [ues-community.github.io/too115-2016](https://ues-community.github.io/too115-2016/)

---

## Acerca del Proyecto

**TOO115-2016** es una plataforma educativa construida con Next.js para estudiantes de la materia Tecnologías Orientadas a Objetos. Ofrece contenido organizado por unidades, visualizaciones interactivas con Framer Motion y un editor de código Monaco integrado.

### Categoría Temática

> Programación · Estructuras de Datos · Algoritmos

---

## Características

| Característica | Descripción |
|---|---|
| **5 Unidades** | Contenido progresivo desde OOP hasta patrones de diseño |
| **Editor Monaco** | Editor de código TypeScript/JavaScript en el navegador |
| **Highlight.js** | Coloreado sintáctico de fragmentos de código |
| **Framer Motion** | Animaciones fluidas para estructuras de datos |
| **Lucide React** | Iconografía moderna y consistente |
| **Responsive** | Diseño adaptable a móvil, tablet y escritorio |

---

## Unidades del Curso

| # | Unidad | Temas |
|---|--------|-------|
| I | Fundamentos de OOP | Clases, herencia, interfaces |
| II | Estructuras Lineales | Pilas, colas, listas enlazadas |
| III | Árboles y Grafos | BST, BFS, DFS |
| IV | Algoritmos de Ordenamiento | Bubble, Merge, Quick Sort |
| V | Patrones de Diseño | Singleton, Observer, GoF |

---

## Inicio Rápido

### Prerrequisitos

- [Node.js](https://nodejs.org/) ≥ 18
- [pnpm](https://pnpm.io/) ≥ 9 (recomendado) o `npm`

### Instalación

```bash
git clone https://github.com/UES-Community/too115-2016.git
cd too115-2016
pnpm install
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Comandos Disponibles

```bash
pnpm dev       # Servidor de desarrollo con HMR
pnpm build     # Compilar para producción (export estático)
pnpm start     # Iniciar servidor de producción
pnpm lint      # Análisis estático con ESLint
```

---

## Stack Tecnológico

- **Framework**: [Next.js 16](https://nextjs.org/) con App Router
- **Lenguaje**: [TypeScript 5](https://www.typescriptlang.org/)
- **Estilos**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Componentes**: [shadcn/ui](https://ui.shadcn.com/)
- **Editor**: [`@monaco-editor/react`](https://github.com/suren-atoyan/monaco-react)
- **Resaltado**: [`highlight.js`](https://highlightjs.org/)
- **Animaciones**: [`framer-motion`](https://www.framer-motion.com/)
- **Iconos**: [`lucide-react`](https://lucide.dev/)

---

## Estructura del Proyecto

```
too115-2016/
├── app/                    # Next.js App Router
│   ├── editor/             # Página del editor de código
│   ├── unidad/[slug]/      # Páginas dinámicas por unidad
│   ├── globals.css         # Estilos globales y design tokens
│   ├── layout.tsx          # Layout raíz
│   └── page.tsx            # Página de inicio
├── components/
│   ├── editor/             # EditorShell (Monaco)
│   ├── home/               # Hero, UnitsGrid, ComplexityTable
│   ├── layout/             # Navbar y Footer
│   ├── ui/                 # Componentes UI reutilizables
│   └── unit/               # Detalle de unidad
├── lib/
│   ├── course-data.ts      # Datos del currículo
│   └── utils.ts            # Utilidades
├── public/                 # Recursos estáticos
└── .github/workflows/      # CI y deploy a GitHub Pages
```

---

## Contribuir

Las contribuciones son bienvenidas. Lee nuestra [guía de contribución](./CONTRIBUTING.md) para comenzar.

---

## Licencia

Distribuido bajo la licencia **MIT**. Consulta [LICENSE](./LICENSE) para más información.

---

<p align="center">
  <strong>TOO115-2016 · Tecnologías Orientadas a Objetos</strong><br>
  Programación · Estructuras de Datos · Algoritmos
</p>
