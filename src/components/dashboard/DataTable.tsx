import { useState, useEffect } from "react";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, Users } from "lucide-react";

interface Registration {
  id: string;
  name: string;
  studentId: string;
  department: string;
  phone: string;
  createdAt: { seconds: number } | null;
}

interface DataTableProps {
  sector: "qirat" | "charity" | "dawa";
}

const DataTable = ({ sector }: DataTableProps) => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="bg-card rounded-xl p-8 shadow-elegant flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl p-6 shadow-elegant">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-serif text-xl font-bold text-foreground capitalize">
          {sector} Participants
        </h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          {registrations.length} registered
        </div>
      </div>

      {registrations.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <Users className="h-12 w-12 mx-auto mb-4 opacity-30" />
          <p>No registrations yet</p>
          <p className="text-sm">Be the first to register!</p>
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {registrations.map((reg) => (
                <TableRow key={reg.id}>
                  <TableCell className="font-medium">{reg.name}</TableCell>
                  <TableCell>{reg.studentId}</TableCell>
                  <TableCell className="hidden md:table-cell">{reg.department}</TableCell>
                  <TableCell className="hidden sm:table-cell">{reg.phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default DataTable;
