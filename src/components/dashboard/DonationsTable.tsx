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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Loader2, Heart, Trash2, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Donation {
  id: string;
  studentName: string;
  studentId: string;
  email: string;
  phone: string;
  monthlyAmount: number;
  startDate: string;
  notes?: string;
  status: string;
  createdAt: { seconds: number } | null;
}

const DonationsTable = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const q = query(collection(db, "monthlyDonations"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Donation[];
        setDonations(data);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching donations:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleStatusChange = async (donationId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, "monthlyDonations", donationId), { status: newStatus });
      toast({
        title: "Status Updated",
        description: "Donation status has been updated.",
      });
    } catch (error) {
      console.error("Error updating status:", error);
      toast({
        title: "Update Failed",
        description: "Failed to update status.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (donationId: string) => {
    try {
      await deleteDoc(doc(db, "monthlyDonations", donationId));
      toast({
        title: "Donation Deleted",
        description: "Donation record has been successfully removed.",
      });
      setDeletingId(null);
    } catch (error) {
      console.error("Error deleting donation:", error);
      toast({
        title: "Delete Failed",
        description: "Failed to delete donation.",
        variant: "destructive",
      });
    }
  };

  const exportToCSV = () => {
    const headers = ["Student Name", "Student ID", "Email", "Phone", "Monthly Amount (ETB)", "Start Date", "Status"];
    const rows = donations.map(donation => [
      donation.studentName,
      donation.studentId,
      donation.email,
      donation.phone,
      donation.monthlyAmount.toString(),
      donation.startDate,
      donation.status
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `monthly_donations_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export Successful",
      description: "Donations data has been exported to CSV.",
    });
  };

  const totalMonthly = donations
    .filter(d => d.status === "active")
    .reduce((sum, donation) => sum + donation.monthlyAmount, 0);

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
            <h3 className="font-serif text-xl font-bold text-foreground">Monthly Donations</h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
              <span className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                {donations.length} donors
              </span>
              <span className="font-semibold text-primary">
                Active Monthly: {totalMonthly.toLocaleString()} ETB
              </span>
            </div>
          </div>
          
          {donations.length > 0 && (
            <Button onClick={exportToCSV} variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          )}
        </div>

        {donations.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Heart className="h-12 w-12 mx-auto mb-4 opacity-30" />
            <p>No monthly donations yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead className="hidden md:table-cell">Student ID</TableHead>
                  <TableHead className="hidden sm:table-cell">Contact</TableHead>
                  <TableHead>Monthly Amount</TableHead>
                  <TableHead className="hidden lg:table-cell">Start Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {donations.map((donation) => (
                  <TableRow key={donation.id}>
                    <TableCell className="font-medium">{donation.studentName}</TableCell>
                    <TableCell className="hidden md:table-cell">{donation.studentId}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <div className="text-sm">
                        <div>{donation.email}</div>
                        <div className="text-muted-foreground">{donation.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold">
                      {donation.monthlyAmount.toLocaleString()} ETB
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {new Date(donation.startDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Select
                        value={donation.status}
                        onValueChange={(val) => handleStatusChange(donation.id, val)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="paused">Paused</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeletingId(donation.id)}
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletingId} onOpenChange={(open) => !open && setDeletingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the donation record.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingId && handleDelete(deletingId)}
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

export default DonationsTable;
