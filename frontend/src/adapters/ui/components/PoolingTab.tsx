import { usePooling } from '../hooks/usePooling';

export default function PoolingTab() {
  const {
    shipStatuses,
    selectedShips,
    poolSum,
    poolResult,
    loading,
    error,
    handleSelectShip,
    handleCreatePool,
  } = usePooling();

  const formatCB = (num: number) =>
    num.toLocaleString('en-US', { maximumFractionDigits: 0 });

  return (
    <div className="grid grid-cols-3 gap-6 px-2 md:px-4">
      
      {/* Left Column: Ship Selection */}
      <div className="col-span-1 bg-gray-900 border border-green-700/40 p-4 rounded-xl flex flex-col gap-3">
        <h3 className="text-lg font-semibold text-gray-500">1. Select Pool Members</h3>

        {loading && <p className="text-green-300 animate-pulse">Loading ship data...</p>}

        <div className="flex flex-col gap-2">
          {[...shipStatuses.entries()].map(([shipId, status]) => (
            <label
              key={shipId}
              className="flex items-center gap-3 p-3 bg-gray-800 border border-green-700/40 rounded-md cursor-pointer hover:bg-gray-700 transition"
            >
              <input
                type="checkbox"
                checked={selectedShips.has(shipId)}
                onChange={() => handleSelectShip(shipId)}
                className="h-4 w-4 rounded bg-gray-900 text-green-600 border-green-500 focus:ring-green-500"
              />

              <span className="font-medium text-green-300">{shipId}</span>

              <span className="ml-auto text-sm text-green-400">
                Raw CB:
                <span
                  className={`font-bold ml-1 ${
                    status.cb_before < 0 ? 'text-red-400' : 'text-green-400'
                  }`}
                >
                  {formatCB(status.cb_before)}
                </span>
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Right Column */}
      <div className="col-span-2 flex flex-col gap-6">

        {/* Action Box */}
        <div className="bg-gray-900 border border-green-700/40 p-6 rounded-xl flex flex-col gap-4 shadow-md">
          <h3 className="text-lg font-semibold text-gray-500">2. Create Pool</h3>

          <div className="flex items-center gap-4">

            {/* Pool Sum Box */}
            <div className="text-center bg-gray-800 border border-green-700/40 p-3 rounded-lg flex-1">
              <h4 className="text-sm font-medium text-green-300 uppercase">
                Pool Sum (Raw CB)
              </h4>

              <p
                className={`text-2xl font-semibold mt-2 ${
                  poolSum < 0 ? 'text-red-400' : 'text-green-400'
                }`}
              >
                {formatCB(poolSum)}
              </p>
            </div>

            <button
              onClick={handleCreatePool}
              disabled={poolSum < 0 || selectedShips.size === 0 || loading}
              className="
                bg-green-700 text-white px-6 py-3 rounded-md font-medium h-full
                shadow hover:bg-green-600 hover:shadow-lg transition-all
                disabled:bg-gray-600 disabled:cursor-not-allowed
              "
            >
              Create Pool
            </button>

          </div>

          {error && (
            <p className="bg-red-900/50 text-red-300 p-3 rounded-md border border-red-700/40">
              {error}
            </p>
          )}
        </div>

        {/* Results Box */}
        {poolResult && (
          <div className="bg-gray-900 border border-green-700/40 p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-green-300">
              Pool Results (ID: {poolResult.id})
            </h3>

            <table className="min-w-full divide-y divide-green-700/40">
              <thead className="bg-gray-800 border border-green-700/40">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-green-300 uppercase">
                    Ship ID
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-green-300 uppercase">
                    CB Before
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-green-300 uppercase">
                    CB After
                  </th>
                </tr>
              </thead>

              <tbody className="bg-gray-900 divide-y divide-green-700/40">
                {poolResult.members.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-800 transition">
                    <td className="px-4 py-3 text-sm text-green-300">
                      {member.ship_id}
                    </td>

                    <td
                      className={`px-4 py-3 text-sm ${
                        member.cb_before < 0 ? 'text-red-400' : 'text-green-400'
                      }`}
                    >
                      {formatCB(member.cb_before)}
                    </td>

                    <td
                      className={`px-4 py-3 text-sm font-bold ${
                        member.cb_after < 0 ? 'text-red-400' : 'text-green-400'
                      }`}
                    >
                      {formatCB(member.cb_after)}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}

      </div>
    </div>
  );
}
