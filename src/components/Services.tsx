import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Droplets, Scissors, Sparkles, Heart, Clock, Star } from "lucide-react";
import servicesImage from "@/assets/services-illustration.jpg";

const Services = () => {
  const services = [
    {
      icon: Droplets,
      name: "Banho Básico",
      description: "Banho com shampoo especial, secagem e escovação",
      price: "R$ 45",
      duration: "45 min",
      popular: false
    },
    {
      icon: Sparkles,
      name: "Banho Premium",
      description: "Banho, condicionador, perfume e tratamento hidratante",
      price: "R$ 75",
      duration: "60 min",
      popular: true
    },
    {
      icon: Scissors,
      name: "Tosa",
      description: "Tosa profissional de acordo com a raça e estilo desejado",
      price: "R$ 65",
      duration: "75 min",
      popular: false
    },
    {
      icon: Heart,
      name: "Pacote Completo",
      description: "Banho premium + tosa + limpeza de ouvidos + corte de unhas",
      price: "R$ 120",
      duration: "120 min",
      popular: true
    },
    {
      icon: Star,
      name: "Spa Relaxante",
      description: "Tratamento completo com massagem e aromaterapia",
      price: "R$ 150",
      duration: "150 min",
      popular: false
    },
    {
      icon: Sparkles,
      name: "Express",
      description: "Banho rápido e secagem para emergências",
      price: "R$ 35",
      duration: "30 min",
      popular: false
    }
  ];

  return (
    <section id="servicios" className="py-20 bg-pink-soft/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="secondary" className="text-primary">
            Nossos Serviços
          </Badge>
          <h2 className="text-4xl font-bold font-heading text-foreground">
            Serviços de Banho e Tosa Profissional
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Oferecemos uma ampla gama de serviços para manter seu pet 
            lindo, saudável e feliz.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card 
                key={index} 
                className={`relative bg-gradient-card border-0 shadow-card hover:shadow-float transition-all duration-300 hover:-translate-y-1 ${
                  service.popular ? 'ring-2 ring-primary' : ''
                }`}
              >
                {service.popular && (
                  <Badge className="absolute -top-2 left-4 bg-gradient-button">
                    Mais Popular
                  </Badge>
                )}
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-16 h-16 bg-pink-accent rounded-full flex items-center justify-center mb-4">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-heading">{service.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <p className="text-muted-foreground">{service.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{service.duration}</span>
                    </div>
                    <div className="text-2xl font-bold text-primary">{service.price}</div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="bg-card rounded-2xl p-8 shadow-card">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold font-heading text-foreground">
                Por que escolher Patinhas Pet Pamper?
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <Heart className="h-5 w-5 text-primary mt-1" fill="currentColor" />
                  <div>
                    <div className="font-semibold">Cuidado Personalizado</div>
                    <div className="text-muted-foreground text-sm">Adaptamos cada serviço às necessidades específicas do seu pet</div>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <Sparkles className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <div className="font-semibold">Produtos Premium</div>
                    <div className="text-muted-foreground text-sm">Utilizamos apenas produtos de alta qualidade, hipoalergênicos e seguros</div>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <Star className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <div className="font-semibold">Profissionais Certificados</div>
                    <div className="text-muted-foreground text-sm">Nossa equipe possui certificações em banho e tosa profissional</div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="relative">
              <img 
                src={servicesImage} 
                alt="Serviços de banho e tosa profissional" 
                className="w-full rounded-xl shadow-soft"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;