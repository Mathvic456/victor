"use client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, X } from "lucide-react"
import Link from "next/link"

export type Project = {
  id?: string
  title: string
  description: string
  tags: string[]
  image: string
  demoUrl: string
  githubUrl: string
  featured?: boolean
  longDescription?: string
  challenges?: string
  solutions?: string
  screenshots?: string[]
}

interface ProjectModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!project) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="backdrop-blur-lg bg-black/80 border border-white/10 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">{project.title}</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          <DialogDescription className="text-gray-400">{project.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="relative h-64 md:h-80 overflow-hidden rounded-lg">
            <img src={project.image || "/placeholder.svg"} alt={project.title} className="w-full h-full object-cover" />
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="border-white/20">
                {tag}
              </Badge>
            ))}
          </div>

          {project.longDescription && (
            <div>
              <h3 className="text-lg font-medium mb-2">Overview (or "Why I Built This Instead of Watching Anime")</h3>
              <p className="text-gray-300">{project.longDescription}</p>
            </div>
          )}

          {project.challenges && (
            <div>
              <h3 className="text-lg font-medium mb-2">Challenges (Besides Staying Awake)</h3>
              <p className="text-gray-300">{project.challenges}</p>
            </div>
          )}

          {project.solutions && (
            <div>
              <h3 className="text-lg font-medium mb-2">Solutions (After Many Cups of Coffee)</h3>
              <p className="text-gray-300">{project.solutions}</p>
            </div>
          )}

          {project.screenshots && project.screenshots.length > 0 && (
            <div>
              <h3 className="text-lg font-medium mb-2">Screenshots (Taken Between Episodes)</h3>
              <div className="grid grid-cols-2 gap-4">
                {project.screenshots.map((screenshot, index) => (
                  <div key={index} className="relative h-40 overflow-hidden rounded-lg">
                    <img
                      src={screenshot || "/placeholder.svg"}
                      alt={`Screenshot ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between pt-4 border-t border-white/10">
            <div className="flex gap-2">
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
        </div>
      </DialogContent>
    </Dialog>
  )
}
