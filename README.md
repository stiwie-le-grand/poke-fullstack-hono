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

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/)

### Installation

Clone the repository and install dependencies:

```sh
git clone https://github.com/stiwie-le-grand/hono-mono-starter
cd hono-mono-starter
pnpm install
```

### Running the Project

#### Start API

```sh
pnpm run dev:server
```

#### Start Frontend

```sh
pnpm run dev:client
```

#### Start Frontend + API in the same process

```sh
pnpm run dev
```

#### Generate types

```sh
cd apps/client
pnpm generate-types
```

The frontend will be available at `http://localhost:5173` by default, and the backend at `http://localhost:3000` respectively.

## Folder Structure

```
/
│── apps/
│   ├── client/   # React Application
│   ├── server/   # Hono API Server
│       ├── lambda/
│       ├── src/
│           ├── lib/
│           ├── routes/
│           ├── types/
```

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

## Why Use This Starter and Hono?

- 🚀 **Blazing fast**: Fast, lightweight, built on Web Standards. Support for any JavaScript runtime.
- 🏗 **Modular monorepo**: Easy package sharing and dependency management.
- 🚠 **Hono is getting traction**: More and more people is switching and trying out this powerhouse:
  - https://2024.stateofjs.com/en-US/other-tools/#backend_frameworks
  - https://risingstars.js.org/2024/en
