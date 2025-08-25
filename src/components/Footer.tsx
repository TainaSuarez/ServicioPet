import { Heart, Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-primary" fill="currentColor" />
              <span className="text-xl font-bold font-heading">Patinhas Pet Pamper</span>
            </div>
            <p className="text-sm opacity-80">
              El mejor cuidado y amor para tu mascota. Más que grooming, 
              brindamos experiencias únicas llenas de cariño.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/30 transition-colors">
                <Instagram className="h-5 w-5" />
              </div>
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/30 transition-colors">
                <Facebook className="h-5 w-5" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-bold">Contacto</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>(11) 1234-5678</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>info@patinhaspetpamper.com</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <span>Av. Libertador 1234<br />Palermo, Buenos Aires</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-bold">Horarios</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Lun - Vie</span>
                <span>9:00 - 19:00</span>
              </div>
              <div className="flex justify-between">
                <span>Sábados</span>
                <span>9:00 - 18:00</span>
              </div>
              <div className="flex justify-between">
                <span>Domingos</span>
                <span className="opacity-60">Cerrado</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary/20 pt-8 text-center">
          <p className="text-sm opacity-60">
            © 2024 Patinhas Pet Pamper. Todos los derechos reservados. 
            Hecho con ❤️ para nuestros amigos peludos.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;