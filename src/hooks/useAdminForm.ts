import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { TablesInsert, TablesUpdate } from "@/integrations/supabase/supabase.types";

interface UseAdminFormOptions<TForm, TTable extends keyof Database['public']['Tables']> {
  tableName: TTable;
  initialData: TForm;
  transformToPayload: (formData: TForm) => TablesInsert<TTable> | TablesUpdate<TTable>;
  id?: string; // For update operations
  queryKeysToInvalidate?: string[];
  onSuccessCallback?: () => void;
}

export const useAdminForm = <TForm, TTable extends keyof Database['public']['Tables']>(
  options: UseAdminFormOptions<TForm, TTable>
) => {
  const { tableName, initialData, transformToPayload, id, queryKeysToInvalidate = [], onSuccessCallback } = options;
  const [formData, setFormData] = useState<TForm>(initialData);
  const queryClient = useQueryClient();

  const mutation = useMutation<void, Error, TForm>({
    mutationFn: async (data: TForm) => {
      const payload = transformToPayload(data);

      if (id) {
        // Update operation
        const { error } = await supabase
          .from(tableName)
          .update(payload as TablesUpdate<TTable>)
          .eq("id", id);
        if (error) throw error;
      } else {
        // Insert operation
        const { error } = await supabase.from(tableName).insert([payload as TablesInsert<TTable>]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success(`${tableName.slice(0, -1)} ${id ? "updated" : "created"} successfully`);
      queryKeysToInvalidate.forEach(key => {
        queryClient.invalidateQueries({ queryKey: [key] });
      });
      onSuccessCallback?.();
    },
    onError: (err) => {
      toast.error(`Failed to ${id ? "update" : "create"} ${tableName.slice(0, -1)}: ${err.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return {
    formData,
    setFormData,
    handleSubmit,
    isPending: mutation.isPending,
    error: mutation.error,
  };
};