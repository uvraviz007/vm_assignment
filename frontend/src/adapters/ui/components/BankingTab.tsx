import { useBanking } from "../hooks/useBanking";

const SHIPS = ["R1000", "R1001", "R1002", "R1003", "R1004"];

export default function BankingTab() {
  const {
    status,
    loading,
    error,
    actionError,
    shipId,
    setShipId,
    year,
    applyAmount,
    setApplyAmount,
    fetchStatus,
    handleCalculateCB,
    handleBankSurplus,
    handleApplySurplus,
  } = useBanking();

  const formatCB = (num: number) =>
    num.toLocaleString("en-US", { maximumFractionDigits: 0 });

  return (
    <div className="flex flex-col gap-8 px-2 md:px-4">
      {/* --- Top Controls --- */}
      <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-6 rounded-xl flex flex-wrap gap-4 items-center shadow-md">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-300 mb-1">
            Select Ship
          </label>
          <select
            value={shipId}
            onChange={(e) => setShipId(e.target.value)}
            className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          >
            {SHIPS.map((id) => (
              <option key={id} value={id} className="text-black">
                {id}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={fetchStatus}
          className="px-5 py-2 rounded-lg font-medium bg-indigo-600 text-white shadow hover:bg-indigo-500 hover:shadow-lg transition-all"
        >
          Fetch Status
        </button>

        <button
          onClick={handleCalculateCB}
          className="px-5 py-2 rounded-lg font-medium bg-gray-700 text-white shadow hover:bg-gray-600 hover:shadow-lg transition-all"
        >
          Force Calculate CB
        </button>
      </div>

      {/* --- Status Loading or Error --- */}
      {loading && (
        <p className="text-gray-400 animate-pulse">Loading compliance status…</p>
      )}
      {error && <p className="text-red-400 bg-red-900/30 p-3 rounded-lg">{error}</p>}

      {/* --- Status Output --- */}
      {status && (
        <div className="flex flex-col gap-10">
          {/* --- KPI Grid --- */}
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white/5 border border-white/10 p-5 rounded-xl shadow-lg">
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                CB Before
              </h4>
              <p
                className={`text-3xl font-semibold mt-2 ${
                  status.cb_before < 0 ? "text-red-400" : "text-green-400"
                }`}
              >
                {formatCB(status.cb_before)}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-5 rounded-xl shadow-lg">
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                Applied / Banked
              </h4>
              <p className="text-3xl font-semibold mt-2 text-blue-300">
                {formatCB(status.applied_or_banked)}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-5 rounded-xl shadow-lg">
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                CB After
              </h4>
              <p
                className={`text-3xl font-semibold mt-2 ${
                  status.cb_after < 0 ? "text-red-400" : "text-green-400"
                }`}
              >
                {formatCB(status.cb_after)}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-5 rounded-xl shadow-lg">
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                Total Available Bank
              </h4>
              <p className="text-3xl font-semibold mt-2 text-indigo-300">
                {formatCB(status.total_available_bank)}
              </p>
            </div>
          </div>

          {actionError && (
            <p className="bg-red-800/40 text-red-300 p-3 rounded-lg border border-red-700/50 shadow">
              {actionError}
            </p>
          )}

          {/* --- Action Cards --- */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Bank Surplus */}
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl shadow-md hover:shadow-xl transition-all">
              <h3 className="text-lg font-semibold text-white">Bank Surplus</h3>
              <p className="text-sm text-gray-400 mt-1">
                Store positive CB for future deficit coverage.
              </p>

              <button
                onClick={handleBankSurplus}
                disabled={status.cb_before <= 0}
                className="mt-4 px-5 py-2 rounded-lg font-medium bg-green-600 text-white shadow hover:bg-green-500 hover:shadow-lg transition-all disabled:bg-gray-500 disabled:cursor-not-allowed"
              >
                Bank Surplus
              </button>
            </div>

            {/* Apply Surplus */}
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl shadow-md hover:shadow-xl transition-all">
              <h3 className="text-lg font-semibold text-white">
                Apply Banked Surplus
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                Use available bank to reduce this ship’s deficit.
              </p>

              <input
                type="number"
                value={applyAmount}
                onChange={(e) => setApplyAmount(e.target.value)}
                className="mt-4 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                placeholder="Amount to apply"
              />

              <button
                onClick={handleApplySurplus}
                disabled={status.cb_before >= 0 || status.total_available_bank <= 0}
                className="mt-4 px-5 py-2 rounded-lg font-medium bg-blue-600 text-white shadow hover:bg-blue-500 hover:shadow-lg transition-all disabled:bg-gray-500 disabled:cursor-not-allowed"
              >
                Apply Surplus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
