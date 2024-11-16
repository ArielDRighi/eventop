

import CreateEvent from '@/components/CreateEvent'
import SideBar from '@/components/SideBar'
import React from 'react'

export const page = () => {
  return (
    <section className="flex flex-col gap-2">
        <SideBar/>
      <div>
        <CreateEvent/>
      </div>
      </section>
  )
}

export default page
