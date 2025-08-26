# 🐾 Patinhas Pet Pamper

Sistema de agendamento para pet shop desarrollado con React, TypeScript y Supabase.


**Accede al sistema:** [https://servicio-pet.vercel.app/](https://servicio-pet.vercel.app/)

## 📋 Descripción

Patinhas Pet Pamper es una aplicación web que permite a los propietarios de mascotas agendar servicios de banho, tosa y spa para sus animales de estimación. El sistema incluye autenticación de usuarios, gestión de reservas y un dashboard personalizado.

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18.3.1** - Biblioteca de interfaz de usuario
- **TypeScript 5.8.3** - Tipado estático
- **Vite 5.4.19** - Herramienta de construcción
- **React Router Dom 6.30.1** - Enrutamiento

### UI/UX
- **Tailwind CSS 3.4.17** - Framework CSS
- **shadcn/ui** - Componentes de React
- **Radix UI** - Primitivos de interfaz
- **Lucide React 0.462.0** - Iconos

### Backend
- **Supabase 2.56.0** - Backend-as-a-Service
  - Autenticación de usuarios
  - Base de datos PostgreSQL
  - Row Level Security (RLS)

### Formularios y Validación
- **React Hook Form 7.61.1** - Gestión de formularios
- **Zod 3.25.76** - Validación de esquemas
- **@hookform/resolvers 3.10.0** - Integración

### Estado
- **TanStack Query 5.83.0** - Gestión de estado del servidor

## 🚀 Instalación

### Prerrequisitos
- Node.js 18 o superior
- npm o yarn
- Cuenta en Supabase

### 1. Clonar el repositorio
```bash
git clone https://github.com/TainaSuarez/ServicioPet.git
cd ServicioPet
```

### 2. Instalar dependencias
```bash
npm install
```




## 📁 Estructura del Proyecto

```
src/
├── components/           # Componentes reutilizables
│   ├── ui/              # Componentes base (shadcn/ui)
│   ├── Header.tsx       # Encabezado de navegación
│   ├── Hero.tsx         # Sección principal
│   ├── Services.tsx     # Lista de servicios
│   ├── About.tsx        # Información sobre la empresa
│   ├── Footer.tsx       # Pie de página
│   ├── BookingForm.tsx  # Formulario de reserva
│   ├── UserBookings.tsx # Gestión de reservas
│   └── PrivateRoute.tsx # Protección de rutas
├── contexts/            # Contextos de React
│   └── AuthContext.tsx  # Contexto de autenticación
├── hooks/               # Hooks personalizados
│   ├── use-mobile.tsx   # Detección de dispositivo móvil
│   └── use-toast.ts     # Notificaciones
├── integrations/        # Integraciones externas
│   └── supabase/        # Configuración de Supabase
├── lib/                 # Utilidades
│   └── utils.ts         # Funciones auxiliares
├── pages/               # Páginas de la aplicación
│   ├── Index.tsx        # Página principal
│   ├── Auth.tsx         # Autenticación
│   ├── Dashboard.tsx    # Panel de control
│   └── NotFound.tsx     # Página 404
└── assets/              # Recursos estáticos
    ├── hero-pets.jpg    # Imagen principal
    └── services-illustration.jpg
```

## 🔐 Funcionalidades

### Página Principal
- **Sección Hero** - Presentación del servicio
- **Servicios** - Catálogo de servicios disponibles
- **Sobre Nosotros** - Información de la empresa
- **Contacto** - Datos de contacto

### Sistema de Autenticación
- Registro de nuevos usuarios
- Inicio de sesión con email y contraseña
- Confirmación por email
- Cerrar sesión

### Dashboard de Usuario
- **Nueva Reserva** - Formulario para agendar servicios
- **Mis Reservas** - Visualización de reservas activas
- **Cancelar Reservas** - Gestión de reservas existentes

### Servicios Disponibles
- 🛁 **Banho Básico** - R$ 45,00 (45 min)
- ✨ **Banho Premium** - R$ 75,00 (60 min)
- ✂️ **Tosa** - R$ 65,00 (75 min)
- 💅 **Pacote Completo** - R$ 120,00 (120 min)
- 🧴 **Spa Relaxante** - R$ 150,00 (150 min)
- ⚡ **Express** - R$ 35,00 (30 min)
