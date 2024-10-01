# QueueIt

## Prerequisites

Ensure the following software is installed on your machine:

- **Java 21**
- **Node.js**
- **XAMPP** (for backend services, if required)

## Setup Instructions

### 1. Project Folder Structure

Create a project folder on your desktop or preferred location:

```bash
mkdir QueueIt
cd QueueIt
```

#### 1.1 Create subdirectories:

```bash
mkdir Frontend Backend
```

### 2. Clone Repositories

- **Mac**: Use Terminal.
- **Windows**: Use PowerShell or Command Prompt.

#### 2.1 Clone the Frontend Repository:

Navigate to the `Frontend` directory and clone the frontend branch:

```bash
cd Frontend
git clone -b frontend https://github.com/MJsica27/QueueIt.git
```

#### 2.2 Clone the Backend Repository:

Navigate back to the root folder, then into the `Backend` directory, and clone the backend branch:

```bash
cd ..
cd Backend
git clone -b backend https://github.com/MJsica27/QueueIt.git
```

### 3. Backend Setup (IntelliJ IDEA)

1. Launch **IntelliJ IDEA**.
2. Select **Open** and navigate to the `Backend` folder.
3. Choose the root folder containing the backend files.
4. Run the backend by clicking the **Run** button or using `Shift+F10`.

### 4. Frontend Setup (VSCode)

1. Launch **Visual Studio Code**.
2. Select **Open Folder** and navigate to the `Frontend` folder.
3. Once the folder is open, install the project dependencies:

```bash
npm install
```

4. Start the frontend development server:

```bash
npm start
```

### 5. XAMPP Configuration

If your backend services require **XAMPP** (e.g., for database or server management):

1. Launch **XAMPP**.
2. Start the services (e.g., Apache, MySQL).
