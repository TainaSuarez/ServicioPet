import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface BookingData {
  serviceId: string;
  serviceName: string;
  servicePrice: number;
  serviceDuration: string;
  bookingDate: string;
  bookingTime: string;
  petName: string;
  petBreed?: string;
  petSize?: string;
  petAge?: string;
  petNotes?: string;
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { 
      status: 200, 
      headers: corsHeaders 
    });
  }

  try {
    const bookingData: BookingData = await req.json();

    console.log("Received booking data:", bookingData);

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Save booking to database
    const { data: booking, error: dbError } = await supabase
      .from('bookings')
      .insert({
        service_id: bookingData.serviceId,
        service_name: bookingData.serviceName,
        service_price: bookingData.servicePrice,
        service_duration: bookingData.serviceDuration,
        booking_date: bookingData.bookingDate,
        booking_time: bookingData.bookingTime,
        pet_name: bookingData.petName,
        pet_breed: bookingData.petBreed,
        pet_size: bookingData.petSize,
        pet_age: bookingData.petAge,
        pet_notes: bookingData.petNotes,
        owner_name: bookingData.ownerName,
        owner_phone: bookingData.ownerPhone,
        owner_email: bookingData.ownerEmail,
        status: 'pending'
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      throw dbError;
    }

    console.log("Booking saved to database:", booking);

    // Send confirmation email if email is provided
    if (bookingData.ownerEmail) {
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background: linear-gradient(135deg, #ec4899, #f97316); padding: 30px; border-radius: 15px; text-align: center; margin-bottom: 30px;">
            <h1 style="color: white; margin: 0; font-size: 28px;">🐾 Patinhas Pet Pamper</h1>
            <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Confirmação de Agendamento</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h2 style="color: #1f2937; margin-bottom: 20px;">Olá ${bookingData.ownerName}! 👋</h2>
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
              Recebemos seu agendamento para o <strong>${bookingData.petName}</strong> e estamos muito animados para cuidar do seu pet!
            </p>
            
            <div style="background: #fef3f2; border-left: 4px solid #ec4899; padding: 20px; margin: 25px 0; border-radius: 8px;">
              <h3 style="color: #dc2626; margin: 0 0 15px 0;">📅 Detalhes do Agendamento</h3>
              <div style="color: #374151;">
                <p style="margin: 8px 0;"><strong>Serviço:</strong> ${bookingData.serviceName}</p>
                <p style="margin: 8px 0;"><strong>Data:</strong> ${new Date(bookingData.bookingDate).toLocaleDateString('pt-BR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</p>
                <p style="margin: 8px 0;"><strong>Horário:</strong> ${bookingData.bookingTime}</p>
                <p style="margin: 8px 0;"><strong>Duração:</strong> ${bookingData.serviceDuration}</p>
                <p style="margin: 8px 0;"><strong>Valor:</strong> R$ ${bookingData.servicePrice},00</p>
              </div>
            </div>
            
            <div style="background: #f0f9ff; border-left: 4px solid #3b82f6; padding: 20px; margin: 25px 0; border-radius: 8px;">
              <h3 style="color: #1d4ed8; margin: 0 0 15px 0;">🐕 Informações do Pet</h3>
              <div style="color: #374151;">
                <p style="margin: 8px 0;"><strong>Nome:</strong> ${bookingData.petName}</p>
                ${bookingData.petBreed ? `<p style="margin: 8px 0;"><strong>Raça:</strong> ${bookingData.petBreed}</p>` : ''}
                ${bookingData.petSize ? `<p style="margin: 8px 0;"><strong>Tamanho:</strong> ${bookingData.petSize}</p>` : ''}
                ${bookingData.petAge ? `<p style="margin: 8px 0;"><strong>Idade:</strong> ${bookingData.petAge}</p>` : ''}
                ${bookingData.petNotes ? `<p style="margin: 8px 0;"><strong>Observações:</strong> ${bookingData.petNotes}</p>` : ''}
              </div>
            </div>
            
            <div style="border-top: 2px solid #e5e7eb; padding-top: 25px; margin-top: 30px;">
              <h3 style="color: #374151; margin-bottom: 15px;">📞 Próximos Passos</h3>
              <p style="color: #4b5563; line-height: 1.6;">
                Entraremos em contato via WhatsApp no número <strong>${bookingData.ownerPhone}</strong> para confirmar todos os detalhes do agendamento.
              </p>
              <p style="color: #4b5563; line-height: 1.6;">
                Se precisar fazer alguma alteração ou tiver dúvidas, entre em contato conosco pelo WhatsApp: <strong>(55) 55 8132-6811</strong>
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 25px; border-top: 2px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 14px; margin: 0;">
                Obrigado por confiar no Patinhas Pet Pamper! 🐾❤️
              </p>
            </div>
          </div>
        </div>
      `;

      const emailResponse = await resend.emails.send({
        from: "Patinhas Pet Pamper <onboarding@resend.dev>",
        to: [bookingData.ownerEmail],
        subject: `🐾 Agendamento Confirmado para ${bookingData.petName}!`,
        html: emailHtml,
      });

      console.log("Email sent successfully:", emailResponse);
    }

    return new Response(JSON.stringify({ 
      success: true, 
      booking: booking,
      message: "Agendamento salvo e email enviado com sucesso!" 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-booking-confirmation function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);