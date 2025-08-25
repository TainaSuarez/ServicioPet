import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar, Clock, DollarSign, Dog, Trash2 } from 'lucide-react';

interface Booking {
  id: string;
  service_name: string;
  service_price: number;
  service_duration: string;
  booking_date: string;
  booking_time: string;
  status: string;
  pet_name: string;
  pet_breed?: string;
  pet_size?: string;
  pet_age?: string;
  pet_notes?: string;
  owner_name: string;
  owner_phone: string;
  owner_email?: string;
  created_at: string;
}

const UserBookings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_id', user.id)
        .order('booking_date', { ascending: true });

      if (error) {
        console.error('Error fetching bookings:', error);
        toast({
          title: "Erro ao carregar reservas",
          description: "Não foi possível carregar suas reservas",
          variant: "destructive"
        });
        return;
      }

      setBookings(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'cancelled' })
        .eq('id', bookingId)
        .eq('user_id', user?.id);

      if (error) {
        toast({
          title: "Erro ao cancelar",
          description: "Não foi possível cancelar a reserva",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Reserva cancelada",
        description: "Sua reserva foi cancelada com sucesso"
      });

      fetchBookings(); // Refresh the list
    } catch (error) {
      console.error('Error cancelling booking:', error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [user]);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: "Pendente", variant: "secondary" as const },
      confirmed: { label: "Confirmada", variant: "default" as const },
      cancelled: { label: "Cancelada", variant: "destructive" as const },
      completed: { label: "Concluída", variant: "outline" as const }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const upcomingBookings = bookings.filter(booking => 
    booking.status !== 'cancelled' && 
    new Date(`${booking.booking_date}T${booking.booking_time}`) >= new Date()
  );

  const pastBookings = bookings.filter(booking => 
    booking.status === 'cancelled' || 
    new Date(`${booking.booking_date}T${booking.booking_time}`) < new Date()
  );

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Suas Reservas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Carregando reservas...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Upcoming Bookings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Próximas Reservas
          </CardTitle>
          <CardDescription>
            Suas reservas agendadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          {upcomingBookings.length === 0 ? (
            <div className="text-center py-8">
              <Dog className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Nenhuma reserva agendada</p>
              <p className="text-sm text-muted-foreground">Agende um serviço para seu pet!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingBookings.map((booking) => (
                <Card key={booking.id} className="border-l-4 border-l-primary">
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{booking.service_name}</h4>
                          {getStatusBadge(booking.status)}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Dog className="h-4 w-4" />
                            <span>{booking.pet_name}</span>
                            {booking.pet_breed && <span>({booking.pet_breed})</span>}
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{format(new Date(booking.booking_date), "dd 'de' MMMM", { locale: es })}</span>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{booking.booking_time} ({booking.service_duration})</span>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            <span>R$ {booking.service_price}</span>
                          </div>
                        </div>

                        {booking.pet_notes && (
                          <p className="text-sm text-muted-foreground italic">
                            Obs: {booking.pet_notes}
                          </p>
                        )}
                      </div>

                      {booking.status === 'pending' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => cancelBooking(booking.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Past Bookings */}
      {pastBookings.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-muted-foreground">Histórico</CardTitle>
            <CardDescription>
              Reservas anteriores e canceladas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pastBookings.map((booking) => (
                <Card key={booking.id} className="border-muted">
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-muted-foreground">{booking.service_name}</span>
                          {getStatusBadge(booking.status)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {booking.pet_name} - {format(new Date(booking.booking_date), "dd/MM/yyyy", { locale: es })} às {booking.booking_time}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        R$ {booking.service_price}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserBookings;