"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ColorConverter from "@/components/color-converter"
import ColorGenerator from "@/components/color-generator"
import ColorChart from "@/components/color-chart"
import UiSuggestions from "@/components/ui-suggestions"
import About from "@/components/about"

export default function ColorTool() {
  const [activeTab, setActiveTab] = useState("converter")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <header className="mb-6 sm:mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
            Color Tool
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            A modern web tool for working with colors - convert, generate, explore, and learn
          </p>
        </header>

        <Tabs defaultValue="converter" value={activeTab} onValueChange={setActiveTab} className="max-w-4xl mx-auto">
          <TabsList className="grid grid-cols-5 mb-6 sm:mb-8">
            <TabsTrigger value="converter" className="text-xs sm:text-sm">
              Converter
            </TabsTrigger>
            <TabsTrigger value="generator" className="text-xs sm:text-sm">
              Generator
            </TabsTrigger>
            <TabsTrigger value="chart" className="text-xs sm:text-sm">
              Chart
            </TabsTrigger>
            <TabsTrigger value="ui" className="text-xs sm:text-sm">
              UI
            </TabsTrigger>
            <TabsTrigger value="about" className="text-xs sm:text-sm">
              About
            </TabsTrigger>
          </TabsList>

          <div className="bg-white dark:bg-slate-950 rounded-lg shadow-lg p-4 sm:p-6 transition-all duration-300">
            <TabsContent value="converter" className="space-y-4">
              <ColorConverter />
            </TabsContent>

            <TabsContent value="generator" className="space-y-4">
              <ColorGenerator />
            </TabsContent>

            <TabsContent value="chart" className="space-y-4">
              <ColorChart />
            </TabsContent>

            <TabsContent value="ui" className="space-y-4">
              <UiSuggestions />
            </TabsContent>

            <TabsContent value="about" className="space-y-4">
              <About />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}

