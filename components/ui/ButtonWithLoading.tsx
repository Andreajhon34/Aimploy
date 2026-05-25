import { Button } from "./button";
import { Spinner } from "./minimal-tiptap/components/spinner";

export type ButtonWithLoadingProps = {
  isLoading: boolean;
  LoadingChildren?: React.ReactNode;
} & React.ComponentProps<typeof Button>;

export function ButtonWithLoading({
  children,
  isLoading,
  LoadingChildren,
  ...props
}: ButtonWithLoadingProps) {
  return (
    <Button {...props}>
      {isLoading
        ? (LoadingChildren ?? <Spinner className="animate-spin" />)
        : children}
    </Button>
  );
}
