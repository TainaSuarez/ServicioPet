import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Phone, Mail, Award, Heart, Users } from "lucide-react";

const About = () => {
  return (
    <section id="contacto" className="py-20 bg-pink-soft/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="secondary" className="text-primary">
            Sobre Nosotros
          </Badge>
          <h2 className="text-4xl font-bold font-heading text-foreground">
            Patinhas Pet Pamper
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Más que un salón de belleza para mascotas, somos una familia que ama 
            y cuida a tus compañeros peludos como si fueran nuestros.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold font-heading text-foreground">
              Nuestra Historia
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Fundado en 2021 por María González, veterinaria con más de 10 años de experiencia, 
              Patinhas Pet Pamper nació del amor incondicional hacia los animales y la necesidad 
              de brindar un espacio seguro, cómodo y profesional para el cuidado estético de las mascotas.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Nuestro equipo está formado por grooming profesionales certificados que entienden 
              las necesidades específicas de cada raza y temperamento. Utilizamos solo productos 
              premium, libres de químicos agresivos y completamente seguros para tu mascota.
            </p>

            <div className="grid grid-cols-3 gap-6 pt-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-pink-accent rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <div className="text-sm font-semibold">Certificados</div>
                <div className="text-xs text-muted-foreground">Profesionales</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-pink-accent rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="h-8 w-8 text-primary" fill="currentColor" />
                </div>
                <div className="text-sm font-semibold">Con Amor</div>
                <div className="text-xs text-muted-foreground">Siempre</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-pink-accent rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <div className="text-sm font-semibold">Clientes</div>
                <div className="text-xs text-muted-foreground">Satisfechos</div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardContent className="p-6">
                <h4 className="text-xl font-bold font-heading mb-4 flex items-center">
                  <Clock className="h-5 w-5 text-primary mr-2" />
                  Horarios de Atención
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Lunes - Viernes</span>
                    <span className="font-semibold">9:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sábados</span>
                    <span className="font-semibold">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Domingos</span>
                    <span className="font-semibold text-muted-foreground">Cerrado</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-card">
              <CardContent className="p-6">
                <h4 className="text-xl font-bold font-heading mb-4">Información de Contacto</h4>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <div className="font-semibold">Dirección</div>
                      <div className="text-sm text-muted-foreground">
                        Av. Libertador 1234<br />
                        Palermo, Buenos Aires
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-semibold">Teléfono</div>
                      <div className="text-sm text-muted-foreground">(11) 1234-5678</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-semibold">Email</div>
                      <div className="text-sm text-muted-foreground">info@patinhaspetpamper.com</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary text-primary-foreground border-0 shadow-card">
              <CardContent className="p-6 text-center">
                <h4 className="text-xl font-bold mb-2">¿Necesitas ayuda?</h4>
                <p className="text-sm opacity-90 mb-4">
                  Estamos aquí para responder todas tus preguntas sobre el cuidado de tu mascota.
                </p>
                <div className="text-lg font-bold">WhatsApp: (11) 9876-5432</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;