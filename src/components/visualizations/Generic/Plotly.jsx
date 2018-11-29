import React, { lazy, Suspense } from "react";

// The type definitions for react-plotly.js is really poor
// and requires lots of (as any) casts to access exotic plots

// To allow implicit any everywhere this is a .jsx file instead of .tsx
const Plotly = lazy(() => import("react-plotly.js"));

export default function({ data, layout, ...props }) {
  return (
    <Suspense fallback={null}>
      <Plotly data={data} layout={layout} {...props} />
    </Suspense>
  );
}
