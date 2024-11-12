import AdminTable from "../components/AdminTable";

const Admin = (props: {}) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Admin Panel</h2>
      <AdminTable />
    </div>
  );
};

export default Admin;
