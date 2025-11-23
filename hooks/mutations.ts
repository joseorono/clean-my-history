import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"

import { cleanAllHistory } from "~lib/history"
import { cleanSession, type CloseTabsParams } from "~lib/tabs"

export function useCleanHistoryMutation() {
  return useMutation({
    mutationFn: cleanAllHistory,
    onSuccess: () => {
      toast.success("History deleted successfully!")
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : "Unknown error"
      toast.error(`Error deleting history: ${message}`)
    }
  })
}

export function useCloseTabsMutation() {
  return useMutation({
    mutationFn: (params: CloseTabsParams) => cleanSession(params),
    onSuccess: () => {
      toast.success("Tabs closed successfully!")
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : "Unknown error"
      toast.error(`Error closing tabs: ${message}`)
    }
  })
}
