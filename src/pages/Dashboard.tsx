import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import BookingForm from '@/components/BookingForm';
import UserBookings from '@/components/UserBookings';
import Footer from '@/components/Footer';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Bem-vindo, {user?.user_metadata?.display_name || user?.email?.split('@')[0]}! 🐾
            </h1>
            <p className="text-muted-foreground">
              Gerencie suas reservas e agende novos serviços para seu pet
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <BookingForm />
            </div>
            <div>
              <UserBookings />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;