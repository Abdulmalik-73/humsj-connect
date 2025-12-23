import SectorLayout from "@/components/layout/SectorLayout";
import AmirProfile from "@/components/common/AmirProfile";
import Timeline from "@/components/common/Timeline";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Target, GraduationCap, ArrowRight } from "lucide-react";
import quranImage from "@/assets/quran-recitation.jpg";

const timelineEvents = [
  {
    year: "2015",
    title: "Qirat Sector Established",
    description: "Formal establishment of the Qirat sector with focus on Tajweed education."
  },
  {
    year: "2017",
    title: "First Annual Qirat Competition",
    description: "Launched the inaugural Quran recitation competition with 50+ participants."
  },
  {
    year: "2019",
    title: "Hifz Program Introduction",
    description: "Started the memorization program for students committed to preserving the Quran."
  },
  {
    year: "2021",
    title: "Online Classes Launch",
    description: "Adapted to digital learning with online Tajweed and Qirat sessions."
  },
  {
    year: "2023",
    title: "500+ Students Milestone",
    description: "Celebrated reaching 500 active students in Qirat programs."
  }
];

const Qirat = () => {
  return (
    <SectorLayout
      title="Qirat Sector"
      subtitle="Excellence in Quranic Recitation & Education"
      heroImage={quranImage}
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <section className="bg-card rounded-xl p-8 shadow-elegant">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <BookOpen className="h-6 w-6 text-accent" />
                About Qirat Sector
              </h2>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  The Qirat Sector is dedicated to nurturing a deep connection between Muslim students 
                  and the Holy Quran through proper recitation, understanding, and memorization. Our 
                  programs are designed to help students develop proficiency in Tajweed (the art of 
                  Quranic pronunciation) while fostering a love for the divine scripture.
                </p>
                <p>
                  Through weekly classes, one-on-one mentoring, and annual competitions, we create 
                  an environment where students can progress from basic recitation to advanced levels 
                  of Quranic mastery. Our experienced instructors guide students on their journey, 
                  ensuring that each learner receives personalized attention and support.
                </p>
              </div>

              {/* Features */}
              <div className="grid sm:grid-cols-2 gap-4 mt-6">
                <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg">
                  <Target className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">Tajweed Classes</h4>
                    <p className="text-sm text-muted-foreground">Weekly sessions on proper pronunciation</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg">
                  <GraduationCap className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">Hifz Program</h4>
                    <p className="text-sm text-muted-foreground">Quran memorization curriculum</p>
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
              name="Mohammed Ahmadu"
              phone="+251 929 230 120"
              email="qirat.amir@humsj.edu.et"
            />

            {/* Register CTA */}
            <div className="bg-primary rounded-xl p-6 text-primary-foreground">
              <h3 className="font-serif text-xl font-bold mb-2">Join Our Programs</h3>
              <p className="text-sm text-primary-foreground/80 mb-4">
                Register now to start your Quranic journey with us.
              </p>
              <Link to="/dashboard?sector=qirat">
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

export default Qirat;
