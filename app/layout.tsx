
import type { Metadata } from 'next';
import './globals.css';
import { StoreProvider } from '@/src/store/StoreProvider';
import { SiteNavbar } from '@/src/shared/presentation/components/SiteNavbar';

export const metadata: Metadata = {
  title: 'GymRoutines',
  description: 'Organiza y administra tus rutinas de entrenamiento.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="antialiased">
        <StoreProvider>
          <SiteNavbar />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
