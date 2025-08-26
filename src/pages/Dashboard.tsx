import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import BookingForm from '@/components/BookingForm';
import UserBookings from '@/components/UserBookings';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  Clock, 
  DollarSign, 
  CheckCircle,
  Plus, 
  List
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface DashboardStats {
  totalBookings: number;
  pendingBookings: number;
  completedBookings: number;
  totalSpent: number;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    totalSpent: 0
  });

  useEffect(() => {
    fetchDashboardStats();
  }, [user]);

  const fetchDashboardStats = async () => {
    if (!user) return;

    try {
      const { data: bookings, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching stats:', error);
        return;
      }

      const totalBookings = bookings?.length || 0;
      const pendingBookings = bookings?.filter(b => b.status === 'pending').length || 0;
      const completedBookings = bookings?.filter(b => b.status === 'completed').length || 0;
      const totalSpent = bookings?.reduce((sum, b) => sum + (b.service_price || 0), 0) || 0;

      setStats({
        totalBookings,
        pendingBookings,
        completedBookings,
        totalSpent
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color }: {
    title: string;
    value: string | number;
    icon: any;
    color: string;
  }) => (
    <Card className="border border-border/50 shadow-sm h-24">
      <CardContent className="p-6 h-full">
        <div className="flex items-center justify-between h-full">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-semibold text-foreground mt-1">{value}</p>
          </div>
          <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center flex-shrink-0`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-semibold text-foreground mb-2">
              Olá, {user?.user_metadata?.display_name || user?.email?.split('@')[0]}! 👋
            </h1>
            <p className="text-muted-foreground">
              Gerencie suas reservas e agende novos serviços
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total de Reservas"
              value={stats.totalBookings}
              icon={Calendar}
              color="bg-blue-500"
            />
            <StatCard
              title="Pendentes"
              value={stats.pendingBookings}
              icon={Clock}
              color="bg-yellow-500"
            />
            <StatCard
              title="Concluídas"
              value={stats.completedBookings}
              icon={CheckCircle}
              color="bg-green-500"
            />
            <StatCard
              title="Total Gasto"
              value={`R$ ${stats.totalSpent.toFixed(2)}`}
              icon={DollarSign}
              color="bg-primary"
            />
          </div>

          {/* Main Content */}
          <Tabs defaultValue="booking" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="booking" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Nova Reserva
              </TabsTrigger>
              <TabsTrigger value="bookings" className="flex items-center gap-2">
                <List className="h-4 w-4" />
                Minhas Reservas
              </TabsTrigger>
            </TabsList>

            <TabsContent value="booking">
              <Card>
                <CardHeader>
                  <CardTitle>Agendar Novo Serviço</CardTitle>
                </CardHeader>
                <CardContent>
                  <BookingForm />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bookings">
              <Card>
                <CardHeader>
                  <CardTitle>Minhas Reservas</CardTitle>
                </CardHeader>
                <CardContent>
                  <UserBookings />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;