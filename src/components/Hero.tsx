import { Button } from "@/components/ui/button";
import { Calendar, Heart, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-pets.jpg";

const Hero = () => {
  const scrollToReservar = () => {
    const element = document.getElementById('reservar');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="inicio" className="relative min-h-[90vh] flex items-center bg-gradient-hero">
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-primary">
                <Sparkles className="h-5 w-5" />
                <span className="text-sm font-medium tracking-wide uppercase">El mejor cuidado para tu mascota</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold font-heading text-foreground leading-tight">
                Patinhas Pet
                <span className="text-primary"> Pamper</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                Mimamos a tu mascota con servicios de grooming profesional. 
                Baños relajantes, cortes de pelo estilosos y mucho amor en cada visita.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                onClick={scrollToReservar}
                className="bg-gradient-button hover:opacity-90 transition-all duration-300 shadow-soft hover:shadow-card text-lg px-8"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Reservar Ahora
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-primary text-primary hover:bg-pink-accent transition-all duration-300"
              >
                Ver Servicios
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Mascotas Felices</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">3</div>
                <div className="text-sm text-muted-foreground">Años de Experiencia</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">★ 4.9</div>
                <div className="text-sm text-muted-foreground">Calificación</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-float">
              <img 
                src={heroImage} 
                alt="Mascotas felices en Patinhas Pet Pamper" 
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-card border">
              <div className="flex items-center space-x-3">
                <Heart className="h-8 w-8 text-primary" fill="currentColor" />
                <div>
                  <div className="font-semibold text-foreground">100% Amor</div>
                  <div className="text-sm text-muted-foreground">Garantizado</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;