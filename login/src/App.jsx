import { useForm } from "react-hook-form";
import { login } from "./api";
import { Toaster, toast } from "sonner";


export default function App() {
    
  const { register, handleSubmit } = useForm();
  
  async function submit(data) {
    console.log('datos a usar', data.email, data.password)
    try {
      const token = await login({ email: data.email, password: data.password });
      localStorage.setItem("token", token);
      toast.success("Login successful");
    } catch (error) {
      toast.error("Login failed:", error.message);
    }
  }

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <Toaster position="top-right" />
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
            Inicia sesión en tu cuenta
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            O{" "}
            <a
              className="font-medium text-primary hover:text-primary/80"
              href="#"
              rel="ugc"
            >
              regístrate
            </a>
          </p>
        </div>
        <form className="space-y-6" action="#" onSubmit={handleSubmit(submit)}>
          <div>
            <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block text-sm font-medium text-muted-foreground">
              Correo electrónico
            </label>
            <div className="mt-1">
              <input
                className="h-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                {...register("email", {
                  required: { value: true, message: "Campo requerido" },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Correo inválido",
                  },
                })}
              />
            </div>
          </div>
          <div>
            <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block text-sm font-medium text-muted-foreground">
              Contraseña
            </label>
            <div className="mt-1">
              <input
                className="h-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                {...register("password", {
                  required: { value: true, message: "Campo requerido" },
                })}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                className="flex border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                id="remember-me"
                type="checkbox"
                name="remember-me"
              />
              <label className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ml-2 block text-sm text-muted-foreground">
                Recuérdame
              </label>
            </div>
            <div className="text-sm">
              <a
                className="font-medium text-primary hover:text-primary/80"
                href="#"
                rel="ugc"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>
          <div>
            <button
              className="items-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 flex w-full justify-center rounded-md bg-primary py-2 px-4 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              type="submit"
            >
              Iniciar sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}