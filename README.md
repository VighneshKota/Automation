# Social Media Automation Platform

A comprehensive Next.js application for automating social media content creation using AI agents.

## Features

- **AI-Powered Content Generation**: Generate blog posts, LinkedIn content, and video scripts
- **Multi-Platform Support**: Create content for blogs, LinkedIn, Instagram, and YouTube
- **Real-time Preview**: See how your content will look before publishing
- **Content Management**: Organize and manage all your content in one place
- **Theme Customization**: Customize your blog's appearance
- **Analytics Dashboard**: Track your content performance

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives with custom styling
- **Icons**: Lucide React
- **TypeScript**: Full type safety

## Getting Started

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd social-media-automation
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

\`\`\`
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   ├── onboarding/        # User onboarding flow
│   ├── app/               # Main application pages
│   │   ├── dashboard/     # Dashboard page
│   │   ├── blog/          # Blog management
│   │   ├── linkedin/      # LinkedIn content creation
│   │   ├── video/         # Video script generation
│   │   └── settings/      # User settings
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Landing page
│   └── globals.css        # Global styles
├── components/            # Reusable React components
│   ├── ui/               # Base UI components
│   └── ...               # Feature-specific components
├── lib/                  # Utility functions
└── hooks/                # Custom React hooks
\`\`\`

## Key Features

### Content Generation
- **Blog Posts**: Generate SEO-optimized blog content with custom themes
- **LinkedIn Posts**: Create engaging LinkedIn content with hashtag suggestions
- **Video Scripts**: Generate scripts for Instagram Reels and YouTube Shorts

### User Experience
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Dark Mode Support**: Built-in theme switching
- **Toast Notifications**: Real-time feedback for user actions
- **Loading States**: Smooth user experience with proper loading indicators

### Content Management
- **Draft System**: Save and manage content drafts
- **Scheduling**: Schedule content for future publication
- **Analytics**: Track content performance and engagement

## Development

### Adding New Features

1. Create new components in the `components/` directory
2. Add new pages in the `app/` directory following the App Router structure
3. Use the existing UI components from `components/ui/`
4. Follow TypeScript best practices for type safety

### Styling

The project uses Tailwind CSS with a custom design system. Colors and spacing are defined in `tailwind.config.js` and can be customized through CSS variables in `globals.css`.

## Deployment

The application is ready for deployment on Vercel:

\`\`\`bash
npm run build
\`\`\`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
