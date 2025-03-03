
import { Toaster as SonnerToaster } from "sonner";
import { useToast } from "@/hooks/use-toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <SonnerToaster 
      toasts={toasts}
      className="toaster group"
      position="top-right"
      expand={false}
      richColors={true}
      closeButton={true}
    />
  );
}
