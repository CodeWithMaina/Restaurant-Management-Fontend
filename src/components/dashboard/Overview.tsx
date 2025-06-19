import { 
  Users, 
  Package, 
  Link, 
  ShoppingCart, 
  Trophy,
  TrendingUp,
  Clock,
  DollarSign
} from 'lucide-react';

const Dashboard = () => {
  const managementCards = [
    {
      title: "Staff Management",
      description: "Assign roles and responsibilities, track working hours, schedule staff payroll.",
      icon: <Users className="w-6 h-6 text-white" />,
      bgColor: "bg-gray-800"
    },
    {
      title: "Inventory Management", 
      description: "Track ingredient levels, expiry dates for the stock and manage supply.",
      icon: <Package className="w-6 h-6 text-white" />,
      bgColor: "bg-gray-700"
    },
    {
      title: "Integration",
      description: "Connect with delivery partners, online ordering platforms, and accounting software.",
      icon: <Link className="w-6 h-6 text-white" />,
      bgColor: "bg-gray-600"
    },
    {
      title: "Order Management",
      description: "Track orders, manage order status and assign orders to staff.",
      icon: <ShoppingCart className="w-6 h-6 text-white" />,
      bgColor: "bg-gray-700"
    }
  ];

  const orderStats = [
    {
      title: "Total Orders (This month)",
      value: "1178",
      subtitle: "Highest ever recorded in MAR",
      icon: <ShoppingCart className="w-5 h-5 text-blue-400" />
    },
    {
      title: "Average order",
      value: "22.6",
      unit: "/ Hour",
      subtitle: "Highest ever recorded in MAR", 
      icon: <Clock className="w-5 h-5 text-green-400" />
    },
    {
      title: "Average revenue",
      value: "39542.7",
      unit: "/ Day",
      subtitle: "Highest ever recorded in APR21",
      icon: <DollarSign className="w-5 h-5 text-purple-400" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
          <p className="text-gray-300">Restaurant management and performance insights</p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Chef of the Month Card */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden h-full border border-gray-700">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1583394293214-28cea88aff0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                  alt="Chef of the Month"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <div className="bg-yellow-500 p-2 rounded-full">
                    <Trophy className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-semibold text-yellow-600 uppercase tracking-wide">
                    CHEF OF THE MONTH
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Marcus Johnson</h3>
                <p className="text-gray-600 text-sm">
                  Outstanding performance in kitchen management and innovative menu creation. 
                  Recognized for exceptional leadership and culinary excellence.
                </p>
              </div>
            </div>
          </div>

          {/* Management Cards Grid */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
              {managementCards.map((card, index) => (
                <div key={index} className={`${card.bgColor} rounded-xl p-6 text-white hover:shadow-lg transition-shadow cursor-pointer`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                      {card.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                  <p className="text-sm opacity-90 leading-relaxed">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {orderStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
                {stat.icon}
              </div>
              <div className="mb-2">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
                  {stat.unit && (
                    <span className="text-lg text-gray-500 font-medium">{stat.unit}</span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-green-500" />
                <p className="text-xs text-gray-500">{stat.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Insights */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Highlights</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Customer Satisfaction</span>
                <span className="text-sm font-semibold text-green-600">98.5%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Order Accuracy</span>
                <span className="text-sm font-semibold text-green-600">99.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Average Prep Time</span>
                <span className="text-sm font-semibold text-blue-600">12.3 min</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Staff Efficiency</span>
                <span className="text-sm font-semibold text-purple-600">94.7%</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="font-medium text-gray-900">View Today's Orders</div>
                <div className="text-sm text-gray-500">Monitor current order status</div>
              </button>
              <button className="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="font-medium text-gray-900">Staff Schedule</div>
                <div className="text-sm text-gray-500">Manage employee shifts</div>
              </button>
              <button className="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="font-medium text-gray-900">Inventory Alerts</div>
                <div className="text-sm text-gray-500">Check low stock items</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;