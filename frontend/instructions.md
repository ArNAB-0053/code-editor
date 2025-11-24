# UI Component Naming Guidelines

This folder contains all reusable UI components used across the application.  
To maintain clarity and consistency, the following naming convention is used:

## Prefix Rules

### **A\*** — Ant Design–based Components
Components that **start with "A"** are built **on top of Ant Design**.  
These components extend or wrap AntD elements while applying:

- Custom theming  
- Styling overrides  
- Additional behavior or logic  

Examples:
- `AButton`
- `ASelect`
- `AInput`

---

### **C\*** — Custom-Built Components
Components that **start with "C"** are created **entirely from scratch**.  
They **do not rely on Ant Design** and are fully custom implementations.

Examples:
- `CDivider`

---

## Purpose of This Convention
- Keeps the UI folder organized  
- Makes it easy to identify whether a component is AntD-based or fully custom  
- Helps maintain clean architecture and predictable component behavior


## `index.tsx` — Purpose and Usage

In any component folder, the `index.tsx` file acts as the **main entry point** for that module. It is commonly used to:

- Avoiding Repetitive File Naming : If the main component file inside a folder had the same name as the folder itself, it would lead to paths like: `name/name.tsx`
- Combine multiple related components from the same folder
- Assemble them into one larger, unified component
- Keep the folder organized and modular
- Provide a single, clean export point for easier imports elsewhere