"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Copy, RefreshCw, Download, Search } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type ColorScheme = {
  id: string
  name: string
  description: string
  category: string[]
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
    muted?: string
    border?: string
    cardBg?: string
  }
}

const colorSchemes: ColorScheme[] = [
  // Modern Minimal
  {
    id: "modern-minimal",
    name: "Modern Minimal",
    description: "Clean and minimal design with subtle accents",
    category: ["modern", "minimal", "professional"],
    colors: {
      primary: "#2563EB",
      secondary: "#4B5563",
      accent: "#F59E0B",
      background: "#F9FAFB",
      text: "#1F2937",
      muted: "#9CA3AF",
      border: "#E5E7EB",
      cardBg: "#FFFFFF",
    },
  },
  // Dark Mode
  {
    id: "dark-mode",
    name: "Dark Mode",
    description: "Sleek dark interface with vibrant accents",
    category: ["dark", "modern", "tech"],
    colors: {
      primary: "#3B82F6",
      secondary: "#6B7280",
      accent: "#F97316",
      background: "#111827",
      text: "#F9FAFB",
      muted: "#9CA3AF",
      border: "#374151",
      cardBg: "#1F2937",
    },
  },
  // Nature Inspired
  {
    id: "nature-inspired",
    name: "Nature Inspired",
    description: "Earthy tones inspired by natural elements",
    category: ["nature", "earthy", "calm"],
    colors: {
      primary: "#059669",
      secondary: "#92400E",
      accent: "#FBBF24",
      background: "#ECFDF5",
      text: "#064E3B",
      muted: "#6B7280",
      border: "#D1FAE5",
      cardBg: "#FFFFFF",
    },
  },
  // Vibrant Tech
  {
    id: "vibrant-tech",
    name: "Vibrant Tech",
    description: "Bold and vibrant colors for tech products",
    category: ["vibrant", "tech", "modern"],
    colors: {
      primary: "#7C3AED",
      secondary: "#2563EB",
      accent: "#EC4899",
      background: "#F5F3FF",
      text: "#4C1D95",
      muted: "#8B5CF6",
      border: "#DDD6FE",
      cardBg: "#FFFFFF",
    },
  },
  // Soft Pastels
  {
    id: "soft-pastels",
    name: "Soft Pastels",
    description: "Gentle pastel colors for a soft interface",
    category: ["pastel", "soft", "friendly"],
    colors: {
      primary: "#8B5CF6",
      secondary: "#EC4899",
      accent: "#F59E0B",
      background: "#F5F3FF",
      text: "#6D28D9",
      muted: "#A78BFA",
      border: "#DDD6FE",
      cardBg: "#FFFFFF",
    },
  },
  // Corporate Professional
  {
    id: "corporate-professional",
    name: "Corporate Professional",
    description: "Professional color scheme for business applications",
    category: ["corporate", "professional", "business"],
    colors: {
      primary: "#1E40AF",
      secondary: "#475569",
      accent: "#0369A1",
      background: "#F8FAFC",
      text: "#0F172A",
      muted: "#64748B",
      border: "#E2E8F0",
      cardBg: "#FFFFFF",
    },
  },
  // High Contrast (Accessibility)
  {
    id: "high-contrast",
    name: "High Contrast",
    description: "Maximum contrast for accessibility",
    category: ["accessibility", "high-contrast", "inclusive"],
    colors: {
      primary: "#0000EE",
      secondary: "#551A8B",
      accent: "#FF8C00",
      background: "#FFFFFF",
      text: "#000000",
      muted: "#555555",
      border: "#000000",
      cardBg: "#F8F8F8",
    },
  },
  // Colorblind Safe
  {
    id: "colorblind-safe",
    name: "Colorblind Safe",
    description: "Colors distinguishable by people with color vision deficiencies",
    category: ["accessibility", "colorblind", "inclusive"],
    colors: {
      primary: "#0072B2",
      secondary: "#009E73",
      accent: "#D55E00",
      background: "#F0F0F0",
      text: "#000000",
      muted: "#56565A",
      border: "#CCCCCC",
      cardBg: "#FFFFFF",
    },
  },
  // Monochromatic Blue
  {
    id: "monochromatic-blue",
    name: "Monochromatic Blue",
    description: "Various shades of blue for a cohesive look",
    category: ["monochromatic", "blue", "calm"],
    colors: {
      primary: "#1E40AF",
      secondary: "#3B82F6",
      accent: "#93C5FD",
      background: "#EFF6FF",
      text: "#1E3A8A",
      muted: "#60A5FA",
      border: "#BFDBFE",
      cardBg: "#FFFFFF",
    },
  },
  // Retro 80s
  {
    id: "retro-80s",
    name: "Retro 80s",
    description: "Vibrant neon colors inspired by 1980s design",
    category: ["retro", "vibrant", "themed"],
    colors: {
      primary: "#FF00FF", // Magenta
      secondary: "#00FFFF", // Cyan
      accent: "#FFFF00", // Yellow
      background: "#000000", // Black
      text: "#FFFFFF", // White
      muted: "#FF00FF80", // Semi-transparent magenta
      border: "#00FFFF", // Cyan
      cardBg: "#0A0A0A", // Near black
    },
  },
  // Minimalist Grayscale
  {
    id: "minimalist-grayscale",
    name: "Minimalist Grayscale",
    description: "Clean grayscale design with minimal color",
    category: ["minimal", "grayscale", "modern"],
    colors: {
      primary: "#000000",
      secondary: "#4B5563",
      accent: "#9CA3AF",
      background: "#F9FAFB",
      text: "#111827",
      muted: "#6B7280",
      border: "#E5E7EB",
      cardBg: "#FFFFFF",
    },
  },
  // Autumn Harvest
  {
    id: "autumn-harvest",
    name: "Autumn Harvest",
    description: "Warm colors inspired by fall foliage",
    category: ["nature", "warm", "seasonal"],
    colors: {
      primary: "#B45309",
      secondary: "#92400E",
      accent: "#D97706",
      background: "#FFFBEB",
      text: "#78350F",
      muted: "#B45309",
      border: "#FEF3C7",
      cardBg: "#FFFFFF",
    },
  },
  // Ocean Breeze
  {
    id: "ocean-breeze",
    name: "Ocean Breeze",
    description: "Cool blues and teals inspired by the sea",
    category: ["nature", "cool", "calm"],
    colors: {
      primary: "#0891B2",
      secondary: "#0E7490",
      accent: "#06B6D4",
      background: "#ECFEFF",
      text: "#164E63",
      muted: "#67E8F9",
      border: "#CFFAFE",
      cardBg: "#FFFFFF",
    },
  },
  // Sunset Glow
  {
    id: "sunset-glow",
    name: "Sunset Glow",
    description: "Warm gradients inspired by sunset colors",
    category: ["nature", "warm", "vibrant"],
    colors: {
      primary: "#DB2777",
      secondary: "#9D174D",
      accent: "#F59E0B",
      background: "#FFF1F2",
      text: "#831843",
      muted: "#F472B6",
      border: "#FCE7F3",
      cardBg: "#FFFFFF",
    },
  },
  // Forest Depths
  {
    id: "forest-depths",
    name: "Forest Depths",
    description: "Deep greens inspired by dense forests",
    category: ["nature", "green", "calm"],
    colors: {
      primary: "#166534",
      secondary: "#14532D",
      accent: "#65A30D",
      background: "#F0FDF4",
      text: "#14532D",
      muted: "#4ADE80",
      border: "#DCFCE7",
      cardBg: "#FFFFFF",
    },
  },
  // Bauhaus Inspired
  {
    id: "bauhaus-inspired",
    name: "Bauhaus Inspired",
    description: "Primary colors and geometric simplicity",
    category: ["artistic", "primary-colors", "bold"],
    colors: {
      primary: "#FF0000", // Red
      secondary: "#0000FF", // Blue
      accent: "#FFFF00", // Yellow
      background: "#FFFFFF", // White
      text: "#000000", // Black
      muted: "#888888", // Gray
      border: "#000000", // Black
      cardBg: "#F5F5F5", // Light gray
    },
  },
  // Impressionist
  {
    id: "impressionist",
    name: "Impressionist",
    description: "Soft, dreamy colors inspired by Monet and Renoir",
    category: ["artistic", "soft", "dreamy"],
    colors: {
      primary: "#7A9EBF", // Soft blue
      secondary: "#BF9A7A", // Soft brown
      accent: "#A67ABF", // Soft purple
      background: "#F5F5F0", // Off-white
      text: "#4A4A40", // Dark taupe
      muted: "#BFBFB0", // Light taupe
      border: "#E5E5E0", // Very light taupe
      cardBg: "#FFFFFF", // White
    },
  },
  // Pop Art
  {
    id: "pop-art",
    name: "Pop Art",
    description: "Bold, high-contrast colors inspired by Warhol and Lichtenstein",
    category: ["artistic", "bold", "vibrant"],
    colors: {
      primary: "#FF3366", // Bright pink
      secondary: "#3366FF", // Bright blue
      accent: "#FFCC00", // Bright yellow
      background: "#FFFFFF", // White
      text: "#000000", // Black
      muted: "#66CCFF", // Light blue
      border: "#000000", // Black
      cardBg: "#FFFFCC", // Light yellow
    },
  },
  // Minimalist Japanese
  {
    id: "minimalist-japanese",
    name: "Minimalist Japanese",
    description: "Inspired by traditional Japanese aesthetics",
    category: ["cultural", "minimal", "calm"],
    colors: {
      primary: "#A22041", // Deep red
      secondary: "#1A1A1A", // Near black
      accent: "#D4A017", // Gold
      background: "#F5F5F0", // Off-white
      text: "#1A1A1A", // Near black
      muted: "#888888", // Gray
      border: "#E5E5E0", // Very light gray
      cardBg: "#FFFFFF", // White
    },
  },
  // Nordic Simplicity
  {
    id: "nordic-simplicity",
    name: "Nordic Simplicity",
    description: "Clean, light colors inspired by Scandinavian design",
    category: ["cultural", "minimal", "light"],
    colors: {
      primary: "#0077B6", // Blue
      secondary: "#023E8A", // Dark blue
      accent: "#FF9E00", // Orange
      background: "#F8F9FA", // Very light gray
      text: "#212529", // Dark gray
      muted: "#6C757D", // Medium gray
      border: "#DEE2E6", // Light gray
      cardBg: "#FFFFFF", // White
    },
  },
]

