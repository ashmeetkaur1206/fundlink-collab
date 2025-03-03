
import { Routes, Route } from "react-router-dom";
import { DashboardLayout } from "@/layouts/dashboard-layout";
import Dashboard from "@/pages/Dashboard";
import Funding from "@/pages/Funding";
import Proposals from "@/pages/Proposals";
import Profile from "@/pages/Profile";
import Messages from "@/pages/Messages";
import Alerts from "@/pages/Alerts";
import NotFound from "@/pages/NotFound";
import "./App.css";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="funding" element={<Funding />} />
          <Route path="proposals" element={<Proposals />} />
          <Route path="messages" element={<Messages />} />
          <Route path="profile" element={<Profile />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
