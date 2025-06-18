# Astro Starter Kit: Basics

```sh
npm create astro@latest -- --template basics
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/basics)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/basics)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/basics/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

![just-the-basics](https://github.com/withastro/astro/assets/2244813/a0a5533c-a856-4198-8470-2d67b1d7c554)

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## ¿Qué son los "server islands" en Astro?

Astro utiliza la arquitectura "Islands" para optimizar el rendimiento de las páginas web. En este modelo, la mayor parte de la página se renderiza como HTML estático, mientras que las partes que requieren interactividad o contenido dinámico se aíslan en "islas" (islands).

**Server islands** son componentes que se renderizan dinámicamente en el servidor, de forma independiente al resto de la página. Esto permite que el contenido principal y la estructura general de la página se sirvan rápidamente y puedan ser cacheados de manera eficiente, mientras que las partes más dinámicas (como información personalizada, avatares de usuario, ofertas especiales, etc.) se generan bajo demanda en el servidor.

### Beneficios de los server islands
- Permiten que el contenido estático se entregue y se muestre de inmediato, mejorando la velocidad de carga.
- Las partes dinámicas se procesan en paralelo y no bloquean el renderizado del resto de la página.
- Facilitan la personalización y actualización de secciones específicas sin afectar el rendimiento global.
- No dependen de una infraestructura específica, por lo que funcionan en cualquier entorno de hosting (Node.js, serverless, etc.).

### ¿Cómo se usan en Astro?
Para convertir un componente en un server island, se utiliza la directiva `server:defer`:

```astro
---
import Avatar from '../components/Avatar.astro';
---
<Avatar server:defer />
```

Esto hace que el componente `Avatar` se renderice de forma independiente y asíncrona en el servidor, permitiendo mostrar contenido genérico o un loader mientras se carga la información personalizada.

Para más información, consulta la [documentación oficial de Astro sobre Islands Architecture](https://docs.astro.build/en/concepts/islands/).

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
