"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Mail, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  const closeNav = () => setIsOpen(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="backdrop-blur-lg bg-black/95 border-white/10 text-white w-80">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between py-4 border-b border-white/10">
            <Link href="/" className="font-bold text-xl" onClick={closeNav}>
              <span className="text-white">VM</span>
              <span className="text-gray-400">.</span>
              <span className="text-xs text-gray-500 ml-1">(Viewing Manga)</span>
            </Link>
            <Button variant="ghost" size="icon" onClick={closeNav}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 py-6">
            <div className="space-y-4">
              <Link
                href="/#about"
                className="block text-lg hover:text-white text-gray-300 transition-colors py-2"
                onClick={closeNav}
              >
                About
              </Link>
              <Link
                href="/#skills"
                className="block text-lg hover:text-white text-gray-300 transition-colors py-2"
                onClick={closeNav}
              >
                Skills
              </Link>
              <Link
                href="/projects"
                className="block text-lg hover:text-white text-gray-300 transition-colors py-2"
                onClick={closeNav}
              >
                Projects
              </Link>
              <Link
                href="/#contact"
                className="block text-lg hover:text-white text-gray-300 transition-colors py-2"
                onClick={closeNav}
              >
                Contact
              </Link>
            </div>
          </nav>

          {/* Footer */}
          <div className="border-t border-white/10 pt-6 space-y-4">
            <Button className="w-full bg-white text-black hover:bg-gray-200" onClick={closeNav}>
              <Link href="/#contact" className="flex items-center justify-center w-full">
                <Mail className="mr-2 h-4 w-4" />
                Fund My Anime Habit
              </Link>
            </Button>

            <div className="flex justify-center gap-4">
              <Link href="#" className="text-gray-400 hover:text-white">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
            </div>

            <p className="text-xs text-center text-gray-500">
              Built with code, caffeine, and the motivation to watch more anime.
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
