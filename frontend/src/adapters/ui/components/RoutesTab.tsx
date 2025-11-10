import { useRoutes } from "../hooks/useRoutes";

export default function RoutesTab() {
  const { routes, loading, error, filters, handleFilterChange, handleSetBaseline } = useRoutes();

  const renderContent = () => {
    if (loading) {
      return <p className="text-gray-400 animate-pulse">Loading routes...</p>;
    }
    if (error) {
      return (
        <p className="bg-red-900/40 border border-red-700/40 text-red-300 p-3 rounded-lg">
          {error}
        </p>
      );
    }
    if (routes.length === 0) {
      return <p className="text-gray-400">No routes found or matching filters.</p>;
    }

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          {/* Header */}
          <thead className="bg-white/10 text-gray-300 text-xs uppercase tracking-wide">
            <tr>
              <th className="px-4 py-2 text-left">Route ID</th>
              <th className="px-4 py-2 text-center">Baseline</th>
              <th className="px-4 py-2 text-left">Vessel Type</th>
              <th className="px-4 py-2 text-left">Fuel Type</th>
              <th className="px-4 py-2 text-left">Year</th>
              <th className="px-4 py-2 text-left">GHG (gCO₂e/MJ)</th>
              <th className="px-4 py-2 text-left">Fuel (t)</th>
              <th className="px-4 py-2 text-left">Distance (km)</th>
              <th className="px-4 py-2 text-left">Total Em. (t)</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-gray-800">
            {routes.map((route) => (
              <tr
                key={route.id}
                className="hover:bg-white/10 transition-colors cursor-pointer"
              >
                <td className="px-4 py-3">{route.route_id}</td>
                <td className="px-4 py-3 text-center text-lg">
                  {route.is_baseline ? "✅" : ""}
                </td>
                <td className="px-4 py-3">{route.vesselType}</td>
                <td className="px-4 py-3">{route.fuelType}</td>
                <td className="px-4 py-3">{route.year}</td>
                <td className="px-4 py-3">{route.ghg_intensity.toFixed(2)}</td>
                <td className="px-4 py-3">{route.fuelConsumption.toLocaleString()}</td>
                <td className="px-4 py-3">{route.distance.toLocaleString()}</td>
                <td className="px-4 py-3">{route.totalEmissions.toLocaleString()}</td>

                <td className="px-4 py-3">
                  <button
                    onClick={() => handleSetBaseline(route.route_id)}
                    disabled={route.is_baseline}
                    className="bg-indigo-600 text-white px-3 py-1.5 rounded-md text-xs font-medium
                               shadow hover:bg-indigo-500 hover:shadow-lg transition-all
                               disabled:bg-gray-600 disabled:cursor-not-allowed"
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
      <div className="bg-white/5 border border-white/10 p-6 rounded-xl shadow-md flex flex-wrap gap-4 items-end">
        <div className="flex flex-col">
          <label className="text-xs text-gray-400 mb-1 font-medium">
            Vessel Type
          </label>
          <input
            type="text"
            name="vesselType"
            placeholder="e.g. Cargo"
            value={filters.vesselType}
            onChange={handleFilterChange}
            className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm
                       text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs text-gray-400 mb-1 font-medium">
            Fuel Type
          </label>
          <input
            type="text"
            name="fuelType"
            placeholder="e.g. Diesel"
            value={filters.fuelType}
            onChange={handleFilterChange}
            className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm
                       text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs text-gray-400 mb-1 font-medium">
            Year
          </label>
          <input
            type="text"
            name="year"
            placeholder="e.g. 2025"
            value={filters.year}
            onChange={handleFilterChange}
            className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm
                       text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
        </div>
      </div>

      {/* Table Wrapper */}
      <div className="bg-white/5 border border-white/10 p-6 rounded-xl shadow-md">
        {renderContent()}
      </div>
    </div>
  );
}
