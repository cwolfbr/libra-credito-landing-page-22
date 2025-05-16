
import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    label?: string;
  }
>(({ className, label, "aria-label": ariaLabel, "aria-labelledby": ariaLabelledby, ...props }, ref) => {
  // Generate a unique ID for the slider if one isn't provided
  const id = React.useId()
  const labelId = `slider-label-${id}`
  
  return (
    <div className="space-y-2">
      {label && (
        <label id={labelId} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <SliderPrimitive.Root
        ref={ref}
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          className
        )}
        // Use the label ID if provided, otherwise use the provided aria-labelledby or aria-label
        aria-labelledby={label ? labelId : ariaLabelledby}
        aria-label={!label && !ariaLabelledby ? ariaLabel : undefined}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
          <SliderPrimitive.Range className="absolute h-full bg-primary" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb 
          className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          aria-label={label || ariaLabel || "Slider thumb"}
        />
      </SliderPrimitive.Root>
    </div>
  )
})
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
