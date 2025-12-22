import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
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
import { CheckCircle, Loader2 } from "lucide-react";

const registrationSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  studentId: z.string().trim().min(4, "Student ID is required").max(20),
  department: z.string().trim().min(2, "Department is required").max(100),
  phone: z.string().trim().min(10, "Valid phone number required").max(15),
  sectorAnswer: z.string().trim().min(1, "Please select an option"),
});

type RegistrationFormValues = z.infer<typeof registrationSchema>;

type Sector = "qirat" | "charity" | "dawa";

interface RegistrationFormProps {
  sector: Sector;
}

const sectorConfig: Record<
  Sector,
  {
    label: string;
    options: Array<{ value: string; label: string }>;
  }
> = {
  qirat: {
    label: "Level of Quran Knowledge",
    options: [
      { value: "beginner", label: "Beginner - Learning Arabic letters" },
      { value: "intermediate", label: "Intermediate - Basic recitation" },
      { value: "advanced", label: "Advanced - Tajweed proficient" },
      { value: "hifz", label: "Hifz - Memorization track" },
    ],
  },
  charity: {
    label: "Volunteer Interest",
    options: [
      { value: "food_drive", label: "Food Drive Volunteer" },
      { value: "clothing", label: "Clothing Collection" },
      { value: "fundraising", label: "Fundraising Events" },
      { value: "distribution", label: "Distribution Helper" },
    ],
  },
  dawa: {
    label: "Outreach Experience",
    options: [
      { value: "new", label: "New - First time volunteer" },
      { value: "some", label: "Some Experience" },
      { value: "experienced", label: "Experienced in Da'wah" },
      { value: "trainer", label: "Can train others" },
    ],
  },
};

const RegistrationForm = ({ sector }: RegistrationFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const config = sectorConfig[sector];

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      sectorAnswer: "",
    },
  });

  const sectorAnswer = watch("sectorAnswer");

  const onSubmit = async (data: RegistrationFormValues) => {
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, `registrations_${sector}`), {
        ...data,
        sector,
        sectorQuestion: config.label,
        createdAt: serverTimestamp(),
      });

      setIsSuccess(true);
      toast({
        title: "Registration Successful!",
        description: `You have been registered for the ${sector} sector.`,
      });

      setTimeout(() => {
        setIsSuccess(false);
        reset();
      }, 2500);
    } catch {
      toast({
        title: "Registration Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-card rounded-xl p-8 shadow-elegant flex flex-col items-center justify-center min-h-[400px] animate-scale-in">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <CheckCircle className="h-10 w-10 text-primary" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
          Registration Complete!
        </h3>
        <p className="text-muted-foreground text-center">
          Thank you for registering. We will contact you soon.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl p-8 shadow-elegant">
      <h2 className="font-serif text-xl font-bold text-foreground mb-6 capitalize">
        {sector} Registration
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor={`${sector}-name`}>Full Name</Label>
          <Input
            id={`${sector}-name`}
            placeholder="Enter your full name"
            {...register("name")}
            className={errors.name ? "border-destructive" : ""}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${sector}-studentId`}>Student ID</Label>
          <Input
            id={`${sector}-studentId`}
            placeholder="e.g., HU/1234/15"
            {...register("studentId")}
            className={errors.studentId ? "border-destructive" : ""}
          />
          {errors.studentId && (
            <p className="text-sm text-destructive">{errors.studentId.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${sector}-department`}>Department</Label>
          <Input
            id={`${sector}-department`}
            placeholder="e.g., Computer Science"
            {...register("department")}
            className={errors.department ? "border-destructive" : ""}
          />
          {errors.department && (
            <p className="text-sm text-destructive">{errors.department.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${sector}-phone`}>Phone Number</Label>
          <Input
            id={`${sector}-phone`}
            placeholder="+251 9XX XXX XXX"
            {...register("phone")}
            className={errors.phone ? "border-destructive" : ""}
          />
          {errors.phone && (
            <p className="text-sm text-destructive">{errors.phone.message}</p>
          )}
        </div>

        {/* Hidden input keeps the field registered in react-hook-form */}
        <input type="hidden" {...register("sectorAnswer")} />

        <div className="space-y-2">
          <Label>{config.label}</Label>
          <Select
            value={sectorAnswer}
            onValueChange={(val) => setValue("sectorAnswer", val, { shouldValidate: true })}
          >
            <SelectTrigger className={errors.sectorAnswer ? "border-destructive" : ""}>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {config.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.sectorAnswer && (
            <p className="text-sm text-destructive">{errors.sectorAnswer.message}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full btn-gold"
          disabled={isSubmitting || !sectorAnswer}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Registration"
          )}
        </Button>
      </form>
    </div>
  );
};

export default RegistrationForm;
