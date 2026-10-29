import Link from 'next/link'

export default function RoutinesPage() {
  return (
    <div className="min-h-screen bg-[#f3f4f6]">
      {/* Header superior */}
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-gray-900">GymRoutines</span>
        </div>

        {/* Avatar de usuario con dropdown estilo DaisyUI */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="w-9 h-9 rounded-full bg-[#4f46e5] text-white flex items-center justify-center font-semibold text-sm cursor-pointer">
            AP
          </div>
          <ul tabIndex={0} className="dropdown-content menu z-10 p-2 shadow-lg bg-white rounded-box w-44 border border-gray-100 mt-2">
            <li><a className="text-gray-700 hover:bg-gray-100">Mi perfil</a></li>
            <li><Link href="/login" className="text-gray-700 hover:bg-gray-100">Cerrar sesión</Link></li>
          </ul>
        </div>
      </header>

      {/* Navegación horizontal */}
      <nav className="bg-white border-b border-gray-200 px-6">
        <ul className="flex gap-6 text-sm font-medium">
          <li className="py-3 border-b-2 border-[#4f46e5] text-[#4f46e5]">
            <a href="#">Rutinas</a>
          </li>
          <li className="py-3 text-gray-500 hover:text-gray-900 transition-colors">
            <a href="#">Ejercicios</a>
          </li>
          <li className="py-3 text-gray-500 hover:text-gray-900 transition-colors">
            <a href="#">Progreso</a>
          </li>
        </ul>
      </nav>

      {/* Contenido principal en Grid */}
      <main className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto">
        
        {/* Tarjeta 1 */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-base font-bold text-gray-900 mb-1">Pierna pesada</h3>
          <p className="text-sm text-gray-500 mb-4">Sentadilla, peso muerto y zancadas</p>
          <span className="inline-block px-2.5 py-0.5 text-xs font-semibold text-indigo-600 border border-indigo-200 rounded-full bg-indigo-50">
            Fuerza
          </span>
        </div>

        {/* Tarjeta 2 */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-base font-bold text-gray-900 mb-1">Torso y brazos</h3>
          <p className="text-sm text-gray-500 mb-4">Press banca, remo y dominadas</p>
          <span className="inline-block px-2.5 py-0.5 text-xs font-semibold text-pink-600 border border-pink-200 rounded-full bg-pink-50">
            Hipertrofia
          </span>
        </div>

        {/* Tarjeta 3 */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-base font-bold text-gray-900 mb-1">Cardio suave</h3>
          <p className="text-sm text-gray-500 mb-4">Bicicleta y caminata inclinada</p>
          <span className="inline-block px-2.5 py-0.5 text-xs font-semibold text-emerald-600 border border-emerald-200 rounded-full bg-emerald-50">
            Resistencia
          </span>
        </div>

      </main>
    </div>
  )
}