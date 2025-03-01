import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

const Alert = ({ children, action, title, message, actionName, isDanger }) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className={"text-slate-600"}>{message}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button variant={isDanger ? "destructive" : "default"} onClick={action}>{actionName}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Alert;
