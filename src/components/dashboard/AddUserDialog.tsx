import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface AddUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentSector: "qirat" | "charity" | "dawa";
}

const AddUserDialog = ({ open, onOpenChange, currentSector }: AddUserDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sector, setSector] = useState(currentSector);
  const [formData, setFormData] = useState({
    name: "",
    studentId: "",
    department: "",
    phone: "",
    sectorAnswer: "",
  });
  const { toast } = useToast();

  const sectorOptions: Record<string, Array<{ value: string; label: string }>> = {
    qirat: [
      { value: "beginner", label: "Beginner - Learning Arabic letters" },
      { value: "intermediate", label: "Intermediate - Basic recitation" },
      { value: "advanced", label: "Advanced - Tajweed proficient" },
      { value: "hifz", label: "Hifz - Memorization track" },
    ],
    charity: [
      { value: "food_drive", label: "Food Drive Volunteer" },
      { value: "clothing", label: "Clothing Collection" },
      { value: "fundraising", label: "Fundraising Events" },
      { value: "distribution", label: "Distribution Helper" },
    ],
    dawa: [
      { value: "new", label: "New - First time volunteer" },
      { value: "some", label: "Some Experience" },
      { value: "experienced", label: "Experienced in Da'wah" },
      { value: "trainer", label: "Can train others" },
    ],
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.studentId || !formData.department || !formData.phone || !formData.sectorAnswer) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Validate name (only letters and spaces)
    if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      toast({
        title: "Invalid Name",
        description: "Name must contain only letters and spaces.",
        variant: "destructive",
      });
      return;
    }

    // Validate department (only letters and spaces)
    if (!/^[a-zA-Z\s]+$/.test(formData.department)) {
      toast({
        title: "Invalid Department",
        description: "Department must contain only letters and spaces.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, `registrations_${sector}`), {
        ...formData,
        sector,
        createdAt: serverTimestamp(),
      });

      toast({
        title: "User Added Successfully",
        description: `New user has been added to ${sector} sector.`,
      });

      // Reset form
      setFormData({
        name: "",
        studentId: "",
        department: "",
        phone: "",
        sectorAnswer: "",
      });
      onOpenChange(false);
    } catch (error) {
      console.error("Error adding user:", error);
      toast({
        title: "Failed to Add User",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>
            Manually add a new participant to a sector.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="add-sector">Sector</Label>
            <Select value={sector} onValueChange={(val) => setSector(val as any)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="qirat">Qirat</SelectItem>
                <SelectItem value="charity">Charity</SelectItem>
                <SelectItem value="dawa">Da'wah</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="add-name">Full Name *</Label>
            <Input
              id="add-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter full name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="add-studentId">Student ID *</Label>
            <Input
              id="add-studentId"
              value={formData.studentId}
              onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
              placeholder="e.g., HU/1234/15"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="add-department">Department *</Label>
            <Input
              id="add-department"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              placeholder="e.g., Computer Science"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="add-phone">Phone Number *</Label>
            <Input
              id="add-phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+251 9XX XXX XXX"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="add-sectorAnswer">
              {sector === "qirat" && "Level of Quran Knowledge"}
              {sector === "charity" && "Volunteer Interest"}
              {sector === "dawa" && "Outreach Experience"}
            </Label>
            <Select
              value={formData.sectorAnswer}
              onValueChange={(val) => setFormData({ ...formData, sectorAnswer: val })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {sectorOptions[sector].map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                "Add User"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserDialog;
