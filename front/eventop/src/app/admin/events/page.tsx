import Search from "../../../components/Search";
import SideBar from "@/components/SideBar";
import GestionEventos from "@/views/GestionEventos/GestionEventos";

const EventsPage = () => {
    return (
      <section className="flex flex-col gap-2 bg-gray-900">
        <h1 className="text-3xl font-semibold">Gestión de Eventos</h1>
        <SideBar/>
      <div>
        <Search/>
      </div>
      <GestionEventos/>
      </section>
    );
  }
  
  export default EventsPage;