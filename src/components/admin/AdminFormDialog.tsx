import { ReactNode } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface AdminFormDialogProps {
  title: string;
  triggerLabel: string;
  children: ReactNode;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onTriggerClick: () => void;
  isEditing: boolean;
}

export const AdminFormDialog = ({
  title,
  triggerLabel,
  children,
  isOpen,
  onOpenChange,
  onTriggerClick,
  isEditing,
}: AdminFormDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button onClick={onTriggerClick}>
          <Plus className="mr-2 h-4 w-4" />
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? `Edit ${title}` : `Add ${title}`}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

AdminFormDialog.displayName = "AdminFormDialog";