import ListProjects from "./ListProjects";
import ModalNewProject from "./ModalNewProject";

export default function DashboardPage() {
  return (
    <div className="mt-8">
      <h1 className="text-2xl font-bold text-blue-800">My Projects</h1>
      <div className="mt-4">
        <ListProjects />
        <ModalNewProject />
      </div>
    </div>
  );
}
