# CRUSH Configuration

## Build/Test/Lint Commands
```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server

# Database
npx prisma generate      # Generate Prisma client
npx prisma db push       # Push schema to database
npx prisma studio        # Open Prisma Studio

# Code Quality
npm run lint             # Run ESLint
npm run typecheck        # Run TypeScript compiler check
```

## Environment Setup
```bash
# Copy environment template and fill in your values
cp .env.local.example .env.local

# Required environment variables:
# NEXTAUTH_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
# CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
# DATABASE_URL (Supabase), DIRECT_URL (Supabase)
```

## Code Style Guidelines
- **Components**: Use functional components with TypeScript
- **Imports**: Group by type (React, Next.js, libraries, local), alphabetical within groups
- **Naming**: PascalCase for components, camelCase for functions/variables
- **Types**: Define interfaces in `/src/types/index.ts`, use explicit types
- **Error Handling**: Always handle async operations with try/catch
- **UI**: Use shadcn/ui components, Tailwind for styling
- **State**: Use React hooks, avoid prop drilling with context when needed