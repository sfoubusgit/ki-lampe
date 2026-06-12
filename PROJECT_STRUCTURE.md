# KI-LAMPE Project Structure

## Root Directory
```
ki_lampe_new_version_2/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles with Tailwind
├── components/            # React components
├── lib/                   # Utility functions and helpers
├── public/                # Static assets (images, etc.)
├── styles/                # Additional stylesheets (if needed)
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── postcss.config.mjs     # PostCSS configuration
├── next.config.mjs        # Next.js configuration
└── .eslintrc.json         # ESLint configuration
```

## Technology Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Linting**: ESLint with Next.js config

## Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Next Steps
Follow the roadmap in `KI-LAMPE-PROMPT-ROADMAP.md` to build the blog components.
