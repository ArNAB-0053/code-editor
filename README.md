# Codeitor

This project is a full-stack, containerized code execution platform designed to safely run user-submitted code inside isolated Docker containers. Users can write, execute, and test code directly from the browser, while the backend ensures security, isolation, and consistent runtime environments.

---

## Tech Stack

### **Frontend**
- **Next.js**
- **React.js**
- **Tailwind CSS**
- **Styled Components**
- **Ant Design**

### **Backend**
- **ASP.NET** (MVC Architecture)

### **Containerization**
- **Docker** (isolated execution per language)
- **Docker Compose** (multi-service orchestration)

---

## Overview

The goal of this platform is to execute code safely without compromising the security of the host machine.  
Every time a user submits code, the backend spins up (or uses) a Docker container designed specifically for that language and runs the code inside an isolated environment.

This keeps the system clean, safe, and predictable.

---

# System Workflow (How It Works)

---

## **1. User writes code in the UI**

The frontend provides a responsive and modern code editor built using:

- Next.js (routing + SSR)
- React (component system)
- Tailwind + Styled Components (styling)
- Ant Design (UI elements)
- monaco editor (for VS Code like editor)

The user selects a language and hits **Run**.

---

## **2. Frontend sends request to backend**

A POST request is sent to the ASP.NET backend with:

- Code text
- Selected language
- Additional metadata if needed

---

## **3. Backend creates a temporary folder**

To safely isolate each execution:

1. A temporary directory is created  
2. A temporary file is generated based on the language:
   - `file.py`
   - `file.js`
   - `file.cs`
   - etc.

This ensures each execution is isolated and ephemeral.

---

## **4. Docker executes the code**

The backend:

1. Mounts the temp folder into a Docker container  
2. Selects the appropriate runtime container (Python, Node, etc.)  
3. Executes the generated file inside the container  
4. Captures:
   - Standard output (stdout)
   - Error messages (stderr)
   - Exit codes

Docker ensures:
- Isolation  
- Safety  
- Consistent runtime  
- No leftover processes  

Both the backend and language runtimes run inside containers.

---

## **5. Output is returned to the frontend**

The output of the container is sent back as JSON:

- The result of the program  
- Compilation/log errors if any  
- Execution time (optional)  
- Metadata for UI display  

The UI updates the output section instantly.

---

## **6. Temporary files are cleaned up**

Once execution ends:

- The temp folder is deleted  
- No files remain on the server  
- No process continues running  
- Containers are cleaned automatically  

This keeps the system clean and memory-efficient.

---

<!-- # 📦 High-Level Architecture Diagram -->

