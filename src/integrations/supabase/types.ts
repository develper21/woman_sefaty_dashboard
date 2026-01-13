export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      admin_messages: {
        Row: {
          admin_id: string
          created_at: string
          id: string
          message: string
          message_type: string
          priority: string | null
          recipient_ids: string[] | null
          recipient_type: string
          sent_at: string | null
          status: string | null
          subject: string
        }
        Insert: {
          admin_id: string
          created_at?: string
          id?: string
          message: string
          message_type: string
          priority?: string | null
          recipient_ids?: string[] | null
          recipient_type: string
          sent_at?: string | null
          status?: string | null
          subject: string
        }
        Update: {
          admin_id?: string
          created_at?: string
          id?: string
          message?: string
          message_type?: string
          priority?: string | null
          recipient_ids?: string[] | null
          recipient_type?: string
          sent_at?: string | null
          status?: string | null
          subject?: string
        }
        Relationships: [
          {
            foreignKeyName: "admin_messages_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "admin_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          department: string | null
          email: string
          full_name: string
          id: string
          is_verified: boolean | null
          last_login: string | null
          phone: string | null
          role: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          department?: string | null
          email: string
          full_name: string
          id?: string
          is_verified?: boolean | null
          last_login?: string | null
          phone?: string | null
          role?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          department?: string | null
          email?: string
          full_name?: string
          id?: string
          is_verified?: boolean | null
          last_login?: string | null
          phone?: string | null
          role?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      ai_analytics: {
        Row: {
          active_learning_samples: number | null
          created_at: string
          cumulative_training_hours: number | null
          daily_training_progress: number | null
          date: string
          false_negative_rate: number | null
          false_positive_rate: number | null
          health_predictions: number | null
          id: string
          model_version: string | null
          prediction_accuracy: number | null
          response_time_avg_ms: number | null
          safety_predictions: number | null
          sos_response_time_avg_seconds: number | null
          threats_detected: number | null
          tokens_processed: number | null
          total_training_sessions: number | null
          users_helped_count: number | null
        }
        Insert: {
          active_learning_samples?: number | null
          created_at?: string
          cumulative_training_hours?: number | null
          daily_training_progress?: number | null
          date?: string
          false_negative_rate?: number | null
          false_positive_rate?: number | null
          health_predictions?: number | null
          id?: string
          model_version?: string | null
          prediction_accuracy?: number | null
          response_time_avg_ms?: number | null
          safety_predictions?: number | null
          sos_response_time_avg_seconds?: number | null
          threats_detected?: number | null
          tokens_processed?: number | null
          total_training_sessions?: number | null
          users_helped_count?: number | null
        }
        Update: {
          active_learning_samples?: number | null
          created_at?: string
          cumulative_training_hours?: number | null
          daily_training_progress?: number | null
          date?: string
          false_negative_rate?: number | null
          false_positive_rate?: number | null
          health_predictions?: number | null
          id?: string
          model_version?: string | null
          prediction_accuracy?: number | null
          response_time_avg_ms?: number | null
          safety_predictions?: number | null
          sos_response_time_avg_seconds?: number | null
          threats_detected?: number | null
          tokens_processed?: number | null
          total_training_sessions?: number | null
          users_helped_count?: number | null
        }
        Relationships: []
      }
      app_users: {
        Row: {
          ai_interactions_count: number | null
          created_at: string
          email: string | null
          emergency_contacts: Json | null
          full_name: string
          health_data: Json | null
          id: string
          last_active: string | null
          location: string | null
          phone: string | null
          safety_alerts_count: number | null
          sos_triggered_count: number | null
          status: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          ai_interactions_count?: number | null
          created_at?: string
          email?: string | null
          emergency_contacts?: Json | null
          full_name: string
          health_data?: Json | null
          id?: string
          last_active?: string | null
          location?: string | null
          phone?: string | null
          safety_alerts_count?: number | null
          sos_triggered_count?: number | null
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          ai_interactions_count?: number | null
          created_at?: string
          email?: string | null
          emergency_contacts?: Json | null
          full_name?: string
          health_data?: Json | null
          id?: string
          last_active?: string | null
          location?: string | null
          phone?: string | null
          safety_alerts_count?: number | null
          sos_triggered_count?: number | null
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      platform_stats: {
        Row: {
          active_users: number | null
          ai_conversations: number | null
          api_requests: number | null
          app_crashes: number | null
          avg_session_duration_minutes: number | null
          created_at: string
          date: string
          health_checkups: number | null
          id: string
          new_users: number | null
          sos_alerts_triggered: number | null
          storage_used_mb: number | null
          total_users: number | null
        }
        Insert: {
          active_users?: number | null
          ai_conversations?: number | null
          api_requests?: number | null
          app_crashes?: number | null
          avg_session_duration_minutes?: number | null
          created_at?: string
          date?: string
          health_checkups?: number | null
          id?: string
          new_users?: number | null
          sos_alerts_triggered?: number | null
          storage_used_mb?: number | null
          total_users?: number | null
        }
        Update: {
          active_users?: number | null
          ai_conversations?: number | null
          api_requests?: number | null
          app_crashes?: number | null
          avg_session_duration_minutes?: number | null
          created_at?: string
          date?: string
          health_checkups?: number | null
          id?: string
          new_users?: number | null
          sos_alerts_triggered?: number | null
          storage_used_mb?: number | null
          total_users?: number | null
        }
        Relationships: []
      }
      verification_codes: {
        Row: {
          code: string
          created_at: string
          email: string
          expires_at: string
          id: string
          type: string
          used: boolean | null
        }
        Insert: {
          code: string
          created_at?: string
          email: string
          expires_at: string
          id?: string
          type: string
          used?: boolean | null
        }
        Update: {
          code?: string
          created_at?: string
          email?: string
          expires_at?: string
          id?: string
          type?: string
          used?: boolean | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
