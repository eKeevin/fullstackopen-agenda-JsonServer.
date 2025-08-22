Full Stack Open - Part 2 (JSON Server Version)
Este repositorio contiene los ejercicios de la Parte 2 del curso Full Stack Open, específicamente la versión que utiliza JSON Server como backend para simular una API REST.
- Versiones del Proyecto

Versión con datos estáticos (Deploy): agenda de contactos
Esta versión es de desarrollo con backend simulado con JSON SERVER

- Descripción
Esta aplicación es una agenda de contactos desarrollada con React que permite:

✅ Ver lista de personas con sus números de teléfono
✅ Agregar nuevas personas a la agenda
✅ Eliminar personas existentes
✅ Editar números de teléfono
✅ Filtrar personas por nombre
✅ Validación de formularios
✅ Notificaciones de éxito y error

🛠️ Tecnologías Utilizadas

Frontend: React + Vite
Backend: JSON Server (simulación de API REST)
Estilos: CSS personalizado
HTTP Client: Axios

- Instalación y Ejecución
Prerrequisitos
Node.js (versión 14 o superior)
npm 

----Pasos para ejecutar---

Clona el repositorio
bashgit clone https://github.com/eKeevin/fullstackopen-agenda-JsonServer.git
cd fullstackopen-agenda-JsonServer

Instala las dependencias

Inicia JSON Server (en una terminal)
npm run server
El servidor JSON estará disponible en http://localhost:3001
Inicia la aplicación React (en otra terminal)
npm run dev
La aplicación estará disponible en http://localhost:5173


- Ejercicios Incluidos
Este proyecto abarca los siguientes ejercicios de la Parte 2:

2.6-2.10: Agenda telefónica básica
2.11: Agenda con servidor JSON
2.12-2.14: Países y datos
2.15-2.18: Agenda completa con CRUD
2.19-2.20: Validaciones y notificaciones

- API Endpoints (JSON Server)

GET /persons - Obtener todas las personas
POST /persons - Crear nueva persona
PUT /persons/:id - Actualizar persona
DELETE /persons/:id - Eliminar persona

⚠ Diferencias con la Versión de Deploy
Esta versión incluye:

JSON Server como backend simulado
Operaciones CRUD completas con persistencia
Configuración de desarrollo optimizada

La versión de deploy utiliza datos estáticos para mayor simplicidad en el hosting.
👨‍💻 Autor
Kevin Hernan Pineda

GitHub: @eKeevin

📚 Curso
Este proyecto es parte del curso Full Stack Open de la Universidad de Helsinki.
