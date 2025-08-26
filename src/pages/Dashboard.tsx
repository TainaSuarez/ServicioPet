import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import BookingForm from '@/components/BookingForm';
import UserBookings from '@/components/UserBookings';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  Clock, 
  DollarSign, 
  Heart, 
  PawPrint, 
  Plus, 
  List, 
  User,
  TrendingUp,
  CheckCircle,
  AlertCircle
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
  const [loading, setLoading] = useState(true);

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
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color, subtitle }: {
    title: string;
    value: string | number;
    icon: any;
    color: string;
    subtitle?: string;
  }) => (
    <Card className="bg-gradient-to-br from-white to-pink-50 border-0 shadow-soft hover:shadow-card transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
            {subtitle && (
              <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
            )}
          </div>
          <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-soft/30 via-background to-pink-accent/20">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary to-pink-deep text-white px-6 py-3 rounded-full mb-4">
              <PawPrint className="h-5 w-5" />
              <span className="font-semibold">Dashboard do Pet</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-3">
              Bem-vindo, {user?.user_metadata?.display_name || user?.email?.split('@')[0]}! 🐾
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Gerencie suas reservas e agende novos serviços para seu pet com facilidade
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatCard
              title="Total de Reservas"
              value={stats.totalBookings}
              icon={Calendar}
              color="bg-gradient-to-br from-blue-500 to-blue-600"
              subtitle="Todas as reservas"
            />
            <StatCard
              title="Reservas Pendentes"
              value={stats.pendingBookings}
              icon={Clock}
              color="bg-gradient-to-br from-yellow-500 to-yellow-600"
              subtitle="Aguardando confirmação"
            />
            <StatCard
              title="Serviços Concluídos"
              value={stats.completedBookings}
              icon={CheckCircle}
              color="bg-gradient-to-br from-green-500 to-green-600"
              subtitle="Serviços realizados"
            />
            <StatCard
              title="Total Investido"
              value={`R$ ${stats.totalSpent.toFixed(2)}`}
              icon={DollarSign}
              color="bg-gradient-to-br from-primary to-pink-deep"
              subtitle="Valor total gasto"
            />
          </div>

          {/* Quick Actions */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Ações Rápidas</h2>
              <Badge variant="secondary" className="text-primary">
                <TrendingUp className="h-4 w-4 mr-1" />
                Atualizado agora
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                variant="outline" 
                className="h-20 flex flex-col items-center justify-center space-y-2 border-2 border-dashed border-primary/30 hover:border-primary hover:bg-primary/5 transition-all duration-300"
                onClick={() => document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Plus className="h-6 w-6 text-primary" />
                <span className="font-semibold">Nova Reserva</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex flex-col items-center justify-center space-y-2 border-2 border-dashed border-primary/30 hover:border-primary hover:bg-primary/5 transition-all duration-300"
                onClick={() => document.getElementById('bookings-list')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <List className="h-6 w-6 text-primary" />
                <span className="font-semibold">Ver Reservas</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex flex-col items-center justify-center space-y-2 border-2 border-dashed border-primary/30 hover:border-primary hover:bg-primary/5 transition-all duration-300"
              >
                <User className="h-6 w-6 text-primary" />
                <span className="font-semibold">Meu Perfil</span>
              </Button>
            </div>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="booking" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 bg-white shadow-soft rounded-xl p-1">
              <TabsTrigger 
                value="booking" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-pink-deep data-[state=active]:text-white rounded-lg transition-all duration-300"
              >
                <Plus className="h-4 w-4 mr-2" />
                Nova Reserva
              </TabsTrigger>
              <TabsTrigger 
                value="bookings" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-pink-deep data-[state=active]:text-white rounded-lg transition-all duration-300"
              >
                <List className="h-4 w-4 mr-2" />
                Minhas Reservas
              </TabsTrigger>
            </TabsList>

            <TabsContent value="booking" className="space-y-6">
              <div className="bg-white rounded-2xl shadow-soft border border-pink-soft/50 overflow-hidden">
                <div className="bg-gradient-to-r from-primary to-pink-deep p-6 text-white">
                  <h3 className="text-xl font-bold flex items-center">
                    <Heart className="h-5 w-5 mr-2" />
                    Agendar Novo Serviço
                  </h3>
                  <p className="text-pink-100 mt-1">
                    Escolha o serviço ideal para seu pet e agende no horário que preferir
                  </p>
                </div>
                <div id="booking-form" className="p-6">
                  <BookingForm />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="bookings" className="space-y-6">
              <div className="bg-white rounded-2xl shadow-soft border border-pink-soft/50 overflow-hidden">
                <div className="bg-gradient-to-r from-primary to-pink-deep p-6 text-white">
                  <h3 className="text-xl font-bold flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Histórico de Reservas
                  </h3>
                  <p className="text-pink-100 mt-1">
                    Acompanhe todas as suas reservas e gerencie seus agendamentos
                  </p>
                </div>
                <div id="bookings-list" className="p-6">
                  <UserBookings />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Tips Section */}
          <div className="mt-12">
            <Card className="bg-gradient-to-r from-pink-soft/50 to-pink-accent/30 border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <AlertCircle className="h-5 w-5 mr-2 text-primary" />
                  Dicas para um Pet Feliz
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground">Agende com antecedência para garantir o horário desejado</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground">Mantenha seu pet hidratado antes do banho</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground">Informe sobre qualquer condição especial do seu pet</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;