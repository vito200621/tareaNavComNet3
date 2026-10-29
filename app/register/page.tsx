import Link from 'next/link'

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center p-4">
      <div className="w-full max-w-[420px] bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-900 tracking-tight mb-2">
            Crea tu cuenta
          </h1>
        </div>

        <form className="space-y-4" noValidate>
          
          <div>
            <label className="block text-xs font-bold text-gray-900 mb-1.5">
              Nombre
            </label>
            <input
              type="text"
              placeholder="Ana Pérez"
              className="w-full px-3.5 py-2.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-900 mb-1.5">
              Correo
            </label>
            <input
              type="email"
              placeholder="ana@correo.com"
              className="w-full px-3.5 py-2.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-900 mb-1.5">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="****"
              className="w-full px-3.5 py-2.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-900 mb-1.5">
              Confirmar contraseña
            </label>
            <input
              type="password"
              placeholder="****"
              className="w-full px-3.5 py-2.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-[#4f46e5] hover:bg-[#4338ca] text-white font-medium text-sm rounded-lg transition-colors duration-150 shadow-sm mt-3"
          >
            Crear cuenta
          </button>

          <div className="text-center pt-2">
            <p className="text-sm text-gray-900">
              ¿Ya tienes cuenta?{' '}
              <Link href="/login" className="text-[#4f46e5] underline font-normal hover:text-[#4338ca]">
                Inicia sesión
              </Link>
            </p>
          </div>

        </form>
      </div>
    </div>
  )
}