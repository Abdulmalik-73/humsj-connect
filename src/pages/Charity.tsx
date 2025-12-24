import SectorLayout from "@/components/layout/SectorLayout";
import AmirProfile from "@/components/common/AmirProfile";
import Timeline from "@/components/common/Timeline";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Users, Package, ArrowRight, DollarSign, HandHeart } from "lucide-react";
import charityImage from "@/assets/charity-giving.jpg";
import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

const timelineEvents = [
  {
    year: "2000 E.C",
    title: "Charity Sector Founded",
    description: "Established to organize student-led community support initiatives."
  },
  {
    year: "2005 E.C",
    title: "First Ramadan Food Drive",
    description: "Distributed food packages to 100+ families during Ramadan."
  },
  {
    year: "2010 E.C",
    title: "Student Emergency Fund",
    description: "Created a fund to help students facing financial hardships."
  },
  {
    year: "2015 E.C",
    title: "Community Relief Campaign",
    description: "Raised funds and distributed supplies to those in need."
  },
  {
    year: "2018 E.C",
    title: "Community Outreach Expansion",
    description: "Extended support to neighboring communities and orphanages."
  }
];

const Charity = () => {
  const { toast } = useToast();
  const [activeForm, setActiveForm] = useState<'sponsor' | 'donation' | null>(null);
  
  // Sponsor form state
  const [sponsorData, setSponsorData] = useState({
    name: "",
    organization: "",
    email: "",
    phone: "",
    amount: "",
    message: ""
  });
  const [sponsorLoading, setSponsorLoading] = useState(false);

  // Monthly donation form state
  const [donationData, setDonationData] = useState({
    studentName: "",
    studentId: "",
    email: "",
    phone: "",
    monthlyAmount: "",
    startDate: "",
    notes: ""
  });
  const [donationLoading, setDonationLoading] = useState(false);

  const handleSponsorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSponsorLoading(true);

    try {
      await addDoc(collection(db, "sponsors"), {
        ...sponsorData,
        amount: parseFloat(sponsorData.amount),
        createdAt: Timestamp.now(),
        status: "pending"
      });

      toast({
        title: "Sponsor Application Submitted!",
        description: "Thank you for your interest. We'll contact you soon.",
      });

      // Reset form
      setSponsorData({
        name: "",
        organization: "",
        email: "",
        phone: "",
        amount: "",
        message: ""
      });
      setActiveForm(null);
    } catch (error) {
      console.error("Error submitting sponsor:", error);
      toast({
        title: "Submission Failed",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setSponsorLoading(false);
    }
  };

  const handleDonationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDonationLoading(true);

    try {
      await addDoc(collection(db, "monthlyDonations"), {
        ...donationData,
        monthlyAmount: parseFloat(donationData.monthlyAmount),
        createdAt: Timestamp.now(),
        status: "active"
      });

      toast({
        title: "Monthly Donation Registered!",
        description: "Thank you for your commitment to helping others.",
      });

      // Reset form
      setDonationData({
        studentName: "",
        studentId: "",
        email: "",
        phone: "",
        monthlyAmount: "",
        startDate: "",
        notes: ""
      });
      setActiveForm(null);
    } catch (error) {
      console.error("Error submitting donation:", error);
      toast({
        title: "Submission Failed",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setDonationLoading(false);
    }
  };

  return (
    <SectorLayout
      title="Charity Sector"
      subtitle="Compassion in Action - Serving Those in Need"
      heroImage={charityImage}
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <section className="bg-card rounded-xl p-8 shadow-elegant">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <Heart className="h-6 w-6 text-accent" />
                About Charity Sector
              </h2>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  The Charity Sector embodies the Islamic values of compassion, generosity, and 
                  social responsibility. We organize and coordinate various humanitarian initiatives 
                  that support students in need, local communities, and vulnerable populations. 
                  Our work demonstrates that giving is not just a duty but a privilege that 
                  strengthens the bonds of brotherhood and sisterhood.
                </p>
                <p>
                  From regular food drives and clothing donations to emergency relief and educational 
                  scholarships, our programs address diverse needs within and beyond the university 
                  community. We believe that every act of kindness, no matter how small, contributes 
                  to building a more just and caring society.
                </p>
              </div>

              {/* Features */}
              <div className="grid sm:grid-cols-2 gap-4 mt-6">
                <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg">
                  <Package className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">Food & Supply Drives</h4>
                    <p className="text-sm text-muted-foreground">Regular collection and distribution</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg">
                  <Users className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">Community Support</h4>
                    <p className="text-sm text-muted-foreground">Outreach to families in need</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Fundraising Section */}
            <section className="bg-card rounded-xl p-8 shadow-elegant">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <DollarSign className="h-6 w-6 text-accent" />
                Support Our Cause
              </h2>

              {/* Selection Buttons */}
              {!activeForm && (
                <div className="grid sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => setActiveForm('sponsor')}
                    className="p-6 border-2 border-primary/20 rounded-lg hover:border-primary hover:bg-primary/5 transition-all text-left group"
                  >
                    <HandHeart className="h-8 w-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold text-lg text-foreground mb-2">Become a Sponsor</h3>
                    <p className="text-sm text-muted-foreground">
                      Organizations and individuals can sponsor our programs with one-time or recurring contributions.
                    </p>
                  </button>

                  <button
                    onClick={() => setActiveForm('donation')}
                    className="p-6 border-2 border-primary/20 rounded-lg hover:border-primary hover:bg-primary/5 transition-all text-left group"
                  >
                    <Heart className="h-8 w-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold text-lg text-foreground mb-2">Monthly Student Donation</h3>
                    <p className="text-sm text-muted-foreground">
                      Students can commit to monthly donations to support fellow students in need.
                    </p>
                  </button>
                </div>
              )}

              {/* Sponsor Form */}
              {activeForm === 'sponsor' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg">Sponsor Application Form</h3>
                    <Button variant="ghost" size="sm" onClick={() => setActiveForm(null)}>
                      Cancel
                    </Button>
                  </div>
                  
                  <form onSubmit={handleSponsorSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="sponsor-name">Full Name *</Label>
                        <Input
                          id="sponsor-name"
                          required
                          value={sponsorData.name}
                          onChange={(e) => setSponsorData({...sponsorData, name: e.target.value})}
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="sponsor-org">Organization (Optional)</Label>
                        <Input
                          id="sponsor-org"
                          value={sponsorData.organization}
                          onChange={(e) => setSponsorData({...sponsorData, organization: e.target.value})}
                          placeholder="Company Name"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="sponsor-email">Email *</Label>
                        <Input
                          id="sponsor-email"
                          type="email"
                          required
                          value={sponsorData.email}
                          onChange={(e) => setSponsorData({...sponsorData, email: e.target.value})}
                          placeholder="john@example.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="sponsor-phone">Phone Number *</Label>
                        <Input
                          id="sponsor-phone"
                          type="tel"
                          required
                          value={sponsorData.phone}
                          onChange={(e) => setSponsorData({...sponsorData, phone: e.target.value})}
                          placeholder="+251 912 345 678"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="sponsor-amount">Sponsorship Amount (ETB) *</Label>
                      <Input
                        id="sponsor-amount"
                        type="number"
                        required
                        min="1"
                        value={sponsorData.amount}
                        onChange={(e) => setSponsorData({...sponsorData, amount: e.target.value})}
                        placeholder="5000"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="sponsor-message">Message (Optional)</Label>
                      <Textarea
                        id="sponsor-message"
                        value={sponsorData.message}
                        onChange={(e) => setSponsorData({...sponsorData, message: e.target.value})}
                        placeholder="Tell us about your sponsorship goals..."
                        rows={4}
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={sponsorLoading}>
                      {sponsorLoading ? "Submitting..." : "Submit Sponsor Application"}
                    </Button>
                  </form>
                </div>
              )}

              {/* Monthly Donation Form */}
              {activeForm === 'donation' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg">Monthly Donation Registration</h3>
                    <Button variant="ghost" size="sm" onClick={() => setActiveForm(null)}>
                      Cancel
                    </Button>
                  </div>
                  
                  <form onSubmit={handleDonationSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="student-name">Student Name *</Label>
                        <Input
                          id="student-name"
                          required
                          value={donationData.studentName}
                          onChange={(e) => setDonationData({...donationData, studentName: e.target.value})}
                          placeholder="Ahmed Ali"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="student-id">Student ID *</Label>
                        <Input
                          id="student-id"
                          required
                          value={donationData.studentId}
                          onChange={(e) => setDonationData({...donationData, studentId: e.target.value})}
                          placeholder="HUMSJ/2024/001"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="donation-email">Email *</Label>
                        <Input
                          id="donation-email"
                          type="email"
                          required
                          value={donationData.email}
                          onChange={(e) => setDonationData({...donationData, email: e.target.value})}
                          placeholder="ahmed@student.humsj.edu.et"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="donation-phone">Phone Number *</Label>
                        <Input
                          id="donation-phone"
                          type="tel"
                          required
                          value={donationData.phone}
                          onChange={(e) => setDonationData({...donationData, phone: e.target.value})}
                          placeholder="+251 912 345 678"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="monthly-amount">Monthly Amount (ETB) *</Label>
                        <Input
                          id="monthly-amount"
                          type="number"
                          required
                          min="1"
                          value={donationData.monthlyAmount}
                          onChange={(e) => setDonationData({...donationData, monthlyAmount: e.target.value})}
                          placeholder="100"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="start-date">Start Date *</Label>
                        <Input
                          id="start-date"
                          type="date"
                          required
                          value={donationData.startDate}
                          onChange={(e) => setDonationData({...donationData, startDate: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="donation-notes">Additional Notes (Optional)</Label>
                      <Textarea
                        id="donation-notes"
                        value={donationData.notes}
                        onChange={(e) => setDonationData({...donationData, notes: e.target.value})}
                        placeholder="Any special instructions or preferences..."
                        rows={3}
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={donationLoading}>
                      {donationLoading ? "Registering..." : "Register Monthly Donation"}
                    </Button>
                  </form>
                </div>
              )}
            </section>

            {/* Timeline */}
            <section className="bg-card rounded-xl p-8 shadow-elegant">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                Historical Events
              </h2>
              <Timeline items={timelineEvents} />
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Amir Profile */}
            <AmirProfile
              name="Muhajir Mohammed"
              phone="+251 964 544 620"
              email="charity.amir@humsj.edu.et"
            />

            {/* Register CTA */}
            <div className="bg-primary rounded-xl p-6 text-primary-foreground">
              <h3 className="font-serif text-xl font-bold mb-2">Join Our Initiatives</h3>
              <p className="text-sm text-primary-foreground/80 mb-4">
                Volunteer or contribute to our charity programs.
              </p>
              <Link to="/dashboard?sector=charity">
                <Button className="w-full btn-gold">
                  Register Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SectorLayout>
  );
};

export default Charity;
