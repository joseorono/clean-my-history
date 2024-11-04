export interface ITaskButtonProps {
  text: string
  asyncCallback: Function
  disabled?: boolean
  variant?: "text" | "outlined" | "contained"
}
