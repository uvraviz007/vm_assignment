import { useRoutes } from "../hooks/useRoutes";

export default function RoutesTab() {
  const { routes, loading, error, filters, handleFilterChange, handleSetBaseline } = useRoutes();

  const renderContent = () => {
    if (loading) {
      return <p className="text-green-300 animate-pulse">Loading routes...</p>;
    }

    if (error) {
      return (
        <p className="bg-red-900/40 border border-red-700/40 text-red-300 p-3 rounded-lg">
          {error}
        </p>
      );
    }

    if (routes.length === 0) {
      return <p className="text-green-300">No routes found or matching filters.</p>;
    }

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-green-700/40">

          {/* Header */}
          <thead className="bg-gray-900 text-gray-500 text-xs uppercase tracking-wide border-b border-green-700/40">
            <tr>
              {[
                "Route ID", "Baseline", "Vessel Type", "Fuel Type", "Year",
                "GHG (gCO₂e/MJ)", "Fuel (t)", "Distance (km)", "Total Em. (t)", "Action"
              ].map((head) => (
                <th key={head} className="px-4 py-2 text-left">
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-green-700/40">
            {routes.map((route) => (
              <tr
                key={route.id}
                className="hover:bg-gray-800/50 transition-colors cursor-pointer"
              >
                <td className="px-4 py-3 text-green-300">{route.route_id}</td>

                <td className="px-4 py-3 text-center text-lg text-green-400">
                  {route.is_baseline ? "✅" : ""}
                </td>

                <td className="px-4 py-3 text-green-300">{route.vesselType}</td>
                <td className="px-4 py-3 text-green-300">{route.fuelType}</td>
                <td className="px-4 py-3 text-green-300">{route.year}</td>

                <td className="px-4 py-3 text-green-300">
                  {route.ghg_intensity.toFixed(2)}
                </td>

                <td className="px-4 py-3 text-green-300">
                  {route.fuelConsumption.toLocaleString()}
                </td>

                <td className="px-4 py-3 text-green-300">
                  {route.distance.toLocaleString()}
                </td>

                <td className="px-4 py-3 text-green-300">
                  {route.totalEmissions.toLocaleString()}
                </td>

                <td className="px-4 py-3">
                  <button
                    onClick={() => handleSetBaseline(route.route_id)}
                    disabled={route.is_baseline}
                    className="
                      bg-green-700 text-white px-3 py-1.5 rounded-md text-xs font-medium
                      shadow hover:bg-green-600 hover:shadow-lg transition-all
                      disabled:bg-gray-600 disabled:cursor-not-allowed
                    "
                  >
                    Set Baseline
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-8 px-2 md:px-4">

      {/* Filters */}
      <div className="bg-gray-900 border border-green-700/40 p-6 rounded-xl shadow-md flex flex-wrap gap-4 items-end">
        
        {/* Vessel Type */}
        <div className="flex flex-col">
          <label className="text-xs text-green-300 mb-1 font-medium">Vessel Type</label>
          <input
            type="text"
            name="vesselType"
            placeholder="e.g. Cargo"
            value={filters.vesselType}
            onChange={handleFilterChange}
            className="
              bg-gray-800 border border-green-700/40 rounded-lg px-3 py-2 text-sm text-green-200
              focus:outline-none focus:ring-2 focus:ring-green-500 transition
            "
          />
        </div>

        {/* Fuel Type */}
        <div className="flex flex-col">
          <label className="text-xs text-green-300 mb-1 font-medium">Fuel Type</label>
          <input
            type="text"
            name="fuelType"
            placeholder="e.g. Diesel"
            value={filters.fuelType}
            onChange={handleFilterChange}
            className="
              bg-gray-800 border border-green-700/40 rounded-lg px-3 py-2 text-sm text-green-200
              focus:outline-none focus:ring-2 focus:ring-green-500 transition
            "
          />
        </div>

        {/* Year */}
        <div className="flex flex-col">
          <label className="text-xs text-green-300 mb-1 font-medium">Year</label>
          <input
            type="text"
            name="year"
            placeholder="e.g. 2025"
            value={filters.year}
            onChange={handleFilterChange}
            className="
              bg-gray-800 border border-green-700/40 rounded-lg px-3 py-2 text-sm text-green-200
              focus:outline-none focus:ring-2 focus:ring-green-500 transition
            "
          />
        </div>

      </div>

      {/* Table */}
      <div className="bg-gray-900 border border-green-700/40 p-6 rounded-xl shadow-md">
        {renderContent()}
      </div>
      
    </div>
  );
}
