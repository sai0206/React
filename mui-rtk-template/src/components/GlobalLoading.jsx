import { useSelector } from 'react-redux'
import LinearProgress from '@mui/material/LinearProgress'
import Box from '@mui/material/Box'

export default function GlobalLoading() {
  const loadingCount = useSelector((state) => state.ui.loadingCount)
  const isLoading = loadingCount > 0

  if (!isLoading) return null

  return (
    <Box sx={{ position: 'fixed', left: 0, right: 0, top: 0, zIndex: (t) => t.zIndex.tooltip + 1 }}>
      <LinearProgress />
    </Box>
  )
}

