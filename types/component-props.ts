type muiButtonVariant = "text" | "outlined" | "contained"

interface ITaskButtonProps {
  text: string
  successText: Nullable<string>
  errorText: Nullable<string>
  loadingText?: string
  fnQuery: Function
  disabled?: boolean
  variant?: muiButtonVariant
}
