import { useEffect, useRef, useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { RotateCcw, ZoomIn, Move, Check } from "lucide-react";

interface BannerAdjustDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  imageSrc: string | null;
  onSave: (adjustedDataUrl: string) => void;
}

const CANVAS_WIDTH = 1600;
const CANVAS_HEIGHT = 600;

export function BannerAdjustDialog({
  open,
  onOpenChange,
  imageSrc,
  onSave,
}: BannerAdjustDialogProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const loadedImageRef = useRef<HTMLImageElement | null>(null);

  const [zoom, setZoom] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Always points to the latest redraw so async image loads use current zoom/pan values
  const redrawRef = useRef<(() => void) | null>(null);

  // Redraw canvas whenever zoom, panX, or panY changes
  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    const img = loadedImageRef.current;
    if (!canvas || !img || !img.naturalWidth || !img.naturalHeight) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Fill dark background
    ctx.fillStyle = "#0F172A";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Compute base scale to cover 1600x600 canvas
    const baseScale = Math.max(CANVAS_WIDTH / img.naturalWidth, CANVAS_HEIGHT / img.naturalHeight);
    const finalScale = baseScale * zoom;

    const drawnWidth = img.naturalWidth * finalScale;
    const drawnHeight = img.naturalHeight * finalScale;

    // Center + offset
    const x = (CANVAS_WIDTH - drawnWidth) / 2 + panX;
    const y = (CANVAS_HEIGHT - drawnHeight) / 2 + panY;

    ctx.drawImage(img, x, y, drawnWidth, drawnHeight);
  }, [zoom, panX, panY]);

  // Keep the ref in sync so async callbacks always invoke the current redraw
  useEffect(() => {
    redrawRef.current = redraw;
  }, [redraw]);

  // Load image when dialog opens or imageSrc changes
  useEffect(() => {
    if (!open || !imageSrc) return;

    setLoading(true);
    setLoadError(null);
    setZoom(1);
    setPanX(0);
    setPanY(0);

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      loadedImageRef.current = img;
      setLoading(false);
      redrawRef.current?.();
    };
    img.onerror = () => {
      setLoading(false);
      setLoadError("Could not load image for editing.");
    };
    img.src = imageSrc;
  }, [open, imageSrc]);

  // Redraw whenever parameters change
  useEffect(() => {
    if (loadedImageRef.current) {
      redraw();
    }
  }, [redraw]);

  // Handle direct mouse drag on canvas
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - panX, y: e.clientY - panY });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Adjust pan coordinates based on canvas display scale
    const scaleFactor = CANVAS_WIDTH / canvas.clientWidth;
    const dx = (e.clientX - dragStart.x) * scaleFactor * 0.4;
    const dy = (e.clientY - dragStart.y) * scaleFactor * 0.4;

    setPanX(Math.round(dx));
    setPanY(Math.round(dy));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Reset adjustments
  const handleReset = () => {
    setZoom(1);
    setPanX(0);
    setPanY(0);
  };

  // Apply and save
  const handleApply = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
      onSave(dataUrl);
      onOpenChange(false);
    } catch {
      setLoadError("Canvas export failed (image may be protected by CORS).");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base">
            <Move className="h-4 w-4 text-primary" /> Adjust Banner Photo
          </DialogTitle>
          <DialogDescription className="text-xs">
            Drag the image or use the sliders to zoom and position your banner to fit GitHub&apos;s
            1600 &times; 600 ratio.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Interactive Canvas Viewport */}
          <div className="relative overflow-hidden rounded-xl border border-border bg-slate-950 shadow-inner">
            <canvas
              ref={canvasRef}
              width={CANVAS_WIDTH}
              height={CANVAS_HEIGHT}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className={`aspect-[8/3] w-full object-cover transition-colors ${
                isDragging ? "cursor-grabbing" : "cursor-grab"
              }`}
            />
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/70 backdrop-blur-sm">
                <p className="text-xs text-muted-foreground animate-pulse">Loading image...</p>
              </div>
            )}
            {loadError && (
              <div className="absolute inset-0 flex items-center justify-center bg-destructive/10 p-4">
                <p className="text-xs font-semibold text-destructive">{loadError}</p>
              </div>
            )}
            {/* Aspect ratio guide badge */}
            <span className="absolute right-2 bottom-2 rounded bg-black/60 px-1.5 py-0.5 font-mono text-[10px] text-white/80 backdrop-blur-sm">
              1600 &times; 600 (8:3)
            </span>
          </div>

          {/* Controls */}
          <div className="grid gap-3 rounded-xl border border-border/70 bg-card/50 p-3 sm:grid-cols-3">
            {/* Zoom slider */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1 font-medium">
                  <ZoomIn className="h-3.5 w-3.5" /> Zoom
                </span>
                <span className="font-mono text-[11px]">{zoom.toFixed(2)}x</span>
              </div>
              <Slider
                min={1}
                max={3}
                step={0.05}
                value={[zoom]}
                onValueChange={([val]) => setZoom(val ?? 1)}
              />
            </div>

            {/* Vertical Position */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-medium">Vertical Shift (Y)</span>
                <span className="font-mono text-[11px]">{panY > 0 ? `+${panY}` : panY}px</span>
              </div>
              <Slider
                min={-300}
                max={300}
                step={2}
                value={[panY]}
                onValueChange={([val]) => setPanY(val ?? 0)}
              />
            </div>

            {/* Horizontal Position */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-medium">Horizontal Shift (X)</span>
                <span className="font-mono text-[11px]">{panX > 0 ? `+${panX}` : panX}px</span>
              </div>
              <Slider
                min={-500}
                max={500}
                step={2}
                value={[panX]}
                onValueChange={([val]) => setPanX(val ?? 0)}
              />
            </div>
          </div>
        </div>

        <DialogFooter className="flex items-center justify-between gap-2 sm:justify-between">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Reset position
          </Button>
          <div className="flex gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="button" size="sm" onClick={handleApply} disabled={loading || !!loadError}>
              <Check className="h-4 w-4" /> Apply & Save
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
