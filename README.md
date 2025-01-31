# Monorepo Starter with Hono & React

## Overview

This repository is a starter template for building full-stack applications using **pnpm workspaces** with a monorepo structure. It includes:

- **Hono** for the backend - a lightweight, ultrafast web framework.
- **React** for the frontend - a modern, component-based library.
- **pnpm workspaces** for efficient package management and dependency sharing.

## Features

- **Monorepo architecture** using `pnpm workspaces`
- **Backend** powered by Hono, optimized for speed and minimal footprint
- **Frontend** built with React, offering a fast and interactive UI
- **TypeScript support** for type safety across the stack
- **Zero-config setup** to get started immediately

## Tech Stack

### Backend - Hono 🔥

Hono (meaning "flame" in Japanese) is an ultrafast, lightweight web framework built on Web Standards. It runs seamlessly across multiple runtimes, including **Cloudflare Workers, Fastly Compute, Deno, Bun, Vercel, Netlify, and AWS Lambda**.

#### Quick Example:

```ts
import { Hono } from "hono";

const app = new Hono();
app.get("/", (c) => c.text("Hello from Hono!"));
export default app;
```

### Frontend - React ⚛️

React is a powerful JavaScript library for building fast, dynamic user interfaces. It follows a component-based architecture and is optimized for performance and scalability.

#### Quick Example:

```tsx
import React from "react";

const App = () => {
  return <h1>Hello from React!</h1>;
};

export default App;
```

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/)

### Installation

Clone the repository and install dependencies:

```sh
git clone https://github.com/your-repo/monorepo-starter.git
cd monorepo-starter
pnpm install
```

### Running the Project

#### Start Backend

```sh
pnpm run dev:server
```

#### Start Frontend

```sh
pnpm run dev:client
```

The frontend will be available at `http://localhost:3000`, and the backend at `http://localhost:4000`.

## Folder Structure

```
monorepo-starter/
│── apps/
│   ├── client/   # React Application
│   ├── server/   # Hono API Server
│       ├── lambda/
│       ├── src/
│           ├── lib/
│           ├── routes/
│           ├── types/
```

## Why Use This Starter?

- 🚀 **Blazing fast**: Hono is one of the fastest web frameworks.
- 🏗 **Modular monorepo**: Easy package sharing and dependency management.
