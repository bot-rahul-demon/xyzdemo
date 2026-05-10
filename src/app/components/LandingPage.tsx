import { Link } from 'react-router';
import { Card } from './Card';
import { Button } from './Button';
import { Navbar } from './Navbar';
import { BookOpen, Briefcase, Train, Building2, Users, Clock, Target, Trophy, Play, ChevronDown, Shield, Award, CheckCircle, Radio } from 'lucide-react';

export function LandingPage() {
  const scrollToCategories = () => {
    document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
  };

  const categories = [
    { id: 'ssc', name: 'SSC', description: 'Staff Selection Commission', tests: 45, icon: BookOpen, color: 'bg-blue-50 text-blue-600', borderColor: 'border-blue-200' },
    { id: 'banking', name: 'Banking', description: 'IBPS, SBI, RBI Exams', tests: 38, icon: Briefcase, color: 'bg-orange-50 text-secondary', borderColor: 'border-orange-200' },
    { id: 'railways', name: 'Railways', description: 'RRB, Railway Exams', tests: 32, icon: Train, color: 'bg-blue-50 text-primary', borderColor: 'border-blue-200' },
    { id: 'regulatory', name: 'Regulatory', description: 'SEBI, RBI Grade B', tests: 24, icon: Building2, color: 'bg-orange-50 text-secondary', borderColor: 'border-orange-200' }
  ];

  const liveTests = [
    { id: 1, name: 'SSC CGL Tier 1 Live Mock', questions: 100, duration: 60, liveCount: 234, status: 'Live Now', statusColor: 'bg-red-500' },
    { id: 2, name: 'IBPS PO Prelims Live Test', questions: 100, duration: 60, liveCount: 187, status: 'Live Now', statusColor: 'bg-red-500' },
    { id: 3, name: 'RRB NTPC Mock Test', questions: 100, duration: 90, liveCount: 156, status: 'Live Now', statusColor: 'bg-red-500' }
  ];

  const stats = [
    { icon: Users, value: '2M+', label: 'Active Users', color: 'from-blue-50 to-blue-100' },
    { icon: BookOpen, value: '500+', label: 'Mock Tests', color: 'from-orange-50 to-orange-100' },
    { icon: Target, value: '95%', label: 'Success Rate', color: 'from-blue-50 to-blue-100' },
    { icon: Trophy, value: '10K+', label: 'Selections', color: 'from-orange-50 to-orange-100' }
  ];

  const trustIndicators = [
    { icon: Shield, text: 'Trusted by 2M+ Students' },
    { icon: Award, text: 'Expert-Designed Content' },
    { icon: CheckCircle, text: 'Updated Daily' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative bg-gradient-to-br from-blue-50 via-white to-orange-50 py-12 md:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <div className="inline-block bg-primary/10 text-primary px-3 md:px-4 py-2 rounded-full text-xs md:text-sm mb-4">
                🎯 Your Mock Test Buddy
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl mb-4 md:mb-6 leading-tight">
                Ace Your Government Exam with <span className="text-secondary">Free Mock Tests</span>
              </h1>
              <p className="text-base md:text-xl text-muted-foreground mb-6 md:mb-8">
                Practice with high-quality mock tests designed by experts. Track your performance and improve your rank.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6 md:mb-8">
                <Link to="/category/ssc">
                  <Button size="lg" className="w-full sm:w-auto flex items-center justify-center gap-2">
                    <Play className="w-5 h-5" />
                    Start Free Test
                  </Button>
                </Link>
                <Button size="lg" variant="outline" onClick={scrollToCategories} className="w-full sm:w-auto">
                  Explore Courses
                </Button>
              </div>

              <div className="flex flex-wrap gap-4 md:gap-6">
                {trustIndicators.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                      <Icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                      <span>{item.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 border-2 border-primary/10">
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                      <div key={idx} className={`text-center p-4 bg-gradient-to-br ${stat.color} rounded-xl border border-border`}>
                        <Icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                        <div className="text-2xl mb-1">{stat.value}</div>
                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
          <button onClick={scrollToCategories} className="text-primary opacity-60 hover:opacity-100 transition-opacity">
            <ChevronDown className="w-8 h-8" />
          </button>
        </div>
      </section>

      <section id="categories" className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl mb-4">Choose Your Exam Category</h2>
          <p className="text-muted-foreground text-base md:text-lg">Select your target exam and start practicing today</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map(cat => {
            const Icon = cat.icon;
            return (
              <Link key={cat.id} to={`/category/${cat.id}`}>
                <Card className={`h-full border-2 ${cat.borderColor}`}>
                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl ${cat.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 md:w-7 md:h-7" />
                  </div>
                  <h3 className="text-lg md:text-xl mb-2">{cat.name}</h3>
                  <p className="text-muted-foreground text-xs md:text-sm mb-4">{cat.description}</p>
                  <div className="flex items-center gap-2 text-primary">
                    <BookOpen className="w-4 h-4" />
                    <span className="text-xs md:text-sm">{cat.tests} Tests Available</span>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full text-sm mb-4">
              <Radio className="w-4 h-4 animate-pulse" />
              Live Tests Ongoing
            </div>
            <h2 className="text-3xl md:text-4xl mb-4">Join Live Mock Tests</h2>
            <p className="text-muted-foreground text-base md:text-lg">Test yourself with students across India in real-time</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {liveTests.map(test => (
              <Card key={test.id} className="border-2 border-red-100">
                <div className="flex justify-between items-start mb-4">
                  <span className={`text-xs px-3 py-1 rounded-full ${test.statusColor} text-white flex items-center gap-1 animate-pulse`}>
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    {test.status}
                  </span>
                  <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">FREE</span>
                </div>
                <h3 className="text-base md:text-lg mb-4">{test.name}</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <BookOpen className="w-4 h-4" />
                    <span>{test.questions} Questions</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{test.duration} Minutes</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-red-500" />
                    <span className="text-red-600">{test.liveCount} Taking Now</span>
                  </div>
                </div>
                <Link to={`/test/${test.id}`}>
                  <Button variant="primary" className="w-full">Join Now</Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-white mt-12 md:mt-20 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <img src="/src/imports/logo.png" alt="MockSaathi" className="h-10 mb-4" />
              <p className="text-sm text-muted-foreground">Your trusted mock test buddy for government exams</p>
            </div>
            <div>
              <h3 className="mb-4 text-sm md:text-base">Exams</h3>
              <div className="space-y-2 text-xs md:text-sm text-muted-foreground">
                <p className="hover:text-primary cursor-pointer">SSC</p>
                <p className="hover:text-primary cursor-pointer">Banking</p>
                <p className="hover:text-primary cursor-pointer">Railways</p>
                <p className="hover:text-primary cursor-pointer">Regulatory</p>
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-sm md:text-base">Resources</h3>
              <div className="space-y-2 text-xs md:text-sm text-muted-foreground">
                <p className="hover:text-primary cursor-pointer">Mock Tests</p>
                <p className="hover:text-primary cursor-pointer">Previous Papers</p>
                <p className="hover:text-primary cursor-pointer">Study Material</p>
                <p className="hover:text-primary cursor-pointer">Current Affairs</p>
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-sm md:text-base">Company</h3>
              <div className="space-y-2 text-xs md:text-sm text-muted-foreground">
                <p className="hover:text-primary cursor-pointer">About Us</p>
                <p className="hover:text-primary cursor-pointer">Contact</p>
                <p className="hover:text-primary cursor-pointer">Privacy Policy</p>
                <p className="hover:text-primary cursor-pointer">Terms of Service</p>
              </div>
            </div>
          </div>
          <div className="text-center text-muted-foreground text-xs md:text-sm pt-6 md:pt-8 border-t border-border">
            <p>© 2026 MockSaathi. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
