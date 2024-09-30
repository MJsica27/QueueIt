# QueueIt


## Prerequisites

Ensure you have the following installed on your machine:

• Java 21

• Node.js

• IntelliJ IDEA

• Visual Studio Code (VSCode)

• Postman

• XAMPP

## Setup Instructions

#### 1. Project Folder Structure

Create a folder for the project on your desktop or preferred location:

```bash
mkdir ~/Desktop/QueueIt
cd ~/Desktop/QueueIt
```

&nbsp;&nbsp;&nbsp; 1.1 Create subdirectories:
```bash
mkdir Frontend Backend
```
#### 2. Clone Repositories

• Mac: Use the Terminal.

• Windows: Use PowerShell or Command Prompt.

&nbsp;&nbsp;&nbsp; 2.1 Clone the Frontend Repository:

&nbsp;&nbsp;&nbsp;&nbsp;Navigate to the Frontend directory and clone the frontend branch:
```bash
cd Frontend
git clone -b frontend https://github.com/MJsica27/QueueIt.git
```

&nbsp;&nbsp;&nbsp;2.2 Clone the Backend Repository:
&nbsp;&nbsp;&nbsp;&nbsp;Navigate back to the root folder, then into the Backend directory, and clone the backend branch:
```bash
cd ..
cd Backend
git clone -b backend https://github.com/MJsica27/QueueIt.git
```
#### 3. Backend Setup (IntelliJ IDEA)
1. Launch IntelliJ IDEA.
   
2. Select Open and navigate to the Backend folder.
   
3. Choose the root folder containing the backend files.

### 4. Frontend Setup (VSCode)
1. Launch Visual Studio Code.

2. Select Open Folder and navigate to the Frontend folder.
   
3. Once the folder is open, install the dependencies:

```bash
npm install
```
4. Start the frontend development server:
```bash
npm start
```
