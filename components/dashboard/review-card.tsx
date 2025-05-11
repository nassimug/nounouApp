import { Star } from "lucide-react"

interface Review {
  id: number
  author: string
  rating: number
  date: string
  comment: string
}

interface ReviewCardProps {
  review: Review
}

export function ReviewCard({ review }: ReviewCardProps) {
  // Fonction pour générer les étoiles en fonction de la note
  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    // Étoiles pleines
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="h-4 w-4 fill-[#FFD54F] text-[#FFD54F]" />)
    }

    // Demi-étoile si nécessaire
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="h-4 w-4 text-[#FFD54F]" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className="h-4 w-4 fill-[#FFD54F] text-[#FFD54F]" />
          </div>
        </div>,
      )
    }

    // Étoiles vides pour compléter jusqu'à 5
    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-[#FFD54F]" />)
    }

    return stars
  }

  return (
    <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-medium">{review.author}</h4>
          <div className="flex items-center mt-1">
            {renderStars(review.rating)}
            <span className="ml-2 text-sm text-gray-500">{review.rating}</span>
          </div>
        </div>
        <div className="text-sm text-gray-500">{review.date}</div>
      </div>
      <p className="text-gray-700 mt-2">{review.comment}</p>
    </div>
  )
}
