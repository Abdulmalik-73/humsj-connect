import SectorLayout from "@/components/layout/SectorLayout";
import AmirProfile from "@/components/common/AmirProfile";
import Timeline from "@/components/common/Timeline";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Users, Package, ArrowRight } from "lucide-react";
import charityImage from "@/assets/charity-giving.jpg";

const timelineEvents = [
  {
    year: "2014",
    title: "Charity Sector Founded",
    description: "Established to organize student-led community support initiatives."
  },
  {
    year: "2016",
    title: "First Ramadan Food Drive",
    description: "Distributed food packages to 100+ families during Ramadan."
  },
  {
    year: "2018",
    title: "Student Emergency Fund",
    description: "Created a fund to help students facing financial hardships."
  },
  {
    year: "2020",
    title: "COVID-19 Relief Campaign",
    description: "Raised funds and distributed supplies during the pandemic."
  },
  {
    year: "2022",
    title: "Community Outreach Expansion",
    description: "Extended support to neighboring communities and orphanages."
  }
];

const Charity = () => {
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
