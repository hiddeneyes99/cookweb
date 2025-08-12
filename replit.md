# Overview

CookPhish is an advanced phishing simulation framework designed for cybersecurity education and ethical hacking training. This full-stack application provides a comprehensive platform for demonstrating social engineering techniques through Instagram clone simulations, featuring 2FA bypass capabilities, IP logging, and tunneling support. The project serves as an educational tool for security professionals to understand and defend against phishing attacks.

## Recent Updates (January 2025)
- ✅ Complete installation section redesign with step-by-step commands and individual copy buttons
- ✅ Added direct download button with GitHub releases link (v3.0.0)
- ✅ Implemented GitHub star/follow prompts in installation section
- ✅ Redesigned video tutorials with clickable thumbnails (HACK1.png, HACK3.png)
- ✅ Created Pro coming soon page with social media links and features preview
- ✅ Added responsive header navigation with Home/Pro links
- ✅ Made CookPhish header clickable for home navigation
- ✅ Comprehensive SEO optimization with meta tags and Open Graph
- ✅ Full responsive design for all devices (mobile, tablet, desktop)
- ✅ Enhanced patriotic Indian theme with Ahmar's personal branding

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The application uses a modern React-based frontend built with TypeScript and Vite. The UI is implemented using Shadcn/UI components with Radix UI primitives, providing a comprehensive design system with dark mode support. The frontend features a cyberpunk/hacker aesthetic with custom CSS animations including matrix rain effects and particle systems.

**Key Technologies:**
- React 18 with TypeScript
- Vite for build tooling and development server
- Wouter for client-side routing
- TanStack Query for server state management
- Framer Motion for animations
- Tailwind CSS for styling with custom cyberpunk theme

**Component Structure:**
- Modular UI components using Shadcn/UI
- Custom cyberpunk-themed components (MatrixRain, ParticleSystem, TerminalWindow)
- Loading screens with progress indicators
- Sound effects system using Web Audio API
- Responsive design with mobile support

## Backend Architecture
The backend follows a simple Express.js REST API architecture with middleware for logging and error handling. The server provides endpoints for tool information and installation commands, designed to support the educational nature of the phishing simulation framework.

**Core Features:**
- Express.js server with TypeScript
- RESTful API endpoints
- Request/response logging middleware
- Error handling with proper status codes
- Development mode integration with Vite HMR

## Data Storage Solutions
The application uses a hybrid storage approach with PostgreSQL as the primary database through Drizzle ORM, complemented by in-memory storage for development and testing.

**Database Configuration:**
- PostgreSQL with Neon Database serverless connection
- Drizzle ORM for type-safe database operations
- Migration system using drizzle-kit
- User schema with UUID primary keys and unique constraints

**Storage Interface:**
- Abstract storage interface for CRUD operations
- In-memory storage implementation for development
- User management with username/password authentication

## Session Management
The application implements session-based authentication using PostgreSQL session storage with connect-pg-simple, providing secure user state management across requests.

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL hosting for production data persistence
- **PostgreSQL**: Primary database engine for user data and application state

## UI and Styling Libraries
- **Shadcn/UI**: Complete component library built on Radix UI primitives
- **Radix UI**: Unstyled, accessible UI primitives for React
- **Tailwind CSS**: Utility-first CSS framework with custom cyberpunk theme
- **Lucide React**: Icon library for consistent iconography

## Development and Build Tools
- **Vite**: Fast build tool and development server with HMR support
- **TypeScript**: Type safety across the entire application
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Tailwind CSS integration

## Animation and Audio
- **Framer Motion**: Physics-based animation library for UI transitions
- **Web Audio API**: Browser-native audio for cyberpunk sound effects
- **Custom Audio Manager**: Abstraction layer for sound effect management

## Development Integrations
- **Replit**: Cloud development environment with specialized plugins
- **Replit Cartographer**: Development mapping and navigation tools
- **Runtime Error Overlay**: Enhanced error reporting during development

## State Management and Data Fetching
- **TanStack Query**: Powerful data synchronization for server state
- **React Hook Form**: Form state management with validation
- **Zod**: Runtime type validation and schema parsing