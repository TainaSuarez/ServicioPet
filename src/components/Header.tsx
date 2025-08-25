import { Button } from "@/components/ui/button";
import { Heart, Phone, MapPin } from "lucide-react";

const Header = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-primary" fill="currentColor" />
            <span className="text-2xl font-bold font-heading text-primary">Patinhas Pet Pamper</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('inicio')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Início
            </button>
            <button 
              onClick={() => scrollToSection('servicios')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Serviços
            </button>
            <button 
              onClick={() => scrollToSection('reservar')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Agendar
            </button>
            <button 
              onClick={() => scrollToSection('contacto')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Contato
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span className="hover:text-primary transition-colors">
                (55) 55 8132-6811
              </span>
            </div>
            <Button 
              onClick={() => scrollToSection('reservar')}
              className="bg-gradient-button hover:opacity-90 transition-opacity shadow-soft"
            >
              Agendar Horário
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;