export default function UiSuggestions() {
  const [selectedScheme, setSelectedScheme] = useState<ColorScheme>(colorSchemes[0])
  const [customSchemes, setCustomSchemes] = useState<ColorScheme[]>([])
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [filteredSchemes, setFilteredSchemes] = useState<ColorScheme[]>(colorSchemes)
  const [previewMode, setPreviewMode] = useState<"card" | "website">("card")
  const [exportFormat, setExportFormat] = useState<"css" | "tailwind" | "json">("css")
  const { toast } = useToast()

  // Get all unique categories
  const allCategories = Array.from(new Set(colorSchemes.flatMap((scheme) => scheme.category))).sort()

  // Filter schemes based on category and search query
  useEffect(() => {
    let filtered = colorSchemes

    // Filter by category
    if (activeCategory !== "all") {
      filtered = filtered.filter((scheme) => scheme.category.includes(activeCategory))
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (scheme) =>
          scheme.name.toLowerCase().includes(query) ||
          scheme.description.toLowerCase().includes(query) ||
          scheme.category.some((cat) => cat.toLowerCase().includes(query)),
      )
    }

    setFilteredSchemes(filtered)
  }, [activeCategory, searchQuery])

  function generateRandomScheme(): ColorScheme {
    const hue = Math.floor(Math.random() * 360)

    // Generate complementary color (opposite on color wheel)
    const complementaryHue = (hue + 180) % 360

    // Generate accent (triadic color scheme)
    const accentHue = (hue + 120) % 360

    // Random dark or light theme
    const isDarkTheme = Math.random() > 0.5

    const id = `custom-${Date.now()}`
    return {
      id,
      name: "Custom Scheme",
      description: isDarkTheme ? "Custom dark color scheme" : "Custom light color scheme",
      category: ["custom"],
      colors: {
        primary: `hsl(${hue}, 80%, 50%)`,
        secondary: `hsl(${complementaryHue}, 30%, 40%)`,
        accent: `hsl(${accentHue}, 80%, 50%)`,
        background: isDarkTheme ? "#111827" : "#F9FAFB",
        text: isDarkTheme ? "#F9FAFB" : "#1F2937",
        muted: isDarkTheme ? "#6B7280" : "#9CA3AF",
        border: isDarkTheme ? "#374151" : "#E5E7EB",
        cardBg: isDarkTheme ? "#1F2937" : "#FFFFFF",
      },
    }
  }

  function handleGenerateClick() {
    const newScheme = generateRandomScheme()
    setCustomSchemes([newScheme, ...customSchemes.slice(0, 4)])
    setSelectedScheme(newScheme)
  }

  function copyColorToClipboard(color: string, name: string) {
    navigator.clipboard.writeText(color)
    toast({
      title: "Copied!",
      description: `${name} color (${color}) copied to clipboard`,
      duration: 2000,
    })
  }

  function copySchemeToClipboard(scheme: ColorScheme) {
    let schemeText = ""

    switch (exportFormat) {
      case "css":
        schemeText =
          `:root {\n` +
          Object.entries(scheme.colors)
            .map(([key, value]) => `  --color-${key}: ${value};`)
            .join("\n") +
          `\n}`
        break
      case "tailwind":
        schemeText =
          `// Add to tailwind.config.js\n` +
          `colors: {\n` +
          Object.entries(scheme.colors)
            .map(([key, value]) => `  ${key}: "${value}",`)
            .join("\n") +
          `\n}`
        break
      case "json":
        schemeText = JSON.stringify(scheme.colors, null, 2)
        break
    }

    navigator.clipboard.writeText(schemeText)
    toast({
      title: "Scheme copied!",
      description: `${scheme.name} color scheme copied as ${exportFormat.toUpperCase()}`,
      duration: 2000,
    })
  }

  function downloadScheme(scheme: ColorScheme) {
    let content = ""
    let filename = ""
    let type = ""

    switch (exportFormat) {
      case "css":
        content =
          `:root {\n` +
          Object.entries(scheme.colors)
            .map(([key, value]) => `  --color-${key}: ${value};`)
            .join("\n") +
          `\n}`
        filename = `${scheme.name.toLowerCase().replace(/\s+/g, "-")}-colors.css`
        type = "text/css"
        break
      case "tailwind":
        content =
          `// Add to tailwind.config.js\n` +
          `colors: {\n` +
          Object.entries(scheme.colors)
            .map(([key, value]) => `  ${key}: "${value}",`)
            .join("\n") +
          `\n}`
        filename = `${scheme.name.toLowerCase().replace(/\s+/g, "-")}-tailwind-colors.js`
        type = "text/javascript"
        break
      case "json":
        content = JSON.stringify(scheme.colors, null, 2)
        filename = `${scheme.name.toLowerCase().replace(/\s+/g, "-")}-colors.json`
        type = "application/json"
        break
    }

    const blob = new Blob([content], { type })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Downloaded!",
      description: `${scheme.name} color scheme downloaded as ${filename}`,
      duration: 2000,
    })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl sm:text-2xl font-bold">UI Color Schemes</h2>
      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
        Explore modern website color schemes and best practices
      </p>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <Button onClick={handleGenerateClick} className="flex items-center gap-2 w-full sm:w-auto">
          <RefreshCw className="h-4 w-4" />
          Generate Random Scheme
        </Button>
        
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <Label htmlFor="preview-mode" className="sr-only">Preview Mode</Label>
          <div className="flex items-center border rounded-md overflow-hidden">
            <button
              className={`px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm ${previewMode === 'card' ? 'bg-primary text-white' : 'bg-transparent'}`}
              onClick={() => setPreviewMode('card')}
            >
              Card
            </button>
            <button
              className={`px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm ${previewMode === 'website' ? 'bg-primary text-white' : 'bg-transparent'}`}
              onClick={() => setPreviewMode('website')}
            >
              Website
            </button>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative w-full sm:w-64">
            <Input
              placeholder="Search color schemes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Badge 
              variant={activeCategory === "all" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setActiveCategory("all")}
            >
              All
            </Badge>
            {allCategories.map(category => (
              <Badge 
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setActiveCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="presets">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="presets" className="text-xs sm:text-sm">Preset Schemes</TabsTrigger>
          <TabsTrigger value="custom" className="text-xs sm:text-sm">Custom Schemes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="presets" className="space-y-4 mt-4">
          {filteredSchemes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSchemes.map((scheme) => (
                <Card 
                  key={scheme.id} 
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedScheme.id === scheme.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedScheme(scheme)}
                >
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium text-sm sm:text-base">{scheme.name}</h3>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                          {scheme.description}
                        </p>
                      </div>
                      {scheme.category.length > 0 && (
                        <Badge variant="outline" className="text-[10px] sm:text-xs">
                          {scheme.category[0]}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex space-x-2 mb-3">
                      {Object.entries(scheme.colors)
                        .filter(([key]) => !['muted', 'border', 'cardBg'].includes(key))
                        .map(([key, color]) => (
                          <div
                            key={key}
                            className="w-4 h-4 sm:w-6 sm:h-6 rounded-full border border-slate-200 dark:border-slate-700"
                            style={{ backgroundColor: color }}
                            title={`${key}: ${color}`}
                          />
                        ))}
                    </div>
                    
                    {previewMode === 'card' ? (
                      <div 
                        className="h-12 sm:h-16 rounded-md overflow-hidden border"
                        style={{ borderColor: scheme.colors.border || '#E5E7EB' }}
                      >
                        <div 
                          className="h-1/3 px-2 flex items-center"
                          style={{ backgroundColor: scheme.colors.primary, color: '#FFFFFF' }}
                        >
                          <span className="text-[10px] sm:text-xs">Header</span>
                        </div>
                        <div 
                          className="h-2/3 px-2 py-1"
                          style={{ backgroundColor: scheme.colors.cardBg || '#FFFFFF', color: scheme.colors.text }}
                        >
                          <span className="text-[10px] sm:text-xs">Content</span>
                        </div>
                      </div>
                    ) : (
                      <div 
                        className="h-20 sm:h-24 rounded-md overflow-hidden border"
                        style={{ 
                          backgroundColor: scheme.colors.background,
                          borderColor: scheme.colors.border || '#E5E7EB'
                        }}
                      >
                        <div 
                          className="h-6 sm:h-8 px-2 flex items-center"
                          style={{ backgroundColor: scheme.colors.primary, color: '#FFFFFF' }}
                        >
                          <div className="flex justify-between items-center w-full">
                            <span className="text-[10px] sm:text-xs">Logo</span>
                            <div className="flex space-x-1">
                              <div className="w-3 h-1 rounded-sm bg-white opacity-80"></div>
                              <div className="w-3 h-1 rounded-sm bg-white opacity-80"></div>
                              <div className="w-3 h-1 rounded-sm bg-white opacity-80"></div>
                            </div>
                          </div>
                        </div>
                        <div className="p-2 flex flex-col space-y-1 sm:space-y-2">
                          <div 
                            className="h-2 sm:h-3 w-3/4 rounded"
                            style={{ backgroundColor: scheme.colors.secondary, opacity: 0.7 }}
                          ></div>
                          <div 
                            className="h-1 sm:h-2 w-full rounded"
                            style={{ backgroundColor: scheme.colors.text, opacity: 0.1 }}
                          ></div>
                          <div 
                            className="h-1 sm:h-2 w-5/6 rounded"
                            style={{ backgroundColor: scheme.colors.text, opacity: 0.1 }}
                          ></div>
                          <div 
                            className="h-3 sm:h-4 w-1/4 rounded mt-1"
                            style={{ backgroundColor: scheme.colors.accent }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-500">
              <p>No color schemes match your search. Try different keywords or clear the search.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="custom" className="space-y-4 mt-4">
          {customSchemes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {customSchemes.map((scheme, index) => (
                <Card 
                  key={scheme.id} 
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedScheme.id === scheme.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedScheme(scheme)}
                >
                  <CardContent className="p-3 sm:p-4">
                    <h3 className="font-medium text-sm sm:text-base mb-1">{scheme.name} #{index + 1}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-3">
                      {scheme.description}
                    </p>
                    <div className="flex space-x-2 mb-3">
                      {Object.entries(scheme.colors)
                        .filter(([key]) => !['muted', 'border', 'cardBg'].includes(key))
                        .map(([key, color]) => (
                          <div
                            key={key}
                            className="w-4 h-4 sm:w-6 sm:h-6 rounded-full border border-slate-200 dark:border-slate-700"
                            style={{ backgroundColor: color }}
                            title={`${key}: ${color}`}
                          />
                        ))}
                    </div>
                    
                    {/* Same preview code as above */}
                    {previewMode === 'card' ? (
                      <div 
                        className="h-12 sm:h-16 rounded-md overflow-hidden border"
                        style={{ borderColor: scheme.colors.border || '#E5E7EB' }}
                      >
                        <div 
                          className="h-1/3 px-2 flex items-center"
                          style={{ backgroundColor: scheme.colors.primary, color: '#FFFFFF' }}
                        >
                          <span className="text-[10px] sm:text-xs">Header</span>
                        </div>
                        <div 
                          className="h-2/3 px-2 py-1"
                          style={{ backgroundColor: scheme.colors.cardBg || '#FFFFFF', color: scheme.colors.text }}
                        >
                          <span className="text-[10px] sm:text-xs">Content</span>
                        </div>
                      </div>
                    ) : (
                      <div 
                        className="h-20 sm:h-24 rounded-md overflow-hidden border"
                        style={{ 
                          backgroundColor: scheme.colors.background,
                          borderColor: scheme.colors.border || '#E5E7EB'
                        }}
                      >
                        <div 
                          className="h-6 sm:h-8 px-2 flex items-center"
                          style={{ backgroundColor: scheme.colors.primary, color: '#FFFFFF' }}
                        >
                          <div className="flex justify-between items-center w-full">
                            <span className="text-[10px] sm:text-xs">Logo</span>
                            <div className="flex space-x-1">
                              <div className="w-3 h-1 rounded-sm bg-white opacity-80"></div>
                              <div className="w-3 h-1 rounded-sm bg-white opacity-80"></div>
                              <div className="w-3 h-1 rounded-sm bg-white opacity-80"></div>
                            </div>
                          </div>
                        </div>
                        <div className="p-2 flex flex-col space-y-1 sm:space-y-2">
                          <div 
                            className="h-2 sm:h-3 w-3/4 rounded"
                            style={{ backgroundColor: scheme.colors.secondary, opacity: 0.7 }}
                          ></div>
                          <div 
                            className="h-1 sm:h-2 w-full rounded"
                            style={{ backgroundColor: scheme.colors.text, opacity: 0.1 }}
                          ></div>
                          <div 
                            className="h-1 sm:h-2 w-5/6 rounded"
                            style={{ backgroundColor: scheme.colors.text, opacity: 0.1 }}
                          ></div>
                          <div 
                            className="h-3 sm:h-4 w-1/4 rounded mt-1"
                            style={{ backgroundColor: scheme.colors.accent }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-500">
              <p>No custom schemes yet. Click "Generate Random Scheme" to create one.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {selectedScheme && (
        <div className="mt-6 sm:mt-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <h3 className="text-base sm:text-lg font-medium">Selected Scheme: {selectedScheme.name}</h3>
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
          <div className="flex items-center border rounded-md overflow-hidden">
            <button
              className={`px-2 py-1 text-[10px] sm:text-xs ${exportFormat === 'css' ? 'bg-primary text-white' : 'bg-transparent'}`}
              onClick={() => setExportFormat('css')}
            >
              CSS
            </button>
            <button
              className={`px-2 py-1 text-[10px] sm:text-xs ${exportFormat === 'tailwind' ? 'bg-primary text-white' : 'bg-transparent'}`}
              onClick={() => setExportFormat('tailwind')}
            >
              Tailwind
            </button>
            <button
              className={`px-2 py-1 text-[10px] sm:text-xs ${exportFormat === 'json' ? 'bg-primary text-white' : 'bg-transparent'}`}
              onClick={() => setExportFormat('json')}
            >
              JSON
            </button>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => copySchemeToClipboard(selectedScheme)}
            className="text-[10px] sm:text-xs"
          >
            <Copy className="h-3 w-3 mr-1" />
            Copy
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => downloadScheme(selectedScheme)}
            className="text-[10px] sm:text-xs"
          >
            <Download className="h-3 w-3 mr-1" />
            Download
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            {Object.entries(selectedScheme.colors).map(([key, color]) => (
              <div key={key} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-4 h-4 sm:w-6 sm:h-6 rounded-full border border-slate-200 dark:border-slate-700"
                    style={{ backgroundColor: color }}
                  />
                  <span className="capitalize text-xs sm:text-sm">{key}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs sm:text-sm">{color}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => copyColorToClipboard(color, key)}
                    className="h-6 w-6 p-0"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div 
          className="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700"
          style={{ backgroundColor: selectedScheme.colors.background }}
        >
          <div className="p-3 sm:p-4" style={{ backgroundColor: selectedScheme.colors.primary }}>
            <div className="flex justify-between items-center">
              <h3 className="text-white font-medium text-sm sm:text-base">Sample UI Preview</h3>
              <div className="flex space-x-1">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white opacity-80"></div>
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white opacity-80"></div>
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white opacity-80"></div>
              </div>
            </div>
          </div>
          <div className="p-3 sm:p-4">
            <div className="mb-3 sm:mb-4">
              <h4 
                className="text-base sm:text-lg font-medium mb-1 sm:mb-2" 
                style={{ color: selectedScheme.colors.text }}
              >
                Welcome to the App
              </h4>
              <p 
                className="text-xs sm:text-sm" 
                style={{ color: selectedScheme.colors.secondary }}
              >
                This is a sample UI using the selected color scheme.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
              <button 
                className="px-2 sm:px-3 py-1 rounded-md text-white text-xs sm:text-sm"
                style={{ backgroundColor: selectedScheme.colors.primary }}
              >
                Primary Button
              </button>
              <button 
                className="px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm"
                style={{ 
                  backgroundColor: 'transparent',
                  color: selectedScheme.colors.secondary,
                  border: `1px solid ${selectedScheme.colors.secondary}`
                }}
              >
                Secondary
              </button>
            </div>
            <div 
              className="p-2 sm:p-3 rounded-md text-xs sm:text-sm mb-3 sm:mb-4"
              style={{ 
                backgroundColor: selectedScheme.colors.accent,
                color: '#fff'
              }}
            >
              Accent element
            </div>
            <div
              className="p-2 sm:p-3 rounded-md text-xs sm:text-sm border"
              style={{
                backgroundColor: selectedScheme.colors.cardBg || '#FFFFFF',
                borderColor: selectedScheme.colors.border || '#E5E7EB',
                color: selectedScheme.colors.text
              }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 sm:w-3 sm:h-3 rounded-full"
                  style={{ backgroundColor: selectedScheme.colors.primary }}
                ></div>
                <span style={{ color: selectedScheme.colors.muted || '#6B7280' }}>Card with muted text</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 sm:mt-8 p-3 sm:p-4 border rounded-lg">
        <h4 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">Real-world Application Examples</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {/* Blog/Content Website */}
          <div 
            className="rounded-lg overflow-hidden border"
            style={{ 
              borderColor: selectedScheme.colors.border || '#E5E7EB',
              height: '160px',
              maxHeight: '200px'
            }}
          >
            <div 
              className="h-8 sm:h-10 px-2 sm:px-3 flex items-center justify-between"
              style={{ backgroundColor: selectedScheme.colors.primary, color: '#FFFFFF' }}
            >
              <span className="font-medium text-xs sm:text-sm">Blog Site</span>
              <div className="flex space-x-2 sm:space-x-3">
                <span className="text-[10px] sm:text-xs">Home</span>
                <span className="text-[10px] sm:text-xs">Articles</span>
                <span className="text-[10px] sm:text-xs">About</span>
              </div>
            </div>
            <div 
              className="p-2 sm:p-3 flex flex-col space-y-1 sm:space-y-2"
              style={{ 
                backgroundColor: selectedScheme.colors.background,
                height: 'calc(100% - 32px)',
                color: selectedScheme.colors.text
              }}
            >
              <div 
                className="h-3 sm:h-4 w-3/4 rounded font-medium"
                style={{ backgroundColor: selectedScheme.colors.text, opacity: 0.1 }}
              ></div>
              <div 
                className="h-1.5 sm:h-2 w-full rounded"
                style={{ backgroundColor: selectedScheme.colors.text, opacity: 0.1 }}
              ></div>
              <div 
                className="h-1.5 sm:h-2 w-full rounded"
                style={{ backgroundColor: selectedScheme.colors.text, opacity: 0.1 }}
              ></div>
              <div 
                className="h-1.5 sm:h-2 w-5/6 rounded"
                style={{ backgroundColor: selectedScheme.colors.text, opacity: 0.1 }}
              ></div>
              <div 
                className="h-6 sm:h-8 w-1/3 rounded mt-1 sm:mt-2 flex items-center justify-center text-[10px] sm:text-xs text-white"
                style={{ backgroundColor: selectedScheme.colors.accent }}
              >
                Read More
              </div>
            </div>
          </div>
          
          {/* Dashboard */}
          <div 
            className="rounded-lg overflow-hidden border"
            style={{ 
              borderColor: selectedScheme.colors.border || '#E5E7EB',
              height: '160px',
              maxHeight: '200px',
              backgroundColor: selectedScheme.colors.background
            }}
          >
            <div className="flex h-full">
              <div 
                className="w-1/4 h-full p-1 sm:p-2 flex flex-col space-y-2 sm:space-y-3"
                style={{ backgroundColor: selectedScheme.colors.primary, color: '#FFFFFF' }}
              >
                <div className="h-2 sm:h-4 w-full rounded bg-white opacity-30"></div>
                <div className="h-2 sm:h-4 w-full rounded bg-white opacity-60"></div>
                <div className="h-2 sm:h-4 w-full rounded bg-white opacity-30"></div>
                <div className="h-2 sm:h-4 w-full rounded bg-white opacity-30"></div>
              </div>
              <div className="w-3/4 p-2 sm:p-3" style={{ color: selectedScheme.colors.text }}>
                <div className="flex justify-between items-center mb-2 sm:mb-3">
                  <div 
                    className="h-2 sm:h-4 w-1/3 rounded"
                    style={{ backgroundColor: selectedScheme.colors.text, opacity: 0.1 }}
                  ></div>
                  <div 
                    className="h-4 sm:h-6 w-1/4 rounded"
                    style={{ backgroundColor: selectedScheme.colors.secondary, opacity: 0.7 }}
                  ></div>
                </div>
                <div className="grid grid-cols-2 gap-1 sm:gap-2">
                  <div 
                    className="h-12 sm:h-16 rounded p-1 sm:p-2"
                    style={{ 
                      backgroundColor: selectedScheme.colors.cardBg || '#FFFFFF',
                      border: `1px solid ${selectedScheme.colors.border || '#E5E7EB'}`
                    }}
                  >
                    <div 
                      className="h-1 sm:h-2 w-1/2 rounded mb-1 sm:mb-2"
                      style={{ backgroundColor: selectedScheme.colors.text, opacity: 0.1 }}
                    ></div>
                    <div 
                      className="h-2 sm:h-4 w-1/3 rounded font-bold"
                      style={{ backgroundColor: selectedScheme.colors.accent, opacity: 0.7 }}
                    ></div>
                  </div>
                  <div 
                    className="h-12 sm:h-16 rounded p-1 sm:p-2"
                    style={{ 
                      backgroundColor: selectedScheme.colors.cardBg || '#FFFFFF',
                      border: `1px solid ${selectedScheme.colors.border || '#E5E7EB'}`
                    }}
                  >
                    <div 
                      className="h-1 sm:h-2 w-1/2 rounded mb-1 sm:mb-2"
                      style={{ backgroundColor: selectedScheme.colors.text, opacity: 0.1 }}
                    ></div>
                    <div 
                      className="h-2 sm:h-4 w-1/3 rounded font-bold"
                      style={{ backgroundColor: selectedScheme.colors.primary, opacity: 0.7 }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* E-commerce */}
          <div
            className="rounded-lg overflow-hidden border"
            style={{
              borderColor: selectedScheme.colors.border || "#E5E7EB",
              height: "160px",
              maxHeight: "200px",
            }}
          >
            <div
              className="h-8 sm:h-10 px-2 sm:px-3 flex items-center justify-between"
              style={{ backgroundColor: selectedScheme.colors.primary, color: "#FFFFFF" }}
            >
              <span className="font-medium text-xs sm:text-sm">Shop</span>
              <div className="flex space-x-2 items-center">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white opacity-80"></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white opacity-80"></div>
              </div>
            </div>
            <div
              className="p-2 sm:p-3 grid grid-cols-2 gap-1 sm:gap-2"
              style={{
                backgroundColor: selectedScheme.colors.background,
                height: "calc(100% - 32px)",
                color: selectedScheme.colors.text,
              }}
            >
              <div
                className="rounded overflow-hidden border"
                style={{ borderColor: selectedScheme.colors.border || "#E5E7EB" }}
              >
                <div
                  className="h-10 w-full"
                  style={{ backgroundColor: selectedScheme.colors.secondary, opacity: 0.3 }}
                ></div>
                <div className="p-0.5 sm:p-1">
                  <div
                    className="h-1 sm:h-2 w-full rounded mb-0.5 sm:mb-1"
                    style={{ backgroundColor: selectedScheme.colors.text, opacity: 0.1 }}
                  ></div>
                  <div
                    className="h-2 sm:h-3 w-1/2 rounded font-bold"
                    style={{ backgroundColor: selectedScheme.colors.accent, opacity: 0.7 }}
                  ></div>
                </div>
              </div>
              <div
                className="rounded overflow-hidden border"
                style={{ borderColor: selectedScheme.colors.border || "#E5E7EB" }}
              >
                <div
                  className="h-10 w-full"
                  style={{ backgroundColor: selectedScheme.colors.secondary, opacity: 0.3 }}
                ></div>
                <div className="p-0.5 sm:p-1">
                  <div
                    className="h-1 sm:h-2 w-full rounded mb-0.5 sm:mb-1"
                    style={{ backgroundColor: selectedScheme.colors.text, opacity: 0.1 }}
                  ></div>
                  <div
                    className="h-2 sm:h-3 w-1/2 rounded font-bold"
                    style={{ backgroundColor: selectedScheme.colors.accent, opacity: 0.7 }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )}
</div>
  )
}

