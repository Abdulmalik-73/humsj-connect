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
import { Badge } from "@/components/ui/badge";
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
import { Loader2, DollarSign, Trash2, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Sponsor {
  id: string;
  name: string;
  organization?: string;
  email: string;
  phone: string;
  amount: number;
  message?: string;
  status: string;
  createdAt: { seconds: number } | null;
}

const SponsorsTable = () => {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const q = query(collection(db, "sponsors"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Sponsor[];
        setSponsors(data);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching sponsors:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleStatusChange = async (sponsorId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, "sponsors", sponsorId), { status: newStatus });
      toast({
        title: "Status Updated",
        description: "Sponsor status has been updated.",
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

  const handleDelete = async (sponsorId: string) => {
    try {
      await deleteDoc(doc(db, "sponsors", sponsorId));
      toast({
        title: "Sponsor Deleted",
        description: "Sponsor has been successfully removed.",
      });
      setDeletingId(null);
    } catch (error) {
      console.error("Error deleting sponsor:", error);
      toast({
        title: "Delete Failed",
        description: "Failed to delete sponsor.",
        variant: "destructive",
      });
    }
  };

  const exportToCSV = () => {
    const headers = ["Name", "Organization", "Email", "Phone", "Amount (ETB)", "Status", "Date"];
    const rows = sponsors.map(sponsor => [
      sponsor.name,
      sponsor.organization || "N/A",
      sponsor.email,
      sponsor.phone,
      sponsor.amount.toString(),
      sponsor.status,
      sponsor.createdAt ? new Date(sponsor.createdAt.seconds * 1000).toLocaleDateString() : "N/A"
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sponsors_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export Successful",
      description: "Sponsors data has been exported to CSV.",
    });
  };

  const totalAmount = sponsors.reduce((sum, sponsor) => sum + sponsor.amount, 0);

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
            <h3 className="font-serif text-xl font-bold text-foreground">Sponsors</h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
              <span className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                {sponsors.length} sponsors
              </span>
              <span className="font-semibold text-primary">
                Total: {totalAmount.toLocaleString()} ETB
              </span>
            </div>
          </div>
          
          {sponsors.length > 0 && (
            <Button onClick={exportToCSV} variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          )}
        </div>

        {sponsors.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-30" />
            <p>No sponsors yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Organization</TableHead>
                  <TableHead className="hidden sm:table-cell">Contact</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sponsors.map((sponsor) => (
                  <TableRow key={sponsor.id}>
                    <TableCell className="font-medium">{sponsor.name}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {sponsor.organization || "-"}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <div className="text-sm">
                        <div>{sponsor.email}</div>
                        <div className="text-muted-foreground">{sponsor.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold">
                      {sponsor.amount.toLocaleString()} ETB
                    </TableCell>
                    <TableCell>
                      <Select
                        value={sponsor.status}
                        onValueChange={(val) => handleStatusChange(sponsor.id, val)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="approved">Approved</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeletingId(sponsor.id)}
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
              This action cannot be undone. This will permanently delete the sponsor record.
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

export default SponsorsTable;
