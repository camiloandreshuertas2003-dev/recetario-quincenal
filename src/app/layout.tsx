import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nuestro menú | Cenas que resuelven el almuerzo para 2',
  description: 'Nuestro menú: Plan de alimentación quincenal colombiano para 2 personas. Cenas de 4 porciones que dejan listo el almuerzo del día siguiente, desayunos exprés y lista de mercado inteligente.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Nuestro menú'
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon.png', type: 'image/png', sizes: '64x64' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' }
    ]
  }
};

export const viewport: Viewport = {
  themeColor: '#15803d',
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
        <meta name="apple-mobile-web-app-title" content="Nuestro menú" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link rel="icon" type="image/png" sizes="64x64" href="/favicon.png" />
      </head>
      <body className="bg-slate-950 min-h-screen text-slate-900 text-base antialiased selection:bg-brand-500 selection:text-white">
        <div className="max-w-lg md:max-w-xl mx-auto min-h-screen bg-slate-50 flex flex-col relative shadow-2xl border-x border-slate-200/80 pb-24">
          {children}
        </div>
      </body>
    </html>
  );
}
