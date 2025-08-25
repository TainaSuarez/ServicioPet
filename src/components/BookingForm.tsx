import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, PawPrint, Clock, DollarSign } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const BookingForm = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [petInfo, setPetInfo] = useState({
    name: "",
    breed: "",
    size: "",
    age: "",
    notes: ""
  });
  const [ownerInfo, setOwnerInfo] = useState({
    name: "",
    phone: "",
    email: ""
  });

  const { toast } = useToast();

  const services = [
    { id: "basic-bath", name: "Banho Básico", price: 45, duration: "45 min" },
    { id: "premium-bath", name: "Banho Premium", price: 75, duration: "60 min" },
    { id: "haircut", name: "Tosa", price: 65, duration: "75 min" },
    { id: "complete", name: "Pacote Completo", price: 120, duration: "120 min" },
    { id: "spa", name: "Spa Relaxante", price: 150, duration: "150 min" },
    { id: "express", name: "Express", price: 35, duration: "30 min" }
  ];

  const timeSlots = [
    "09:00", "10:00", "11:00", "12:00", 
    "14:00", "15:00", "16:00", "17:00", "18:00"
  ];

  const sizes = ["Pequeno (até 10kg)", "Médio (10-25kg)", "Grande (25kg+)"];

  const selectedServiceData = services.find(s => s.id === selectedService);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedService || !selectedTime || !petInfo.name || !ownerInfo.name || !ownerInfo.phone) {
      toast({
        title: "Dados incompletos",
        description: "Por favor preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    try {
      toast({
        title: "Processando agendamento...",
        description: "Salvando seus dados e enviando confirmação por email.",
      });

      // Preparar dados para envio
      const bookingData = {
        serviceId: selectedService,
        serviceName: selectedServiceData?.name || "",
        servicePrice: selectedServiceData?.price || 0,
        serviceDuration: selectedServiceData?.duration || "",
        bookingDate: format(selectedDate, "yyyy-MM-dd"),
        bookingTime: selectedTime,
        petName: petInfo.name,
        petBreed: petInfo.breed || null,
        petSize: petInfo.size || null,
        petAge: petInfo.age || null,
        petNotes: petInfo.notes || null,
        ownerName: ownerInfo.name,
        ownerPhone: ownerInfo.phone,
        ownerEmail: ownerInfo.email || null,
      };

      // Chamar edge function para salvar no banco e enviar email
      const { data, error } = await supabase.functions.invoke('send-booking-confirmation', {
        body: bookingData
      });

      if (error) throw error;

      toast({
        title: "Agendamento confirmado! 🐾",
        description: ownerInfo.email 
          ? "Salvamos seu agendamento e enviamos a confirmação por email!" 
          : "Agendamento salvo! Entraremos em contato via WhatsApp.",
      });

      // Criar mensagem para WhatsApp (opcional, para backup)
      const whatsappMessage = `Olá! Confirmando meu agendamento:

🐾 *DADOS DA RESERVA*
• Serviço: ${selectedServiceData?.name}
• Data: ${format(selectedDate, "PPPP", { locale: es })}
• Horário: ${selectedTime}
• Duração: ${selectedServiceData?.duration}
• Valor: R$ ${selectedServiceData?.price}

👤 *DADOS DO DONO*
• Nome: ${ownerInfo.name}
• Telefone: ${ownerInfo.phone}
${ownerInfo.email ? `• Email: ${ownerInfo.email}` : ''}

🐕 *DADOS DO PET*
• Nome: ${petInfo.name}
${petInfo.breed ? `• Raça: ${petInfo.breed}` : ''}
${petInfo.size ? `• Tamanho: ${petInfo.size}` : ''}
${petInfo.age ? `• Idade: ${petInfo.age}` : ''}
${petInfo.notes ? `• Observações: ${petInfo.notes}` : ''}

Agendamento confirmado! 🐾`;

      // Abrir WhatsApp como backup
      const whatsappUrl = `https://wa.me/5555815326811?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, '_blank');

      // Reset form
      setSelectedDate(undefined);
      setSelectedService("");
      setSelectedTime("");
      setPetInfo({ name: "", breed: "", size: "", age: "", notes: "" });
      setOwnerInfo({ name: "", phone: "", email: "" });

    } catch (error: any) {
      console.error("Erro ao processar agendamento:", error);
      toast({
        title: "Erro ao processar agendamento",
        description: "Ocorreu um erro. Tente novamente ou entre em contato via WhatsApp.",
        variant: "destructive"
      });
    }
  };

  return (
    <section id="reservar" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="secondary" className="text-primary">
            Agendar Horário
          </Badge>
          <h2 className="text-4xl font-bold font-heading text-foreground">
            Agende seu Horário
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Preencha o formulário e selecione sua data preferida para dar 
            ao seu pet o melhor cuidado.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Pet Information */}
              <Card className="bg-gradient-card border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <PawPrint className="h-5 w-5 text-primary" />
                    <span>Informações do seu Pet</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="petName">Nome do pet *</Label>
                    <Input
                      id="petName"
                      value={petInfo.name}
                      onChange={(e) => setPetInfo({ ...petInfo, name: e.target.value })}
                      placeholder="Ex: Max"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="breed">Raça</Label>
                    <Input
                      id="breed"
                      value={petInfo.breed}
                      onChange={(e) => setPetInfo({ ...petInfo, breed: e.target.value })}
                      placeholder="Ex: Golden Retriever"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="size">Tamanho</Label>
                      <Select value={petInfo.size} onValueChange={(value) => setPetInfo({ ...petInfo, size: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecionar" />
                        </SelectTrigger>
                        <SelectContent>
                          {sizes.map((size) => (
                            <SelectItem key={size} value={size}>{size}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="age">Idade</Label>
                      <Input
                        id="age"
                        value={petInfo.age}
                        onChange={(e) => setPetInfo({ ...petInfo, age: e.target.value })}
                        placeholder="2 anos"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Observações especiais</Label>
                    <Textarea
                      id="notes"
                      value={petInfo.notes}
                      onChange={(e) => setPetInfo({ ...petInfo, notes: e.target.value })}
                      placeholder="Comportamento, alergias, preferências..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Owner Information */}
              <Card className="bg-gradient-card border-0 shadow-card">
                <CardHeader>
                  <CardTitle>Informações de Contato</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="ownerName">Seu nome *</Label>
                    <Input
                      id="ownerName"
                      value={ownerInfo.name}
                      onChange={(e) => setOwnerInfo({ ...ownerInfo, name: e.target.value })}
                      placeholder="Nome completo"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone *</Label>
                    <Input
                      id="phone"
                      value={ownerInfo.phone}
                      onChange={(e) => setOwnerInfo({ ...ownerInfo, phone: e.target.value })}
                      placeholder="(55) 55 8132-6811"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={ownerInfo.email}
                      onChange={(e) => setOwnerInfo({ ...ownerInfo, email: e.target.value })}
                      placeholder="exemplo@email.com"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Service Selection */}
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader>
                <CardTitle>Selecione seu Serviço</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className={cn(
                        "p-4 rounded-lg border cursor-pointer transition-all duration-300 hover:shadow-soft",
                        selectedService === service.id
                          ? "border-primary bg-pink-accent"
                          : "border-border hover:border-primary/50"
                      )}
                      onClick={() => setSelectedService(service.id)}
                    >
                      <div className="space-y-2">
                        <h4 className="font-semibold">{service.name}</h4>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{service.duration}</span>
                          </div>
                          <div className="flex items-center space-x-1 font-bold text-primary">
                            <span>R$ {service.price}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Date and Time Selection */}
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="bg-gradient-card border-0 shadow-card">
                <CardHeader>
                  <CardTitle>Selecione a Data</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date() || date.getDay() === 0}
                    className="rounded-md border-0 pointer-events-auto"
                    locale={es}
                  />
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-0 shadow-card">
                <CardHeader>
                  <CardTitle>Horários Disponíveis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-3">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        type="button"
                        variant={selectedTime === time ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTime(time)}
                        className={selectedTime === time ? "bg-gradient-button" : ""}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                  
                  {selectedDate && selectedService && selectedTime && (
                    <div className="mt-6 p-4 bg-pink-accent rounded-lg">
                      <h4 className="font-semibold mb-2">Resumo do seu Agendamento:</h4>
                      <div className="space-y-1 text-sm">
                        <div>Serviço: {selectedServiceData?.name}</div>
                        <div>Data: {format(selectedDate, "PPPP", { locale: es })}</div>
                        <div>Horário: {selectedTime}</div>
                        <div>Duração: {selectedServiceData?.duration}</div>
                        <div className="font-bold text-primary">Total: R$ {selectedServiceData?.price}</div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Button 
                type="submit" 
                size="lg"
                className="bg-gradient-button hover:opacity-90 transition-opacity shadow-soft px-12"
              >
                Confirmar Agendamento
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;