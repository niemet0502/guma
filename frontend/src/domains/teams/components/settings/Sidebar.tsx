import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
}
export const SettingsSidebar: React.FC<SidebarNavProps> = ({
  className,
  items,
  ...props
}) => {
  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 w-[200px]",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Button
          key={item.href}
          variant="ghost"
          className="justify-start"
          //   href={item.href}
          //   className={cn(
          //     buttonVariants({ variant: "ghost" }),
          //     pathname === item.href
          //       ? "bg-muted hover:bg-muted"
          //       : "hover:bg-transparent hover:underline",
          //     "justify-start"
          //   )}
        >
          {item.title}
        </Button>
      ))}
    </nav>
  );
};
