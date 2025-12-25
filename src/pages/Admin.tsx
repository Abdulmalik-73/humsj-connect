import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Heart, Users, Lock, LogOut, UserPlus, DollarSign, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import DataTable from "@/components/dashboard/DataTable";
import AddUserDialog from "@/components/dashboard/AddUserDialog";
import SponsorsTable from "@/components/dashboard/SponsorsTable";
import DonationsTable from "@/components/dashboard/DonationsTable";
import { useToast } from "@/hooks/use-toast";

// Default password
const DEFAULT_PASSWORD = "humsj2024";

const Admin = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("qirat");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showAddUser, setShowAddUser] = useState(false);
  const [showUpdatePassword, setShowUpdatePassword] = useState(false);
  const [adminPassword, setAdminPassword] = useState(DEFAULT_PASSWORD);
  const [loadingPassword, setLoadingPassword] = useState(true);
  const [updatePasswordData, setUpdatePasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  // Load admin password from Firebase on component mount
  useEffect(() => {
    const loadAdminPassword = async () => {
      try {
        const docRef = doc(db, "admin_settings", "password");
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setAdminPassword(docSnap.data().password);
        } else {
          // Initialize with default password if doesn't exist
          await setDoc(docRef, { password: DEFAULT_PASSWORD });
          setAdminPassword(DEFAULT_PASSWORD);
        }
      } catch (error) {
        console.error("Error loading admin password:", error);
        setAdminPassword(DEFAULT_PASSWORD);
      } finally {
        setLoadingPassword(false);
      }
    };

    loadAdminPassword();
  }, []);

  useEffect(() => {
    // Check if already authenticated
    const auth = sessionStorage.getItem("humsj_admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    const sector = searchParams.get("sector");
    if (sector && ["qirat", "charity", "dawa", "sponsors", "donations"].includes(sector)) {
      setActiveTab(sector);
    }
  }, [searchParams]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === adminPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem("humsj_admin_auth", "true");
      toast({
        title: "Login Successful",
        description: "Welcome to the admin panel",
      });
      setPassword("");
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

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate current password
    if (updatePasswordData.currentPassword !== adminPassword) {
      toast({
        title: "Update Failed",
        description: "Current password is incorrect",
        variant: "destructive",
      });
      return;
    }

    // Validate new password
    if (updatePasswordData.newPassword.length < 6) {
      toast({
        title: "Update Failed",
        description: "New password must be at least 6 characters",
        variant: "destructive",
      });
      return;
    }

    // Validate password confirmation
    if (updatePasswordData.newPassword !== updatePasswordData.confirmPassword) {
      toast({
        title: "Update Failed",
        description: "New passwords do not match",
        variant: "destructive",
      });
      return;
    }

    try {
      // Update password in Firebase
      const docRef = doc(db, "admin_settings", "password");
      await setDoc(docRef, { password: updatePasswordData.newPassword });
      
      // Update local state
      setAdminPassword(updatePasswordData.newPassword);

      // Show success message
      toast({
        title: "Password Updated Successfully!",
        description: "Your admin password has been changed and saved to the database.",
      });

      // Reset form and close dialog
      setUpdatePasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setShowUpdatePassword(false);
    } catch (error) {
      console.error("Error updating password:", error);
      toast({
        title: "Update Failed",
        description: "Failed to save password to database. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loadingPassword) {
    return (
      <Layout>
        <div className="min-h-screen bg-secondary/30 islamic-pattern flex items-center justify-center px-4">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-primary animate-pulse" />
            </div>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </Layout>
    );
  }

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
              Enter password to access admin panel
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
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAddUser(true)}
                  className="gap-2"
                >
                  <UserPlus className="h-4 w-4" />
                  Add User
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowUpdatePassword(true)}
                  className="gap-2"
                >
                  <KeyRound className="h-4 w-4" />
                  Update Login
                </Button>
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
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Manage registrations, sponsors, and donations
            </p>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-7xl mx-auto">
            <TabsList className="grid w-full grid-cols-5 h-auto p-1 bg-card shadow-elegant rounded-xl mb-8">
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
              <TabsTrigger
                value="sponsors"
                className="flex items-center gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg"
              >
                <DollarSign className="h-4 w-4" />
                <span className="hidden sm:inline">Sponsors</span>
              </TabsTrigger>
              <TabsTrigger
                value="donations"
                className="flex items-center gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg"
              >
                <Heart className="h-4 w-4" />
                <span className="hidden sm:inline">Donations</span>
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

            <TabsContent value="sponsors" className="space-y-8">
              <SponsorsTable />
            </TabsContent>

            <TabsContent value="donations" className="space-y-8">
              <DonationsTable />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Add User Dialog */}
      <AddUserDialog
        open={showAddUser}
        onOpenChange={setShowAddUser}
        currentSector={activeTab === "sponsors" || activeTab === "donations" ? "qirat" : activeTab as "qirat" | "charity" | "dawa"}
      />

      {/* Update Password Dialog */}
      <Dialog open={showUpdatePassword} onOpenChange={setShowUpdatePassword}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Admin Password</DialogTitle>
            <DialogDescription>
              Change your admin login password. The new password will be saved to the database.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleUpdatePassword} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password *</Label>
              <Input
                id="current-password"
                type="password"
                value={updatePasswordData.currentPassword}
                onChange={(e) =>
                  setUpdatePasswordData({
                    ...updatePasswordData,
                    currentPassword: e.target.value,
                  })
                }
                placeholder="Enter current password"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-password">New Password *</Label>
              <Input
                id="new-password"
                type="password"
                value={updatePasswordData.newPassword}
                onChange={(e) =>
                  setUpdatePasswordData({
                    ...updatePasswordData,
                    newPassword: e.target.value,
                  })
                }
                placeholder="Enter new password (min 6 characters)"
                required
                minLength={6}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password *</Label>
              <Input
                id="confirm-password"
                type="password"
                value={updatePasswordData.confirmPassword}
                onChange={(e) =>
                  setUpdatePasswordData({
                    ...updatePasswordData,
                    confirmPassword: e.target.value,
                  })
                }
                placeholder="Confirm new password"
                required
              />
            </div>

            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
              <p className="text-sm text-foreground">
                <strong>🔒 Database Storage:</strong> Your new password will be saved to Firebase and will persist across all deployments and devices.
              </p>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowUpdatePassword(false);
                  setUpdatePasswordData({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                  });
                }}
              >
                Cancel
              </Button>
              <Button type="submit">Update Password</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Admin;
