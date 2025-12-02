import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

/**
 * Provides consistent padding and text styling for popup tab views.
 */
interface ViewContainerProps extends HTMLAttributes<HTMLDivElement> {
  readonly children: ReactNode;
}

const VIEW_CONTAINER_BASE_CLASS = "p-2 text-white" as const;

const ViewContainer = forwardRef<HTMLDivElement, ViewContainerProps>(function ViewContainer(
  { children, className, ...rest }: ViewContainerProps,
  ref
): JSX.Element {
  const classes: string = className
    ? `${VIEW_CONTAINER_BASE_CLASS} ${className}`
    : VIEW_CONTAINER_BASE_CLASS;

  return (
    <div ref={ref} className={classes} {...rest}>
      {children}
    </div>
  );
});

export default ViewContainer;