import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Heart, Users } from "lucide-react";
import RegistrationForm from "@/components/dashboard/RegistrationForm";

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("qirat");

  useEffect(() => {
    const sector = searchParams.get("sector");
    if (sector && ["qirat", "charity", "dawa"].includes(sector)) {
      setActiveTab(sector);
    }
  }, [searchParams]);

  return (
    <Layout>
      <div className="min-h-screen bg-secondary/30 islamic-pattern">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Registration Portal
            </span>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
              Sector Registration
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Register for Qirat, Charity, or Dawa programs
            </p>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-card shadow-elegant rounded-xl mb-8">
              <TabsTrigger
                value="qirat"
                className="flex items-center gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg"
              >
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Qirat</span>
              </TabsTrigger>
              <TabsTrigger
                value="charity"
                className="flex items-center gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg"
              >
                <Heart className="h-4 w-4" />
                <span className="hidden sm:inline">Charity</span>
              </TabsTrigger>
              <TabsTrigger
                value="dawa"
                className="flex items-center gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg"
              >
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Dawa</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="qirat" className="space-y-8">
              <div className="max-w-2xl mx-auto">
                <RegistrationForm sector="qirat" />
              </div>
            </TabsContent>

            <TabsContent value="charity" className="space-y-8">
              <div className="max-w-2xl mx-auto">
                <RegistrationForm sector="charity" />
              </div>
            </TabsContent>

            <TabsContent value="dawa" className="space-y-8">
              <div className="max-w-2xl mx-auto">
                <RegistrationForm sector="dawa" />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
