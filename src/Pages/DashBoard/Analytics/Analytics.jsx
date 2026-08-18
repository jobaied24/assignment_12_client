import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Cell,
} from "recharts";
import { AuthContext } from "../../../Context/AuthContext";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const Analytics = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["registeredCamp", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/registeredCamp?email=${user.email}`
      );
      return res.data;
    },
  });

  const registeredCamps = data?.result || [];

  const totalCamps = registeredCamps.length;

  const paidCamps = registeredCamps.filter(
    (camp) => camp.paymentStatus === "paid"
  );

  const totalPaid = paidCamps.reduce(
    (sum, camp) => sum + Number(camp.campFees || 0),
    0
  );

  const averageFee =
    totalCamps > 0 ? (totalPaid / totalCamps).toFixed(2) : 0;

  const chartData = registeredCamps.map((camp) => ({
    campName: camp.campName,
    campFees: Number(camp.campFees),
    paymentStatus: camp.paymentStatus,
  }));

  return (
    <div className="bg-gray-50 min-h-screen p-2 md:p-6">

      {/* Header */}
      <div className="mb-2 md:mb-6">
        <h2 className="text-2xl font-bold text-secondary">
          Camp Registration Analytics
        </h2>

        <p className="text-gray-500 mt-1">
          Compare camp fees and payment status.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-10">

        <div className="bg-white rounded-2xl shadow-md p-2 md:p-4">
          <p className="text-gray-500">
            Registered Camps
          </p>

          <h2 className="text-4xl font-bold text-primary mt-2">
            {totalCamps}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-2 md:p-4">
          <p className="text-gray-500">
            Total Fees Paid
          </p>

          <h2 className="text-4xl font-bold text-primary mt-2">
            ${totalPaid}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-2 md:p-4">
          <p className="text-gray-500">
            Average Camp Fee
          </p>

          <h2 className="text-4xl font-bold text-primary mt-2">
            ${averageFee}
          </h2>
        </div>

      </div>

      {/* Bar Chart */}
      <div className="mt-8 md:mt-12 w-full">

        {/* Smaller on mobile, larger on desktop */}
        <div className="w-full h-[300px] md:h-[500px]">

          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{
                top: 10,
                right: 40,
                left: 0,
                bottom: 10,
              }}
            >

              <CartesianGrid
                stroke="#E5E7EB"
                strokeDasharray="2 2"
              />

              <XAxis
                type="number"
                tick={{ fontSize: 10 }}
              />

              <YAxis
                type="category"
                dataKey="campName"
                width={90}
                tick={{
                  fill: "#374151",
                  fontSize: 9,
                  fontWeight: 500,
                }}
                tickFormatter={(value) =>
                  value.length > 12
                    ? `${value.substring(0, 12)}...`
                    : value
                }
              />

              <Tooltip
                formatter={(value) => [
                  `$${value}`,
                  "Camp Fee",
                ]}
              />

              <Bar
                dataKey="campFees"
                barSize={25}
                radius={[0, 8, 8, 0]}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={
                      entry.paymentStatus === "paid"
                        ? "#12ADDE"
                        : "#F59E0B"
                    }
                  />
                ))}

                <LabelList
                  dataKey="campFees"
                  position="right"
                  formatter={(value) => `$${value}`}
                  style={{
                    fontSize: 10,
                  }}
                />

              </Bar>

            </BarChart>
          </ResponsiveContainer>

        </div>

      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 mb-6">

        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-[#12ADDE]"></span>

          <span className="text-gray-600">
            Paid
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-[#F59E0B]"></span>

          <span className="text-gray-600">
            Unpaid
          </span>
        </div>

      </div>

    </div>
  );
};

export default Analytics;