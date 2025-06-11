"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Project } from "@/components/project-modal"

// Extended project data with more details
const projectsData: Project[] = [
  {
    id: "rentpay-reminder",
    title: "RentPay Reminder",
    description: "Because my landlord doesn't accept 'I was watching the season finale' as payment.",
    longDescription:
      "RentPay Reminder was born after my third 'final notice' letter. It sends notifications before rent is due, tracks payment history, and even suggests freelance opportunities when your bank account is looking as empty as my fridge the day before payday. The app has saved me from eviction at least twice, which means I've saved enough on moving costs to afford another year of anime subscriptions.",
    challenges:
      "The main challenge was creating a system that could integrate with various payment platforms while being more reliable than my promises to 'watch just one more episode' before bed. Also, convincing my landlord to accept partial payments in the form of 'I'll fix your website' was surprisingly difficult.",
    solutions:
      "I implemented OAuth 2.0 for secure authentication and used Plaid API for safe bank account integration. The notification system is more persistent than a shounen protagonist facing the final boss. It starts with gentle reminders 10 days before rent is due, escalating to panic mode with flashing red alerts and automatic job search queries by day 3.",
    tags: ["React", "Node.js", "MongoDB", "Express"],
    image: "/placeholder.svg?height=400&width=800",
    screenshots: [
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
    ],
    demoUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: "animetrackr",
    title: "AnimeTrackr",
    description: "Helping me budget between instant ramen and premium Crunchyroll since 2023.",
    longDescription:
      "AnimeTrackr is the ultimate tool for anime enthusiasts who need to budget their entertainment expenses. It connects to popular streaming services to track subscription costs and calculates exactly how many freelance hours you need to work to support your anime habit. The app has a special 'Cup Noodle Mode' that shows you how many meals you can skip to afford the premium subscription tier.",
    challenges:
      "Integrating with multiple streaming platforms was harder than explaining to my landlord why I need high-speed internet more than a working refrigerator. Also, the algorithm kept suggesting I work 36 hours per day to support my watching habits, which seemed slightly unrealistic.",
    solutions:
      "I built a unified API wrapper that standardizes data from different streaming services. The work hour calculator uses an algorithm more complex than the plot of Neon Genesis Evangelion. It factors in your average hourly rate, taxes, and even accounts for seasonal anime releases to predict future expenses. The 'Reality Check' feature gently reminds you that maybe you don't need to watch EVERY new show this season.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Prisma"],
    image: "/placeholder.svg?height=400&width=800",
    screenshots: [
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
    ],
    demoUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  // Add more projects as needed
]

export default function ProjectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)

  useEffect(() => {
    const slug = params.slug as string
    const foundProject = projectsData.find((p) => p.id === slug)

    if (foundProject) {
      setProject(foundProject)
    } else {
      router.push("/projects")
    }
  }, [params.slug, router])

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl">Loading project details... (or I'm watching anime, hard to tell)</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 backdrop-blur-lg bg-black/50">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="font-bold text-xl">
            <span className="text-white">VM</span>
            <span className="text-gray-400">.</span>
            <span className="text-xs text-gray-500 ml-1">(Viewing Manga)</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/#about" className="text-sm hover:text-white text-gray-300 transition-colors">
              About
            </Link>
            <Link href="/#skills" className="text-sm hover:text-white text-gray-300 transition-colors">
              Skills
            </Link>
            <Link href="/projects" className="text-sm text-white transition-colors">
              Projects
            </Link>
            <Link href="/#contact" className="text-sm hover:text-white text-gray-300 transition-colors">
              Contact
            </Link>
          </nav>
          <Button variant="outline" className="border-white/20 hover:bg-white hover:text-black transition-colors">
            <Link href="/#contact" className="flex items-center">
              Fund My Anime Habit
            </Link>
          </Button>
        </div>
      </header>

      {/* Project Hero */}
      <section className="container py-12 md:py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <Link href="/projects" className="text-sm text-gray-400 hover:text-white flex items-center mb-2">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Projects (Pause Anime)
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{project.title}</h1>
          </div>
          <div className="flex gap-3">
            <Button asChild>
              <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
                <ExternalLink className="mr-2 h-4 w-4" />
                Live Demo (Rent-Funded)
              </Link>
            </Button>
            <Button variant="outline" asChild className="border-white/20">
              <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
                <Github className="mr-2 h-4 w-4" />
                View Code (Written at 3AM)
              </Link>
            </Button>
          </div>
        </div>

        <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <img src={project.image || "/placeholder.svg"} alt={project.title} className="w-full h-auto object-cover" />
        </div>
      </section>

      {/* Project Details */}
      <section className="container py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid grid-cols-3 mb-8">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="challenges">Challenges</TabsTrigger>
                  <TabsTrigger value="solutions">Solutions</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                  <h2 className="text-2xl font-bold">
                    Project Overview (or "Why I Built This Instead of Watching Anime")
                  </h2>
                  <p className="text-gray-300">{project.longDescription}</p>
                </TabsContent>
                <TabsContent value="challenges" className="space-y-4">
                  <h2 className="text-2xl font-bold">Challenges (Besides Staying Awake)</h2>
                  <p className="text-gray-300">{project.challenges}</p>
                </TabsContent>
                <TabsContent value="solutions" className="space-y-4">
                  <h2 className="text-2xl font-bold">Solutions (After Many Cups of Coffee)</h2>
                  <p className="text-gray-300">{project.solutions}</p>
                </TabsContent>
              </Tabs>
            </div>

            {project.screenshots && project.screenshots.length > 0 && (
              <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-6">Screenshots (Taken Between Episodes)</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.screenshots.map((screenshot, index) => (
                    <div key={index} className="rounded-lg overflow-hidden">
                      <img
                        src={screenshot || "/placeholder.svg"}
                        alt={`Screenshot ${index + 1}`}
                        className="w-full h-auto"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">Project Details</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm text-gray-400">Project Type</h4>
                  <p>
                    {project.featured
                      ? "Featured Project (Paid Multiple Months of Rent)"
                      : "Personal Project (Paid for Anime Only)"}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm text-gray-400">Technologies</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="border-white/20">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm text-gray-400">Development Fuel</h4>
                  <p>Coffee: ☕☕☕☕☕</p>
                  <p>Anime Episodes Missed: 37</p>
                </div>
                <div>
                  <h4 className="text-sm text-gray-400">Links</h4>
                  <div className="flex flex-col gap-2 mt-2">
                    <Link
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-gray-300 flex items-center"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </Link>
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-gray-300 flex items-center"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      Source Code (Comments Written at 3AM)
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">Need something similar?</h3>
              <p className="text-gray-300 mb-4">
                If you're interested in a project like this, let's discuss how I can help you bring your ideas to life.
                My rates are directly proportional to my current anime watchlist and rent due date.
              </p>
              <Button className="w-full bg-white text-black hover:bg-gray-200">
                <Link href="/#contact" className="flex items-center justify-center w-full">
                  Fund My Next Project (and Anime Season)
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 mt-12">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-xl">VM</span>
              <span className="text-sm text-gray-400">© {new Date().getFullYear()} Victor Matthew</span>
            </div>
            <p className="text-sm text-gray-400">
              Built with code, caffeine, and the motivation to watch more anime without buffering.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-gray-400 hover:text-white">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>
          <div className="text-center mt-4 text-xs text-gray-500">
            This project was completed in the time it would take to watch approximately 2.5 seasons of a standard anime.
          </div>
        </div>
      </footer>
    </div>
  )
}
