import React from 'react'
import { useState } from 'react'
import { Card } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { Switch } from '../components/ui/switch'
import { Globe } from 'lucide-react'
import { useTripStore } from '../store/useTripstore'
const CreateTrip = () => {
    const [trip, setTrip] = useState({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        isPublic: false,
    })
        const{createTrip}=useTripStore()

    async function handleTrip(){
        console.log(trip);
        await createTrip(trip);
    }
  return (
    <div className='w-full   flex justify-center'>
        <div className=' w-[75%]'>
             <section className="space-y-6  ">
            
            <Card className="p-8 bg-transparent border-white/10 rounded-2xl space-y-6">
              <div className="space-y-2">
                <label className="text-xs uppercase font-mono text-muted-foreground">Title</label>
                <Input
                  placeholder="The Grand European Tour"
                  value={trip.title}
                  onChange={(e) => setTrip((p) => ({ ...p, title: e.target.value }))}
                  className="bg-transparent border-0 border-b border-white/10 rounded-none px-0 text-xl focus-visible:ring-0 focus-visible:border-white transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase font-mono text-muted-foreground">Description</label>
                <Textarea
                  placeholder="A month-long journey through the heart of Europe..."
                  value={trip.description}
                  onChange={(e) => setTrip((p) => ({ ...p, description: e.target.value }))}
                  className="bg-transparent border-white/10 rounded-xl min-h-25 focus-visible:ring-1 focus-visible:ring-white/20 transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase font-mono text-muted-foreground">Start Date</label>
                  <Input
                    type="date"
                    className="bg-transparent border-white/10 rounded-xl"
                    value={trip.startDate}
                    onChange={(e) => setTrip((p) => ({ ...p, startDate: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase font-mono text-muted-foreground">End Date</label>
                  <Input
                    type="date"
                    className="bg-transparent border-white/10 rounded-xl"
                    value={trip.endDate}
                    onChange={(e) => setTrip((p) => ({ ...p, endDate: e.target.value }))}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="space-y-0.5">
                  <div className="text-sm font-medium">Public Trip</div>
                  <div className="text-xs text-muted-foreground">Allow others to see your itinerary</div>
                </div>
                <Switch checked={trip.isPublic} onCheckedChange={(v) => setTrip((p) => ({ ...p, isPublic: v }))} />
              </div>
            </Card>
            <div className="flex justify-end">
  <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={handleTrip}
  >
    next
  </button>
</div>

          </section>
          

        </div>
       
    </div>
  )
}

export default CreateTrip