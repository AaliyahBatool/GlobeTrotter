import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
const Navbar = () => {
  return (
     <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <h1 className="text-xl font-bold tracking-tight text-foreground">
          Global<span className="text-primary">Trotter</span>
        </h1>
        <Avatar className="h-9 w-9 border-2 border-primary/20">
          <AvatarImage src="https://github.com/shadcn.png" alt="Profile" />
          <AvatarFallback>GT</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}

export default Navbar