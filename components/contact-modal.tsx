"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle, X } from "lucide-react"

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
  isAnimeSelected: boolean
}

export function ContactModal({ isOpen, onClose, isAnimeSelected }: ContactModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="backdrop-blur-lg bg-black/80 border border-white/10 text-white">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">
              {isAnimeSelected ? "A Fellow Otaku!" : "Message Sent!"}
            </DialogTitle>
            {/* <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button> */}
          </div>
          <DialogDescription className="text-gray-400">
            {isAnimeSelected
              ? "Your message has been prioritized above my rent payment notifications."
              : "Thank you for reaching out. I'll get back to you as soon as this episode ends."}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center py-6 space-y-4">
          <div className="h-20 w-20 rounded-full bg-white/10 flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-white" />
          </div>

          <div className="text-center">
            <h3 className="text-xl font-medium">Your message is on its way!</h3>
            <p className="text-gray-300 mt-2">
              {isAnimeSelected
                ? "As a fellow anime fan, you've unlocked priority response! I'll get back to you faster than a tournament arc power-up."
                : "I'll respond to your message as soon as I finish this episode (or arc... or season)."}
            </p>
          </div>

          <div className="w-full pt-4 border-t border-white/10 mt-4">
            <p className="text-sm text-gray-400 text-center">
              {isAnimeSelected
                ? "While you wait, maybe we can debate whether Cowboy Bebop is the greatest anime of all time (it is)."
                : "In the meantime, feel free to check out my projects or connect on social media."}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
