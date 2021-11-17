# Portfolio App - Backend
## User routes

**POST /api/user/signIn** - Login user

Body: 
- login (String)
- password (String)

**POST /api/user/register** - Register user

Body: 
- email (String)
- login (String)
- password (String)
- isAdmin (Boolean)

**POST api/user/auth** - Auth user with token

Body: 
- token (String)

**POST /api/user/sendEmail** - Send Email

Body: 
- email (String)
- tel (String)
- title (String)
- msg (String)

## Project routes

**GET /api/project** - Get all projects

**POST /api/project** - Create new project

Body: 
- title (String)
- description (String)
- date (String)
- mainImage (String)

**PUT /api/project/:id** - Edit project

Body: 
- title (String)
- description (String)
- date (String)
- mainImage (String)

Params: 
- id (String) - Project ID

**DELETE /api/project/:id** - Delete project

Params: 
- id (String) - Project ID

**GET /api/project/:id/images** - Get all project images

Params: 
- id (String) - Project ID

**POST /api/project/:id/images/** - Create new project image

Body:
- imageUrl (String)

Params: 
- id (String) - Project ID

**DELETE /api/project/:id/images/:imageid** - Get all project images

Params: 
- id (String) - Project ID
- imageid (String) - Project image ID