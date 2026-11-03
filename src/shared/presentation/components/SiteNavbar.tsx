'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/src/store/StoreProvider';
import { logoutUser } from '@/src/features/auth/presentation/state/actions';

export function SiteNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const authenticated = useAppSelector((state) => state.auth.status === 'authenticated');

  const links = authenticated
    ? [{ href: '/routines', label: 'Rutinas' }]
    : [
        { href: '/login', label: 'Iniciar sesión' },
        { href: '/register', label: 'Registrarse' },
      ];

  async function handleLogout() {
    try {
      await dispatch(logoutUser());
      router.push('/login');
    } catch {
      return;
    }
  }

  function linkClass(href: string) {
    return pathname === href ? 'menu-active' : '';
  }

  return (
    <header className="navbar sticky top-0 z-40 border-b border-base-300 bg-base-100 px-4 shadow-sm sm:px-6">
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost px-2 text-lg font-bold sm:text-xl">
          GymRoutines
        </Link>
      </div>

      <div className="navbar-end gap-2">
        <div className="dropdown dropdown-end md:hidden">
          <button type="button" tabIndex={0} aria-label="Abrir menú" aria-haspopup="menu" className="btn btn-ghost btn-square">
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <ul tabIndex={0} aria-label="Navegación móvil" className="menu dropdown-content z-50 mt-3 w-56 rounded-box bg-base-100 p-2 shadow-lg">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} aria-current={pathname === link.href ? 'page' : undefined} className={linkClass(link.href)}>
                  {link.label}
                </Link>
              </li>
            ))}
            {authenticated && <li><button type="button" onClick={() => void handleLogout()}>Cerrar sesión</button></li>}
          </ul>
        </div>

        <ul className="menu menu-horizontal hidden items-center gap-1 p-0 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} aria-current={pathname === link.href ? 'page' : undefined} className={linkClass(link.href)}>
                {link.label}
              </Link>
            </li>
          ))}
          {authenticated && <li><button type="button" onClick={() => void handleLogout()}>Cerrar sesión</button></li>}
        </ul>
      </div>
    </header>
  );
}
