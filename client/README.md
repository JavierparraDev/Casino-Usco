# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


client/
├── public/                 # Archivos públicos (favicon, imágenes, etc.)
├── src/
│   ├── assets/             # Imágenes, fuentes, estilos globales
│   ├── components/         # Componentes reutilizables y UI
│   │   ├── AuthForm/       # Ejemplo de un componente AuthForm (formulario de autenticación)
│   │   │   ├── AuthForm.jsx
│   │   │   └── AuthForm.css
│   │   └── Navbar.jsx      # Ejemplo de componente de barra de navegación
│   ├── context/            # Contextos globales de la aplicación (autenticación, temas, etc.)
│   │   └── AuthContext.jsx # Contexto para manejar la autenticación
│   ├── hooks/              # Custom Hooks para lógica reutilizable
│   │   └── useAuth.js
│   ├── pages/              # Páginas principales de la aplicación
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── services/           # Lógica para comunicación con el backend (API)
│   │   └── authService.js  # Funciones para registro, login, etc.
│   ├── utils/              # Funciones y helpers útiles
│   │   └── validations.js  # Funciones de validación o utilidades comunes
│   ├── App.jsx             # Componente raíz de la aplicación
│   ├── main.jsx            # Punto de entrada de la aplicación
│   └── index.css           # Estilos globales
├── .env                    # Variables de entorno
├── .gitignore
├── package.json
└── vite.config.js          # Configuración de Vite


