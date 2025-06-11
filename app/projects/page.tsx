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
    iframeUrls: [
      "https://ebony-life.vercel.app",
      "https://ebony-life.vercel.app/cinema",
    ],
    iframeDescriptions: [
      "Main dashboard showing rent tracking and payment history",
      "Calendar view with rent due dates and payment reminders",
    ],
    demoUrl: "ebony-life.vercel.app",
    githubUrl: "https://github.com/Mathvic456/ebony-life",
    featured: true,
    category: "fullstack",
    developmentTime: "3 weeks (and 2 sleepless nights)",
    coffeeConsumed: 47,
    episodesMissed: 23,
    rentMonthsPaid: 4,
  },
  {
    title: "Mental Health Agency Landing Page",
    description:
      "A landing page for a mental health agency that was so calming, it made my landlord forget I was late on rent.",
    longDescription:
      "This project involved creating a landing page for a mental health agency that needed to convey trust, professionalism, and a sense of calm. The design features soothing colors, clear typography, and an easy-to-navigate layout that guides users to important resources.",
    challenges:
      "The biggest challenge was balancing the need for a professional appearance with the sensitive nature of the content. Also, trying to make a mental health agency's website feel less like a therapy session and more like a friendly chat took some creative design work.",
    solutions:
      "I focused on a minimalist design approach, using soft colors and ample white space to create a calming effect. The site includes sections for resources, contact information, and a blog that provides helpful tips for mental well-being.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Prisma"],
    image: "/placeholder.svg?height=300&width=400",
    iframeUrls: [
      "https://mind-heal-ngo.vercel.app/",
      "https://mind-heal-ngo.vercel.app/",
    ],
    iframeDescriptions: [
      "Anime watchlist with subscription cost tracking",
      "Work hour calculator based on anime watching goals",
    ],
    demoUrl: "https://mind-heal-ngo.vercel.app/",
    githubUrl: "https://github.com/Mathvic456/Tar-ngo",
    featured: true,
    category: "frontend",
    developmentTime: "2 weeks (during anime hiatus)",
    coffeeConsumed: 31,
    episodesMissed: 15,
    rentMonthsPaid: 2,
  },
  {
    title: "Fashion E-commerce Platform",
    description:
      "An e-commerce platform for a fashion brand that was so stylish, it made my wardrobe look like a thrift store.",
    longDescription:
      "This project involved building a full-fledged e-commerce platform for a fashion brand, complete with product listings, a shopping cart, and a secure checkout process. The design focuses on showcasing the brand's unique style while providing a seamless shopping experience.",
    challenges:
      "The biggest challenge was integrating a secure payment gateway while ensuring the site remained user-friendly. Also, convincing the client that 'more sequins' is not always the answer took some negotiation.",
    solutions:
      "I implemented a robust e-commerce solution using Next.js and Stripe for secure payments. The site features a clean, modern design with high-quality product images, easy navigation, and a responsive layout that works well on all devices.",
    tags: ["React", "GSAP", "Styled Components"],
    image: "/placeholder.svg?height=300&width=400",
    iframeUrls: [
      "https://fashion-ecommerce-store.vercel.app/",
      "https://fashion-ecommerce-store.vercel.app/products",
    ],
    iframeDescriptions: [
      "Portfolio template with customizable sections",
      "Theme customizer showing different layout options",
    ],
    demoUrl: "https://fashion-ecommerce-store.vercel.app/",
    githubUrl: "https://github.com/Mathvic456/fahsion-store",
    featured: true,
    category: "design",
    developmentTime: "4 weeks (perfectionist mode)",
    coffeeConsumed: 62,
    episodesMissed: 31,
    rentMonthsPaid: 3,
  },
  {
    title: "Pureline Interior Designs",
    description:
      "A website for an interior design agency that was so sleek, it made my landlord consider redecorating my apartment.",
    longDescription:
      "A complete redesign of the Pureline Interior Designs website, transforming it from a basic static site into a dynamic, user-friendly platform that reflects the brand's modern aesthetic. The new design includes an interactive portfolio, service descriptions, and a contact form for inquiries.",
    challenges:
      "The biggest challenge was working with outdated design assets and a lack of clear brand guidelines. Also, convincing the client that 'more marble' is not always the answer took some negotiation.",
    solutions:
      "I implemented a modern design system using Figma for prototyping and collaborated closely with the client to ensure the new design met their vision. The site now features smooth animations, a responsive layout, and an intuitive user interface that makes browsing their portfolio a pleasure.",
    tags: ["React Native", "Lucide react", "Firebase", "Tailwind CSS", "Next.js"],
    image: "/placeholder.svg?height=300&width=400",
    iframeUrls: ["https://pureline-12v5.vercel.app/"],
    iframeDescriptions: ["Restaurant website with interactive features"],
    demoUrl: "https://pureline-12v5.vercel.app/",
    githubUrl: "https://github.com/Mathvic456/pureline",
    category: "frontend",
    developmentTime: "3 weeks",
    coffeeConsumed: 28,
    episodesMissed: 12,
    rentMonthsPaid: 1,
  },
  {
    title: "Avenue Suites",
    description:
      "A hotel booking platform that was so luxurious, it made my landlord consider a career change.",
    longDescription:
      "Avenue Suites is a hotel booking platform that allows users to search for and book rooms at various hotels. The site features a clean, modern design with easy navigation, a powerful search engine, and a secure booking process.",
    challenges:
      "Integrating with multiple hotel APIs while ensuring a consistent user experience was a challenge. Also, convincing the client that 'more marble' is not always the answer took some negotiation.",
    solutions:
      "I implemented a robust backend using Node.js and Express to handle API requests and manage bookings. The frontend is built with React, providing a responsive design that works seamlessly on all devices. The site includes features like room availability checking, booking management, and user reviews.",
    tags: ["Vue.js", "Node.js", "MongoDB", "Socket.io"],
    image: "/placeholder.svg?height=300&width=400",
    iframeUrls: [
      "https://avenue-suites.vercel.app/",
      "https://avenue-suites.vercel.app/rooms",
    ],
    iframeDescriptions: [
      "Avenue Suites homepage with booking options",
      "Avenue Suites room listings with filters and search",
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
    title: "Sky mart e-commerce",
    description:
      "An e-commerce platform that was so sleek, it made my landlord consider selling his own products online.",
    longDescription:
      "Sky Mart is a comprehensive e-commerce platform that allows users to browse and purchase a wide range of products. The site features a modern design, intuitive navigation, and a secure checkout process, making online shopping a breeze.",
    challenges:
      "Integrating a secure payment gateway while ensuring the site remained user-friendly was a challenge. Also, convincing the client that 'more neon' is not always the answer took some negotiation.",
    solutions:
      "I implemented a robust e-commerce solution using Next.js and Stripe for secure payments. The site features a clean, modern design with high-quality product images, easy navigation, and a responsive layout that works well on all devices. The platform includes features like product reviews, wish lists, and order tracking.",
    tags: ["React", "Redux", "TMDB API"],
    image: "/placeholder.svg?height=300&width=400",
    iframeUrls: ["https://v0-e-commerce-platform-design-gilt.vercel.app/"],
    iframeDescriptions: [""],
    demoUrl: "https://v0-e-commerce-platform-design-gilt.vercel.app/",
    githubUrl: "https://github.com/Mathvic456/skymart",
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
