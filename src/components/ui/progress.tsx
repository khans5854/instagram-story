import React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
    React.ElementRef<typeof ProgressPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
        duration: number;
        isActive: boolean;
        isCompleted: boolean;
    }
>(({ className, value, duration, isActive, isCompleted, ...props }, ref) => {
    return (
        <ProgressPrimitive.Root
            ref={ref}
            className={cn(
                "relative h-0.5 w-full overflow-hidden rounded-full bg-gray-400",
                className
            )}
            {...props}
        >
            {isActive ? (
                <ProgressPrimitive.Indicator
                    className="h-full w-full flex-1 bg-white"
                    style={
                        !isCompleted
                            ? { animation: `fill ${duration}s linear forwards` }
                            : {}
                    }
                />
            ) : null}
        </ProgressPrimitive.Root>
    );
});
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
