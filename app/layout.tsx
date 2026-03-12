import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--cv-font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'CogniVeil · Client Requirements',
  description: 'Pre-sales onboarding questionnaire for CogniVeil enterprise AI deployments.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
