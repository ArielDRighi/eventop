import SideBar from "../../components/SideBar";

const AdminPage = () => {
  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex flex-col flex-grow">
        <div className="p-6 justify-center text-center">
          <h1 className="text-3xl font-semibold">Panel de Administración</h1>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
