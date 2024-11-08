
import Link from 'next/link'
import React from 'react'

export const Navbar = () => {
  return (
    <nav className='flex justify-between items-center w-full lg:max-w-6xl mx-auto py-4 md:py-8 '>
        <div>
            <h3 className='text-3xl'>Even<span className='font-bold'>Top</span></h3>
        </div>
        <div className='w-2/3 mx-auto'>
            <ul className='flex flex-row text-md gap-4'>
                <li className='cursor-pointer  hover:border-b-blue-500 hover:border-b'>Incio</li>
                <li className='cursor-pointer  hover:border-b-blue-500 hover:border-b'>Econtra Eventos</li>
                <li className='cursor-pointer  hover:border-b-blue-500 hover:border-b'>Centro de ayuda</li>
                <a href="/api/auth/login">Login</a>
            </ul>
        </div>
        <div className='flex flex-row items-center gap-2'>
            <Link href={"/micuenta"} className='py-2 sm:py-3 px-4 rounded-lg bg-slate-50 border border-blue-600 text-blue-500 hover:bg-blue-600 hover:text-slate-50 transition ease-in-out font-bold text-sm'>
            Mi Cuenta</Link>
        </div>
    </nav>
  )
}
