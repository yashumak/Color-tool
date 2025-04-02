"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Palette, Sliders, BarChart3, Layout, Info, RefreshCw, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function About() {
  const [activeTab, setActiveTab] = useState("overview")
  const { toast } = useToast()

  const copyCode = (code: string, description: string) => {
    navigator.clipboard.writeText(code)
    toast({
      title: "Copied!",
      description: `${description} copied to clipboard`,
      duration: 2000,
    })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl sm:text-2xl font-bold">About Color Tool</h2>
      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
        A comprehensive guide to all the features of this color tool
      </p>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mt-6">
        <TabsList className="grid grid-cols-5">
          <TabsTrigger value="overview" className="flex items-center gap-1 text-xs sm:text-sm">
            <Info className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="converter" className="flex items-center gap-1 text-xs sm:text-sm">
            <Sliders className="h-4 w-4" />
            <span className="hidden sm:inline">Converter</span>
          </TabsTrigger>
          <TabsTrigger value="generator" className="flex items-center gap-1 text-xs sm:text-sm">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Generator</span>
          </TabsTrigger>
          <TabsTrigger value="chart" className="flex items-center gap-1 text-xs sm:text-sm">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Chart</span>
          </TabsTrigger>
          <TabsTrigger value="ui" className="flex items-center gap-1 text-xs sm:text-sm">
            <Layout className="h-4 w-4" />
            <span className="hidden sm:inline">UI</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <Card>
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-medium mb-2 sm:mb-3 flex items-center gap-2">
                  <Sliders className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  Color Converter
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-3 sm:mb-4">
                  Convert between different color formats including HEX, RGB, HSL, CMYK, and Pantone.
                </p>
                <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2 sm:gap-4 mb-2 sm:mb-3 w-full">
                      <div className="flex-1 p-1 sm:p-2 bg-white dark:bg-slate-700 rounded border border-slate-200 dark:border-slate-600 text-center font-mono text-[10px] sm:text-sm">
                        #3B82F6
                      </div>
                      <div className="flex-1 p-1 sm:p-2 bg-white dark:bg-slate-700 rounded border border-slate-200 dark:border-slate-600 text-center font-mono text-[10px] sm:text-sm">
                        rgb(59, 130, 246)
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-4 w-full">
                      <div className="flex-1 p-1 sm:p-2 bg-white dark:bg-slate-700 rounded border border-slate-200 dark:border-slate-600 text-center font-mono text-[10px] sm:text-sm">
                        hsl(217, 91%, 60%)
                      </div>
                      <div className="flex-1 p-1 sm:p-2 bg-white dark:bg-slate-700 rounded border border-slate-200 dark:border-slate-600 text-center font-mono text-[10px] sm:text-sm">
                        cmyk(76, 47, 0, 4)
                      </div>
                    </div>
                    <div
                      className="mt-3 sm:mt-4 w-12 h-12 sm:w-16 sm:h-16 rounded-lg shadow-md"
                      style={{ backgroundColor: "#3B82F6" }}
                    ></div>
                  </div>
                </div>
                <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Easily translate colors between formats with real-time preview
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-medium mb-2 sm:mb-3 flex items-center gap-2">
                  <Palette className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  Color Generator
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-3 sm:mb-4">
                  Create random color palettes with customizable parameters and save your favorites.
                </p>
                <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4">
                  <div className="space-y-3">
                    <div className="grid grid-cols-5 gap-1 h-12 rounded-md overflow-hidden">
                      <div style={{ backgroundColor: "#2563EB" }}></div>
                      <div style={{ backgroundColor: "#3B82F6" }}></div>
                      <div style={{ backgroundColor: "#60A5FA" }}></div>
                      <div style={{ backgroundColor: "#93C5FD" }}></div>
                      <div style={{ backgroundColor: "#BFDBFE" }}></div>
                    </div>
                    <div className="grid grid-cols-5 gap-1 h-12 rounded-md overflow-hidden">
                      <div style={{ backgroundColor: "#DC2626" }}></div>
                      <div style={{ backgroundColor: "#EF4444" }}></div>
                      <div style={{ backgroundColor: "#F87171" }}></div>
                      <div style={{ backgroundColor: "#FCA5A5" }}></div>
                      <div style={{ backgroundColor: "#FECACA" }}></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <RefreshCw className="h-4 w-4 text-slate-500" />
                        <span className="text-xs text-slate-500">Generate</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Save className="h-4 w-4 text-slate-500" />
                        <span className="text-xs text-slate-500">Save</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Discover beautiful color combinations with adjustable parameters
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-medium mb-2 sm:mb-3 flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  Color Chart
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-3 sm:mb-4">
                  Explore color variations, harmonies, and relationships with interactive charts.
                </p>
                <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4">
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="text-xs text-slate-500">Shades</div>
                      <div className="grid grid-cols-10 gap-1 h-6 rounded-md overflow-hidden">
                        {Array.from({ length: 10 }).map((_, i) => (
                          <div
                            key={i}
                            style={{
                              backgroundColor: `hsl(217, 91%, ${60 - i * 6}%)`,
                            }}
                          ></div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-slate-500">Tints</div>
                      <div className="grid grid-cols-10 gap-1 h-6 rounded-md overflow-hidden">
                        {Array.from({ length: 10 }).map((_, i) => (
                          <div
                            key={i}
                            style={{
                              backgroundColor: `hsl(217, 91%, ${60 + i * 4}%)`,
                            }}
                          ></div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-slate-500">Complementary</div>
                      <div className="grid grid-cols-2 gap-1 h-6 rounded-md overflow-hidden">
                        <div style={{ backgroundColor: "hsl(217, 91%, 60%)" }}></div>
                        <div style={{ backgroundColor: "hsl(37, 91%, 60%)" }}></div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-slate-500">Triadic</div>
                      <div className="grid grid-cols-3 gap-1 h-6 rounded-md overflow-hidden">
                        <div style={{ backgroundColor: "hsl(217, 91%, 60%)" }}></div>
                        <div style={{ backgroundColor: "hsl(337, 91%, 60%)" }}></div>
                        <div style={{ backgroundColor: "hsl(97, 91%, 60%)" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Visualize color relationships and find perfect combinations
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-medium mb-2 sm:mb-3 flex items-center gap-2">
                  <Layout className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  UI Color Schemes
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-3 sm:mb-4">
                  Browse pre-designed color schemes for websites and applications with real-world previews.
                </p>
                <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xs font-medium">Modern Minimal</div>
                      <div className="flex space-x-1">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#2563EB" }}></div>
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#4B5563" }}></div>
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#F59E0B" }}></div>
                      </div>
                    </div>
                    <div className="border rounded-md overflow-hidden">
                      <div className="h-6 bg-blue-600 flex items-center px-2">
                        <div className="w-1/3 h-2 bg-white opacity-80 rounded-sm"></div>
                      </div>
                      <div className="h-12 bg-white p-2">
                        <div className="h-2 w-full bg-gray-200 rounded-sm mb-1"></div>
                        <div className="h-2 w-2/3 bg-gray-200 rounded-sm"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xs font-medium">Dark Mode</div>
                      <div className="flex space-x-1">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#3B82F6" }}></div>
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#6B7280" }}></div>
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#F97316" }}></div>
                      </div>
                    </div>
                    <div className="border rounded-md overflow-hidden">
                      <div className="h-6 bg-blue-500 flex items-center px-2">
                        <div className="w-1/3 h-2 bg-white opacity-80 rounded-sm"></div>
                      </div>
                      <div className="h-12 bg-gray-900 p-2">
                        <div className="h-2 w-full bg-gray-700 rounded-sm mb-1"></div>
                        <div className="h-2 w-2/3 bg-gray-700 rounded-sm"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Find inspiration with ready-to-use professional color schemes
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 sm:mt-8">
            <h3 className="text-lg sm:text-xl font-medium mb-3 sm:mb-4">Getting Started</h3>
            <div className="space-y-4">
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                This color tool is designed to help designers, developers, and anyone working with colors to create,
                explore, and manage color schemes for their projects. Here's how to get started:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div className="bg-primary/10 p-1.5 sm:p-2 rounded-full">
                    <Sliders className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm sm:text-base mb-0.5 sm:mb-1">Convert Colors</h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                      Use the Color Converter to translate between different color formats like HEX, RGB, HSL, and CMYK.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div className="bg-primary/10 p-1.5 sm:p-2 rounded-full">
                    <Palette className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm sm:text-base mb-0.5 sm:mb-1">Generate Palettes</h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                      Create custom color palettes with the Color Generator and save your favorite combinations.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div className="bg-primary/10 p-1.5 sm:p-2 rounded-full">
                    <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm sm:text-base mb-0.5 sm:mb-1">Explore Variations</h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                      Use the Color Chart to see different shades, tints, and harmonies for any base color.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div className="bg-primary/10 p-1.5 sm:p-2 rounded-full">
                    <Layout className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm sm:text-base mb-0.5 sm:mb-1">Browse Schemes</h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                      Find pre-designed color schemes in the UI section for your projects with real-world previews.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-primary/5 rounded-lg border border-primary/10">
                <h4 className="font-medium text-sm sm:text-base flex items-center gap-2 mb-1 sm:mb-2">
                  <Info className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                  Pro Tip
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  Each section of the tool is designed to work together, allowing you to create cohesive color systems
                  for your designs. Start with a base color in the converter, explore variations in the chart, generate
                  matching palettes, and find inspiration in the UI schemes.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="converter" className="space-y-6 mt-6">
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Color Converter</h3>
            <p className="text-slate-600 dark:text-slate-400">
              The Color Converter allows you to translate colors between different formats: HEX, RGB, HSL, CMYK, and
              Pantone.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h4 className="text-lg font-medium mb-3">How to Use</h4>
                <ol className="list-decimal pl-5 space-y-2 text-slate-600 dark:text-slate-400">
                  <li>Enter a color value in any of the supported formats</li>
                  <li>The tool automatically converts it to all other formats</li>
                  <li>Adjust individual components to see how they affect the color</li>
                  <li>Click on the color preview to use the color picker</li>
                  <li>Copy any color format to your clipboard with the copy button</li>
                </ol>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-medium mb-3">Example</h4>
                <div className="p-4 border rounded-md bg-white dark:bg-slate-800">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Input:</span>
                      <code className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-sm">#3B82F6</code>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span>RGB:</span>
                        <code className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-sm">
                          rgb(59, 130, 246)
                        </code>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>HSL:</span>
                        <code className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-sm">
                          hsl(217, 91%, 60%)
                        </code>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>CMYK:</span>
                        <code className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-sm">
                          cmyk(76, 47, 0, 4)
                        </code>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md" style={{ backgroundColor: "#3B82F6" }}></div>
                      <span>Color Preview</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="text-lg font-medium mb-2">Code Example</h4>
                  <div className="relative">
                    <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-x-auto text-sm">
                      <code>{`// Convert HEX to RGB
function hexToRgb(hex) {
  hex = hex.replace(/^#/, "")
  
  let r, g, b
  if (hex.length === 3) {
    r = parseInt(hex[0] + hex[0], 16)
    g = parseInt(hex[1] + hex[1], 16)
    b = parseInt(hex[2] + hex[2], 16)
  } else {
    r = parseInt(hex.substring(0, 2), 16)
    g = parseInt(hex.substring(2, 4), 16)
    b = parseInt(hex.substring(4, 6), 16)
  }
  
  return { r, g, b }
}`}</code>
                    </pre>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() =>
                        copyCode(
                          `// Convert HEX to RGB
function hexToRgb(hex) {
  hex = hex.replace(/^#/, "")
  
  let r, g, b
  if (hex.length === 3) {
    r = parseInt(hex[0] + hex[0], 16)
    g = parseInt(hex[1] + hex[1], 16)
    b = parseInt(hex[2] + hex[2], 16)
  } else {
    r = parseInt(hex.substring(0, 2), 16)
    g = parseInt(hex.substring(2, 4), 16)
    b = parseInt(hex.substring(4, 6), 16)
  }
  
  return { r, g, b }
}`,
                          "HEX to RGB conversion function",
                        )
                      }
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-lg font-medium mb-3">Practical Applications</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <h5 className="font-medium mb-2">Web Development</h5>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Convert between formats to use in CSS, JavaScript, or design tools. For example, using rgba() for
                      transparency effects.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <h5 className="font-medium mb-2">Print Design</h5>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Convert RGB colors to CMYK for accurate print reproduction, or find the closest Pantone match.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <h5 className="font-medium mb-2">Accessibility</h5>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Convert colors to check contrast ratios and ensure text remains readable for all users.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="generator" className="space-y-6 mt-6">
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Color Generator</h3>
            <p className="text-slate-600 dark:text-slate-400">
              The Color Generator creates random color palettes based on color theory principles, allowing you to
              discover beautiful color combinations.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h4 className="text-lg font-medium mb-3">How to Use</h4>
                <ol className="list-decimal pl-5 space-y-2 text-slate-600 dark:text-slate-400">
                  <li>Click the "Generate" button to create a new color palette</li>
                  <li>Customize the generation by adjusting the hue, saturation, and lightness ranges</li>
                  <li>Save palettes you like for future reference</li>
                  <li>Click on individual colors to copy them to your clipboard</li>
                  <li>Use the "Copy All" button to copy the entire palette</li>
                </ol>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-medium mb-3">Example Palette</h4>
                <div className="p-4 border rounded-md bg-white dark:bg-slate-800">
                  <div className="space-y-3">
                    <div className="grid grid-cols-5 gap-1 h-12">
                      <div style={{ backgroundColor: "#2563EB" }}></div>
                      <div style={{ backgroundColor: "#3B82F6" }}></div>
                      <div style={{ backgroundColor: "#60A5FA" }}></div>
                      <div style={{ backgroundColor: "#93C5FD" }}></div>
                      <div style={{ backgroundColor: "#BFDBFE" }}></div>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span>Primary</span>
                      <span>Secondary</span>
                      <span>Tertiary</span>
                      <span>Accent</span>
                      <span>Background</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="text-lg font-medium mb-2">Customization Options</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>Hue Range:</span>
                      <span className="text-sm">0° - 360°</span>
                    </div>
                    <div className="h-2 bg-gradient-to-r from-red-500 via-green-500 to-blue-500 rounded-full"></div>

                    <div className="flex justify-between items-center mt-3">
                      <span>Saturation Range:</span>
                      <span className="text-sm">0% - 100%</span>
                    </div>
                    <div className="h-2 bg-gradient-to-r from-gray-500 to-blue-500 rounded-full"></div>

                    <div className="flex justify-between items-center mt-3">
                      <span>Lightness Range:</span>
                      <span className="text-sm">0% - 100%</span>
                    </div>
                    <div className="h-2 bg-gradient-to-r from-black via-gray-500 to-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-lg font-medium mb-3">Practical Applications</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <h5 className="font-medium mb-2">Brand Development</h5>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Generate color palettes for new brands or rebranding projects, ensuring colors work well together.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <h5 className="font-medium mb-2">UI Design</h5>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Create consistent color systems for interfaces, with primary, secondary, and accent colors.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <h5 className="font-medium mb-2">Creative Inspiration</h5>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Overcome creative blocks by discovering new color combinations you might not have considered.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="chart" className="space-y-6 mt-6">
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Color Chart</h3>
            <p className="text-slate-600 dark:text-slate-400">
              The Color Chart section helps you explore variations of a base color, including shades, tints, tones, and
              color harmonies.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h4 className="text-lg font-medium mb-3">How to Use</h4>
                <ol className="list-decimal pl-5 space-y-2 text-slate-600 dark:text-slate-400">
                  <li>Enter a base color or use the color picker</li>
                  <li>View different variations of your color automatically</li>
                  <li>Switch between different color models (RGB, HSL, CMYK, Pantone)</li>
                  <li>Explore color harmonies like complementary, analogous, and triadic</li>
                  <li>Click on any color to copy it to your clipboard</li>
                </ol>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-medium mb-3">Color Variations</h4>
                <div className="p-4 border rounded-md bg-white dark:bg-slate-800">
                  <div className="space-y-3">
                    <h5 className="font-medium">Shades (Darker)</h5>
                    <div className="grid grid-cols-10 gap-1 h-8">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div
                          key={i}
                          style={{
                            backgroundColor: `hsl(217, 91%, ${60 - i * 6}%)`,
                          }}
                        ></div>
                      ))}
                    </div>

                    <h5 className="font-medium mt-4">Tints (Lighter)</h5>
                    <div className="grid grid-cols-10 gap-1 h-8">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div
                          key={i}
                          style={{
                            backgroundColor: `hsl(217, 91%, ${60 + i * 4}%)`,
                          }}
                        ></div>
                      ))}
                    </div>

                    <h5 className="font-medium mt-4">Color Harmonies</h5>
                    <div className="grid grid-cols-5 gap-1 h-8">
                      <div style={{ backgroundColor: "hsl(217, 91%, 60%)" }}></div>
                      <div style={{ backgroundColor: "hsl(247, 91%, 60%)" }}></div>
                      <div style={{ backgroundColor: "hsl(277, 91%, 60%)" }}></div>
                      <div style={{ backgroundColor: "hsl(307, 91%, 60%)" }}></div>
                      <div style={{ backgroundColor: "hsl(337, 91%, 60%)" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-lg font-medium mb-3">Color Models Explained</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium mb-2">RGB & HEX</h5>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                    RGB (Red, Green, Blue) is an additive color model used for digital displays. HEX is a hexadecimal
                    representation of RGB values.
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-red-500 text-white p-2 rounded text-center text-sm">Red</div>
                    <div className="bg-green-500 text-white p-2 rounded text-center text-sm">Green</div>
                    <div className="bg-blue-500 text-white p-2 rounded text-center text-sm">Blue</div>
                  </div>
                </div>

                <div>
                  <h5 className="font-medium mb-2">HSL</h5>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                    HSL (Hue, Saturation, Lightness) is a more intuitive color model that makes it easier to adjust
                    colors.
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-gradient-to-r from-red-500 via-green-500 to-blue-500 text-white p-2 rounded text-center text-sm">
                      Hue
                    </div>
                    <div className="bg-gradient-to-r from-gray-500 to-blue-500 text-white p-2 rounded text-center text-sm">
                      Saturation
                    </div>
                    <div className="bg-gradient-to-r from-black via-blue-500 to-white text-white p-2 rounded text-center text-sm">
                      Lightness
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="font-medium mb-2">CMYK</h5>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                    CMYK (Cyan, Magenta, Yellow, Key/Black) is a subtractive color model used in color printing.
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    <div className="bg-cyan-500 text-white p-2 rounded text-center text-sm">Cyan</div>
                    <div className="bg-pink-500 text-white p-2 rounded text-center text-sm">Magenta</div>
                    <div className="bg-yellow-500 text-white p-2 rounded text-center text-sm">Yellow</div>
                    <div className="bg-black text-white p-2 rounded text-center text-sm">Key/Black</div>
                  </div>
                </div>

                <div>
                  <h5 className="font-medium mb-2">Pantone</h5>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                    Pantone is a standardized color matching system used in various industries for consistent color
                    reproduction.
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-[#FF5B4D] text-white p-2 rounded text-center text-sm">Warm Red C</div>
                    <div className="bg-[#0077C8] text-white p-2 rounded text-center text-sm">Process Blue C</div>
                    <div className="bg-[#FFDD00] text-black p-2 rounded text-center text-sm">Yellow C</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="ui" className="space-y-6 mt-6">
          <div className="space-y-4">
            <h3 className="text-xl font-medium">UI Color Schemes</h3>
            <p className="text-slate-600 dark:text-slate-400">
              The UI section provides pre-designed color schemes for websites and applications, with real-world previews
              and export options.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h4 className="text-lg font-medium mb-3">How to Use</h4>
                <ol className="list-decimal pl-5 space-y-2 text-slate-600 dark:text-slate-400">
                  <li>Browse through preset color schemes or generate random ones</li>
                  <li>Filter schemes by category (modern, accessibility, nature, etc.)</li>
                  <li>View real-world application examples for each scheme</li>
                  <li>Export schemes in different formats (CSS, Tailwind, JSON)</li>
                  <li>Copy individual colors or entire schemes to your clipboard</li>
                </ol>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-medium mb-3">Scheme Categories</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 border rounded-md">
                    <h5 className="font-medium mb-1">Modern & Minimal</h5>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Clean, contemporary designs with subtle accents
                    </p>
                  </div>
                  <div className="p-3 border rounded-md">
                    <h5 className="font-medium mb-1">Accessibility-Focused</h5>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      High contrast and colorblind-safe options
                    </p>
                  </div>
                  <div className="p-3 border rounded-md">
                    <h5 className="font-medium mb-1">Nature-Inspired</h5>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Colors from natural elements and landscapes
                    </p>
                  </div>
                  <div className="p-3 border rounded-md">
                    <h5 className="font-medium mb-1">Artistic Movements</h5>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Inspired by Bauhaus, Impressionism, Pop Art, etc.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-lg font-medium mb-3">Example Applications</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg overflow-hidden">
                  <div className="h-8 bg-blue-600 text-white flex items-center px-3">
                    <span className="text-sm font-medium">Modern Minimal</span>
                  </div>
                  <div className="p-3 bg-slate-50">
                    <div className="h-3 w-3/4 bg-slate-800 rounded opacity-80 mb-2"></div>
                    <div className="h-2 w-full bg-slate-400 rounded opacity-50 mb-1"></div>
                    <div className="h-2 w-5/6 bg-slate-400 rounded opacity-50 mb-3"></div>
                    <div className="h-6 w-1/3 bg-amber-500 rounded"></div>
                  </div>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <div className="h-8 bg-purple-700 text-white flex items-center px-3">
                    <span className="text-sm font-medium">Vibrant Tech</span>
                  </div>
                  <div className="p-3 bg-purple-50">
                    <div className="h-3 w-3/4 bg-purple-900 rounded opacity-80 mb-2"></div>
                    <div className="h-2 w-full bg-purple-400 rounded opacity-50 mb-1"></div>
                    <div className="h-2 w-5/6 bg-purple-400 rounded opacity-50 mb-3"></div>
                    <div className="h-6 w-1/3 bg-pink-500 rounded"></div>
                  </div>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <div className="h-8 bg-emerald-700 text-white flex items-center px-3">
                    <span className="text-sm font-medium">Nature Inspired</span>
                  </div>
                  <div className="p-3 bg-emerald-50">
                    <div className="h-3 w-3/4 bg-emerald-900 rounded opacity-80 mb-2"></div>
                    <div className="h-2 w-full bg-emerald-400 rounded opacity-50 mb-1"></div>
                    <div className="h-2 w-5/6 bg-emerald-400 rounded opacity-50 mb-3"></div>
                    <div className="h-6 w-1/3 bg-amber-500 rounded"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-lg font-medium mb-3">Export Options</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-md">
                  <h5 className="font-medium mb-2">CSS Variables</h5>
                  <pre className="bg-slate-100 dark:bg-slate-800 p-2 rounded-md overflow-x-auto text-xs">
                    <code>{`:root {
  --color-primary: #3B82F6;
  --color-secondary: #6B7280;
  --color-accent: #F97316;
  --color-background: #F9FAFB;
  --color-text: #1F2937;
}`}</code>
                  </pre>
                </div>

                <div className="p-4 border rounded-md">
                  <h5 className="font-medium mb-2">Tailwind Config</h5>
                  <pre className="bg-slate-100 dark:bg-slate-800 p-2 rounded-md overflow-x-auto text-xs">
                    <code>{`// tailwind.config.js
colors: {
  primary: "#3B82F6",
  secondary: "#6B7280",
  accent: "#F97316",
  background: "#F9FAFB",
  text: "#1F2937",
}`}</code>
                  </pre>
                </div>

                <div className="p-4 border rounded-md">
                  <h5 className="font-medium mb-2">JSON Format</h5>
                  <pre className="bg-slate-100 dark:bg-slate-800 p-2 rounded-md overflow-x-auto text-xs">
                    <code>{`{
  "primary": "#3B82F6",
  "secondary": "#6B7280",
  "accent": "#F97316",
  "background": "#F9FAFB",
  "text": "#1F2937"
}`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

