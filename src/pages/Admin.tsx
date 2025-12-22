import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Heart, Users, Lock, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DataTable from "@/components/dashboard/DataTable";
import { useToast } from "@/hooks/use-toast";

const ADMIN_PASSWORD = "humsj2024"; // Change this to your secure password

const Admin = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("qirat");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if already authenticated
    const auth = sessionStorage.getItem("humsj_admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    const sector = searchParams.get("sector");
    if (sector && ["qirat", "charity", "dawa"].includes(sector)) {
      setActiveTab(sector);
    }
  }, [searchParams]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("humsj_admin_auth", "true");
      toast({
        title: "Login Successful",
        description: "Welcome to the admin panel",
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Incorrect password",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("humsj_admin_auth");
    setPassword("");
    navigate("/");
  };

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="min-h-screen bg-secondary/30 islamic-pattern flex items-center justify-center px-4">
          <div className="bg-card rounded-xl p-8 shadow-elegant max-w-md w-full">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Lock className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="font-serif text-2xl font-bold text-center text-foreground mb-2">
              Admin Login
            </h1>
            <p className="text-muted-foreground text-center mb-6">
              Enter password to access registration data
            </p>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full btn-gold">
                Login
              </Button>
            </form>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-secondary/30 islamic-pattern">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="flex justify-between items-center max-w-7xl mx-auto mb-6">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                Administrative Portal
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              View and manage participant registration data
            </p>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-7xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-card shadow-elegant rounded-xl mb-8">
              <TabsTrigger
                value="qirat"
                className="flex items-center gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg"
              >
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Qirat</span>
              </TabsTrigger>
              <TabsTrigger
                value="charity"
                className="flex items-center gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg"
              >
                <Heart className="h-4 w-4" />
                <span className="hidden sm:inline">Charity</span>
              </TabsTrigger>
              <TabsTrigger
                value="dawa"
                className="flex items-center gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg"
              >
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Da'wah</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="qirat" className="space-y-8">
              <DataTable sector="qirat" />
            </TabsContent>

            <TabsContent value="charity" className="space-y-8">
              <DataTable sector="charity" />
            </TabsContent>

            <TabsContent value="dawa" className="space-y-8">
              <DataTable sector="dawa" />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
