import { toast as sonnerToast } from "sonner";

type NotificationType = "success" | "error" | "warning" | "info" | "safety" | "health" | "alert";

interface NotificationOptions {
  title: string;
  description?: string;
  duration?: number;
}

const styleMap: Record<NotificationType, { bg: string; icon: string }> = {
  success: { bg: "bg-success/10 border-success/30", icon: "✓" },
  error: { bg: "bg-destructive/10 border-destructive/30", icon: "✕" },
  warning: { bg: "bg-warning/10 border-warning/30", icon: "⚠" },
  info: { bg: "bg-info/10 border-info/30", icon: "ℹ" },
  safety: { bg: "bg-primary/10 border-primary/30", icon: "🛡" },
  health: { bg: "bg-secondary/10 border-secondary/30", icon: "♥" },
  alert: { bg: "bg-destructive/10 border-destructive/30 animate-pulse", icon: "🔔" },
};

export const showNotification = (type: NotificationType, options: NotificationOptions) => {
  const style = styleMap[type];

  sonnerToast(options.title, {
    description: options.description,
    duration: options.duration || 4000,
    className: `${style.bg} border backdrop-blur-sm shadow-lg`,
  });
};

// Convenience functions
export const notifySuccess = (title: string, description?: string) =>
  showNotification("success", { title, description });

export const notifyError = (title: string, description?: string) =>
  showNotification("error", { title, description });

export const notifyWarning = (title: string, description?: string) =>
  showNotification("warning", { title, description });

export const notifyInfo = (title: string, description?: string) =>
  showNotification("info", { title, description });

export const notifySafety = (title: string, description?: string) =>
  showNotification("safety", { title, description });

export const notifyHealth = (title: string, description?: string) =>
  showNotification("health", { title, description });

export const notifyAlert = (title: string, description?: string) =>
  showNotification("alert", { title, description, duration: 6000 });
