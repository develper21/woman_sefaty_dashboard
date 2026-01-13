import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Bell, X, Check, Trash2, AlertTriangle, Info, CheckCircle, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  timestamp: Date;
  read: boolean;
}

export function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'New User Registration',
      message: 'A new user has registered on the platform',
      type: 'info',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: false,
    },
    {
      id: '2',
      title: 'SOS Alert Triggered',
      message: 'Emergency alert received from user location',
      type: 'error',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      read: false,
    },
    {
      id: '3',
      title: 'System Update Complete',
      message: 'AI model has been successfully updated',
      type: 'success',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: true,
    },
  ]);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio
  useEffect(() => {
    // Create audio element for notification sound
    audioRef.current = new Audio('/notification-sound.mp3');
    audioRef.current.volume = 0.5;
  }, []);

  // Play sound for new notifications
  const playNotificationSound = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        console.log('Could not play notification sound:', error);
      });
    }
  };

  // Simulate receiving new notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const newNotification: Notification = {
        id: Date.now().toString(),
        title: 'New Activity Detected',
        message: 'System has detected new activity',
        type: 'info',
        timestamp: new Date(),
        read: false,
      };
      
      setNotifications(prev => [newNotification, ...prev]);
      playNotificationSound();
    }, 30000); // Every 30 seconds for demo

    return () => clearInterval(interval);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const clearNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-warning" />;
      default:
        return <Info className="w-4 h-4 text-primary" />;
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <Bell className="w-4 h-4 mr-2" />
        Alerts
        {unreadCount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <Card className="absolute right-0 top-12 w-96 max-h-96 overflow-hidden z-50 shadow-lg">
          <CardContent className="p-0">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="font-semibold">Notifications</h3>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllAsRead}
                    className="text-xs"
                  >
                    <Check className="w-3 h-3 mr-1" />
                    Mark all read
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllNotifications}
                  className="text-xs text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-3 h-3 mr-1" />
                  Clear all
                </Button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No notifications yet</p>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-muted/50 transition-colors cursor-pointer ${
                        !notification.read ? 'bg-primary/5' : ''
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          {getNotificationIcon(notification.type)}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm truncate">
                              {notification.title}
                            </h4>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                              {notification.message}
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {formatTime(notification.timestamp)}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            clearNotification(notification.id);
                          }}
                          className="h-6 w-6 flex-shrink-0 ml-2"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-3 border-t border-border">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => window.location.href = '/admin/notifications'}
                >
                  View all notifications
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
