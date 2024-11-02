# QueueIt
## Prerequisites
Make sure the following software is installed on your machine:

- **Java 21**
- **Node.js**
- **XAMPP** (for backend services, if required)
## Setup Instructions
### 1. Clone Repositories
Clone the frontend and backend repositories to your local machine.

**Frontend Repository**:
```bash
git clone -b frontend https://github.com/MJsica27/QueueIt.git Frontend
```

**Backend Repository**:
```bash
git clone -b Backend-JWT https://github.com/MJsica27/QueueIt.git Backend
```

### 2. Backend Setup
1. Open the Backend folder in **IntelliJ IDEA**.
2. Ensure that Lombok is configured in your project:
  - Add the Lombok dependency to your pom.xml (for Maven) or build.gradle (for Gradle).
  - Install the Lombok plugin in IntelliJ IDEA from File > Settings > Plugins.
  - Enable annotation processing in IntelliJ IDEA from File > Settings > Build, Execution, Deployment > Compiler > Annotation Processors.
3. Run the backend using the **Run** button or press **Shift+F10**.

### 3. Frontend Setup
1. Open the Frontend folder in **Visual Studio Code**.
2. Install project dependencies:
```bash
npm install
```
3. Start the frontend development server:
```bash
npm start
```

### 4. Database Setup (XAMPP)
If required by the backend services:

- Launch **XAMPP** and start the necessary services:
- **Apache** for server management
- **MySQL** for the database setup.
 
