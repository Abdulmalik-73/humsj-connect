import SectorLayout from "@/components/layout/SectorLayout";
import AmirProfile from "@/components/common/AmirProfile";
import Timeline from "@/components/common/Timeline";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, MessageCircle, BookOpen, ArrowRight } from "lucide-react";
import dawaImage from "@/assets/dawa-outreach.jpg";

const timelineEvents = [
  {
    year: "2000 E.C",
    title: "Da'wah Sector Inception",
    description: "Formed to spread Islamic knowledge and engage in interfaith dialogue."
  },
  {
    year: "2005 E.C",
    title: "New Muslim Support Program",
    description: "Launched mentorship program for new converts to Islam."
  },
  {
    year: "2010 E.C",
    title: "Campus Awareness Week",
    description: "First annual Islam Awareness Week with lectures and exhibitions."
  },
  {
    year: "2015 E.C",
    title: "Interfaith Dialogue Initiative",
    description: "Started regular dialogues with other faith communities on campus."
  },
  {
    year: "2018 E.C",
    title: "Digital Da'wah Launch",
    description: "Expanded outreach through social media and online content."
  }
];

const Dawa = () => {
  return (
    <SectorLayout
      title="Da'wah Sector"
      subtitle="Inviting to the Path of Truth & Understanding"
      heroImage={dawaImage}
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <section className="bg-card rounded-xl p-8 shadow-elegant">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <Users className="h-6 w-6 text-accent" />
                About Da'wah Sector
              </h2>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  The Da'wah Sector is committed to sharing the beauty and truth of Islam through 
                  education, dialogue, and community engagement. We believe in the prophetic 
                  tradition of inviting others to the path of Allah with wisdom and beautiful 
                  preaching. Our approach emphasizes understanding, respect, and genuine care 
                  for all members of our diverse university community.
                </p>
                <p>
                  Through seminars, workshops, one-on-one conversations, and multimedia content, 
                  we address questions about Islam, dispel misconceptions, and provide resources 
                  for those seeking to learn more about our faith. We also support new Muslims 
                  in their journey and foster connections within the Muslim community.
                </p>
              </div>

              {/* Features */}
              <div className="grid sm:grid-cols-2 gap-4 mt-6">
                <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg">
                  <MessageCircle className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">Outreach Programs</h4>
                    <p className="text-sm text-muted-foreground">Campus events and dialogues</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg">
                  <BookOpen className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">Islamic Education</h4>
                    <p className="text-sm text-muted-foreground">Workshops and seminars</p>
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
              name="Ramadan Aliyii"
              phone="+251 975 309 779"
              email="dawa.amir@humsj.edu.et"
            />

            {/* Register CTA */}
            <div className="bg-primary rounded-xl p-6 text-primary-foreground">
              <h3 className="font-serif text-xl font-bold mb-2">Join Our Mission</h3>
              <p className="text-sm text-primary-foreground/80 mb-4">
                Become a part of our outreach and education efforts.
              </p>
              <Link to="/dashboard?sector=dawa">
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

export default Dawa;
