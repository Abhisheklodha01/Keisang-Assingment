import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

const InventoryDashboard = () => {
  const [inventoryData, setInventoryData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [filter, setFilter] = React.useState("");
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "https://keisang-assingment.onrender.com/api/inventory"
        );
        setInventoryData(data.inventory);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  // Calculate total values
  const totalMSRP = inventoryData
    ? inventoryData?.reduce((sum, item) => sum + item.price, 0)
    : 0;
  const totalInventory = inventoryData ? inventoryData.length : 0;
  console.log(inventoryData);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">
              Total Vehicles
            </h3>
            <p className="text-2xl font-bold mt-2">{totalInventory}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Total MSRP</h3>
            <p className="text-2xl font-bold mt-2">
              ${totalMSRP.toLocaleString()}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Avg. MSRP</h3>
            <p className="text-2xl font-bold mt-2">
              $
              {totalMSRP
                ? (totalMSRP / inventoryData.length)?.toLocaleString()
                : 0}
            </p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Inventory by Make</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={inventoryData.brand}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="vehicle_make" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="inventory_count" fill="#f97316" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">MSRP by Make</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={inventoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="vehicle_make" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="msrp" fill="#f97316" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Inventory Details</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-2 text-left font-semibold">Make</th>
                    <th className="px-4 py-2 text-left font-semibold">Type</th>
                    <th className="px-4 py-2 text-right font-semibold">MSRP</th>
                    <th className="px-4 py-2 text-right font-semibold">
                      Inventory
                    </th>
                    <th className="px-4 py-2 text-left font-semibold">
                      Date Added
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryData.map((item, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2">{item.product_type}</td>
                      <td className="px-4 py-2">
                        <span
                          className={`inline-block px-2 py-1 rounded text-xs ${
                            item.vehicle_type === "NEW"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {item.vehicle_type}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-right">
                        ${item.price?.toLocaleString()}
                      </td>
                      <td className="px-4 py-2 text-right">{index}</td>
                      <td className="px-4 py-2">
                        {new Date(item.timestamp)?.toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryDashboard;
