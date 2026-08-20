"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        duration: 3500,
        style: {
          borderRadius: "10px",
          padding: "12px 16px",
          fontSize: "14px",
        },
      }}
    />
  );
}