"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Copy, EyeIcon as EyeDropper, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type ColorModel = "rgb" | "hex" | "hsl" | "cmyk" | "pantone"

export default function ColorChart() {
  const [baseColor, setBaseColor] = useState("#FF6B6B")
  const [shades, setShades] = useState<string[]>(generateShades("#FF6B6B"))
  const [tints, setTints] = useState<string[]>(generateTints("#FF6B6B"))
  const [tones, setTones] = useState<string[]>(generateTones("#FF6B6B"))
  const [analogous, setAnalogous] = useState<string[]>(generateAnalogous("#FF6B6B"))
  const [complementary, setComplementary] = useState<string[]>(generateComplementary("#FF6B6B"))
  const [triadic, setTriadic] = useState<string[]>(generateTriadic("#FF6B6B"))
  const [splitComplementary, setSplitComplementary] = useState<string[]>(generateSplitComplementary("#FF6B6B"))
  const [tetradic, setTetradic] = useState<string[]>(generateTetradic("#FF6B6B"))
  const [colorModel, setColorModel] = useState<ColorModel>("rgb")
  const [rgbValues, setRgbValues] = useState({ r: 255, g: 107, b: 107 })
  const [hslValues, setHslValues] = useState({ h: 0, s: 100, l: 71 })
  const [cmykValues, setCmykValues] = useState({ c: 0, m: 58, y: 58, k: 0 })
  const [pantoneValue, setPantoneValue] = useState("Warm Red C")
  const [showColorPicker, setShowColorPicker] = useState(false)
  const { toast } = useToast()

  // Convert HEX to RGB
  function hexToRgb(hex: string) {
    // Remove # if present
    hex = hex.replace(/^#/, "")

    // Parse hex values
    let r, g, b
    if (hex.length === 3) {
      r = Number.parseInt(hex[0] + hex[0], 16)
      g = Number.parseInt(hex[1] + hex[1], 16)
      b = Number.parseInt(hex[2] + hex[2], 16)
    } else {
      r = Number.parseInt(hex.substring(0, 2), 16)
      g = Number.parseInt(hex.substring(2, 4), 16)
      b = Number.parseInt(hex.substring(4, 6), 16)
    }

    return { r, g, b }
  }

  // Convert RGB to HEX
  function rgbToHex(r: number, g: number, b: number) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
  }

  // Convert RGB to HSL
  function rgbToHsl(r: number, g: number, b: number) {
    r /= 255
    g /= 255
    b /= 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0,
      s = 0,
      l = (max + min) / 2

    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0)
          break
        case g:
          h = (b - r) / d + 2
          break
        case b:
          h = (r - g) / d + 4
          break
      }

      h /= 6
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    }
  }

  // Convert HSL to RGB
  function hslToRgb(h: number, s: number, l: number) {
    h /= 360
    s /= 100
    l /= 100

    let r, g, b

    if (s === 0) {
      r = g = b = l
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1
        if (t > 1) t -= 1
        if (t < 1 / 6) return p + (q - p) * 6 * t
        if (t < 1 / 2) return q
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
        return p
      }

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s
      const p = 2 * l - q

      r = hue2rgb(p, q, h + 1 / 3)
      g = hue2rgb(p, q, h)
      b = hue2rgb(p, q, h - 1 / 3)
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
    }
  }

  // Convert RGB to CMYK
  function rgbToCmyk(r: number, g: number, b: number) {
    r = r / 255
    g = g / 255
    b = b / 255

    const k = 1 - Math.max(r, g, b)
    const c = k === 1 ? 0 : (1 - r - k) / (1 - k)
    const m = k === 1 ? 0 : (1 - g - k) / (1 - k)
    const y = k === 1 ? 0 : (1 - b - k) / (1 - k)

    return {
      c: Math.round(c * 100),
      m: Math.round(m * 100),
      y: Math.round(y * 100),
      k: Math.round(k * 100),
    }
  }

  // Convert CMYK to RGB
  function cmykToRgb(c: number, m: number, y: number, k: number) {
    c = c / 100
    m = m / 100
    y = y / 100
    k = k / 100

    const r = 255 * (1 - c) * (1 - k)
    const g = 255 * (1 - m) * (1 - k)
    const b = 255 * (1 - y) * (1 - k)

    return {
      r: Math.round(r),
      g: Math.round(g),
      b: Math.round(b),
    }
  }

  // Approximate Pantone to RGB (simplified)
  function approximatePantoneToRgb(pantone: string) {
    // This is a simplified mapping of some common Pantone colors
    const pantoneMap: Record<string, { r: number; g: number; b: number }> = {
      "Warm Red C": { r: 255, g: 107, b: 107 },
      "Cool Gray 1 C": { r: 241, g: 241, b: 241 },
      "Cool Gray 5 C": { r: 188, g: 188, b: 188 },
      "Cool Gray 10 C": { r: 99, g: 102, b: 106 },
      "Process Blue C": { r: 0, g: 133, b: 202 },
      "Process Yellow C": { r: 255, g: 242, b: 0 },
      "Process Magenta C": { r: 236, g: 0, b: 140 },
      "Process Cyan C": { r: 0, g: 174, b: 239 },
      "Black C": { r: 45, g: 41, b: 38 },
      "Orange 021 C": { r: 254, g: 80, b: 0 },
      "Green C": { r: 0, g: 171, b: 132 },
      "Blue 072 C": { r: 16, g: 6, b: 159 },
      "Purple C": { r: 187, g: 41, b: 187 },
      "Red 032 C": { r: 237, g: 41, b: 57 },
      "Reflex Blue C": { r: 0, g: 20, b: 137 },
      "Rubine Red C": { r: 206, g: 0, b: 88 },
      "Rhodamine Red C": { r: 225, g: 0, b: 152 },
      "Yellow C": { r: 254, g: 221, b: 0 },
    }

    return pantoneMap[pantone] || { r: 0, g: 0, b: 0 }
  }

  // Approximate RGB to Pantone (simplified)
  function approximateRgbToPantone(r: number, g: number, b: number) {
    // This is a simplified mapping of some common Pantone colors
    const pantoneMap: Record<string, { r: number; g: number; b: number }> = {
      "Warm Red C": { r: 255, g: 107, b: 107 },
      "Cool Gray 1 C": { r: 241, g: 241, b: 241 },
      "Cool Gray 5 C": { r: 188, g: 188, b: 188 },
      "Cool Gray 10 C": { r: 99, g: 102, b: 106 },
      "Process Blue C": { r: 0, g: 133, b: 202 },
      "Process Yellow C": { r: 255, g: 242, b: 0 },
      "Process Magenta C": { r: 236, g: 0, b: 140 },
      "Process Cyan C": { r: 0, g: 174, b: 239 },
      "Black C": { r: 45, g: 41, b: 38 },
      "Orange 021 C": { r: 254, g: 80, b: 0 },
      "Green C": { r: 0, g: 171, b: 132 },
      "Blue 072 C": { r: 16, g: 6, b: 159 },
      "Purple C": { r: 187, g: 41, b: 187 },
      "Red 032 C": { r: 237, g: 41, b: 57 },
      "Reflex Blue C": { r: 0, g: 20, b: 137 },
      "Rubine Red C": { r: 206, g: 0, b: 88 },
      "Rhodamine Red C": { r: 225, g: 0, b: 152 },
      "Yellow C": { r: 254, g: 221, b: 0 },
    }

    // Find the closest Pantone color by calculating the Euclidean distance
    let closestPantone = "Warm Red C"
    let minDistance = Number.MAX_VALUE

    for (const [pantone, rgb] of Object.entries(pantoneMap)) {
      const distance = Math.sqrt(Math.pow(r - rgb.r, 2) + Math.pow(g - rgb.g, 2) + Math.pow(b - rgb.b, 2))

      if (distance < minDistance) {
        minDistance = distance
        closestPantone = pantone
      }
    }

    return closestPantone
  }

  function generateShades(hex: string): string[] {
    const { r, g, b } = hexToRgb(hex)
    const shades: string[] = []

    // Generate 10 shades (darker versions)
    for (let i = 9; i >= 0; i--) {
      const factor = i / 10
      const newR = Math.round(r * factor)
      const newG = Math.round(g * factor)
      const newB = Math.round(b * factor)

      shades.push(rgbToHex(newR, newG, newB))
    }

    return shades
  }

  function generateTints(hex: string): string[] {
    const { r, g, b } = hexToRgb(hex)
    const tints: string[] = []

    // Generate 10 tints (lighter versions)
    for (let i = 0; i <= 9; i++) {
      const factor = i / 10
      const newR = Math.round(r + (255 - r) * factor)
      const newG = Math.round(g + (255 - g) * factor)
      const newB = Math.round(b + (255 - b) * factor)

      tints.push(rgbToHex(newR, newG, newB))
    }

    return tints
  }

  function generateTones(hex: string): string[] {
    const { r, g, b } = hexToRgb(hex)
    const tones: string[] = []

    // Generate 10 tones (mixed with gray)
    for (let i = 0; i <= 9; i++) {
      const factor = i / 10
      const newR = Math.round(r + (128 - r) * factor)
      const newG = Math.round(g + (128 - g) * factor)
      const newB = Math.round(b + (128 - b) * factor)

      tones.push(rgbToHex(newR, newG, newB))
    }

    return tones
  }

  function generateAnalogous(hex: string): string[] {
    const hsl = rgbToHsl(hexToRgb(hex).r, hexToRgb(hex).g, hexToRgb(hex).b)
    const colors: string[] = []

    // Generate 5 analogous colors (adjacent on the color wheel)
    for (let i = -2; i <= 2; i++) {
      const h = (hsl.h + i * 30 + 360) % 360
      const rgb = hslToRgb(h, hsl.s, hsl.l)
      colors.push(rgbToHex(rgb.r, rgb.g, rgb.b))
    }

    return colors
  }

  function generateComplementary(hex: string): string[] {
    const hsl = rgbToHsl(hexToRgb(hex).r, hexToRgb(hex).g, hexToRgb(hex).b)
    const colors: string[] = []

    // Generate complementary color (opposite on the color wheel)
    const h = (hsl.h + 180) % 360
    const rgb = hslToRgb(h, hsl.s, hsl.l)

    colors.push(hex)
    colors.push(rgbToHex(rgb.r, rgb.g, rgb.b))

    return colors
  }

  function generateTriadic(hex: string): string[] {
    const hsl = rgbToHsl(hexToRgb(hex).r, hexToRgb(hex).g, hexToRgb(hex).b)
    const colors: string[] = []

    // Generate triadic colors (evenly spaced on the color wheel)
    for (let i = 0; i < 3; i++) {
      const h = (hsl.h + i * 120) % 360
      const rgb = hslToRgb(h, hsl.s, hsl.l)
      colors.push(rgbToHex(rgb.r, rgb.g, rgb.b))
    }

    return colors
  }

  function generateSplitComplementary(hex: string): string[] {
    const hsl = rgbToHsl(hexToRgb(hex).r, hexToRgb(hex).g, hexToRgb(hex).b)
    const colors: string[] = []

    // Generate split complementary colors
    colors.push(hex)

    const h1 = (hsl.h + 150) % 360
    const rgb1 = hslToRgb(h1, hsl.s, hsl.l)
    colors.push(rgbToHex(rgb1.r, rgb1.g, rgb1.b))

    const h2 = (hsl.h + 210) % 360
    const rgb2 = hslToRgb(h2, hsl.s, hsl.l)
    colors.push(rgbToHex(rgb2.r, rgb2.g, rgb2.b))

    return colors
  }

  function generateTetradic(hex: string): string[] {
    const hsl = rgbToHsl(hexToRgb(hex).r, hexToRgb(hex).g, hexToRgb(hex).b)
    const colors: string[] = []

    // Generate tetradic colors (rectangle on the color wheel)
    for (let i = 0; i < 4; i++) {
      const h = (hsl.h + i * 90) % 360
      const rgb = hslToRgb(h, hsl.s, hsl.l)
      colors.push(rgbToHex(rgb.r, rgb.g, rgb.b))
    }

    return colors
  }

  function handleColorChange(value: string) {
    if (/^#?([0-9A-F]{3}){1,2}$/i.test(value)) {
      const formattedHex = value.startsWith("#") ? value : `#${value}`
      setBaseColor(formattedHex)
      updateAllColorValues(formattedHex)
    } else {
      setBaseColor(value)
    }
  }

  function updateAllColorValues(hex: string) {
    // Update all derived colors
    setShades(generateShades(hex))
    setTints(generateTints(hex))
    setTones(generateTones(hex))
    setAnalogous(generateAnalogous(hex))
    setComplementary(generateComplementary(hex))
    setTriadic(generateTriadic(hex))
    setSplitComplementary(generateSplitComplementary(hex))
    setTetradic(generateTetradic(hex))

    // Update all color model values
    const rgb = hexToRgb(hex)
    setRgbValues(rgb)

    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
    setHslValues(hsl)

    const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b)
    setCmykValues(cmyk)

    const pantone = approximateRgbToPantone(rgb.r, rgb.g, rgb.b)
    setPantoneValue(pantone)
  }

  function handleRgbChange(component: "r" | "g" | "b", value: number) {
    const newRgb = { ...rgbValues, [component]: value }
    setRgbValues(newRgb)

    const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b)
    setBaseColor(newHex)

    updateAllColorValues(newHex)
  }

  function handleHslChange(component: "h" | "s" | "l", value: number) {
    const newHsl = { ...hslValues, [component]: value }
    setHslValues(newHsl)

    const rgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l)
    const newHex = rgbToHex(rgb.r, rgb.g, rgb.b)
    setBaseColor(newHex)

    updateAllColorValues(newHex)
  }

  function handleCmykChange(component: "c" | "m" | "y" | "k", value: number) {
    const newCmyk = { ...cmykValues, [component]: value }
    setCmykValues(newCmyk)

    const rgb = cmykToRgb(newCmyk.c, newCmyk.m, newCmyk.y, newCmyk.k)
    const newHex = rgbToHex(rgb.r, rgb.g, rgb.b)
    setBaseColor(newHex)

    updateAllColorValues(newHex)
  }

  function handlePantoneChange(value: string) {
    setPantoneValue(value)

    const rgb = approximatePantoneToRgb(value)
    const newHex = rgbToHex(rgb.r, rgb.g, rgb.b)
    setBaseColor(newHex)

    updateAllColorValues(newHex)
  }

  function copyColorToClipboard(color: string) {
    navigator.clipboard.writeText(color)
    toast({
      title: "Copied!",
      description: `${color} copied to clipboard`,
      duration: 2000,
    })
  }

  // Update all values when component mounts
  useEffect(() => {
    updateAllColorValues(baseColor)
  }, [])

  return (
    <div className="space-y-6">
      <h2 className="text-xl sm:text-2xl font-bold">Color Chart</h2>
      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
        Explore different color models, harmonies, shades, tints, and tones
      </p>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end gap-4">
          <div className="space-y-2 flex-grow">
            <Label htmlFor="base-color">Base Color</Label>
            <div className="flex gap-2">
              <Input
                id="base-color"
                value={baseColor}
                onChange={(e) => handleColorChange(e.target.value)}
                className="font-mono"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowColorPicker(!showColorPicker)}
                className="flex-shrink-0"
              >
                <EyeDropper className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg shadow-md transition-all duration-300 cursor-pointer"
            style={{ backgroundColor: baseColor }}
            onClick={() => document.getElementById("color-picker")?.click()}
          >
            <input
              type="color"
              id="color-picker"
              value={baseColor}
              onChange={(e) => {
                const newColor = e.target.value
                setBaseColor(newColor)
                updateAllColorValues(newColor)
              }}
              className="sr-only"
            />
          </div>
        </div>

        {showColorPicker && (
          <div className="p-3 sm:p-4 border rounded-lg shadow-md bg-white dark:bg-slate-800">
            <div className="space-y-4">
              <div
                className="w-full h-32 sm:h-40 rounded-lg relative cursor-crosshair"
                style={{
                  background: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, #000 100%), 
                              linear-gradient(to right, #fff 0%, ${hslToRgb(hslValues.h, 100, 50).r}, ${hslToRgb(hslValues.h, 100, 50).g}, ${hslToRgb(hslValues.h, 100, 50).b} 100%)`,
                }}
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
                  const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height))

                  const s = Math.round(x * 100)
                  const l = Math.round((1 - y) * 50)

                  handleHslChange("s", s)
                  handleHslChange("l", l)
                }}
              >
                <div
                  className="absolute w-4 h-4 rounded-full border-2 border-white transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  style={{
                    left: `${hslValues.s}%`,
                    top: `${100 - hslValues.l * 2}%`,
                    backgroundColor: baseColor,
                  }}
                />
              </div>

              <div className="space-y-2">
                <div
                  className="w-full h-6 sm:h-8 rounded-lg cursor-pointer"
                  style={{
                    background:
                      "linear-gradient(to right, #FF0000, #FFFF00, #00FF00, #00FFFF, #0000FF, #FF00FF, #FF0000)",
                  }}
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect()
                    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
                    const h = Math.round(x * 360)
                    handleHslChange("h", h)
                  }}
                >
                  <div
                    className="relative w-3 sm:w-4 h-6 sm:h-8 rounded-full border-2 border-white transform -translate-x-1/2 pointer-events-none"
                    style={{
                      left: `${(hslValues.h / 360) * 100}%`,
                      backgroundColor: `hsl(${hslValues.h}, 100%, 50%)`,
                    }}
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 sm:w-6 h-4 sm:h-6 rounded-full" style={{ backgroundColor: baseColor }} />
                    <span className="font-mono text-xs sm:text-sm">{baseColor}</span>
                  </div>
                  <div className="col-span-2 flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const randomH = Math.floor(Math.random() * 360)
                        const randomS = Math.floor(Math.random() * 100)
                        const randomL = Math.floor(Math.random() * 100)

                        handleHslChange("h", randomH)
                        handleHslChange("s", randomS)
                        handleHslChange("l", randomL)
                      }}
                      className="flex items-center gap-1 text-xs"
                    >
                      <RefreshCw className="h-3 w-3" />
                      Random
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <Tabs defaultValue="models" className="mt-6">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="models" className="text-xs sm:text-sm">
              Color Models
            </TabsTrigger>
            <TabsTrigger value="harmonies" className="text-xs sm:text-sm">
              Color Harmonies
            </TabsTrigger>
          </TabsList>

          <TabsContent value="models" className="space-y-6 mt-4">
            <Tabs defaultValue="rgb" onValueChange={(value) => setColorModel(value as ColorModel)}>
              <TabsList className="grid grid-cols-3 sm:grid-cols-5">
                <TabsTrigger value="rgb" className="text-xs sm:text-sm">
                  RGB
                </TabsTrigger>
                <TabsTrigger value="hex" className="text-xs sm:text-sm">
                  HEX
                </TabsTrigger>
                <TabsTrigger value="hsl" className="text-xs sm:text-sm">
                  HSL
                </TabsTrigger>
                <TabsTrigger value="cmyk" className="text-xs sm:text-sm hidden sm:block">
                  CMYK
                </TabsTrigger>
                <TabsTrigger value="pantone" className="text-xs sm:text-sm hidden sm:block">
                  Pantone
                </TabsTrigger>
              </TabsList>

              <div className="block sm:hidden mt-2">
                <TabsList className="grid grid-cols-2">
                  <TabsTrigger value="cmyk" className="text-xs">
                    CMYK
                  </TabsTrigger>
                  <TabsTrigger value="pantone" className="text-xs">
                    Pantone
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="rgb" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rgb-r">Red (R)</Label>
                    <Input
                      id="rgb-r"
                      type="number"
                      min="0"
                      max="255"
                      value={rgbValues.r}
                      onChange={(e) => handleRgbChange("r", Number.parseInt(e.target.value) || 0)}
                      className="font-mono"
                    />
                    <Slider
                      min={0}
                      max={255}
                      step={1}
                      value={[rgbValues.r]}
                      onValueChange={(value) => handleRgbChange("r", value[0])}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rgb-g">Green (G)</Label>
                    <Input
                      id="rgb-g"
                      type="number"
                      min="0"
                      max="255"
                      value={rgbValues.g}
                      onChange={(e) => handleRgbChange("g", Number.parseInt(e.target.value) || 0)}
                      className="font-mono"
                    />
                    <Slider
                      min={0}
                      max={255}
                      step={1}
                      value={[rgbValues.g]}
                      onValueChange={(value) => handleRgbChange("g", value[0])}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rgb-b">Blue (B)</Label>
                    <Input
                      id="rgb-b"
                      type="number"
                      min="0"
                      max="255"
                      value={rgbValues.b}
                      onChange={(e) => handleRgbChange("b", Number.parseInt(e.target.value) || 0)}
                      className="font-mono"
                    />
                    <Slider
                      min={0}
                      max={255}
                      step={1}
                      value={[rgbValues.b]}
                      onValueChange={(value) => handleRgbChange("b", value[0])}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="hex" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="hex-value">Hexadecimal</Label>
                  <Input
                    id="hex-value"
                    value={baseColor}
                    onChange={(e) => handleColorChange(e.target.value)}
                    className="font-mono"
                  />
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <div className="font-medium">Preview:</div>
                  <div className="w-8 h-8 rounded-md" style={{ backgroundColor: baseColor }} />
                </div>
              </TabsContent>

              <TabsContent value="hsl" className="space-y-4 mt-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="hsl-h">Hue (H)</Label>
                    <Input
                      id="hsl-h"
                      type="number"
                      min="0"
                      max="360"
                      value={hslValues.h}
                      onChange={(e) => handleHslChange("h", Number.parseInt(e.target.value) || 0)}
                      className="font-mono"
                    />
                    <Slider
                      min={0}
                      max={360}
                      step={1}
                      value={[hslValues.h]}
                      onValueChange={(value) => handleHslChange("h", value[0])}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hsl-s">Saturation (S)</Label>
                    <Input
                      id="hsl-s"
                      type="number"
                      min="0"
                      max="100"
                      value={hslValues.s}
                      onChange={(e) => handleHslChange("s", Number.parseInt(e.target.value) || 0)}
                      className="font-mono"
                    />
                    <Slider
                      min={0}
                      max={100}
                      step={1}
                      value={[hslValues.s]}
                      onValueChange={(value) => handleHslChange("s", value[0])}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hsl-l">Lightness (L)</Label>
                    <Input
                      id="hsl-l"
                      type="number"
                      min="0"
                      max="100"
                      value={hslValues.l}
                      onChange={(e) => handleHslChange("l", Number.parseInt(e.target.value) || 0)}
                      className="font-mono"
                    />
                    <Slider
                      min={0}
                      max={100}
                      step={1}
                      value={[hslValues.l]}
                      onValueChange={(value) => handleHslChange("l", value[0])}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="cmyk" className="space-y-4 mt-4">
                <div className="grid grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cmyk-c">Cyan (C)</Label>
                    <Input
                      id="cmyk-c"
                      type="number"
                      min="0"
                      max="100"
                      value={cmykValues.c}
                      onChange={(e) => handleCmykChange("c", Number.parseInt(e.target.value) || 0)}
                      className="font-mono"
                    />
                    <Slider
                      min={0}
                      max={100}
                      step={1}
                      value={[cmykValues.c]}
                      onValueChange={(value) => handleCmykChange("c", value[0])}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cmyk-m">Magenta (M)</Label>
                    <Input
                      id="cmyk-m"
                      type="number"
                      min="0"
                      max="100"
                      value={cmykValues.m}
                      onChange={(e) => handleCmykChange("m", Number.parseInt(e.target.value) || 0)}
                      className="font-mono"
                    />
                    <Slider
                      min={0}
                      max={100}
                      step={1}
                      value={[cmykValues.m]}
                      onValueChange={(value) => handleCmykChange("m", value[0])}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cmyk-y">Yellow (Y)</Label>
                    <Input
                      id="cmyk-y"
                      type="number"
                      min="0"
                      max="100"
                      value={cmykValues.y}
                      onChange={(e) => handleCmykChange("y", Number.parseInt(e.target.value) || 0)}
                      className="font-mono"
                    />
                    <Slider
                      min={0}
                      max={100}
                      step={1}
                      value={[cmykValues.y]}
                      onValueChange={(value) => handleCmykChange("y", value[0])}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cmyk-k">Key/Black (K)</Label>
                    <Input
                      id="cmyk-k"
                      type="number"
                      min="0"
                      max="100"
                      value={cmykValues.k}
                      onChange={(e) => handleCmykChange("k", Number.parseInt(e.target.value) || 0)}
                      className="font-mono"
                    />
                    <Slider
                      min={0}
                      max={100}
                      step={1}
                      value={[cmykValues.k]}
                      onValueChange={(value) => handleCmykChange("k", value[0])}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="pantone" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="pantone-value">Pantone Color</Label>
                  <select
                    id="pantone-value"
                    value={pantoneValue}
                    onChange={(e) => handlePantoneChange(e.target.value)}
                    className="w-full p-2 border rounded-md font-mono dark:bg-slate-800 dark:border-slate-700"
                  >
                    <option value="Warm Red C">Warm Red C</option>
                    <option value="Cool Gray 1 C">Cool Gray 1 C</option>
                    <option value="Cool Gray 5 C">Cool Gray 5 C</option>
                    <option value="Cool Gray 10 C">Cool Gray 10 C</option>
                    <option value="Process Blue C">Process Blue C</option>
                    <option value="Process Yellow C">Process Yellow C</option>
                    <option value="Process Magenta C">Process Magenta C</option>
                    <option value="Process Cyan C">Process Cyan C</option>
                    <option value="Black C">Black C</option>
                    <option value="Orange 021 C">Orange 021 C</option>
                    <option value="Green C">Green C</option>
                    <option value="Blue 072 C">Blue 072 C</option>
                    <option value="Purple C">Purple C</option>
                    <option value="Red 032 C">Red 032 C</option>
                    <option value="Reflex Blue C">Reflex Blue C</option>
                    <option value="Rubine Red C">Rubine Red C</option>
                    <option value="Rhodamine Red C">Rhodamine Red C</option>
                    <option value="Yellow C">Yellow C</option>
                  </select>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <div className="font-medium">Preview:</div>
                  <div className="w-8 h-8 rounded-md" style={{ backgroundColor: baseColor }} />
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Note: Pantone colors are approximated for screen display
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="harmonies" className="space-y-6 mt-4">
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-medium">Shades (Darker)</h3>
                <div className="grid grid-cols-10 gap-1 h-8 sm:h-12">
                  {shades.map((color, index) => (
                    <div
                      key={index}
                      className="relative group cursor-pointer"
                      style={{ backgroundColor: color }}
                      onClick={() => copyColorToClipboard(color)}
                    >
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/20 transition-opacity">
                        <Copy className="h-2 w-2 sm:h-3 sm:w-3 text-white" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[6px] sm:text-[8px] p-0.5 opacity-0 group-hover:opacity-100 transition-opacity text-center overflow-hidden">
                        {color}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-medium">Tints (Lighter)</h3>
                <div className="grid grid-cols-10 gap-1 h-8 sm:h-12">
                  {tints.map((color, index) => (
                    <div
                      key={index}
                      className="relative group cursor-pointer"
                      style={{ backgroundColor: color }}
                      onClick={() => copyColorToClipboard(color)}
                    >
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/20 transition-opacity">
                        <Copy className="h-2 w-2 sm:h-3 sm:w-3 text-white" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[6px] sm:text-[8px] p-0.5 opacity-0 group-hover:opacity-100 transition-opacity text-center overflow-hidden">
                        {color}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-medium">Tones (Mixed with Gray)</h3>
                <div className="grid grid-cols-10 gap-1 h-8 sm:h-12">
                  {tones.map((color, index) => (
                    <div
                      key={index}
                      className="relative group cursor-pointer"
                      style={{ backgroundColor: color }}
                      onClick={() => copyColorToClipboard(color)}
                    >
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/20 transition-opacity">
                        <Copy className="h-2 w-2 sm:h-3 sm:w-3 text-white" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[6px] sm:text-[8px] p-0.5 opacity-0 group-hover:opacity-100 transition-opacity text-center overflow-hidden">
                        {color}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-medium">Analogous Colors</h3>
                <div className="grid grid-cols-5 gap-1 h-8 sm:h-12">
                  {analogous.map((color, index) => (
                    <div
                      key={index}
                      className="relative group cursor-pointer"
                      style={{ backgroundColor: color }}
                      onClick={() => copyColorToClipboard(color)}
                    >
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/20 transition-opacity">
                        <Copy className="h-2 w-2 sm:h-3 sm:w-3 text-white" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[6px] sm:text-[8px] p-0.5 opacity-0 group-hover:opacity-100 transition-opacity text-center overflow-hidden">
                        {color}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-medium">Complementary Colors</h3>
                <div className="grid grid-cols-2 gap-1 h-8 sm:h-12">
                  {complementary.map((color, index) => (
                    <div
                      key={index}
                      className="relative group cursor-pointer"
                      style={{ backgroundColor: color }}
                      onClick={() => copyColorToClipboard(color)}
                    >
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/20 transition-opacity">
                        <Copy className="h-2 w-2 sm:h-3 sm:w-3 text-white" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[6px] sm:text-[8px] p-0.5 opacity-0 group-hover:opacity-100 transition-opacity text-center overflow-hidden">
                        {color}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-medium">Triadic Colors</h3>
                <div className="grid grid-cols-3 gap-1 h-8 sm:h-12">
                  {triadic.map((color, index) => (
                    <div
                      key={index}
                      className="relative group cursor-pointer"
                      style={{ backgroundColor: color }}
                      onClick={() => copyColorToClipboard(color)}
                    >
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/20 transition-opacity">
                        <Copy className="h-2 w-2 sm:h-3 sm:w-3 text-white" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[6px] sm:text-[8px] p-0.5 opacity-0 group-hover:opacity-100 transition-opacity text-center overflow-hidden">
                        {color}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-medium">Split Complementary</h3>
                <div className="grid grid-cols-3 gap-1 h-8 sm:h-12">
                  {splitComplementary.map((color, index) => (
                    <div
                      key={index}
                      className="relative group cursor-pointer"
                      style={{ backgroundColor: color }}
                      onClick={() => copyColorToClipboard(color)}
                    >
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/20 transition-opacity">
                        <Copy className="h-2 w-2 sm:h-3 sm:w-3 text-white" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[6px] sm:text-[8px] p-0.5 opacity-0 group-hover:opacity-100 transition-opacity text-center overflow-hidden">
                        {color}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-medium">Tetradic (Rectangle)</h3>
                <div className="grid grid-cols-4 gap-1 h-8 sm:h-12">
                  {tetradic.map((color, index) => (
                    <div
                      key={index}
                      className="relative group cursor-pointer"
                      style={{ backgroundColor: color }}
                      onClick={() => copyColorToClipboard(color)}
                    >
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/20 transition-opacity">
                        <Copy className="h-2 w-2 sm:h-3 sm:w-3 text-white" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[6px] sm:text-[8px] p-0.5 opacity-0 group-hover:opacity-100 transition-opacity text-center overflow-hidden">
                        {color}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

