'use client'

import { useEffect, useState } from "react"
import Image from "next/image"
import { Upload, LogOut } from 'lucide-react'
import * as Dialog from '@radix-ui/react-dialog'
import { fetchFiles, logout, handleUpload } from "./actions"
import { cn } from "@/lib/utils"

export default function FamilyPage() {
  const [files, setFiles] = useState<{
    name: string
    url: string
  }[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async (path: string) => {
      try {
        const result = await fetchFiles(path)
        setFiles(result)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchData("/2025")
  }, [])

  return (
    <div className="min-h-screen bg-black text-white min-w-max">
      <header className="sticky top-0 z-10 border-b border-white/10 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
        <div className="container flex h-16 items-center justify-between px-4">
            <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-red-500 to-red-900 bg-clip-text text-transparent text-center w-full">
            Scott Family Album
            </h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => logout()}
              className="p-2 rounded-full text-white hover:text-green-900 hover:bg-white/10 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Logout</span>
            </button>
          </div>
        </div>
      </header>
      <main className="container px-4 py-6">
        <div className="mb-8">
          <div className="flex justify-center">
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <button 
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-md",
                    "bg-gradient-to-r from-amber-800 to-green-700",
                    "hover:from-amber-900 hover:to-green-600",
                    "text-white font-medium transition-colors"
                  )}
                >
                  <Upload className="h-5 w-5" />
                  Upload Photos
                </button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
                <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black p-6 rounded-lg border border-white/10 w-full max-w-md">
                  <Dialog.Title className="text-lg font-semibold mb-4 text-white">
                    Upload Photos
                  </Dialog.Title>
                  <div className="space-y-4">
                    <label className="block">
                      <span className="sr-only">Choose files</span>
                      <input
                        type="file"
                        className="block w-full text-sm text-gray-400
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-md file:border-0
                          file:text-sm file:font-medium
                          file:bg-blue-600 file:text-white
                          hover:file:bg-blue-700
                          file:cursor-pointer cursor-pointer"
                        accept="image/*"
                        onChange={handleUpload('')}
                        disabled={loading}
                      />
                    </label>
                  </div>
                  <Dialog.Close asChild>
                    <button
                      className="absolute top-4 right-4 text-gray-400 hover:text-white"
                      aria-label="Close"
                    >
                      ✕
                    </button>
                  </Dialog.Close>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="text-center">
              <div className="animate-spin h-8 w-8 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-purple-400">Loading...</p>
            </div>
          </div>
        ) : error ? (
          <div className="rounded-lg bg-red-500/10 p-4 text-red-400">
            <p>Error: {error.message}</p>
          </div>
        ) : files.length === 0 ? (
          <div className="rounded-lg border-2 border-dashed border-white/20 p-12 text-center">
            <h2 className="text-xl font-semibold mb-2 text-purple-400">No photos yet</h2>
            <p className="text-white/60">
              Upload your first photo to start your family album
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {files.map((file) => (
              <div 
                key={file.url} 
                className={cn(
                  "group relative aspect-square overflow-hidden rounded-lg",
                  "transform transition-all duration-300 hover:scale-105",
                  "ring-2 ring-transparent hover:ring-purple-500",
                  "shadow-lg hover:shadow-purple-500/25"
                )}
              >
                <Image
                  src={file.url}
                  alt={file.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-sm font-medium truncate text-white drop-shadow-lg">
                    {file.name.split('.').slice(0, -1).join('.')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}