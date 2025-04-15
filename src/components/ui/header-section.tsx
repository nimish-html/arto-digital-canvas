"use client"

import * as React from "react"
import { Link } from "react-router-dom"
import { Button } from "./button"
import { Input } from "./input"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip"
import { 
  Menu, 
  Search, 
  Globe, 
  User, 
  Moon, 
  Sun, 
  Palette
} from "lucide-react"
import { Switch } from "./switch"
import { Label } from "./label"
import { useTheme } from "../../context/ThemeContext"

function HeaderSection() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md transition-colors duration-300">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center space-x-2">
            <Palette className="h-6 w-6 text-purple-dark dark:text-purple-medium" />
            <span className="hidden text-xl font-bold text-foreground sm:inline-block">Arto</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/showcase" className="text-sm font-medium transition-colors hover:text-purple-dark dark:hover:text-purple-medium">
            Showcase
          </Link>
          <Link to="/profile" className="text-sm font-medium transition-colors hover:text-purple-dark dark:hover:text-purple-medium">
            Profile
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full"
                    onClick={() => setIsSearchOpen(!isSearchOpen)}
                  >
                    <Search className="h-4 w-4" />
                    <span className="sr-only">Search</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Search</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            {isSearchOpen && (
              <div className="absolute right-0 top-full z-50 mt-2 w-60 overflow-hidden rounded-md border bg-background p-1 shadow-md">
                <div className="flex items-center">
                  <Input
                    placeholder="Search..."
                    className="h-9 w-full rounded-md border-none focus-visible:ring-0"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Language Selector */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Globe className="h-4 w-4" />
                  <span className="sr-only">Change language</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Change language</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* User Profile */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to="/profile">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-4 w-4" />
                    <span className="sr-only">Profile</span>
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Your Profile</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Dark Mode Toggle */}
          <div className="hidden md:flex items-center space-x-2">
            <Sun className="h-4 w-4" />
            <Switch
              id="dark-mode-header"
              checked={isDarkMode}
              onCheckedChange={toggleDarkMode}
            />
            <Moon className="h-4 w-4" />
          </div>

          {/* Main CTA */}
          <div className="hidden md:block">
            <Link to="/canvas">
              <Button className="bg-purple-dark hover:bg-purple-900 text-white">
                Start Drawing
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-3">
              <Link to="/showcase" className="py-2 text-sm font-medium transition-colors hover:text-purple-dark dark:hover:text-purple-medium">
                Showcase
              </Link>
              <Link to="/profile" className="py-2 text-sm font-medium transition-colors hover:text-purple-dark dark:hover:text-purple-medium">
                Profile
              </Link>
              <div className="flex items-center space-x-2 py-2">
                <Sun className="h-4 w-4" />
                <Switch
                  id="dark-mode-mobile"
                  checked={isDarkMode}
                  onCheckedChange={toggleDarkMode}
                />
                <Moon className="h-4 w-4" />
                <Label htmlFor="dark-mode-mobile" className="sr-only">
                  Toggle dark mode
                </Label>
              </div>
              <div className="pt-2">
                <Link to="/canvas" className="block w-full">
                  <Button className="bg-purple-dark hover:bg-purple-900 text-white w-full">
                    Start Drawing
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

export { HeaderSection }