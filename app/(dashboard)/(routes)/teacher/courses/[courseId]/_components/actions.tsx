"use client";

import { ConfirmModal } from "@/components/modals/cofirm-modal";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Trash } from "lucide-react";
import { useState } from "react";
import axios from "axios";

interface ActionsProps {
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
}

export const Actions = ({
  disabled,
  courseId,
  isPublished,
}: ActionsProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      if (isPublished) {
        await axios.patch(
          `/api/courses/${courseId}/unpublish`
        );
        toast.success("Course unpulished");
      } else {
        await axios.patch(
          `/api/courses/${courseId}/publish`
        );
        toast.success("Course published");
      }

      router.refresh();
    } catch (error) {
      toast.error("Something were wrog");
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/courses/${courseId}`);

      toast.success("Course deleted");

      router.refresh();
      router.push(`/teacher/courses`);
    } catch (error) {
      toast.error("Something were wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading}>
          <Trash className="h-4 w-4 " />
        </Button>
      </ConfirmModal>
    </div>
  );
};
