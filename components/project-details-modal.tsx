"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink, Github, X, Calendar, Coffee, Tv, Monitor } from "lucide-react"
import Link from "next/link"

export type ProjectDetails = {
  title: string
  description: string
  longDescription: string
  challenges: string
  solutions: string
  tags: string[]
  image: string
  demoUrl: string
  githubUrl: string
  featured?: boolean
  category: string
  developmentTime?: string
  coffeeConsumed?: number
  episodesMissed?: number
  rentMonthsPaid?: number
  // Updated to use iframe URLs instead of screenshots
  iframeUrls?: string[]
  iframeDescriptions?: string[]
}

interface ProjectDetailsModalProps {
  project: ProjectDetails | null
  isOpen: boolean
  onClose: () => void
}

export function ProjectDetailsModal({ project, isOpen, onClose }: ProjectDetailsModalProps) {
  if (!project) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="backdrop-blur-lg bg-black/95 border border-white/10 text-white max-w-7xl w-[95vw] h-[90vh] p-0 overflow-hidden">
        {/* Fixed Header */}
        <DialogHeader className="sticky top-0 z-10 backdrop-blur-lg bg-black/80 border-b border-white/10 p-4 md:p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                <DialogTitle className="text-xl md:text-2xl lg:text-3xl font-bold truncate">
                  {project.title}
                </DialogTitle>
                {project.featured && (
                  <Badge className="bg-white text-black hover:bg-gray-200 text-xs sm:text-sm shrink-0">
                    Paid {project.rentMonthsPaid || 3} Months Rent
                  </Badge>
                )}
              </div>
              <p className="text-gray-400 text-sm md:text-base lg:text-lg line-clamp-2">{project.description}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 ml-2 shrink-0">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </DialogHeader>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Hero Image */}
              <div className="relative h-48 sm:h-64 md:h-80 overflow-hidden rounded-xl backdrop-blur-lg bg-white/5 border border-white/10">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="border-white/30 bg-black/50 backdrop-blur-sm text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Project Details Tabs */}
              <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl p-4 md:p-6">
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid grid-cols-3 mb-4 md:mb-6 w-full">
                    <TabsTrigger value="overview" className="text-xs sm:text-sm">
                      Overview
                    </TabsTrigger>
                    <TabsTrigger value="challenges" className="text-xs sm:text-sm">
                      Challenges
                    </TabsTrigger>
                    <TabsTrigger value="solutions" className="text-xs sm:text-sm">
                      Solutions
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-4">
                    <h3 className="text-lg md:text-xl font-bold">Why I Built This Instead of Watching Anime</h3>
                    <p className="text-gray-300 leading-relaxed text-sm md:text-base">{project.longDescription}</p>
                  </TabsContent>

                  <TabsContent value="challenges" className="space-y-4">
                    <h3 className="text-lg md:text-xl font-bold">Challenges (Besides Staying Awake)</h3>
                    <p className="text-gray-300 leading-relaxed text-sm md:text-base">{project.challenges}</p>
                  </TabsContent>

                  <TabsContent value="solutions" className="space-y-4">
                    <h3 className="text-lg md:text-xl font-bold">Solutions (After Many Cups of Coffee)</h3>
                    <p className="text-gray-300 leading-relaxed text-sm md:text-base">{project.solutions}</p>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Interactive Demos */}
              {project.iframeUrls && project.iframeUrls.length > 0 && (
                <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl p-4 md:p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Monitor className="h-5 w-5" />
                    <h3 className="text-lg md:text-xl font-bold">Live Demos (Built Between Episodes)</h3>
                  </div>
                  <div className="space-y-6">
                    {project.iframeUrls.map((url, index) => (
                      <div key={index} className="space-y-3">
                        {project.iframeDescriptions && project.iframeDescriptions[index] && (
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="border-white/20 text-xs">
                              Demo {index + 1}
                            </Badge>
                            <p className="text-sm text-gray-400">{project.iframeDescriptions[index]}</p>
                          </div>
                        )}
                        <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden border border-white/10 bg-white/5">
                          <iframe
                            src={url}
                            title={`${project.title} Demo ${index + 1}`}
                            className="w-full h-full"
                            frameBorder="0"
                            allowFullScreen
                            loading="lazy"
                            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
                          />
                          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/10 to-transparent" />
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>Interactive demo - Click to explore</span>
                          <Link
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 hover:text-white transition-colors"
                          >
                            <ExternalLink className="h-3 w-3" />
                            Open in new tab
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Project Stats */}
              <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl p-4 md:p-6">
                <h3 className="text-lg font-bold mb-4">Project Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-white/10 p-2 rounded-full shrink-0">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-gray-400">Development Time</p>
                      <p className="font-medium text-sm md:text-base truncate">
                        {project.developmentTime || "3 weeks"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-white/10 p-2 rounded-full shrink-0">
                      <Coffee className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-gray-400">Coffee Consumed</p>
                      <p className="font-medium text-sm md:text-base">{project.coffeeConsumed || 47} cups</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-white/10 p-2 rounded-full shrink-0">
                      <Tv className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-gray-400">Episodes Missed</p>
                      <p className="font-medium text-sm md:text-base">{project.episodesMissed || 23} episodes</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/10">
                    <p className="text-sm text-gray-400">Category</p>
                    <Badge variant="outline" className="border-white/20 mt-1 text-xs">
                      {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl p-4 md:p-6">
                <h3 className="text-lg font-bold mb-4">Check It Out</h3>
                <div className="space-y-3">
                  <Button asChild className="w-full bg-white text-black hover:bg-gray-200 text-sm">
                    <Link
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo (Rent-Funded)
                    </Link>
                  </Button>

                  <Button variant="outline" asChild className="w-full border-white/20 text-sm">
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      View Code (Written at 3AM)
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Fun Facts */}
              <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl p-4 md:p-6">
                <h3 className="text-lg font-bold mb-4">Fun Facts</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-gray-400 shrink-0">💡</span>
                    <p className="text-gray-300">
                      This project helped pay for {project.rentMonthsPaid || 3} months of rent and approximately 2 anime
                      streaming subscriptions.
                    </p>
                  </div>

                  <div className="flex items-start gap-2">
                    <span className="text-gray-400 shrink-0">⚡</span>
                    <p className="text-gray-300">
                      Built during {Math.floor((project.episodesMissed || 23) / 12)} power outages (welcome to Nigeria).
                    </p>
                  </div>

                  <div className="flex items-start gap-2">
                    <span className="text-gray-400 shrink-0">🍜</span>
                    <p className="text-gray-300">
                      Survived on instant noodles for {Math.floor((project.coffeeConsumed || 47) / 7)} days during
                      development.
                    </p>
                  </div>

                  {project.iframeUrls && project.iframeUrls.length > 0 && (
                    <div className="flex items-start gap-2">
                      <span className="text-gray-400 shrink-0">🖥️</span>
                      <p className="text-gray-300">
                        Interactive demos available above - no need to imagine how it works!
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Hire Me CTA */}
              <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl p-4 md:p-6">
                <h3 className="text-lg font-bold mb-2">Need Something Similar?</h3>
                <p className="text-gray-300 text-sm mb-4">
                  If you're interested in a project like this, let's discuss how I can help you bring your ideas to
                  life. My rates are directly proportional to my current anime watchlist and rent due date.
                </p>
                <Button className="w-full bg-white text-black hover:bg-gray-200 text-sm" onClick={onClose}>
                  <Link href="/#contact" className="flex items-center justify-center w-full">
                    Fund My Next Project
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
