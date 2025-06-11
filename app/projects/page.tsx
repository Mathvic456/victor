"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Github, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProjectDetailsModal, type ProjectDetails } from "@/components/project-details-modal"
import { MobileNav } from "@/components/mobile-nav"
import { FadeIn } from "@/components/fade-in"
import { LoadingSpinner, ProjectCardSkeleton } from "@/components/loading"

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<ProjectDetails | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  const handleViewDetails = (project: ProjectDetails) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <header className="sticky top-0 z-50 w-full border-b border-white/10 backdrop-blur-lg bg-black/50">
          <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="font-bold text-lg sm:text-xl">
              <span className="text-white">VM</span>
              <span className="text-gray-400">.</span>
            </div>
            <LoadingSpinner />
          </div>
        </header>
        <div className="container py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 backdrop-blur-lg bg-black/50">
        <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="font-bold text-lg sm:text-xl">
            <span className="text-white">VM</span>
            <span className="text-gray-400">.</span>
            <span className="text-xs text-gray-500 ml-1 hidden sm:inline">(Viewing Manga)</span>
          </Link>

          {/* Desktop Navigation */}
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

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="border-white/20 hover:bg-white hover:text-black transition-colors hidden sm:flex"
            >
              <Link href="/#contact" className="flex items-center">
                <span className="hidden lg:inline">Fund My Anime Habit</span>
                <span className="lg:hidden">Hire Me</span>
              </Link>
            </Button>

            <MobileNav />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Projects</h1>
              <p className="text-gray-400 mt-2">
                A showcase of work that keeps my landlord happy and my anime queue flowing. Each pixel was carefully
                placed between episodes. Now with interactive demos!
              </p>
            </div>
            <Link href="/">
              <Button variant="outline" className="border-white/20">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home (Pause Anime)
              </Button>
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* Filter and Projects Section */}
      <section className="container py-8">
        <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search projects (or 'rent due')"
                className="pl-10 bg-white/10 border-white/20 w-full"
              />
            </div>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid grid-cols-4 w-full md:w-auto mb-8">
              <TabsTrigger value="all">All Projects</TabsTrigger>
              <TabsTrigger value="frontend">Rent Payers</TabsTrigger>
              <TabsTrigger value="fullstack">Bill Settlers</TabsTrigger>
              <TabsTrigger value="design">Anime Funders</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                  <ProjectCard key={index} project={project} onViewDetails={handleViewDetails} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="frontend" className="mt-0">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects
                  .filter((p) => p.category === "frontend")
                  .map((project, index) => (
                    <ProjectCard key={index} project={project} onViewDetails={handleViewDetails} />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="fullstack" className="mt-0">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects
                  .filter((p) => p.category === "fullstack")
                  .map((project, index) => (
                    <ProjectCard key={index} project={project} onViewDetails={handleViewDetails} />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="design" className="mt-0">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects
                  .filter((p) => p.category === "design")
                  .map((project, index) => (
                    <ProjectCard key={index} project={project} onViewDetails={handleViewDetails} />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
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
            Project completion times may vary based on seasonal anime release schedules.
          </div>
        </div>
      </footer>

      {/* Project Details Modal */}
      <ProjectDetailsModal project={selectedProject} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}

// Enhanced project data with iframe URLs instead of screenshots
const projects: ProjectDetails[] = [
  {
    title: "RentPay Reminder",
    description:
      "Because my landlord doesn't accept 'I was watching the season finale' as payment. Features include panic mode when you're 3 days from eviction.",
    longDescription:
      "RentPay Reminder was born after my third 'final notice' letter. It sends notifications before rent is due, tracks payment history, and even suggests freelance opportunities when your bank account is looking as empty as my fridge the day before payday. The app has saved me from eviction at least twice, which means I've saved enough on moving costs to afford another year of anime subscriptions.",
    challenges:
      "The main challenge was creating a system that could integrate with various payment platforms while being more reliable than my promises to 'watch just one more episode' before bed. Also, convincing my landlord to accept partial payments in the form of 'I'll fix your website' was surprisingly difficult.",
    solutions:
      "I implemented OAuth 2.0 for secure authentication and used Plaid API for safe bank account integration. The notification system is more persistent than a shounen protagonist facing the final boss. It starts with gentle reminders 10 days before rent is due, escalating to panic mode with flashing red alerts and automatic job search queries by day 3.",
    tags: ["React", "Node.js", "MongoDB", "Express"],
    image: "/placeholder.svg?height=300&width=400",
    iframeUrls: [
      "https://codesandbox.io/embed/react-dashboard-demo?fontsize=14&hidenavigation=1&theme=dark",
      "https://codesandbox.io/embed/react-calendar-demo?fontsize=14&hidenavigation=1&theme=dark",
    ],
    iframeDescriptions: [
      "Main dashboard showing rent tracking and payment history",
      "Calendar view with rent due dates and payment reminders",
    ],
    demoUrl: "#",
    githubUrl: "#",
    featured: true,
    category: "fullstack",
    developmentTime: "3 weeks (and 2 sleepless nights)",
    coffeeConsumed: 47,
    episodesMissed: 23,
    rentMonthsPaid: 4,
  },
  {
    title: "AnimeTrackr",
    description:
      "Helping me budget between instant ramen and premium Crunchyroll since 2023. Includes a 'Skip Lunch' calculator to afford more episodes.",
    longDescription:
      "AnimeTrackr is the ultimate tool for anime enthusiasts who need to budget their entertainment expenses. It connects to popular streaming services to track subscription costs and calculates exactly how many freelance hours you need to work to support your anime habit. The app has a special 'Cup Noodle Mode' that shows you how many meals you can skip to afford the premium subscription tier.",
    challenges:
      "Integrating with multiple streaming platforms was harder than explaining to my landlord why I need high-speed internet more than a working refrigerator. Also, the algorithm kept suggesting I work 36 hours per day to support my watching habits, which seemed slightly unrealistic.",
    solutions:
      "I built a unified API wrapper that standardizes data from different streaming services. The work hour calculator uses an algorithm more complex than the plot of Neon Genesis Evangelion. It factors in your average hourly rate, taxes, and even accounts for seasonal anime releases to predict future expenses.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Prisma"],
    image: "/placeholder.svg?height=300&width=400",
    iframeUrls: [
      "https://codesandbox.io/embed/anime-tracker-demo?fontsize=14&hidenavigation=1&theme=dark",
      "https://codesandbox.io/embed/budget-calculator-demo?fontsize=14&hidenavigation=1&theme=dark",
    ],
    iframeDescriptions: [
      "Anime watchlist with subscription cost tracking",
      "Work hour calculator based on anime watching goals",
    ],
    demoUrl: "#",
    githubUrl: "#",
    featured: true,
    category: "frontend",
    developmentTime: "2 weeks (during anime hiatus)",
    coffeeConsumed: 31,
    episodesMissed: 15,
    rentMonthsPaid: 2,
  },
  {
    title: "DevFolio",
    description:
      "For developers whose GitHub activity graph peaks right before rent is due. Includes a 'Desperation Level' indicator for potential clients.",
    longDescription:
      "DevFolio is a customizable portfolio template specifically designed for developers who want to showcase not just their technical skills, but also what motivates them to code. In my case: avoiding homelessness and maintaining my anime streaming subscriptions. The template includes sections for personal interests and how they connect to your development journey.",
    challenges:
      "Creating a template that was both professional enough for potential employers but also personal enough to showcase individual passions was like trying to balance my budget between rent and the latest limited edition anime figurines.",
    solutions:
      "I designed the template with a modular approach, allowing users to emphasize either the professional or personal aspects depending on their audience. Like how I switch between 'responsible adult' and 'otaku' depending on who I'm talking to.",
    tags: ["React", "GSAP", "Styled Components"],
    image: "/placeholder.svg?height=300&width=400",
    iframeUrls: [
      "https://codesandbox.io/embed/portfolio-template-demo?fontsize=14&hidenavigation=1&theme=dark",
      "https://codesandbox.io/embed/portfolio-customizer-demo?fontsize=14&hidenavigation=1&theme=dark",
    ],
    iframeDescriptions: [
      "Portfolio template with customizable sections",
      "Theme customizer showing different layout options",
    ],
    demoUrl: "#",
    githubUrl: "#",
    featured: true,
    category: "design",
    developmentTime: "4 weeks (perfectionist mode)",
    coffeeConsumed: 62,
    episodesMissed: 31,
    rentMonthsPaid: 3,
  },
  {
    title: "Ebony-Life Website Revamp",
    description:
      "A complete overhaul of a resturant/lounge/hotel website that was too basic for my liking. Now it has more flair than even ric flair",
    longDescription:
      "A complete redesign of the Ebony-Life website, transforming it from a basic static site into a dynamic, user-friendly platform that reflects the brand's vibrant personality. The new design includes an interactive menu, booking system, and a gallery showcasing the venue's ambiance.",
    challenges:
      "The biggest challenge was working with outdated design assets and a lack of clear brand guidelines. Also, convincing the client that 'more neon' is not always the answer took some negotiation.",
    solutions:
      "I implemented a modern design system using Figma for prototyping and collaborated closely with the client to ensure the new design met their vision. The site now features smooth animations, a responsive layout, and an intuitive user interface that makes booking a table as easy as ordering takeout.",
    tags: ["React Native", "Lucide react", "Firebase", "Tailwind CSS", "Next.js"],
    image: "/placeholder.svg?height=300&width=400",
    iframeUrls: ["ebony-life.vercel.app"],
    iframeDescriptions: ["Restaurant website with interactive features"],
    demoUrl: "ebony-life.vercel.app",
    githubUrl: "#",
    category: "frontend",
    developmentTime: "3 weeks",
    coffeeConsumed: 28,
    episodesMissed: 12,
    rentMonthsPaid: 1,
  },
  {
    title: "Code4Ramen",
    description:
      "Freelance job board specifically for developers who work to fund their hobbies. Filter by 'Rent Due Date' and 'Anime Season Premieres'.",
    longDescription:
      "Code4Ramen is a freelance platform that understands developers have priorities beyond just coding. Whether you're funding your anime addiction, gaming setup, or just trying to keep the lights on, this platform connects you with clients who appreciate honesty about your motivations.",
    challenges:
      "Building a job board that could handle real-time updates while maintaining user privacy was complex. Also, convincing clients that 'I need money for anime' is a valid motivation took some creative marketing.",
    solutions:
      "I implemented Socket.io for real-time job updates and created a unique matching algorithm that considers both technical skills and personal deadlines. The platform now has a 'Desperation Mode' that prioritizes urgent financial needs.",
    tags: ["Vue.js", "Node.js", "MongoDB", "Socket.io"],
    image: "/placeholder.svg?height=300&width=400",
    iframeUrls: [
      "https://codesandbox.io/embed/job-board-demo?fontsize=14&hidenavigation=1&theme=dark",
      "https://codesandbox.io/embed/freelancer-dashboard-demo?fontsize=14&hidenavigation=1&theme=dark",
    ],
    iframeDescriptions: [
      "Job board with unique filtering options",
      "Freelancer dashboard with desperation mode indicator",
    ],
    demoUrl: "#",
    githubUrl: "#",
    category: "fullstack",
    developmentTime: "5 weeks",
    coffeeConsumed: 73,
    episodesMissed: 42,
    rentMonthsPaid: 6,
  },
  {
    title: "BingeCalculator",
    description:
      "Calculates how much time you need to binge-watch a series, then converts that into billable hours needed to avoid eviction.",
    longDescription:
      "BingeCalculator helps you plan your anime watching schedule around your work commitments. Input a series, and it calculates total watch time, suggests optimal binge schedules, and most importantly, tells you how many freelance hours you need to work to afford the time off.",
    challenges:
      "Integrating with multiple anime databases while handling different episode lengths and special episodes was tricky. The hardest part was making the work-hour calculations realistic instead of depressing.",
    solutions:
      "I used TMDB API for comprehensive anime data and created a smart algorithm that factors in your hourly rate, living expenses, and even includes buffer time for 'just one more episode' syndrome.",
    tags: ["React", "Redux", "TMDB API"],
    image: "/placeholder.svg?height=300&width=400",
    iframeUrls: ["https://codesandbox.io/embed/binge-calculator-demo?fontsize=14&hidenavigation=1&theme=dark"],
    iframeDescriptions: ["Binge calculator showing time and cost analysis for anime series"],
    demoUrl: "#",
    githubUrl: "#",
    category: "frontend",
    developmentTime: "3 weeks",
    coffeeConsumed: 39,
    episodesMissed: 18,
    rentMonthsPaid: 2,
  },
]

// Project Card Component with modal functionality
interface ProjectCardProps {
  project: ProjectDetails
  onViewDetails: (project: ProjectDetails) => void
}

function ProjectCard({ project, onViewDetails }: ProjectCardProps) {
  return (
    <Card className="backdrop-blur-lg bg-white/5 border border-white/10 text-white overflow-hidden group">
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
        <img
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
        {project.iframeUrls && project.iframeUrls.length > 0 && (
          <div className="absolute top-2 right-2 z-20">
            <Badge className="bg-green-500 text-black text-xs">Interactive Demo</Badge>
          </div>
        )}
      </div>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {project.title}
          {project.featured && <Badge className="bg-white text-black hover:bg-gray-200">Paid Rent</Badge>}
        </CardTitle>
        <CardDescription className="text-gray-400 line-clamp-2">{project.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="border-white/20">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" className="border-white/20" onClick={() => onViewDetails(project)}>
          {project.iframeUrls && project.iframeUrls.length > 0 ? "Try Interactive Demo" : "View Details"}
        </Button>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
              <span className="sr-only">Live Demo</span>
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
