"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Code, Github, Laptop, Mail, MonitorSmartphone, Tv } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProjectModal, type Project } from "@/components/project-modal"
import { ContactModal } from "@/components/contact-modal"
import { MobileNav } from "@/components/mobile-nav"
import { FadeIn, StaggeredFadeIn } from "@/components/fade-in"
import { LoadingSpinner } from "@/components/loading"

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [isAnimeSelected, setIsAnimeSelected] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
    setIsProjectModalOpen(true)
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const isAnime = formData.get("anime-fan") === "on"
    setIsAnimeSelected(isAnime)
    setIsContactModalOpen(true)
  }

  const featuredProjects = [
    {
      id: "rentpay",
      title: "RentPay Reminder",
      description: "Because my landlord doesn't accept 'I was watching the season finale' as payment.",
      tags: ["React", "Node.js", "MongoDB"],
      image: "/placeholder.svg?height=300&width=400",
      demoUrl: "#",
      githubUrl: "#",
      longDescription:
        "RentPay Reminder was born after my third 'final notice' letter. It sends notifications before rent is due, tracks payment history, and even suggests freelance opportunities when your bank account is looking as empty as my fridge the day before payday.",
      challenges:
        "The main challenge was creating a system that could integrate with various payment platforms while being more reliable than my promises to 'watch just one more episode' before bed.",
      solutions:
        "I implemented OAuth 2.0 for secure authentication and used Plaid API for safe bank account integration. The notification system is more persistent than a shounen protagonist facing the final boss.",
      screenshots: ["/placeholder.svg?height=200&width=350", "/placeholder.svg?height=200&width=350"],
    },
    {
      id: "animetrackr",
      title: "AnimeTrackr",
      description: "Helping me budget between instant ramen and premium Crunchyroll since 2023.",
      tags: ["Next.js", "TypeScript", "Tailwind"],
      image: "/placeholder.svg?height=300&width=400",
      demoUrl: "#",
      githubUrl: "#",
      longDescription:
        "AnimeTrackr is the ultimate tool for anime enthusiasts who need to budget their entertainment expenses. It converts your watchlist into 'hours of coding needed' metrics.",
      challenges:
        "Integrating with multiple streaming platforms was harder than explaining to my landlord why I need high-speed internet more than a working refrigerator.",
      solutions:
        "I built a unified API wrapper that standardizes data from different streaming services. The work hour calculator uses an algorithm more complex than the plot of Neon Genesis Evangelion.",
      screenshots: ["/placeholder.svg?height=200&width=350", "/placeholder.svg?height=200&width=350"],
    },
    {
      id: "devfolio",
      title: "DevFolio",
      description: "For developers whose GitHub activity graph peaks right before rent is due.",
      tags: ["React", "GSAP", "Styled Components"],
      image: "/placeholder.svg?height=300&width=400",
      demoUrl: "#",
      githubUrl: "#",
      longDescription:
        "DevFolio is a portfolio template for developers who want to showcase not just their technical skills, but also what motivates them to code.",
      challenges:
        "Creating a template that was both professional enough for potential employers but also personal enough to showcase individual passions was challenging.",
      solutions:
        "I designed the template with a modular approach, allowing users to emphasize either the professional or personal aspects depending on their audience.",
      screenshots: ["/placeholder.svg?height=200&width=350", "/placeholder.svg?height=200&width=350"],
    },
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <LoadingSpinner size="lg" />
          <p className="text-lg">Loading portfolio... (or I'm watching anime, hard to tell)</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <FadeIn>
        <header className="sticky top-0 z-50 w-full border-b border-white/10 backdrop-blur-lg bg-black/50">
          <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <Link href="/" className="font-bold text-lg sm:text-xl">
              <span className="text-white">VM</span>
              <span className="text-gray-400">.</span>
              <span className="text-xs text-gray-500 ml-1 hidden sm:inline">(Viewing Manga)</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-6">
              <Link href="#about" className="text-sm hover:text-white text-gray-300 transition-colors">
                About
              </Link>
              <Link href="#skills" className="text-sm hover:text-white text-gray-300 transition-colors">
                Skills
              </Link>
              <Link href="#projects" className="text-sm hover:text-white text-gray-300 transition-colors">
                Projects
              </Link>
              <Link href="#contact" className="text-sm hover:text-white text-gray-300 transition-colors">
                Contact
              </Link>
            </nav>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="border-white/20 hover:bg-white hover:text-black transition-colors hidden sm:flex"
              >
                <Mail className="mr-2 h-4 w-4" />
                <span className="hidden lg:inline">Fund My Anime Habit</span>
                <span className="lg:hidden">Hire Me</span>
              </Button>

              {/* Mobile Navigation */}
              <MobileNav />
            </div>
          </div>
        </header>
      </FadeIn>

      {/* Hero Section */}
      <section className="container py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <FadeIn delay={200}>
          <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 md:p-12 max-w-4xl mx-auto">
            <div className="space-y-6">
              <Badge className="bg-white text-black hover:bg-gray-200">Available for Work (Rent Due Soon)</Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Hi, I'm Victor. I write <span className="text-gray-400">code</span> to pay for{" "}
                <span className="text-gray-400">rent</span> and <span className="text-gray-400">anime</span>.
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl">
                Frontend developer from Nigeria turning caffeine into code by day, and binge-watching anime by night. My
                superpower? Making pixels pay the bills while my Crunchyroll subscription remains uninterrupted.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-black hover:bg-gray-200">
                  <Link href="/projects" className="flex items-center">
                    View My Work
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white/20">
                  <Github className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">GitHub (Last Commit: Rent Day)</span>
                  <span className="sm:hidden">GitHub</span>
                </Button>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* About Section */}
      <section id="about" className="container py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <FadeIn delay={400}>
          <div className="text-center space-y-4 mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">About Me</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
              The story of a man named victor, his code, and his monthly Crunchyroll bill that rivals his electricity bill.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <StaggeredFadeIn staggerDelay={200}>
            <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold">The Origin Story</h3>
              <p className="text-gray-300 text-sm sm:text-base">
                I started coding when I realized my anime addiction wasn't going to pay for itself. Now I transform
                coffee into code by day so I can transform into a couch potato by night (that was meant to make you laugh, incase you did not).
              </p>
              <p className="text-gray-300 text-sm sm:text-base">
                Based in Nigeria, I've mastered the art of coding through power outages and internet that moves slower
                than the plot in a slice-of-life anime. My first app was a calculator that converted "episodes watched"
                into "hours I should have been working." My point is, I can code through anything, even if it means going to my neighbour's house to get your job done.
              </p>
              <p className="text-gray-300 text-sm sm:text-base">
                My friends say I need to find balance. I say I've found it perfectly: 50% coding, 50% anime, and 0%
                savings. (I mean why save for rainy days when every day is literally a rainy day right?)
              </p>
            </div>

            <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold">The Mission</h3>
              <p className="text-gray-300 text-sm sm:text-base">
                My mission is simple: write enough good code to keep a roof over my head and maintain my premium anime
                subscriptions. It's not much, but it's honest work. My five-year plan includes affording both rent AND
                food in the same month. 
              </p>
              <div className="flex items-center gap-4 pt-4">
                <div className="bg-white/10 p-3 rounded-full shrink-0">
                  <Code className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-medium">Code that pays the bills</h4>
                  <p className="text-sm text-gray-400">
                    Literally. My landlord accepts JavaScript (that was a joke. He doesn't, I've tried).
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-white/10 p-3 rounded-full shrink-0">
                  <Tv className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-medium">Anime enthusiast</h4>
                  <p className="text-sm text-gray-400">
                    My debugging rubber duck is Totoro. He judges my code silently.
                  </p>
                </div>
              </div>
            </div>
          </StaggeredFadeIn>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="container py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <FadeIn delay={600}>
          <div className="text-center space-y-4 mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Skills & Technologies</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
              The tools I've mastered to keep my landlord happy and my anime queue flowing. My skill tree is optimized
              for maximum rent-paying efficiency.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={800}>
          <Tabs defaultValue="frontend" className="w-full max-w-3xl mx-auto">
            <TabsList className="grid grid-cols-3 mb-6 sm:mb-8 w-full">
              <TabsTrigger value="frontend" className="text-xs sm:text-sm">
                Frontend
              </TabsTrigger>
              <TabsTrigger value="tools" className="text-xs sm:text-sm">
                Tools
              </TabsTrigger>
              <TabsTrigger value="soft" className="text-xs sm:text-sm">
                Soft Skills
              </TabsTrigger>
            </TabsList>
            <TabsContent value="frontend" className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                {["React", "Next.js", "TypeScript", "Tailwind CSS", "JavaScript", "HTML5", "CSS3", "Redux"].map(
                  (skill) => (
                    <div
                      key={skill}
                      className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4 text-center"
                    >
                      <p className="text-sm sm:text-base">{skill}</p>
                    </div>
                  ),
                )}
              </div>
              <p className="text-gray-400 text-center mt-6 text-sm sm:text-base">
                These are the technologies that keep my rent paid and my anime streaming without buffering. I learned
                React faster than Goku mastered Ultra Instinct.
              </p>
            </TabsContent>
            <TabsContent value="tools" className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                {["Git", "VS Code", "Figma", "GitHub", "Vercel", "npm", "Webpack", "Jest"].map((skill) => (
                  <div
                    key={skill}
                    className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4 text-center"
                  >
                    <p className="text-sm sm:text-base">{skill}</p>
                  </div>
                ))}
              </div>
              <p className="text-gray-400 text-center mt-6 text-sm sm:text-base">
                The trusty sidekicks in my coding adventures. Like having Alphonse when you're Edward Elric, except none
                of them will help me pay my rent.
              </p>
            </TabsContent>
            <TabsContent value="soft" className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                {[
                  "Problem Solving",
                  "Time Management*",
                  "Communication",
                  "Adaptability",
                  "Attention to Detail",
                  "Patience during filler episodes",
                ].map((skill) => (
                  <div
                    key={skill}
                    className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4 text-center"
                  >
                    <p className="text-sm sm:text-base">{skill}</p>
                  </div>
                ))}
              </div>
              <p className="text-gray-400 text-center mt-6 text-sm sm:text-base">
                Skills I've developed through countless debugging sessions and waiting for new anime seasons.
                <br />
                <span className="text-xs">*Time management excludes "one more episode" situations</span>
              </p>
            </TabsContent>
          </Tabs>
        </FadeIn>
      </section>

      {/* Projects Section */}
      <section id="projects" className="container py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <FadeIn delay={1000}>
          <div className="text-center space-y-4 mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Featured Projects</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
              Code that keeps my landlord off my back and my Crunchyroll subscription active. Each project represents
              approximately 3 months of anime streaming costs.
            </p>
          </div>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StaggeredFadeIn staggerDelay={150}>
            {featuredProjects.map((project, index) => (
              <Card key={index} className="backdrop-blur-lg bg-white/5 border border-white/10 text-white">
                <CardHeader>
                  <div className="bg-white/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    {index === 0 ? (
                      <MonitorSmartphone className="h-6 w-6" />
                    ) : index === 1 ? (
                      <Tv className="h-6 w-6" />
                    ) : (
                      <Laptop className="h-6 w-6" />
                    )}
                  </div>
                  <CardTitle className="text-lg sm:text-xl">{project.title}</CardTitle>
                  <CardDescription className="text-gray-400 text-sm sm:text-base">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="border-white/20 text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="link" className="text-white p-0 text-sm" onClick={() => handleProjectClick(project)}>
                    View Project <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </StaggeredFadeIn>
        </div>

        <FadeIn delay={1400}>
          <div className="text-center mt-8 sm:mt-12">
            <Button variant="outline" className="border-white/20">
              <Link href="/projects" className="flex items-center">
                View All Projects (My Landlord Thanks You)
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </FadeIn>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <FadeIn delay={1600}>
          <div className="text-center space-y-4 mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Get In Touch</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
              Want to help me pay my rent? Or discuss which anime is the GOAT? I'm all ears. Especially if you're
              offering work that pays actual money.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={1800}>
          <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 md:p-12 max-w-3xl mx-auto">
            <form className="space-y-6" onSubmit={handleContactSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name (or your favorite anime character)
                  </label>
                  <input
                    id="name"
                    name="name"
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-white/50 text-sm sm:text-base"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email (I check this more than my bank account)
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-white/50 text-sm sm:text-base"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject (Please include "$$" if you're offering work)
                </label>
                <input
                  id="subject"
                  name="subject"
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-white/50 text-sm sm:text-base"
                  placeholder="What's this about?"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message (Budget and anime recommendations welcome)
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-white/50 text-sm sm:text-base"
                  placeholder="I have a project that can help pay for your next anime season..."
                  required
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="anime-fan"
                  name="anime-fan"
                  className="rounded border-white/20 bg-white/10"
                />
                <label htmlFor="anime-fan" className="text-sm text-gray-300">
                  I'm also an anime fan (gets priority response, even over rent-paying opportunities)
                </label>
              </div>
              <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200">
                Send Message (Please Be Hiring)
              </Button>
              <p className="text-xs text-center text-gray-400">
                Response time: 24-48 hours (faster if you mentioned anime or money)
              </p>
            </form>
          </div>
        </FadeIn>
      </section>

      {/* Footer */}
      <FadeIn delay={2000}>
        <footer className="border-t border-white/10 py-8">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl">VM</span>
                <span className="text-sm text-gray-400">© {new Date().getFullYear()} Victor Matthew</span>
              </div>
              <p className="text-sm text-gray-400 text-center md:text-left">
                Built with code, caffeine, and the motivation to watch more anime without buffering.
              </p>
              <div className="flex gap-4">
                <Link href="#" className="text-gray-400 hover:text-white">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </Link>
              </div>
            </div>
            <div className="text-center mt-4 text-xs text-gray-500">
              No anime subscriptions were cancelled during the making of this website. The same cannot be said for
              meals.
            </div>
          </div>
        </footer>
      </FadeIn>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
      />

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        isAnimeSelected={isAnimeSelected}
      />
    </div>
  )
}
