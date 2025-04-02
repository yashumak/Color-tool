"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Copy, RefreshCw, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type ColorPalette = {
  id: number
  colors: string[]
}

export default function ColorGenerator() {
  const [currentPalette, setCurrentPalette] = useState<string[]>(generateRandomPalette())
  const [savedPalettes, setSavedPalettes] = useState<ColorPalette[]>([])
  const [hueRange, setHueRange] = useState<[number, number]>([0, 360])
  const [saturationRange, setSaturationRange] = useState<[number, number]>([50, 100])
  const [lightnessRange, setLightnessRange] = useState<[number, number]>([30, 70])
  const { toast } = useToast()

  function generateRandomPalette(): string[] {
    const colors: string[] = []
    const baseHue = Math.floor(Math.random() * 360)

    // Generate 5 colors
    for (let i = 0; i < 5; i++) {
      // Create variations based on the base hue
      const hue = (baseHue + i * 30) % 360
      const saturation = Math.floor(Math.random() * 50) + 50 // 50-100%
      const lightness = Math.floor(Math.random() * 40) + 30 // 30-70%

      colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`)
    }

    return colors
  }

  function generateCustomPalette(): string[] {
    const colors: string[] = []
    const hueSpread = (hueRange[1] - hueRange[0]) / 5
    const baseHue = Math.floor(Math.random() * (hueRange[1] - hueRange[0])) + hueRange[0]

    for (let i = 0; i < 5; i++) {
      const hue = (baseHue + i * hueSpread) % 360
      const saturation = Math.floor(Math.random() * (saturationRange[1] - saturationRange[0]) + saturationRange[0])
      const lightness = Math.floor(Math.random() * (lightnessRange[1] - lightnessRange[0]) + lightnessRange[0])

      colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`)
    }

    return colors
  }

  function handleGenerateClick() {
    setCurrentPalette(generateCustomPalette())
  }

  function handleSavePalette() {
    setSavedPalettes([
      ...savedPalettes,
      {
        id: Date.now(),
        colors: currentPalette,
      },
    ])

    toast({
      title: "Palette saved!",
      description: "Your color palette has been saved",
      duration: 2000,
    })
  }

  function copyColorToClipboard(color: string) {
    navigator.clipboard.writeText(color)
    toast({
      title: "Copied!",
      description: `${color} copied to clipboard`,
      duration: 2000,
    })
  }

  function copyPaletteToClipboard(palette: string[]) {
    navigator.clipboard.writeText(palette.join(", "))
    toast({
      title: "Palette copied!",
      description: "Color palette copied to clipboard",
      duration: 2000,
    })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl sm:text-2xl font-bold">Color Generator</h2>
      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
        Generate random color palettes or customize your own
      </p>

      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-base sm:text-lg font-medium">Customize</h3>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-xs sm:text-sm">
                  Hue Range: {hueRange[0]}° - {hueRange[1]}°
                </span>
              </div>
              <Slider
                defaultValue={[0, 360]}
                min={0}
                max={360}
                step={1}
                value={hueRange}
                onValueChange={(value) => setHueRange(value as [number, number])}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-xs sm:text-sm">
                  Saturation Range: {saturationRange[0]}% - {saturationRange[1]}%
                </span>
              </div>
              <Slider
                defaultValue={[50, 100]}
                min={0}
                max={100}
                step={1}
                value={saturationRange}
                onValueChange={(value) => setSaturationRange(value as [number, number])}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-xs sm:text-sm">
                  Lightness Range: {lightnessRange[0]}% - {lightnessRange[1]}%
                </span>
              </div>
              <Slider
                defaultValue={[30, 70]}
                min={0}
                max={100}
                step={1}
                value={lightnessRange}
                onValueChange={(value) => setLightnessRange(value as [number, number])}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:space-x-4">
          <Button onClick={handleGenerateClick} className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Generate
          </Button>
          <Button variant="outline" onClick={handleSavePalette} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save Palette
          </Button>
        </div>

        <div className="mt-6 sm:mt-8">
          <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">Current Palette</h3>
          <div className="grid grid-cols-5 gap-1 sm:gap-2 h-16 sm:h-24 rounded-lg overflow-hidden">
            {currentPalette.map((color, index) => (
              <div
                key={index}
                className="relative group cursor-pointer transition-all duration-300 hover:flex-grow"
                style={{ backgroundColor: color }}
                onClick={() => copyColorToClipboard(color)}
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/20 transition-opacity">
                  <Copy className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[8px] sm:text-xs p-1 opacity-0 group-hover:opacity-100 transition-opacity text-center">
                  {color}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyPaletteToClipboard(currentPalette)}
              className="text-xs"
            >
              Copy All
            </Button>
          </div>
        </div>

        {savedPalettes.length > 0 && (
          <div className="mt-6 sm:mt-8">
            <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">Saved Palettes</h3>
            <div className="space-y-4">
              {savedPalettes.map((palette) => (
                <div key={palette.id} className="space-y-2">
                  <div className="grid grid-cols-5 gap-1 sm:gap-2 h-12 sm:h-16 rounded-lg overflow-hidden">
                    {palette.colors.map((color, index) => (
                      <div
                        key={index}
                        className="relative group cursor-pointer"
                        style={{ backgroundColor: color }}
                        onClick={() => copyColorToClipboard(color)}
                      >
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/20 transition-opacity">
                          <Copy className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyPaletteToClipboard(palette.colors)}
                      className="text-xs"
                    >
                      Copy All
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

