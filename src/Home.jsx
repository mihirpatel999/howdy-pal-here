import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  FiHome, 
  FiTruck, 
  FiUsers, 
  FiPieChart,
  FiClock,
  FiSettings
} from 'react-icons/fi';
import { 
  MdOutlineWarehouse,
  MdOutlineSchedule
} from 'react-icons/md';
import { 
  BsShieldLock,
  BsBoxSeam
} from 'react-icons/bs';

export default function Home() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const loggedInUsername = localStorage.getItem("username") || "User";
  const userRole = localStorage.getItem("userRole") || "";

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    const checkSize = () => setIsMobile(window.innerWidth <= 768);
    
    window.addEventListener("resize", checkSize);
    return () => {
      clearInterval(timer);
      window.removeEventListener("resize", checkSize);
    };
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const roleAccess = {
    Owner: ["plantmaster", "usermaster", "userregister", "truck", "gate", "loader", "reports", "truckfind", "truckshedule"],
    Admin: ["plantmaster", "usermaster", "userregister", "truck", "gate", "loader", "reports", "truckfind", "truckshedule"],
    Dispatch: ["truck", "truckfind", "truckshedule"],
    Report: ["reports", "truckshedule"],
    GateKeeper: ["gate"],
    UserMaster: ["usermaster"],
    UserRegister: ["userregister"],
    Loader: ["loader"],
  };

  const canAccess = (route) => {
    const roles = userRole.split(",").map((r) => r.trim());
    return roles.some((role) => roleAccess[role]?.includes(route));
  };

  const panelList = [
    {
      name: "Plant Master",
      path: "/plantmaster",
      route: "plantmaster",
      icon: <MdOutlineWarehouse size={24} />,
      gradient: "from-emerald-500 to-emerald-600",
      shadow: "shadow-emerald-500/25"
    },
    {
      name: "User Master",
      path: "/usermaster", 
      route: "usermaster",
      icon: <FiUsers size={24} />,
      gradient: "from-blue-500 to-blue-600",
      shadow: "shadow-blue-500/25"
    },
    {
      name: "User Register",
      path: "/userregister",
      route: "userregister", 
      icon: <BsShieldLock size={24} />,
      gradient: "from-purple-500 to-purple-600",
      shadow: "shadow-purple-500/25"
    },
    {
      name: "Truck Transaction",
      path: "/truck",
      route: "truck",
      icon: <FiTruck size={24} />,
      gradient: "from-orange-500 to-orange-600",
      shadow: "shadow-orange-500/25"
    },
    {
      name: "Truck Locator",
      path: "/truckfind",
      route: "truckfind",
      icon: <FiClock size={24} />,
      gradient: "from-indigo-500 to-indigo-600",
      shadow: "shadow-indigo-500/25"
    },
    {
      name: "Gate Keeper",
      path: "/gate",
      route: "gate",
      icon: <MdOutlineWarehouse size={24} />,
      gradient: "from-teal-500 to-teal-600",
      shadow: "shadow-teal-500/25"
    },
    {
      name: "Loader",
      path: "/loader",
      route: "loader",
      icon: <BsBoxSeam size={24} />,
      gradient: "from-amber-500 to-amber-600",
      shadow: "shadow-amber-500/25"
    },
    {
      name: "Reports",
      path: "/reports",
      route: "reports",
      icon: <FiPieChart size={24} />,
      gradient: "from-rose-500 to-rose-600",
      shadow: "shadow-rose-500/25"
    },
    {
      name: "Schedule Board",
      path: "/truckshedule",
      route: "truckshedule",
      icon: <MdOutlineSchedule size={24} />,
      gradient: "from-cyan-500 to-cyan-600",
      shadow: "shadow-cyan-500/25"
    },
  ];

  const allowedPanels = panelList.filter((panel) => canAccess(panel.route));

  if (!isMobile) {
    return (
      <div className="min-h-screen bg-gradient-surface flex items-center justify-center p-8">
        <div className="modern-card glass-effect p-12 text-center max-w-2xl animate-fade-in">
          <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-8 shadow-glow animate-float">
            <FiHome className="w-12 h-12 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-display font-bold text-foreground mb-4">
            Welcome to Lemon ERP
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Streamline your truck operations with our comprehensive enterprise resource planning solution.
          </p>
          <div className="flex items-center justify-center space-x-8 text-muted-foreground">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{allowedPanels.length}</div>
              <div className="text-sm">Available Modules</div>
            </div>
            <div className="w-px h-12 bg-border"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{formatTime(currentTime)}</div>
              <div className="text-sm">Current Time</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-surface">
      {/* Header */}
      <header className="glass-effect border-b border-border/50 p-6 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-display font-bold text-foreground">
              Welcome, {loggedInUsername}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {currentTime.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long", 
                day: "numeric",
              })}
            </p>
          </div>
          <div className="modern-card px-4 py-2 bg-gradient-primary text-primary-foreground font-semibold">
            {formatTime(currentTime)}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 pb-24">
        <div className="grid grid-cols-2 gap-4">
          {allowedPanels.map((panel, idx) => (
            <Link
              to={panel.path}
              key={idx}
              className="group transform transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <div className="modern-card p-6 h-full flex flex-col items-center justify-center space-y-4 group-hover:shadow-floating">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${panel.gradient} flex items-center justify-center ${panel.shadow} shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                  <span className="text-white">{panel.icon}</span>
                </div>
                <span className="text-sm font-semibold text-foreground text-center leading-tight">
                  {panel.name}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="modern-card p-4 text-center">
            <div className="text-2xl font-bold text-primary">{allowedPanels.length}</div>
            <div className="text-sm text-muted-foreground">Available Modules</div>
          </div>
          <div className="modern-card p-4 text-center">
            <div className="text-2xl font-bold text-success">Online</div>
            <div className="text-sm text-muted-foreground">System Status</div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 glass-effect border-t border-border/50 p-4">
        <div className="flex justify-around">
          <Link to="/home" className="p-3 rounded-full bg-primary text-primary-foreground">
            <FiHome size={20} />
          </Link>
          {canAccess("truck") && (
            <Link to="/truck" className="p-3 rounded-full text-muted-foreground hover:text-foreground transition-colors">
              <FiTruck size={20} />
            </Link>
          )}
          {canAccess("reports") && (
            <Link to="/reports" className="p-3 rounded-full text-muted-foreground hover:text-foreground transition-colors">
              <FiPieChart size={20} />
            </Link>
          )}
          {(canAccess("plantmaster") || canAccess("usermaster")) && (
            <Link to="/plantmaster" className="p-3 rounded-full text-muted-foreground hover:text-foreground transition-colors">
              <FiSettings size={20} />
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}