
import CreateEvent from "@/components/CreateEvent";
import Search from "@/components/Search";



const EventsPage = () => {
    return (
      <div>
        <h1 className="text-3xl font-semibold">Gestión de Eventos</h1>
        <Search/>
        <CreateEvent/>
      </div>
    );
  }
  
  export default EventsPage;