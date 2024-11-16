import CreateEvent from "@/components/CreateEvent";
// import Search from "../../../components/Search";

const EventsPage = () => {
    return (
      <section className="flex flex-col gap-2">
        {/* <Search/> */}
      <div>
        <CreateEvent/>
      </div>
      <div>
        {/* <h1 className="text-3xl font-semibold">Gestión de Eventos</h1> */}
      </div>
      <GestionEventos/>
      </section>
    );
  }
  
  export default EventsPage;