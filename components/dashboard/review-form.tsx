"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { X, Star, CheckCircle } from "lucide-react"

interface ReviewFormProps {
  nannyName: string
  nannyId: number
  onClose: () => void
}

export function ReviewForm({ nannyName, nannyId, onClose }: ReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simuler un délai d'envoi
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Laisser un avis pour {nannyName}</h3>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Votre note</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="focus:outline-none"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= (hoverRating || rating) ? "fill-[#FFD54F] text-[#FFD54F]" : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-sm text-gray-500">
                {rating === 5
                  ? "Excellent"
                  : rating === 4
                    ? "Très bien"
                    : rating === 3
                      ? "Bien"
                      : rating === 2
                        ? "Moyen"
                        : "Décevant"}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="comment" className="block text-sm font-medium">
              Votre commentaire
            </label>
            <Textarea
              id="comment"
              placeholder="Partagez votre expérience avec cette nounou..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={5}
              required
            />
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              className="w-full bg-[#FF80AB] hover:bg-[#FF4081] text-white"
              disabled={isSubmitting || rating === 0}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Envoi en cours...
                </span>
              ) : (
                "Publier mon avis"
              )}
            </Button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Merci pour votre avis !</h3>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex flex-col items-center justify-center py-6">
            <div className="w-16 h-16 rounded-full bg-[#81C784]/20 flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-[#81C784]" />
            </div>
            <h4 className="font-medium text-lg mb-1">Avis publié avec succès</h4>
            <p className="text-gray-500 text-center mb-4">
              Votre avis sur {nannyName} a été publié avec succès. Merci d'avoir partagé votre expérience !
            </p>
            <Button className="bg-[#FF80AB] hover:bg-[#FF4081] text-white" onClick={onClose}>
              Fermer
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
