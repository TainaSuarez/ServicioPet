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
    { id: "basic-bath", name: "Baño Básico", price: 25, duration: "45 min" },
    { id: "premium-bath", name: "Baño Premium", price: 40, duration: "60 min" },
    { id: "haircut", name: "Corte de Pelo", price: 35, duration: "75 min" },
    { id: "complete", name: "Paquete Completo", price: 65, duration: "120 min" },
    { id: "spa", name: "Spa Relajante", price: 80, duration: "150 min" },
    { id: "express", name: "Express", price: 20, duration: "30 min" }
  ];

  const timeSlots = [
    "09:00", "10:00", "11:00", "12:00", 
    "14:00", "15:00", "16:00", "17:00", "18:00"
  ];

  const sizes = ["Pequeño (hasta 10kg)", "Mediano (10-25kg)", "Grande (25kg+)"];

  const selectedServiceData = services.find(s => s.id === selectedService);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedService || !selectedTime || !petInfo.name || !ownerInfo.name || !ownerInfo.phone) {
      toast({
        title: "Faltan datos",
        description: "Por favor completa todos los campos obligatorios.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "¡Reserva confirmada!",
      description: `Tu cita para ${petInfo.name} ha sido agendada para el ${format(selectedDate, "PPPP", { locale: es })} a las ${selectedTime}.`,
    });

    // Reset form
    setSelectedDate(undefined);
    setSelectedService("");
    setSelectedTime("");
    setPetInfo({ name: "", breed: "", size: "", age: "", notes: "" });
    setOwnerInfo({ name: "", phone: "", email: "" });
  };

  return (
    <section id="reservar" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="secondary" className="text-primary">
            Reservar Cita
          </Badge>
          <h2 className="text-4xl font-bold font-heading text-foreground">
            Agenda tu Cita
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Completa el formulario y selecciona tu fecha preferida para brindarle 
            a tu mascota el mejor cuidado.
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
                    <span>Información de tu Mascota</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="petName">Nombre de la mascota *</Label>
                    <Input
                      id="petName"
                      value={petInfo.name}
                      onChange={(e) => setPetInfo({ ...petInfo, name: e.target.value })}
                      placeholder="Ej: Max"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="breed">Raza</Label>
                    <Input
                      id="breed"
                      value={petInfo.breed}
                      onChange={(e) => setPetInfo({ ...petInfo, breed: e.target.value })}
                      placeholder="Ej: Golden Retriever"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="size">Tamaño</Label>
                      <Select value={petInfo.size} onValueChange={(value) => setPetInfo({ ...petInfo, size: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                        <SelectContent>
                          {sizes.map((size) => (
                            <SelectItem key={size} value={size}>{size}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="age">Edad</Label>
                      <Input
                        id="age"
                        value={petInfo.age}
                        onChange={(e) => setPetInfo({ ...petInfo, age: e.target.value })}
                        placeholder="2 años"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notas especiales</Label>
                    <Textarea
                      id="notes"
                      value={petInfo.notes}
                      onChange={(e) => setPetInfo({ ...petInfo, notes: e.target.value })}
                      placeholder="Comportamiento, alergias, preferencias..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Owner Information */}
              <Card className="bg-gradient-card border-0 shadow-card">
                <CardHeader>
                  <CardTitle>Información de Contacto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="ownerName">Tu nombre *</Label>
                    <Input
                      id="ownerName"
                      value={ownerInfo.name}
                      onChange={(e) => setOwnerInfo({ ...ownerInfo, name: e.target.value })}
                      placeholder="Nombre completo"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono *</Label>
                    <Input
                      id="phone"
                      value={ownerInfo.phone}
                      onChange={(e) => setOwnerInfo({ ...ownerInfo, phone: e.target.value })}
                      placeholder="(11) 1234-5678"
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
                      placeholder="ejemplo@correo.com"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Service Selection */}
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader>
                <CardTitle>Selecciona tu Servicio</CardTitle>
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
                            <DollarSign className="h-3 w-3" />
                            <span>{service.price}</span>
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
                  <CardTitle>Selecciona la Fecha</CardTitle>
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
                  <CardTitle>Horarios Disponibles</CardTitle>
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
                      <h4 className="font-semibold mb-2">Resumen de tu Reserva:</h4>
                      <div className="space-y-1 text-sm">
                        <div>Servicio: {selectedServiceData?.name}</div>
                        <div>Fecha: {format(selectedDate, "PPPP", { locale: es })}</div>
                        <div>Hora: {selectedTime}</div>
                        <div>Duración: {selectedServiceData?.duration}</div>
                        <div className="font-bold text-primary">Total: ${selectedServiceData?.price}</div>
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
                Confirmar Reserva
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;