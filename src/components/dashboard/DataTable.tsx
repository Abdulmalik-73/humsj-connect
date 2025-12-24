import { useState, useEffect } from "react";
import { collection, query, onSnapshot, orderBy, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2, Users, Pencil, Trash2, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Registration {
  id: string;
  name: string;
  studentId: string;
  department: string;
  phone: string;
  sectorAnswer?: string;
  sectorQuestion?: string;
  createdAt: { seconds: number } | null;
}

interface DataTableProps {
  sector: "qirat" | "charity" | "dawa";
}

const DataTable = ({ sector }: DataTableProps) => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<Registration | null>(null);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    studentId: "",
    department: "",
    phone: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const q = query(
      collection(db, `registrations_${sector}`),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Registration[];
        setRegistrations(data);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching registrations:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [sector]);

  const handleEdit = (user: Registration) => {
    setEditingUser(user);
    setEditFormData({
      name: user.name,
      studentId: user.studentId,
      department: user.department,
      phone: user.phone,
    });
  };

  const handleUpdate = async () => {
    if (!editingUser) return;
    
    // Validate name (only letters and spaces)
    if (!/^[a-zA-Z\s]+$/.test(editFormData.name)) {
      toast({
        title: "Invalid Name",
        description: "Name must contain only letters and spaces.",
        variant: "destructive",
      });
      return;
    }

    // Validate department (only letters and spaces)
    if (!/^[a-zA-Z\s]+$/.test(editFormData.department)) {
      toast({
        title: "Invalid Department",
        description: "Department must contain only letters and spaces.",
        variant: "destructive",
      });
      return;
    }
    
    setIsUpdating(true);
    try {
      const userRef = doc(db, `registrations_${sector}`, editingUser.id);
      await updateDoc(userRef, editFormData);
      
      toast({
        title: "User Updated",
        description: "User information has been successfully updated.",
      });
      setEditingUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
      toast({
        title: "Update Failed",
        description: "Failed to update user information.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (userId: string) => {
    try {
      await deleteDoc(doc(db, `registrations_${sector}`, userId));
      toast({
        title: "User Deleted",
        description: "User has been successfully removed.",
      });
      setDeletingUserId(null);
    } catch (error) {
      console.error("Error deleting user:", error);
      toast({
        title: "Delete Failed",
        description: "Failed to delete user.",
        variant: "destructive",
      });
    }
  };

  const exportToCSV = () => {
    const headers = ["Name", "Student ID", "Department", "Phone", "Registration Date"];
    const rows = registrations.map(reg => [
      reg.name,
      reg.studentId,
      reg.department,
      reg.phone,
      reg.createdAt ? new Date(reg.createdAt.seconds * 1000).toLocaleDateString() : "N/A"
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${sector}_registrations_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export Successful",
      description: "Data has been exported to CSV.",
    });
  };

  if (loading) {
    return (
      <div className="bg-card rounded-xl p-8 shadow-elegant flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <div className="bg-card rounded-xl p-6 shadow-elegant">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <h3 className="font-serif text-xl font-bold text-foreground capitalize">
              {sector} Participants
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <Users className="h-4 w-4" />
              {registrations.length} registered
            </div>
          </div>
          
          {registrations.length > 0 && (
            <Button onClick={exportToCSV} variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          )}
        </div>

        {registrations.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Users className="h-12 w-12 mx-auto mb-4 opacity-30" />
            <p>No registrations yet</p>
            <p className="text-sm">Waiting for participants to register</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Student ID</TableHead>
                  <TableHead className="hidden md:table-cell">Department</TableHead>
                  <TableHead className="hidden sm:table-cell">Phone</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {registrations.map((reg) => (
                  <TableRow key={reg.id}>
                    <TableCell className="font-medium">{reg.name}</TableCell>
                    <TableCell>{reg.studentId}</TableCell>
                    <TableCell className="hidden md:table-cell">{reg.department}</TableCell>
                    <TableCell className="hidden sm:table-cell">{reg.phone}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(reg)}
                          className="h-8 w-8 p-0"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeletingUserId(reg.id)}
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editingUser} onOpenChange={(open) => !open && setEditingUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User Information</DialogTitle>
            <DialogDescription>
              Update the user's registration details below.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Full Name</Label>
              <Input
                id="edit-name"
                value={editFormData.name}
                onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-studentId">Student ID</Label>
              <Input
                id="edit-studentId"
                value={editFormData.studentId}
                onChange={(e) => setEditFormData({ ...editFormData, studentId: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-department">Department</Label>
              <Input
                id="edit-department"
                value={editFormData.department}
                onChange={(e) => setEditFormData({ ...editFormData, department: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-phone">Phone Number</Label>
              <Input
                id="edit-phone"
                value={editFormData.phone}
                onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingUser(null)} disabled={isUpdating}>
              Cancel
            </Button>
            <Button onClick={handleUpdate} disabled={isUpdating}>
              {isUpdating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletingUserId} onOpenChange={(open) => !open && setDeletingUserId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the user's registration.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingUserId && handleDelete(deletingUserId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DataTable;
