"use client";

import { FormInput } from "@/components/form/formInput";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useCreateArticle } from "@/queries/article.queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  title: z.string().min(1),
});

type FormData = z.infer<typeof formSchema>;

export default function CreateArticle() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });
  const { mutate: createArticle, isPending } = useCreateArticle();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium">
          <Plus className="w-5 h-5" />
          Nouvel Article
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Article</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <FormInput
              name="title"
              label="Title"
              disabled={isPending}
              placeholder="Enter the title of the article"
            />
          </form>
        </Form>
        <DialogFooter>
          <Button
            type="button"
            onClick={() => createArticle(form.getValues())}
            disabled={isPending}
          >
            Create
          </Button>
          <DialogClose asChild>
            <Button disabled={isPending} type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
