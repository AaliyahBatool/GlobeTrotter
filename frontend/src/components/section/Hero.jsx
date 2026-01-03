import { useEffect,useCallback ,useState} from "react"
import { Button } from "../ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const HERO_IMAGES = [
  {
    src: "/amer.jpg",
    alt: "Majestic Mountains and Sea",
    title: "Adventure Awaits",
  },
  {
    src: "/coorg.jpg",
    alt: "Tropical Beach",
    title: "Tropical Paradises",
  },
  {
    src: "/dal lake.jpg",
    alt: "European City",
    title: "Historic Cities",
  },
  {
    src: "/manali.jpg",
    alt: "Snowy Cabin",
    title: "Winter Getaways",
  },
  {
    src: "/kerela.jpg",
    alt: "Desert Safari",
    title: "Desert Journeys",
  },
  {
    src: "/red fort.jpg",
    alt: "Jungle Waterfall",
    title: "Nature Escapes",
  },
  {
    src: "/taj mahal.jpg",
    alt: "Modern Cityscape",
    title: "Urban Vibrancy",
  },
]
export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % HERO_IMAGES.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + HERO_IMAGES.length) % HERO_IMAGES.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [nextSlide])

  return (
    <section className="group relative overflow-hidden rounded-3xl border bg-muted shadow-sm">
      <div className="relative w-full h-125 overflow-hidden">
        {HERO_IMAGES.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              fill
              className="absolute inset-0 w-full h-full object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-linear-to-t from-background/60 via-background/10 to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
              <h2 className="animate-in fade-in slide-in-from-bottom-4 text-4xl font-extrabold tracking-tight text-white drop-shadow-xl duration-700 md:text-6xl">
                {image.title}
              </h2>
            </div>
          </div>
        ))}

        {/* Navigation Buttons */}
        <div className="absolute inset-x-4 top-1/2 flex -translate-y-1/2 justify-between opacity-0 transition-opacity group-hover:opacity-100">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevSlide}
            className="h-10 w-10 rounded-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/40"
          >
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Previous slide</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={nextSlide}
            className="h-10 w-10 rounded-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/40"
          >
            <ChevronRight className="h-6 w-6" />
            <span className="sr-only">Next slide</span>
          </Button>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
          {HERO_IMAGES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex ? "w-8 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"
              }`}
            >
              <span className="sr-only">Go to slide {index + 1}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
