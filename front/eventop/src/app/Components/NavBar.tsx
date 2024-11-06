import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex justify-start space-x-4">
        <li>
          <Link href="/admin/users" className="text-white hover:text-gray-400">
            Gestión de Usuarios
          </Link>
        </li>
        <li>
          <Link href="/admin/events" className="text-white hover:text-gray-400">
            Gestión de Eventos
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;