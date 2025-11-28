"use client";

import * as React from "react";
import * as RechartsPrimitive from "recharts";

import { cn } from "@/lib/utils";

// Format: {
//   key: string;
//   color: string;
//   name?: string;
//   value?: string | number;
//   payload?: {
//     name: string;
//     value: string | number;
//     unit?: string;
//   };
// }[]

const ChartTooltip = RechartsPrimitive.Tooltip;

interface ChartTooltipProps
  extends React.ComponentPropsWithoutRef<typeof RechartsPrimitive.Tooltip> {
  hideIndicator?: boolean;
  payload?: any[]; // Explicitly define payload
  label?: any; // Explicitly define label
}

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  ChartTooltipProps
>(
  (
    {
      active,
      payload,
      className,
      formatter,
      label,
      labelFormatter,
      hideIndicator = false,
      ...props
    },
    ref,
  ) => {
    if (active && payload && payload.length) {
      const defaultFormatter = (value: any) => value;
      return (
        <div
          ref={ref}
          className={cn(
            "grid min-w-[120px] items-center overflow-hidden rounded-md border border-border bg-background px-3 py-2 text-xs shadow-md",
            className,
          )}
          {...props}
        >
          {label ? (
            <div className="mb-2 flex h-6 items-center border-b border-border pb-2 text-muted-foreground">
              {labelFormatter ? labelFormatter(label) : label}
            </div>
          ) : null}
          <div className="grid gap-2">
            {payload.map((item: any, index: number) => (
              <div
                key={item.dataKey || index}
                className="flex items-center justify-between gap-4"
              >
                {item.color && !hideIndicator ? (
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                ) : null}
                <span className="text-muted-foreground">
                  {item.name || item.dataKey}:
                </span>
                <span className="font-mono text-foreground">
                  {formatter
                    ? (formatter as Function)(item.value, item.name, item, index)
                    : defaultFormatter(item.value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return null;
  },
);
ChartTooltipContent.displayName = "ChartTooltipContent";

const ChartLegend = RechartsPrimitive.Legend;

interface ChartLegendProps
  extends React.ComponentPropsWithoutRef<"div">,
    Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> {
  hideIcon?: boolean;
}

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  ChartLegendProps
>(
  (
    {
      className,
      payload,
      verticalAlign = "bottom",
      hideIcon = false,
      ...props
    },
    ref,
  ) => {
    if (!payload?.length) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center gap-4",
          verticalAlign === "top" ? "pb-3" : "pt-3",
          className,
        )}
        {...props}
      >
        {payload.map((item: any) => {
          if (!item.value) return null;
          const key = `${item.value}`;
          return (
            <div
              key={key}
              className={cn(
                "flex items-center gap-1.5",
                item.inactive && "opacity-50",
              )}
            >
              {!hideIcon ? (
                <span
                  className="h-3 w-3 shrink-0 rounded-full"
                  style={{
                    backgroundColor: item.color,
                  }}
                />
              ) : null}
              <p className="text-xs text-muted-foreground">{item.value}</p>
            </div>
          );
        })}
      </div>
    );
  },
);
ChartLegendContent.displayName = "ChartLegendContent";

export { ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent };