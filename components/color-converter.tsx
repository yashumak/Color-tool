"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ColorConverter() {
  const [hex, setHex] = useState("#3B82F6")
  const [rgb, setRgb] = useState({ r: 59, g: 130, b: 246 })
  const [hsl, setHsl] = useState({ h: 217, s: 91, l: 60 })
  const [colorPreview, setColorPreview] = useState("#3B82F6")
  const { toast } = useToast()

  // Convert HEX to RGB
  const hexToRgb = (hex: string) => {
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
  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
  }

  // Convert RGB to HSL
  const rgbToHsl = (r: number, g: number, b: number) => {
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
  const hslToRgb = (h: number, s: number, l: number) => {
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

  // Update all values when HEX changes
  const handleHexChange = (value: string) => {
    if (/^#?([0-9A-F]{3}){1,2}$/i.test(value)) {
      const formattedHex = value.startsWith("#") ? value : `#${value}`
      setHex(formattedHex)
      const newRgb = hexToRgb(formattedHex)
      setRgb(newRgb)
      setHsl(rgbToHsl(newRgb.r, newRgb.g, newRgb.b))
      setColorPreview(formattedHex)
    } else {
      setHex(value)
    }
  }

  // Update all values when RGB changes
  const handleRgbChange = (component: "r" | "g" | "b", value: number) => {
    const newRgb = { ...rgb, [component]: value }
    setRgb(newRgb)
    const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b)
    setHex(newHex)
    setHsl(rgbToHsl(newRgb.r, newRgb.g, newRgb.b))
    setColorPreview(newHex)
  }

  // Update all values when HSL changes
  const handleHslChange = (component: "h" | "s" | "l", value: number) => {
    const newHsl = { ...hsl, [component]: value }
    setHsl(newHsl)
    const newRgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l)
    setRgb(newRgb)
    const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b)
    setHex(newHex)
    setColorPreview(newHex)
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
      duration: 2000,
    })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl sm:text-2xl font-bold">Color Converter</h2>
      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
        Convert between HEX, RGB, and HSL color formats
      </p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="hex">HEX</Label>
            <Button variant="ghost" size="sm" onClick={() => copyToClipboard(hex, "HEX")} className="h-8 w-8 p-0">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <Input id="hex" value={hex} onChange={(e) => handleHexChange(e.target.value)} className="font-mono" />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>RGB</Label>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, "RGB")}
              className="h-8 w-8 p-0"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <Label htmlFor="rgb-r" className="sr-only">
                R
              </Label>
              <Input
                id="rgb-r"
                type="number"
                min="0"
                max="255"
                value={rgb.r}
                onChange={(e) => handleRgbChange("r", Number.parseInt(e.target.value) || 0)}
                className="font-mono"
              />
              <span className="text-xs text-center block mt-1">R</span>
            </div>
            <div>
              <Label htmlFor="rgb-g" className="sr-only">
                G
              </Label>
              <Input
                id="rgb-g"
                type="number"
                min="0"
                max="255"
                value={rgb.g}
                onChange={(e) => handleRgbChange("g", Number.parseInt(e.target.value) || 0)}
                className="font-mono"
              />
              <span className="text-xs text-center block mt-1">G</span>
            </div>
            <div>
              <Label htmlFor="rgb-b" className="sr-only">
                B
              </Label>
              <Input
                id="rgb-b"
                type="number"
                min="0"
                max="255"
                value={rgb.b}
                onChange={(e) => handleRgbChange("b", Number.parseInt(e.target.value) || 0)}
                className="font-mono"
              />
              <span className="text-xs text-center block mt-1">B</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>HSL</Label>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, "HSL")}
              className="h-8 w-8 p-0"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <Label htmlFor="hsl-h" className="sr-only">
                H
              </Label>
              <Input
                id="hsl-h"
                type="number"
                min="0"
                max="360"
                value={hsl.h}
                onChange={(e) => handleHslChange("h", Number.parseInt(e.target.value) || 0)}
                className="font-mono"
              />
              <span className="text-xs text-center block mt-1">H</span>
            </div>
            <div>
              <Label htmlFor="hsl-s" className="sr-only">
                S
              </Label>
              <Input
                id="hsl-s"
                type="number"
                min="0"
                max="100"
                value={hsl.s}
                onChange={(e) => handleHslChange("s", Number.parseInt(e.target.value) || 0)}
                className="font-mono"
              />
              <span className="text-xs text-center block mt-1">S%</span>
            </div>
            <div>
              <Label htmlFor="hsl-l" className="sr-only">
                L
              </Label>
              <Input
                id="hsl-l"
                type="number"
                min="0"
                max="100"
                value={hsl.l}
                onChange={(e) => handleHslChange("l", Number.parseInt(e.target.value) || 0)}
                className="font-mono"
              />
              <span className="text-xs text-center block mt-1">L%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center">
        <div
          className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg shadow-md transition-all duration-300 cursor-pointer relative group"
          style={{ backgroundColor: colorPreview }}
          onClick={() => document.getElementById("color-picker")?.click()}
        >
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/10 transition-opacity rounded-lg">
            <span className="text-xs text-white bg-black/50 px-2 py-1 rounded">Click to pick</span>
          </div>
          <input
            type="color"
            id="color-picker"
            value={colorPreview}
            onChange={(e) => {
              const newColor = e.target.value
              setColorPreview(newColor)
              setHex(newColor)
              const newRgb = hexToRgb(newColor)
              setRgb(newRgb)
              setHsl(rgbToHsl(newRgb.r, newRgb.g, newRgb.b))
            }}
            className="sr-only"
          />
        </div>
        <span className="mt-2 font-mono text-sm">{colorPreview}</span>
      </div>
    </div>
  )
}

