import { History, Users, Target, Star } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            About Us
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            History & Description
          </h2>
          <div className="section-divider mb-6" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h3 className="font-serif text-2xl font-semibold text-foreground">
              The Bridge Between Jema & Community
            </h3>
            
            <p className="text-muted-foreground leading-relaxed">
              The External Affairs Sector of HUMSJ serves as the vital link connecting our student 
              Jema with the broader university community and beyond. Established with the mission 
              of fostering understanding and cooperation, we work tirelessly to represent our 
              values while engaging constructively with all stakeholders.
            </p>
            
            <p className="text-muted-foreground leading-relaxed">
              Through our three specialized sub-sectors—Qirat, Charity, and Dawa—we address 
              diverse aspects of community engagement. From Quranic education to humanitarian 
              support and Islamic outreach, our comprehensive approach ensures that the light 
              of Islamic knowledge and compassion reaches every corner of our campus and community.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <History className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Rich History</h4>
                  <p className="text-sm text-muted-foreground">Years of dedicated service</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Users className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Community Focus</h4>
                  <p className="text-sm text-muted-foreground">Serving all students</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Clear Mission</h4>
                  <p className="text-sm text-muted-foreground">Purpose-driven actions</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Star className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Excellence</h4>
                  <p className="text-sm text-muted-foreground">Striving for the best</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Timeline */}
          <div className="bg-card rounded-2xl p-8 shadow-elegant">
            <h3 className="font-serif text-xl font-semibold text-foreground mb-6">
              Our Journey
            </h3>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-accent" />
                  <div className="w-0.5 h-full bg-border" />
                </div>
                <div className="pb-6">
                  <span className="text-sm font-medium text-accent">2010</span>
                  <h4 className="font-semibold text-foreground">Foundation</h4>
                  <p className="text-sm text-muted-foreground">External Affairs sector established as part of HUMSJ organizational structure</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-primary" />
                  <div className="w-0.5 h-full bg-border" />
                </div>
                <div className="pb-6">
                  <span className="text-sm font-medium text-primary">2015</span>
                  <h4 className="font-semibold text-foreground">Sub-Sector Formation</h4>
                  <p className="text-sm text-muted-foreground">Qirat, Charity, and Dawa sectors formally organized</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-accent" />
                  <div className="w-0.5 h-full bg-border" />
                </div>
                <div className="pb-6">
                  <span className="text-sm font-medium text-accent">2020</span>
                  <h4 className="font-semibold text-foreground">Digital Expansion</h4>
                  <p className="text-sm text-muted-foreground">Online programs and registration systems implemented</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-primary" />
                </div>
                <div>
                  <span className="text-sm font-medium text-primary">Present</span>
                  <h4 className="font-semibold text-foreground">Growing Impact</h4>
                  <p className="text-sm text-muted-foreground">Continuing to serve thousands of students annually</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
