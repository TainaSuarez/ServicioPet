import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Phone, Mail, Award, Heart, Users } from "lucide-react";

const About = () => {
  return (
    <section id="contacto" className="py-20 bg-pink-soft/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="secondary" className="text-primary">
            Sobre Nós
          </Badge>
          <h2 className="text-4xl font-bold font-heading text-foreground">
            Patinhas Pet Pamper
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Mais que um salão de beleza para pets, somos uma família que ama 
            e cuida dos seus companheiros peludos como se fossem nossos.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold font-heading text-foreground">
              Nossa História
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Fundado em 2021 por Maria Silva, veterinária com mais de 10 anos de experiência, 
              o Patinhas Pet Pamper nasceu do amor incondicional pelos animais e da necessidade 
              de oferecer um espaço seguro, confortável e profissional para o cuidado estético dos pets.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Nossa equipe é formada por profissionais certificados em banho e tosa que entendem 
              as necessidades específicas de cada raça e temperamento. Utilizamos apenas produtos 
              premium, livres de químicos agressivos e completamente seguros para seu pet.
            </p>

            <div className="grid grid-cols-3 gap-6 pt-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-pink-accent rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <div className="text-sm font-semibold">Certificados</div>
                <div className="text-xs text-muted-foreground">Profissionais</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-pink-accent rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="h-8 w-8 text-primary" fill="currentColor" />
                </div>
                <div className="text-sm font-semibold">Com Amor</div>
                <div className="text-xs text-muted-foreground">Sempre</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-pink-accent rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <div className="text-sm font-semibold">Clientes</div>
                <div className="text-xs text-muted-foreground">Satisfeitos</div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardContent className="p-6">
                <h4 className="text-xl font-bold font-heading mb-4 flex items-center">
                  <Clock className="h-5 w-5 text-primary mr-2" />
                  Horários de Funcionamento
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Segunda - Sexta</span>
                    <span className="font-semibold">9:00 - 19:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sábados</span>
                    <span className="font-semibold">9:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Domingos</span>
                    <span className="font-semibold text-muted-foreground">Fechado</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-card">
              <CardContent className="p-6">
                <h4 className="text-xl font-bold font-heading mb-4">Informações de Contato</h4>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <div className="font-semibold">Endereço</div>
                      <div className="text-sm text-muted-foreground">
                        Rua das Flores, 1234<br />
                        Vila Madalena, São Paulo - SP
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-semibold">Telefone</div>
                      <div className="text-sm text-muted-foreground">
                        <a 
                          href="https://wa.me/5555581326811" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:text-primary transition-colors"
                        >
                          (55) 55 8132-6811
                        </a>
                      </div>
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
                <h4 className="text-xl font-bold mb-2">Precisa de ajuda?</h4>
                <p className="text-sm opacity-90 mb-4">
                  Estamos aqui para responder todas suas dúvidas sobre o cuidado do seu pet.
                </p>
                <div className="text-lg font-bold">
                  <a 
                    href="https://wa.me/5555581326811" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                  >
                    WhatsApp: (55) 55 8132-6811
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;