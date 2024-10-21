// app/layout.tsx
import './globals.css';
import NavBar from '../components/NavBar/NavBar'; 
import Footer from '../components/Footer/Footer'; 

export default function RootLayout({ children }: { children: React.ReactNode }) {


  return (
    <html lang="es">
      <body className="flex flex-col min-h-screen bg-slate-100">
        <header>
          <NavBar />
        </header>
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
