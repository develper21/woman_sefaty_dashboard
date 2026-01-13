import { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { AdminSidebar } from './AdminSidebar';
import { Skeleton } from '@/components/ui/skeleton';

export function AdminLayout() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/admin/signin');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex">
        <div className="w-64 bg-card border-r border-border p-4 space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
        <div className="flex-1 p-8">
          <Skeleton className="h-8 w-64 mb-4" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="h-screen flex bg-background overflow-hidden">
      <AdminSidebar onCollapseChange={setSidebarCollapsed} />
      <main 
        className="flex-1 overflow-y-auto transition-all duration-300" 
        style={{ marginLeft: sidebarCollapsed ? '5rem' : '16rem' }}
      >
        <Outlet />
      </main>
    </div>
  );
}
