import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Recetario Quincenal | Cenas que resuelven el almuerzo',
  description: 'Plan de alimentación quincenal colombiano para 2 personas. Cenas de 4 porciones que dejan listo el almuerzo del día siguiente y desayunos exprés.',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/icon-192.png'
  }
};

export const viewport: Viewport = {
  themeColor: '#16a34a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className="bg-slate-100 min-h-screen text-slate-900 antialiased selection:bg-brand-500 selection:text-white">
        <div className="max-w-md mx-auto min-h-screen bg-slate-50 flex flex-col relative shadow-xl border-x border-slate-200/60 pb-20">
          {children}
        </div>
      </body>
    </html>
  );
}
