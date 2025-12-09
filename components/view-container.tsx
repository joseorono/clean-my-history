import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../lib/utils";

/**
 * Provides consistent padding and text styling for popup tab views.
 */
interface ViewContainerProps extends HTMLAttributes<HTMLDivElement> {
  readonly children: ReactNode;
}

const VIEW_CONTAINER_BASE_CLASS = "py-2 px-4 text-white" as const;

const ViewContainer = forwardRef<HTMLDivElement, ViewContainerProps>(function ViewContainer(
  { children, className, ...rest }: ViewContainerProps,
  ref
): JSX.Element {
  const classes: string = cn(VIEW_CONTAINER_BASE_CLASS, className);

  return (
    <div ref={ref} className={classes} {...rest}>
      {children}
    </div>
  );
});

export default ViewContainer;