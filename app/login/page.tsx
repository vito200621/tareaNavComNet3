import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center p-4">
      {/* Tarjeta con sombra suave y bordes redondeados exactos */}
      <div className="w-full max-w-[420px] bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        
        {/* Título y Subtítulo */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-900 tracking-tight mb-2">
            GymRoutines
          </h1>
          <p className="text-gray-500 text-sm font-normal">
            Inicia sesión para ver tus rutinas
          </p>
        </div>

        {/* Formulario */}
        <form className="space-y-5" noValidate>
          
          {/* Campo Correo */}
          <div>
            <label className="block text-xs font-bold text-gray-900 mb-2">
              Correo
            </label>
            <input
              type="email"
              placeholder="tu@correo.com"
              className="w-full px-3.5 py-2.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400"
              required
            />
          </div>

          {/* Campo Contraseña */}
          <div>
            <label className="block text-xs font-bold text-gray-900 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="****"
              className="w-full px-3.5 py-2.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400"
              required
            />
          </div>

          {/* Botón Principal (Primary DaisyUI Color) */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-[#4f46e5] hover:bg-[#4338ca] text-white font-medium text-sm rounded-lg transition-colors duration-150 shadow-sm mt-2"
          >
            Iniciar sesión
          </button>

          {/* Enlace de Registro */}
          <div className="text-center pt-2">
            <p className="text-sm text-gray-900">
              ¿No tienes cuenta?{' '}
              <Link href="/register" className="text-[#4f46e5] underline font-normal hover:text-[#4338ca]">
                Regístrate
              </Link>
            </p>
          </div>

        </form>
      </div>
    </div>
  )
}