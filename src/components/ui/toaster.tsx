
import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster 
      className="toaster group"
      position="top-right"
      expand={false}
      richColors={true}
      closeButton={true}
    />
  );
}
