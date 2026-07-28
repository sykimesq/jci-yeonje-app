'use client'

import { useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Upload, X, Camera, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PhotoUploadProps {
  bucket?: string
  path?: string
  onUpload: (url: string) => void
  onRemove?: () => void
  className?: string
}

export default function PhotoUpload({
  bucket = 'member-photos',
  path,
  onUpload,
  onRemove,
  className,
}: PhotoUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(path || null)
  const inputRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type)) {
      alert('JPG, PNG, WebP, GIF 파일만 업로드 가능합니다.')
      return
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('파일 크기는 5MB 이하여야 합니다.')
      return
    }

    setUploading(true)

    // Show local preview immediately
    const localUrl = URL.createObjectURL(file)
    setPreview(localUrl)

    try {
      const ext = file.name.split('.').pop() || 'jpg'
      const fileName = `${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        })

      if (uploadError) throw uploadError

      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName)

      onUpload(urlData.publicUrl)
    } catch (err: any) {
      alert('업로드 실패: ' + err.message)
      setPreview(path || null)
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  function handleRemove() {
    setPreview(null)
    onRemove?.()
  }

  return (
    <div className={cn('flex items-center gap-3', className)}>
      {preview ? (
        <div className="relative group">
          <img
            src={preview}
            alt="회원 사진"
            className="w-20 h-20 rounded-xl object-cover border border-jci-border"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full
              flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X size={12} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-20 h-20 rounded-xl border-2 border-dashed border-jci-border
            flex flex-col items-center justify-center gap-1
            hover:border-jci-400 hover:bg-jci-50 transition-colors
            disabled:opacity-50"
        >
          {uploading ? (
            <Loader2 size={18} className="animate-spin text-jci-muted" />
          ) : (
            <Camera size={18} className="text-jci-muted" />
          )}
          <span className="text-[10px] text-jci-muted">사진</span>
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleFile}
        className="hidden"
      />
      {!preview && (
        <p className="text-[11px] text-jci-muted">JPG, PNG, WebP, GIF<br />최대 5MB</p>
      )}
    </div>
  )
}
