# TeamBuilder Frontend 🎨

The client-side application for **TeamBuilder**, built with modern web technologies to provide a seamless and responsive user experience for cohort-based course collaboration.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: JavaScript (ES6+)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) (Radix UI primitives)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)
- **Theming**: [next-themes](https://github.com/pacocoursey/next-themes)

## ✨ Key Features

- **Authentication System**:
  - Login & Registration forms with validation.
  - OAuth integration (Google & GitHub) support.
  - Password Reset & Forgot Password flows.
- **Dark Mode**: Fully supported system-aware theme toggle.
- **Responsive Design**: Mobile-first approach ensuring compatibility across devices.
- **Protected Routes**: Middleware/State-based protection for authenticated areas.

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn

### Installation

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env.local` file in the root of the `frontend` directory:
    ```env
    NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

```
frontend/
├── src/
│   ├── app/                 # Next.js App Router pages and layouts
│   │   ├── (auth)/          # Authentication related pages
│   │   ├── demo/            # Demo pages
│   │   ├── globals.css      # Global styles and Tailwind directives
│   │   ├── layout.js        # Root layout with ThemeProvider
│   │   └── page.js          # Landing page
│   ├── components/          # Reusable React components
│   │   ├── ui/              # Shadcn UI components (buttons, inputs, cards)
│   │   ├── mode-toggle.jsx  # Theme switcher
│   │   └── ...
│   ├── lib/                 # Utility functions and configurations
│   │   ├── axios.js         # Axios instance setup
│   │   └── utils.js         # CN utility for Tailwind
│   └── store/               # Zustand state stores (useAuthStore.js)
├── public/                  # Static assets
└── ...
```

## 📜 Available Scripts

- `npm run dev`: Runs the app in development mode.
- `npm run build`: Builds the app for production.
- `npm start`: Starts the production server.
- `npm run lint`: Runs ESLint to check for code quality issues.

## 🎨 UI Design System

We use a customized version of **Shadcn UI**.
- **Colors**: Defined in `globals.css` using CSS variables for easy theming.
- **Typography**: Uses `Geist Sans` and `Geist Mono` fonts.
- **Animations**: Powered by `tailwindcss-animate`.

---

Built with ❤️ for the TeamBuilder Community.
